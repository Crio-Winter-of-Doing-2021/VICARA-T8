import logger from '../utils/logger';
const errorHandler = (error, req, res, next) => {
  logger.error(`${error.name}`, error);
  let statusCode = error.statusCode;
  let message = error.message;
  //Joi validation error
  if (error.name === 'ValidationError') {
    message = Object.values(error.details).map((val) => val.message);
    statusCode = 400;
    //error = new ErrorResponse(message, 400);
  }

  res.status(statusCode || 500).json({
    message: message || 'Server Error',
    statusCode: statusCode,
  });
};

module.exports = errorHandler;
