const successResponse = (res, data, count = undefined, message = undefined, statusCode = 200) => {
  const response = { success: true, data };
  if (count !== undefined) response.count = count;
  if (message !== undefined) response.message = message;
  return res.status(statusCode).json(response);
};

const errorResponse = (res, message, statusCode = 500) => {
  return res.status(statusCode).json({ success: false, message });
};

module.exports = {
  successResponse,
  errorResponse,
};
