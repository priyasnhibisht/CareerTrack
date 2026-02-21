const { HTTP_STATUS } = require('../config/constants');

const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  const statusCode = err.statusCode || HTTP_STATUS.SERVER_ERROR;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
};

module.exports = errorHandler;
