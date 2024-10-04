const { Transaction, User, Orders } = require('../models'); // Ensure models are imported correctly

// Create a new transaction
const createTransaction = async (req, res) => {
  const { user_id, orderId, amount, transactionType, description } = req.body;

  try {
    // Find user by ID
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let updatedCredit = user.credit;
    let updatedOrderBalance = null;

    // If an orderId is provided, find the order
    if (orderId) {
      const order = await Orders.findOne({ where: { id: orderId, user_id } });
      if (!order) {
        return res.status(404).json({ message: 'Order not found or does not belong to the user' });
      }

      updatedOrderBalance = order.balance;

      // Update order balance based on transaction type
      if (transactionType === 'credit') {
        updatedOrderBalance -= amount;
      } else if (transactionType === 'debit') {
        updatedOrderBalance += amount;
      }

      // Save updated order
      await order.update({ balance: updatedOrderBalance });
    }

    // Update user's credit if no order is found
    if (!orderId) {
      if (transactionType === 'credit') {
        updatedCredit -= amount;
      } else if (transactionType === 'debit') {
        updatedCredit += amount;
      }

      // Save updated user credit
      await user.update({ credit: updatedCredit });
    }

    // Create the transaction entry
    const newTransaction = await Transaction.create({
      user_id,
      order_id: orderId || null,
      amount,
      transaction_type: transactionType,
      description,
    });

    res.status(201).json({
      message: 'Transaction created successfully',
      transaction: newTransaction,
      updatedCredit,
      updatedOrderBalance,
    });
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};

// Get all transactions
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll();
    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};

// Get transactions by user ID
const getTransactionsByUserId = async (req, res) => {
  const { user_id } = req.params;
  try {
    const transactions = await Transaction.findAll({ where: { user_id } });
    if (!transactions.length) {
      return res.status(404).json({ message: 'No transactions found for this user' });
    }
    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error fetching transactions by user ID:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};

// Get user's current balance
const getUserBalance = async (req, res) => {
  const { user_id } = req.params;
  try {
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ balance: user.credit });
  } catch (error) {
    console.error('Error fetching user balance:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};

// Export the controller functions
module.exports = {
  createTransaction,
  getTransactions,
  getTransactionsByUserId,
  getUserBalance,
};
