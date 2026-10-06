const { v4: uuidv4 } = require('uuid');
const Product = require('../models/productModel');
const { successResponse, errorResponse } = require('../utils/responseHelper');

const getProducts = (req, res) => {
  const { search } = req.query;
  let products = Product.getAll();

  if (search) {
    const term = search.toLowerCase();
    products = products.filter((p) => 
      (p.name && p.name.toLowerCase().includes(term)) || 
      (p.category && p.category.toLowerCase().includes(term))
    );
  }

  successResponse(res, products, products.length);
};

const getProductById = (req, res) => {
  const product = Product.getById(req.params.id);
  if (!product) {
    return errorResponse(res, 'Product not found', 404);
  }
  successResponse(res, product);
};

const createProduct = (req, res) => {
  const { name, description, category, quantity, price, sku } = req.body;
  const newProduct = {
    id: uuidv4(),
    name,
    description: description || '',
    category: category || '',
    quantity,
    price,
    sku: sku || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const created = Product.add(newProduct);
  successResponse(res, created, undefined, 'Product created successfully', 201);
};

const updateProduct = (req, res) => {
  const updatedProduct = Product.update(req.params.id, req.body);
  if (!updatedProduct) {
    return errorResponse(res, 'Product not found', 404);
  }
  successResponse(res, updatedProduct, undefined, 'Product updated successfully');
};

const deleteProduct = (req, res) => {
  const deletedProduct = Product.delete(req.params.id);
  if (!deletedProduct) {
    return errorResponse(res, 'Product not found', 404);
  }
  successResponse(res, deletedProduct, undefined, 'Product deleted successfully');
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
