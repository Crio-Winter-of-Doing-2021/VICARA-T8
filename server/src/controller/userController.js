import userService from '../services/userService.js';
import logger from '../utils/logger.js';

//Convert Classes to UperCase
class UserController {
  constructor() {}

  async register(req, res, next) {
    try {
      const userData = req.body;
      const tokens = await userService.create(userData);
      res.status(201).json(tokens);
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const userData = req.body;
      const tokens = await userService.login(userData);
      res.status(200).json(tokens);
    } catch (err) {
      next(err);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.body;
      const tokens = await userService.refershToken(refreshToken);
      res.status(200).json(tokens);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();
