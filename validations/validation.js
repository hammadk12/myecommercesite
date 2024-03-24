const { body } = require('express-validator');

// Registration data validation
const registerValidation = [
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('password')
      .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
      .matches(/\d/).withMessage('Password must contain at least one number')
      .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one symbol')
];

// Login data validation
const loginValidation = [
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('password').exists().withMessage('Password is required')
];

module.exports = {
    registerValidation,
    loginValidation
};
