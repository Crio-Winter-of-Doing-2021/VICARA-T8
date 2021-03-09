import userService from '../services/userService.js';
import logger from '../utils/logger.js';

//Convert Classes to UperCase
class UserController {
  constructor() {}

  async register(req, res, next) {
    try {
      const userData = req.body;
      const accessToken = await userService.create(userData);
      res.status(201).json({ accessToken });
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const userData = req.body;
      const accessToken = await userService.login(userData);
      res.status(200).json(accessToken);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();
