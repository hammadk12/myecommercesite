const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');
const authMiddleware = require('../middleware/authMiddleware');

// Place a new order 
router.post('/place', authMiddleware, ordersController.placeOrder);

// Get all orders for a user
router.get('/user', authMiddleware, ordersController.getUsersOrders);

// Get specific order by ID
router.get('/:orderId', authMiddleware, ordersController.getOrderById);

module.exports = router;