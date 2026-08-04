const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const productService = require('../services/productService');

const getProducts = asyncHandler(async (req, res) => {
  const result = await productService.getAllProducts(req.query);
  res.status(200).json(new ApiResponse(200, result, 'Products retrieved successfully'));
});

const getProduct = asyncHandler(async (req, res) => {
  const product = await productService.getProductById(req.params.id);
  res.status(200).json(new ApiResponse(200, product, 'Product details retrieved successfully'));
});

const createProduct = asyncHandler(async (req, res) => {
  const productData = { ...req.body };
  if (req.file) {
    productData.imageUrl = `/uploads/${req.file.filename}`;
  }
  const product = await productService.createProduct(productData, req.user._id);
  res.status(201).json(new ApiResponse(201, product, 'Product created successfully'));
});

const updateProduct = asyncHandler(async (req, res) => {
  const updateData = { ...req.body };
  if (req.file) {
    updateData.imageUrl = `/uploads/${req.file.filename}`;
  }
  const product = await productService.updateProduct(req.params.id, updateData);
  res.status(200).json(new ApiResponse(200, product, 'Product updated successfully'));
});

const deleteProduct = asyncHandler(async (req, res) => {
  await productService.deleteProduct(req.params.id);
  res.status(200).json(new ApiResponse(200, null, 'Product deleted successfully'));
});

const adjustStock = asyncHandler(async (req, res) => {
  const result = await productService.adjustStock(req.body, req.user._id);
  res.status(200).json(new ApiResponse(200, result, 'Stock updated successfully'));
});

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  adjustStock,
};
