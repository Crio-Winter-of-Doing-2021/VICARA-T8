import logger from '../utils/logger.js';
import { authSchema } from '../utils/validator.js';
import userDAO from '../dao/userDAO';
import createError from 'http-errors';
import { signAccessToken } from '../utils/jwtHelper';
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
      throw new createError(403, 'Email Already exist');
    }

    return await userDAO.create(entity);
  }

  async generateToken(userId) {
    console.log(userId);
    return await signAccessToken(userId);
  }
}

module.exports = new UserService();
