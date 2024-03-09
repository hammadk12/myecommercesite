/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Place a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *             required:
 *               - items
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Bad request
 */

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