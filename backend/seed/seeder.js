const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });

const mongoose = require('mongoose');
const User = require('../models/User');
const Category = require('../models/Category');
const Supplier = require('../models/Supplier');
const Product = require('../models/Product');
const InventoryLog = require('../models/InventoryLog');
const { sampleUsers, sampleCategories, sampleSuppliers, sampleProducts } = require('./sampleData');

const seedDB = async () => {
  try {
    console.log('[Seeder] Connecting to database...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('[Seeder] Connected.');

    console.log('[Seeder] Clearing old records...');
    await User.deleteMany();
    await Category.deleteMany();
    await Supplier.deleteMany();
    await Product.deleteMany();
    await InventoryLog.deleteMany();

    console.log('[Seeder] Inserting users...');
    const createdUsers = await User.create(sampleUsers);

    console.log('[Seeder] Inserting categories...');
    const createdCategories = await Category.create(sampleCategories);

    console.log('[Seeder] Inserting suppliers...');
    const createdSuppliers = await Supplier.create(sampleSuppliers);

    console.log('[Seeder] Inserting products...');
    const productsToCreate = sampleProducts.map((prod) => ({
      ...prod,
      category: createdCategories[prod.categoryIndex]._id,
      supplier: createdSuppliers[prod.supplierIndex]._id,
    }));
    delete productsToCreate.categoryIndex;
    delete productsToCreate.supplierIndex;

    const createdProducts = await Product.create(productsToCreate);

    console.log('[Seeder] Generating initial stock logs...');
    const logs = createdProducts.map((prod) => ({
      product: prod._id,
      type: 'IN',
      quantityChange: prod.quantity,
      previousQuantity: 0,
      newQuantity: prod.quantity,
      reason: 'Initial Database Seed Ingestion',
      performedBy: createdUsers[0]._id,
    }));
    await InventoryLog.create(logs);

    console.log('----------------------------------------------------');
    console.log('✅ Database seeded successfully!');
    console.log(`- Created ${createdUsers.length} users (Admin: admin@inventory.com / password123)`);
    console.log(`- Created ${createdCategories.length} categories`);
    console.log(`- Created ${createdSuppliers.length} suppliers`);
    console.log(`- Created ${createdProducts.length} products`);
    console.log('----------------------------------------------------');

    process.exit(0);
  } catch (error) {
    console.error(`❌ Seeding failed: ${error.message}`);
    process.exit(1);
  }
};

seedDB();
