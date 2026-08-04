const Product = require('../models/Product');
const InventoryLog = require('../models/InventoryLog');
const ApiError = require('../utils/ApiError');

const getAllProducts = async (query = {}) => {
  const page = parseInt(query.page, 10) || 1;
  const limit = parseInt(query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const filter = {};
  if (query.category) filter.category = query.category;
  if (query.supplier) filter.supplier = query.supplier;
  if (query.search) {
    filter.$or = [
      { name: { $regex: query.search, $options: 'i' } },
      { sku: { $regex: query.search, $options: 'i' } },
    ];
  }
  if (query.lowStock === 'true') {
    filter.$expr = { $lte: ['$quantity', '$minStockThreshold'] };
  }

  const products = await Product.find(filter)
    .populate('category', 'name')
    .populate('supplier', 'name contactPerson')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Product.countDocuments(filter);

  return {
    products,
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit),
      limit,
    },
  };
};

const getProductById = async (id) => {
  const product = await Product.findById(id).populate('category').populate('supplier');
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }
  return product;
};

const createProduct = async (productData, userId) => {
  const existingSku = await Product.findOne({ sku: productData.sku.toUpperCase() });
  if (existingSku) {
    throw new ApiError(400, 'Product with this SKU already exists');
  }

  const product = await Product.create({
    ...productData,
    sku: productData.sku.toUpperCase(),
  });

  if (product.quantity > 0) {
    await InventoryLog.create({
      product: product._id,
      type: 'IN',
      quantityChange: product.quantity,
      previousQuantity: 0,
      newQuantity: product.quantity,
      reason: 'Initial Inventory Stocking',
      performedBy: userId,
    });
  }

  return product;
};

const updateProduct = async (id, updateData) => {
  if (updateData.sku) {
    updateData.sku = updateData.sku.toUpperCase();
    const existingSku = await Product.findOne({ sku: updateData.sku, _id: { $ne: id } });
    if (existingSku) {
      throw new ApiError(400, 'Product SKU is already in use by another product');
    }
  }

  const product = await Product.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
    .populate('category')
    .populate('supplier');

  if (!product) {
    throw new ApiError(404, 'Product not found');
  }
  return product;
};

const deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }
  return product;
};

const adjustStock = async ({ productId, type, quantity, reason }, userId) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  const previousQuantity = product.quantity;
  let newQuantity = previousQuantity;

  if (type === 'IN') {
    newQuantity = previousQuantity + quantity;
  } else if (type === 'OUT') {
    if (previousQuantity < quantity) {
      throw new ApiError(400, `Insufficient stock. Current stock is ${previousQuantity}`);
    }
    newQuantity = previousQuantity - quantity;
  } else if (type === 'ADJUSTMENT') {
    newQuantity = quantity;
  }

  product.quantity = newQuantity;
  await product.save();

  const log = await InventoryLog.create({
    product: productId,
    type,
    quantityChange: Math.abs(newQuantity - previousQuantity),
    previousQuantity,
    newQuantity,
    reason: reason || `Stock ${type} update`,
    performedBy: userId,
  });

  return { product, log };
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  adjustStock,
};
