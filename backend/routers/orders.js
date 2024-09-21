


const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orderController');


router.post('/create', ordersController.createOrder);
router.get('/:id', ordersController.getOrderWithDetails);
router.get('/', ordersController.getAllOrdersWithDetails);
router.put('/:id', ordersController.updateOrder);

// Soft delete order
router.delete('/:id', ordersController.softDeleteOrder);

module.exports = router;
