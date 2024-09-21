const db = require("../models");

module.exports = class TransactionDBApi {
  static async create(data) {
    const transaction = await db.sequelize.transaction(); 

    try {
      const user = await db.users.findByPk(data.user_id, { transaction });
      if (!user) {
        throw new Error(`User with ID ${data.user_id} not found`);
      }

      const currentBalance = parseFloat(user.balance) || 0;

      let updatedBalance;
      if (data.transaction_type === 'credit') {
        updatedBalance = currentBalance + parseFloat(data.amount); 
      } else if (data.transaction_type === 'debit') {
        updatedBalance = currentBalance - parseFloat(data.amount);
      } else {
        throw new Error(`Invalid transaction type: ${data.transaction_type}`);
      }

      const newTransaction = await db.transactions.create({
        user_id: data.user_id,
        order_id: data.order_id || null,
        amount: data.amount,
        transaction_type: data.transaction_type,
        description: data.description,
      }, { transaction });

      // Update the user's balance
      await db.users.update({ balance: updatedBalance }, {
        where: { id: data.user_id },
        transaction
      });

      await transaction.commit();

      return newTransaction;
    } catch (error) {
      await transaction.rollback();
      console.error('Error adding transaction:', error.message);
      throw new Error('Failed to add transaction');
    }
  }

  static async getTransactions(user_id = null) {
    try {
      const whereClause = user_id ? { user_id } : {};
      const transactions = await db.transactions.findAll({ where: whereClause });
      return transactions;
    } catch (error) {
      console.error('Error retrieving transactions:', error);
      throw new Error('Failed to retrieve transactions');
    }
  }

  static async getTransactionsByUserId(user_id) {
    return this.getTransactions(user_id);
  }

  static async getUserBalance(user_id) {
    try {
      const credits = await db.transactions.sum('amount', {
        where: {
          user_id,
          transaction_type: 'credit'
        }
      });

      const debits = await db.transactions.sum('amount', {
        where: {
          user_id,
          transaction_type: 'debit'
        }
      });

      const balance = (credits || 0) - (debits || 0);
      return balance;
    } catch (error) {
      console.error('Error retrieving user balance:', error);
      throw new Error('Failed to retrieve user balance');
    }
  }
};
