const { registerSchema, loginSchema } = require('../utils/validator.js');
const UserDAO = require('../dao/UserDAO');
const createError = require('http-errors');
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require('../utils/jwtHelper');
const bcrypt = require('bcrypt');

//TODO: Can be broken in methods like checking a user
//TODO: Add token generation here
//TODO Private Protected Type Kuch

// @desc Authorization Service Class
class AuthService {
  constructor() {
    this.userDAO = new UserDAO();
    this.create = this.create.bind(this);
    this.login = this.login.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
    this.googleOAuth = this.googleOAuth.bind(this);
  }

  // @desc Create a new User
  async create(userData) {
    const entity = await registerSchema.validateAsync(userData, {
      abortEarly: false,
    });

    const doesExist = await this.userDAO.exists(entity.email);

    const salt = await bcrypt.genSalt(10);
    entity.password = await bcrypt.hash(entity.password, salt);

    if (doesExist) {
      if (doesExist.password == null) {
        let updatedUser = await this.userDAO.update(doesExist.id, entity);
        let accToken = await this._generateAccessToken(updatedUser.id);
        let refToken = await this._generateRefreshToken(updatedUser.id);
        return { accessToken: accToken, refreshToken: refToken };
      }
      throw createError.Forbidden('Email Already exist');
    }

    const creadtedUser = await this.userDAO.create(entity);
    const accessToken = await this._generateAccessToken(creadtedUser.id);
    const refreshToken = await this._generateRefreshToken(creadtedUser.id);
    return { accessToken, refreshToken };
  }

  // @desc Login a User
  async login(userData) {
    const entity = await loginSchema.validateAsync(userData, {
      abortEarly: false,
    });

    const user = await this.userDAO.exists(entity.email);
    if (!user) {
      //TODO: Error Handler
      throw createError.NotFound('User Not Found');
    }
    const isMatch = await bcrypt.compare(entity.password, user.password);

    if (!isMatch) {
      throw createError.Unauthorized('Email/Password not valid');
    }
    const accessToken = await this._generateAccessToken(user.id);
    const refreshToken = await this._generateRefreshToken(user.id);
    return { accessToken, refreshToken };
  }

  // @desc Google OAuth
  async googleOAuth(user) {
    let result = await this.userDAO.exists(user.email);

    if (!result) {
      result = await this.userDAO.create({
        name: user.name,
        email: user.email,
      });
    }
    const accessToken = await this._generateAccessToken(result.id);
    const refreshToken = await this._generateRefreshToken(result.id);
    return { accessToken, refreshToken };
  }

  // @desc Refresh Token
  async refreshToken(token) {
    if (!token) throw createError.BadRequest();
    const userId = await this._verifyRefreshToken(token);
    const accessToken = await this._generateAccessToken(userId);
    //const refreshToken = await this._generateRefreshToken(userId);
    return { accessToken };
  }

  async _verifyRefreshToken(token) {
    return await verifyRefreshToken(token);
  }

  async _generateAccessToken(userId) {
    return await signAccessToken(userId);
  }

  async _generateRefreshToken(userId) {
    return await signRefreshToken(userId);
  }
}

module.exports = AuthService;
