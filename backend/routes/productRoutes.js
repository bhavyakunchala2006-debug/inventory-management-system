const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  adjustStock,
} = require('../controllers/productController');
const { productValidator, stockAdjustmentValidator } = require('../validators/productValidator');
const validate = require('../middleware/validateMiddleware');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.use(protect);

router
  .route('/')
  .get(getProducts)
  .post(authorize('admin', 'manager'), upload.single('image'), productValidator, validate, createProduct);

router.post('/stock-adjustment', authorize('admin', 'manager', 'staff'), stockAdjustmentValidator, validate, adjustStock);

router
  .route('/:id')
  .get(getProduct)
  .put(authorize('admin', 'manager'), upload.single('image'), updateProduct)
  .delete(authorize('admin'), deleteProduct);

module.exports = router;
