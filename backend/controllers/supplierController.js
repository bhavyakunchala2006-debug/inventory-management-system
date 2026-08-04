const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const supplierService = require('../services/supplierService');

const getSuppliers = asyncHandler(async (req, res) => {
  const suppliers = await supplierService.getAllSuppliers();
  res.status(200).json(new ApiResponse(200, suppliers, 'Suppliers retrieved successfully'));
});

const createSupplier = asyncHandler(async (req, res) => {
  const supplier = await supplierService.createSupplier(req.body);
  res.status(201).json(new ApiResponse(201, supplier, 'Supplier created successfully'));
});

const updateSupplier = asyncHandler(async (req, res) => {
  const supplier = await supplierService.updateSupplier(req.params.id, req.body);
  res.status(200).json(new ApiResponse(200, supplier, 'Supplier updated successfully'));
});

const deleteSupplier = asyncHandler(async (req, res) => {
  await supplierService.deleteSupplier(req.params.id);
  res.status(200).json(new ApiResponse(200, null, 'Supplier deleted successfully'));
});

module.exports = {
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};
