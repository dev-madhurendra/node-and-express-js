const { body } = require("express-validator");
const { validateData } = require("../middlewares/dataValidate");

// Validation rules for registration
const registerValidation = [
  body('firstname').notEmpty().withMessage('First name is required'),
  body('lastname').notEmpty().withMessage('Last name is required'),
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('password')
  .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
  .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.'),
  body('role').optional().isIn(['NORMAL', 'ADMIN']).withMessage('Role must be either NORMAL or ADMIN'),
  validateData
];

// Validation rules for login
const loginValidation = [
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').notEmpty().withMessage('Password is required'),
  validateData
];

module.exports = {
  registerValidation,
  loginValidation
}
