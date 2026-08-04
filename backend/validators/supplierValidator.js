const { body } = require('express-validator');

const supplierValidator = [
  body('name').trim().notEmpty().withMessage('Supplier company name is required'),
  body('contactPerson').optional().trim(),
  body('email').optional().trim().isEmail().withMessage('Invalid email format'),
  body('phone').optional().trim(),
];

module.exports = { supplierValidator };
