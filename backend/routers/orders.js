


const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orderController');


router.post('/create', ordersController.createOrder);
router.get('/:id', ordersController.getOrderWithDetails);
router.get('/', ordersController.getAllOrdersWithDetails);
router.put('/orders/:id', ordersController.updateOrder);

// Soft delete order
router.delete('/orders/:id', ordersController.softDeleteOrder);

module.exports = router;
