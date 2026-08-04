const { body } = require('express-validator');

const categoryValidator = [
  body('name').trim().notEmpty().withMessage('Category name is required').isLength({ max: 50 }).withMessage('Name too long'),
  body('description').optional().trim().isLength({ max: 250 }).withMessage('Description too long'),
];

module.exports = { categoryValidator };
