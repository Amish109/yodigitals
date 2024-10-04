const express = require('express');
const router = express.Router();
const { createTransaction, getTransactions, getTransactionsByUserId, getUserBalance } = require('../controllers/transactionController');

// Create transaction
router.post('/', createTransaction);

// Get all transactions
router.get('/', getTransactions);

// Get transactions by user ID
router.get('/user/:user_id', getTransactionsByUserId);

// Get user balance
router.get('/balance/:user_id', getUserBalance);

module.exports = router;
