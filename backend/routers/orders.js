const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');


router.post('/add', orderController.createOrder);

router.get('/orders/:id', orderController.getOrderWithDetails);

router.get('/list', orderController.getAllOrdersWithDetails);

module.exports = router;
