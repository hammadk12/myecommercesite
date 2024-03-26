/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
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
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */

const express = require('express');
const rateLimit = require('express-rate-limit');
const { body } = require('express-validator')
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const { registerValidation, loginValidation } = require('../validations/validations');
const helmet = require('helmet');
const cors = require('cors');

const router = express.Router();

// Apply helmet for secure HTTP headers
router.use(helmet());

// Enable CORS for your routes
router.use(cors());

// Rate limiting for login routes
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login requests per windowMs
    message: 'Too many login attempts, please try again later.'
});

const registerLimiter = rateLimit({
    windowMs: 60 * 60 * 100, // 1 hour window
    max: 5, // star blocking after 5 requests
    message: "Too many accounts created from this IP, please try again in an hour."
})

// User login
router.post('/login', loginLimiter, loginValidation, userController.loginUser);

// Get user profile
router.get('/profile', authMiddleware, userController.getUserProfile);

// Update user profile
router.put('/update', authMiddleware, registerValidation, userController.updateUser);

// Register a new user
router.post('/register', registerLimiter, registerValidation, userController.registerUser)

module.exports = router;