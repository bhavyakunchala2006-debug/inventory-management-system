const Category = require('../models/Category');
const ApiError = require('../utils/ApiError');

const getAllCategories = async () => {
  return await Category.find().sort({ name: 1 });
};

const createCategory = async (data) => {
  const existing = await Category.findOne({ name: data.name });
  if (existing) {
    throw new ApiError(400, 'Category with this name already exists');
  }
  return await Category.create(data);
};

const updateCategory = async (id, data) => {
  const category = await Category.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!category) {
    throw new ApiError(404, 'Category not found');
  }
  return category;
};

const deleteCategory = async (id) => {
  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    throw new ApiError(404, 'Category not found');
  }
  return category;
};

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
