/**
 * @swagger
 * /contact/submit:
 *   post:
 *     summary: Submit a contact form
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contact form submitted successfully
 *       500:
 *         description: Server error
 */

const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Route for contact form submission
router.post('/submit', contactController.submitContactForm);

module.exports = router;
