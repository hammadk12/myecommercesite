/**
 * @swagger
 * /cart/add:
 *   post:
 *     summary: Add an item to the cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *             required:
 *               - productId
 *               - quantity
 *     responses:
 *       201:
 *         description: Item added to cart
 *       400:
 *         description: Bad request
 */

const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');
const swaggerJSDoc = require('swagger-jsdoc');

// Add item to cart
router.post('/add', authMiddleware, cartController.addToCart);

// Get cart items
router.get('/', authMiddleware, cartController.getCart);

// Update item quantity in cart
router.put('/update/:itemId', authMiddleware, cartController.updateCartItem);

// Remove item from cart
router.delete('/remove/:itemId', authMiddleware, cartController.removeCartItem);


module.exports = router;

