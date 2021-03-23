const logger = require('../utils/logger');

// @desc Error Handler middleware
const errorHandler = (error, req, res, next) => {
  logger.error(`${error.name}`, error);
  let statusCode = error.statusCode;
  let message = error.message;

  //Joi validation error
  if (error.name === 'ValidationError') {
    message = {};
    let arr = Object.values(error.details).map((val) => {
      let key = val.context.label;
      let value = val.message;
      message[key] = value;
      return { [key]: value };
    });

    statusCode = 400;
  }

  if (error.name === 'CastError') {
    message = 'User not found.';
    statusCode = 404;
  }

  res.status(statusCode || 500).json({
    message: message || 'Server Error',
    statusCode: statusCode,
    status: 'failure',
  });
};

module.exports = errorHandler;
