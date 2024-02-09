const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');
const authMiddleware = require('../middleware/authMiddleware');

// Place a new order 
router.post('/', authMiddleware, ordersController.createOrder);

// Get all orders for a user
router.get('/user', authMiddleware, ordersController.getUserOrders);

// Get specific order by ID
router.get('/:orderId', authMiddleware, ordersController.getOrderById);

// Update order status - typically restricted to authenticated users or admins
router.put('/:orderId', authMiddleware, ordersController.updateOrder);

module.exports = router;