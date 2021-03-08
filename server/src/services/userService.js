import logger from '../utils/logger.js';
import { authSchema } from '../utils/validator.js';
import userDAO from '../dao/userDAO';
import ErrorResponse from '../utils/ErrorResponse';
class UserService extends Error {
  constructor() {
    super();
  }

  async create(userData) {
    const entity = await authSchema.validateAsync(userData, {
      abortEarly: false,
    });

    const doesExist = await userDAO.exists(entity.email);

    if (doesExist) {
      //TODO: Error Handler
      throw new ErrorResponse('Email Already exist', 403);
    }

    return await userDAO.create(entity);
  }
}

module.exports = new UserService();
