const express = require('express');
const router = express.Router();
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');
const { categoryValidator } = require('../validators/categoryValidator');
const validate = require('../middleware/validateMiddleware');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);

router
  .route('/')
  .get(getCategories)
  .post(authorize('admin', 'manager'), categoryValidator, validate, createCategory);

router
  .route('/:id')
  .put(authorize('admin', 'manager'), categoryValidator, validate, updateCategory)
  .delete(authorize('admin'), deleteCategory);

module.exports = router;
