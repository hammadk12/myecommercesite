const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

// Add item to cart
router.post('/add', authMiddleware, cartController.addToCart);

// Get cart items
router.get('/', authMiddleware, cartController.getCart);

// Update item quantity in cart
router.put('/update/:itemId', authMiddleware, cartController.updateCartItem);

// Remove item from cart
router.delete('/remove/:itemId', authMiddleware, cartController.removeCartItem);


module.exports = router;
