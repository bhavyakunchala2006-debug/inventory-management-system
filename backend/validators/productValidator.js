const { body } = require('express-validator');

const productValidator = [
  body('sku').trim().notEmpty().withMessage('SKU is required'),
  body('name').trim().notEmpty().withMessage('Product name is required'),
  body('category').isMongoId().withMessage('Valid Category ID is required'),
  body('supplier').isMongoId().withMessage('Valid Supplier ID is required'),
  body('price').isFloat({ min: 0 }).withMessage('Selling price must be a positive number'),
  body('costPrice').isFloat({ min: 0 }).withMessage('Cost price must be a positive number'),
  body('quantity').optional().isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
  body('minStockThreshold').optional().isInt({ min: 0 }).withMessage('Min stock threshold must be a non-negative integer'),
];

const stockAdjustmentValidator = [
  body('productId').isMongoId().withMessage('Valid Product ID is required'),
  body('type').isIn(['IN', 'OUT', 'ADJUSTMENT']).withMessage('Type must be IN, OUT, or ADJUSTMENT'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity change must be greater than 0'),
  body('reason').optional().trim(),
];

module.exports = { productValidator, stockAdjustmentValidator };
