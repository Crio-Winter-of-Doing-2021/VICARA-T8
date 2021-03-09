import logger from '../utils/logger.js';
import { authSchema } from '../utils/validator.js';
import userDAO from '../dao/userDAO';
import createError from 'http-errors';
import { signAccessToken } from '../utils/jwtHelper';
import bcrypt from 'bcrypt';

//TODO: Can be broken in methods like checking a user
//TODO: Add token generation here
//TODO Private Protected Type Kuch
class UserService {
  constructor() {}

  async create(userData) {
    const entity = await authSchema.validateAsync(userData, {
      abortEarly: false,
    });

    const doesExist = await userDAO.exists(entity.email);

    if (doesExist) {
      //TODO: Error Handler
      throw createError.Forbidden('Email Already exist');
    }

    const creadtedUser = await userDAO.create(entity);
    const accessToken = await this._generateToken(creadtedUser.id);
    return accessToken;
  }

  async login(userData) {
    const entity = await authSchema.validateAsync(userData, {
      abortEarly: false,
    });

    const user = await userDAO.exists(entity.email);
    console.log(user);
    if (!user) {
      //TODO: Error Handler
      throw createError.NotFound('User Not Found');
    }
    const isMatch = await bcrypt.compare(entity.password, user.password);

    if (!isMatch) {
      throw createError.Unauthorized('Email/Password not valid');
    }
    const accessToken = await this._generateAccessToken(user.id);
    return accessToken;
  }

  async _generateAccessToken(userId) {
    return await signAccessToken(userId);
  }
}

module.exports = new UserService();
