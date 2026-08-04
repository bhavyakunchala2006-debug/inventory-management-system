const express = require('express');
const router = express.Router();
const {
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} = require('../controllers/supplierController');
const { supplierValidator } = require('../validators/supplierValidator');
const validate = require('../middleware/validateMiddleware');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);

router
  .route('/')
  .get(getSuppliers)
  .post(authorize('admin', 'manager'), supplierValidator, validate, createSupplier);

router
  .route('/:id')
  .put(authorize('admin', 'manager'), supplierValidator, validate, updateSupplier)
  .delete(authorize('admin'), deleteSupplier);

module.exports = router;
