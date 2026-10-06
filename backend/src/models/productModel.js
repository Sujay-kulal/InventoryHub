const { v4: uuidv4 } = require('uuid');

const generateProduct = (name, description, category, quantity, price, sku) => ({
  id: uuidv4(),
  name,
  description,
  category,
  quantity,
  price,
  sku,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

let products = [
  generateProduct('Wireless Mouse', 'Ergonomic wireless mouse with fast scrolling.', 'Electronics', 150, 29.99, 'EL-MS-001'),
  generateProduct('Mechanical Keyboard', 'RGB mechanical keyboard with blue switches.', 'Electronics', 85, 89.99, 'EL-KB-002'),
  generateProduct('Ergonomic Office Chair', 'Adjustable office chair with lumbar support.', 'Furniture', 20, 199.99, 'FN-CH-001'),
  generateProduct('Standing Desk', 'Motorized standing desk with presets.', 'Furniture', 12, 499.00, 'FN-DK-002'),
  generateProduct('Notebook 5-Pack', 'A5 lined notebooks for daily use.', 'Office Supplies', 300, 12.50, 'OS-NB-001'),
  generateProduct('Gel Pens Box', 'Box of 12 black gel ink pens.', 'Office Supplies', 120, 9.99, 'OS-PN-002'),
];

module.exports = {
  getAll: () => products,
  getById: (id) => products.find((p) => p.id === id),
  add: (product) => {
    products.push(product);
    return product;
  },
  update: (id, updateData) => {
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return null;
    products[index] = { ...products[index], ...updateData, updatedAt: new Date().toISOString() };
    return products[index];
  },
  delete: (id) => {
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return null;
    const deleted = products[index];
    products.splice(index, 1);
    return deleted;
  },
};
