<<<<<<< HEAD
const db = require('../models'); // Assuming your models are in the 'models' folder
const { Transaction, User, Order } = db;

// Create Transaction
exports.createTransaction = async (req, res) => {
  const { user_id, order_id, amount, transaction_type, description } = req.body;

  // Validate request payload
  if (!user_id || !amount || !transaction_type) {
    return res.status(400).json({ message: 'User ID, amount, and transaction type are required' });
  }

  try {
    // Check if user exists
=======
const { Transaction, User, Orders } = require('../models'); // Ensure models are imported correctly

// Create a new transaction
const createTransaction = async (req, res) => {
  const { user_id, orderId, amount, transactionType, description } = req.body;

  try {
>>>>>>> 32146da7f3d03a1af460fdecd3e1c24fe9dac0f9
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

<<<<<<< HEAD
    // If an order_id is provided, check if the order exists
    let order;
    if (order_id) {
      order = await Order.findByPk(order_id);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
    }

    // Calculate the new balance for the user
    const currentBalance = parseFloat(user.balance) || 0;
    let updatedBalance;

    if (transaction_type === 'credit') {
      updatedBalance = currentBalance + parseFloat(amount);
    } else if (transaction_type === 'debit') {
      if (currentBalance < amount) {
        return res.status(400).json({ message: 'Insufficient balance' });
      }
      updatedBalance = currentBalance - parseFloat(amount);
    } else {
      return res.status(400).json({ message: 'Invalid transaction type' });
    }

    // Create the transaction
    const newTransaction = await Transaction.create({
      user_id,
      order_id: order_id || null,
      amount,
      transaction_type,
      description,
      opening_balance: currentBalance,
      closing_balance: updatedBalance
    });

    // Update user's balance
    await User.update({ balance: updatedBalance }, { where: { id: user_id } });

    res.status(201).json({
      message: 'Transaction created successfully',
      transaction: newTransaction
    });
  } catch (error) {
    console.error('Error creating transaction:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get All Transactions
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'] // Include user details in the response
        },
        {
          model: Order,
          as: 'order',
          attributes: ['id', 'order_no'] // Include order details if provided
        }
      ]
    });

    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get Transaction by ID
exports.getTransactionById = async (req, res) => {
  const { id } = req.params;

  try {
    const transaction = await Transaction.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email']
        },
        {
          model: Order,
          as: 'order',
          attributes: ['id', 'order_no']
        }
      ]
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.status(200).json(transaction);
  } catch (error) {
    console.error('Error fetching transaction:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
=======
    let updatedCredit = user.credit;
    let updatedOrderBalance = null;

    if (orderId) {
      const order = await Orders.findOne({ where: { id: orderId, user_id } });
      if (!order) {
        return res.status(404).json({ message: 'Order not found or does not belong to the user' });
      }

      updatedOrderBalance = order.balance;

      if (transactionType === 'credit') {
        updatedOrderBalance -= amount;
      } else if (transactionType === 'debit') {
        updatedOrderBalance += amount;
      }

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


const getTransactionsById = async (req, res) => {
  const { id } = req.params;
  try {
    const transactions = await Transaction.findAll({ where: { id } });
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
  getTransactionsById
};
>>>>>>> 32146da7f3d03a1af460fdecd3e1c24fe9dac0f9
