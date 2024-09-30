const { body } = require("express-validator");
const { validateData } = require("../middlewares/dataValidate");

const blogValidation = [
  body('title')
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 100 }).withMessage('Title must not exceed 100 characters'),

  body('subtitle')
    .optional()
    .isLength({ max: 200 }).withMessage('Subtitle must not exceed 200 characters'),

  body('imageUsed')
    .optional()
    .isURL().withMessage('Image URL must be a valid URL'),

  body('content')
    .notEmpty().withMessage('Content is required')
    .isLength({ min: 10 }).withMessage('Content must be at least 10 characters long'),

  validateData
];

module.exports = {
  blogValidation
}
