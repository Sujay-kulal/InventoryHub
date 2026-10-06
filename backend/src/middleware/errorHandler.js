const { errorResponse } = require('../utils/responseHelper');

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  errorResponse(res, err.message || 'Internal Server Error', 500);
};

const notFoundHandler = (req, res, next) => {
  errorResponse(res, 'Route not found', 404);
};

module.exports = {
  errorHandler,
  notFoundHandler,
};
