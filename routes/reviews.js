/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - product
 *         - user
 *         - rating
 *         - comment
 *       properties:
 *         product:
 *           type: string
 *           description: ID of the product being reviewed
 *         user:
 *           type: string
 *           description: ID of the user writing the review
 *         rating:
 *           type: integer
 *           description: Rating given to the product
 *         comment:
 *           type: string
 *           description: The review comment
 */

/**
 * @swagger
 * /reviews/add:
 *   post:
 *     summary: Add a review for a product
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       201:
 *         description: Review added successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /reviews/product/{productId}:
 *   get:
 *     summary: Get reviews for a specific product
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the product
 *     responses:
 *       200:
 *         description: A list of reviews for the product
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /reviews/delete/{reviewId}:
 *   delete:
 *     summary: Delete a review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the review to delete
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Review not found
 */


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
