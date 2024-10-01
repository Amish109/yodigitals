const express = require('express');
const router = express.Router();
const TransactionDBApi = require('../controllers/transactionController'); 


router.post('/', async (req, res) => {
  const transactionData = req.body;

  try {
    const newTransaction = await TransactionDBApi.create(transactionData);
    res.status(201).json({
      message: 'Transaction created successfully',
      transaction: newTransaction,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.get('/', async (req, res) => {
  const { user_id } = req.query;
  try {
    const transactions = await TransactionDBApi.getTransactions(user_id);
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



router.get('/user/:user_id', async (req, res) => {
  const { user_id } = req.params;

  try {
    const transactions = await TransactionDBApi.getTransactionsByUserId(user_id);
    if (!transactions.length) {
      return res.status(404).json({ message: 'No transactions found for this user' });
    }
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/balance/:user_id', async (req, res) => {
  const { user_id } = req.params;

  try {
    const balance = await TransactionDBApi.getUserBalance(user_id);
    res.status(200).json({ balance });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Export the router
module.exports = router;
