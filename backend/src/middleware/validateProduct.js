const { errorResponse } = require('../utils/responseHelper');

const validateProduct = (req, res, next) => {
  const { name, quantity, price, category, description, sku } = req.body;
  const isPost = req.method === 'POST';

  if (isPost || name !== undefined) {
    if (!name || typeof name !== 'string' || name.length < 1 || name.length > 200) {
      return errorResponse(res, 'Name is required and must be a string between 1 and 200 characters.', 400);
    }
  }

  if (isPost || quantity !== undefined) {
    if (quantity === undefined || !Number.isInteger(quantity) || quantity < 0) {
      return errorResponse(res, 'Quantity is required for creation and must be a non-negative integer.', 400);
    }
  }

  if (isPost || price !== undefined) {
    if (price === undefined || typeof price !== 'number' || price < 0) {
      return errorResponse(res, 'Price is required for creation and must be a non-negative number.', 400);
    }
  }

  if (category !== undefined && typeof category !== 'string') {
    return errorResponse(res, 'Category must be a string.', 400);
  }

  if (description !== undefined && typeof description !== 'string') {
    return errorResponse(res, 'Description must be a string.', 400);
  }

  if (sku !== undefined && typeof sku !== 'string') {
    return errorResponse(res, 'SKU must be a string.', 400);
  }

  next();
};

module.exports = validateProduct;
