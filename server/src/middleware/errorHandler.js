import logger from '../utils/logger';
import ErrorResponse from '../utils/ErrorResponse';
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  logger.error(`${error.name}`, error);

  //Joi validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.details).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    message: error.message || 'Server Error',
    statusCode: error.statusCode,
  });
};

module.exports = errorHandler;
