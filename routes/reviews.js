const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviewsController');
const authMiddleware = require('../middleware/authMiddleware');

// Add a review
router.post('/add', authMiddleware, reviewsController.addReview);

// Get reviews for a product
router.get('/product/:productId', reviewsController.getProductReviews);

// Delete a review
router.delete('/delete/:reviewId', authMiddleware, reviewsController.deleteReview);

module.exports = router;
