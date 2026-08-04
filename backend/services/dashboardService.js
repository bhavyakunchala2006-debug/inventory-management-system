const Product = require('../models/Product');
const Category = require('../models/Category');
const Supplier = require('../models/Supplier');
const InventoryLog = require('../models/InventoryLog');

const getDashboardSummary = async () => {
  const totalProducts = await Product.countDocuments();
  const totalCategories = await Category.countDocuments();
  const totalSuppliers = await Supplier.countDocuments();

  const products = await Product.find();
  
  let totalStockQuantity = 0;
  let totalInventoryValue = 0;
  let lowStockCount = 0;
  let outOfStockCount = 0;

  products.forEach((p) => {
    totalStockQuantity += p.quantity;
    totalInventoryValue += p.quantity * p.costPrice;
    if (p.quantity === 0) {
      outOfStockCount++;
    } else if (p.quantity <= p.minStockThreshold) {
      lowStockCount++;
    }
  });

  const lowStockProducts = await Product.find({
    $expr: { $lte: ['$quantity', '$minStockThreshold'] },
  })
    .populate('category', 'name')
    .populate('supplier', 'name')
    .limit(5);

  const recentLogs = await InventoryLog.find()
    .populate('product', 'name sku')
    .populate('performedBy', 'name email')
    .sort({ createdAt: -1 })
    .limit(10);

  // Category distribution
  const categoryStats = await Product.aggregate([
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 },
        totalValue: { $sum: { $multiply: ['$quantity', '$costPrice'] } },
      },
    },
    {
      $lookup: {
        from: 'categories',
        localField: '_id',
        foreignField: '_id',
        as: 'categoryInfo',
      },
    },
    {
      $unwind: '$categoryInfo',
    },
    {
      $project: {
        categoryName: '$categoryInfo.name',
        count: 1,
        totalValue: 1,
      },
    },
  ]);

  return {
    metrics: {
      totalProducts,
      totalCategories,
      totalSuppliers,
      totalStockQuantity,
      totalInventoryValue,
      lowStockCount,
      outOfStockCount,
    },
    lowStockProducts,
    recentLogs,
    categoryStats,
  };
};

module.exports = { getDashboardSummary };
