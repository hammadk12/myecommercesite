const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Route for contact form submission
router.post('/submit', contactController.submitContactForm);

module.exports = router;
