const Supplier = require('../models/Supplier');
const ApiError = require('../utils/ApiError');

const getAllSuppliers = async () => {
  return await Supplier.find().sort({ name: 1 });
};

const createSupplier = async (data) => {
  return await Supplier.create(data);
};

const updateSupplier = async (id, data) => {
  const supplier = await Supplier.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!supplier) {
    throw new ApiError(404, 'Supplier not found');
  }
  return supplier;
};

const deleteSupplier = async (id) => {
  const supplier = await Supplier.findByIdAndDelete(id);
  if (!supplier) {
    throw new ApiError(404, 'Supplier not found');
  }
  return supplier;
};

module.exports = {
  getAllSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};
