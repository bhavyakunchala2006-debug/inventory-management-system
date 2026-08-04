const sampleUsers = [
  {
    name: 'Admin Manager',
    email: 'admin@inventory.com',
    password: 'password123',
    role: 'admin',
    isActive: true,
  },
  {
    name: 'Warehouse Manager',
    email: 'manager@inventory.com',
    password: 'password123',
    role: 'manager',
    isActive: true,
  },
  {
    name: 'Inventory Staff',
    email: 'staff@inventory.com',
    password: 'password123',
    role: 'staff',
    isActive: true,
  },
];

const sampleCategories = [
  { name: 'Electronics', description: 'Consumer electronic devices, smart devices and accessories' },
  { name: 'Office Supplies', description: 'Stationery, paper products, and office ergonomics' },
  { name: 'Furniture', description: 'Desks, chairs, filing cabinets, and ergonomic workplace furniture' },
  { name: 'Networking Equipment', description: 'Routers, switches, patch cords, and server accessories' },
];

const sampleSuppliers = [
  {
    name: 'TechSupply Global Inc.',
    contactPerson: 'Sarah Connor',
    email: 'sarah@techsupply.com',
    phone: '+1-555-0192',
    address: { street: '100 Technology Way', city: 'San Jose', state: 'CA', country: 'USA' },
  },
  {
    name: 'LogiDesk Solutions Ltd.',
    contactPerson: 'David Miller',
    email: 'david@logidesk.com',
    phone: '+1-555-0144',
    address: { street: '45 Industrial Pkwy', city: 'Chicago', state: 'IL', country: 'USA' },
  },
  {
    name: 'NetConnect Corp',
    contactPerson: 'Elena Rostova',
    email: 'elena@netconnect.io',
    phone: '+1-555-0188',
    address: { street: '88 Cyber Blvd', city: 'Austin', state: 'TX', country: 'USA' },
  },
];

const sampleProducts = [
  {
    sku: 'ELEC-LOG-MX3',
    name: 'Logitech MX Master 3S Wireless Mouse',
    description: 'Ergonomic performance wireless mouse with quiet clicks and 8K DPI tracking.',
    categoryIndex: 0,
    supplierIndex: 0,
    price: 99.99,
    costPrice: 65.00,
    quantity: 45,
    minStockThreshold: 10,
    unit: 'pcs',
  },
  {
    sku: 'OFF-MON-27P',
    name: 'Dell UltraSharp 27" 4K USB-C Monitor',
    description: 'IPS 4K monitor with color accuracy, USB-C hub capabilities, and height adjustment.',
    categoryIndex: 0,
    supplierIndex: 0,
    price: 499.00,
    costPrice: 340.00,
    quantity: 8,
    minStockThreshold: 10,
    unit: 'pcs',
  },
  {
    sku: 'FUR-CHR-ERG',
    name: 'Herman Miller Aeron Ergonomic Chair',
    description: 'Pellicle suspension breathable seat and back mesh chair.',
    categoryIndex: 2,
    supplierIndex: 1,
    price: 1195.00,
    costPrice: 780.00,
    quantity: 4,
    minStockThreshold: 5,
    unit: 'pcs',
  },
  {
    sku: 'NET-RTR-AX6',
    name: 'ASUS RT-AX88U Dual-Band WiFi 6 Router',
    description: 'Gigabit wireless router with 8 LAN ports and security software included.',
    categoryIndex: 3,
    supplierIndex: 2,
    price: 249.99,
    costPrice: 160.00,
    quantity: 18,
    minStockThreshold: 8,
    unit: 'pcs',
  },
  {
    sku: 'OFF-PPR-A4',
    name: 'Multipurpose Copy Paper A4 Box (5 Reams)',
    description: 'High brightness 80gsm white printing paper box.',
    categoryIndex: 1,
    supplierIndex: 1,
    price: 38.50,
    costPrice: 22.00,
    quantity: 120,
    minStockThreshold: 30,
    unit: 'box',
  },
];

module.exports = {
  sampleUsers,
  sampleCategories,
  sampleSuppliers,
  sampleProducts,
};
