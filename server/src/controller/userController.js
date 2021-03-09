import userService from '../services/userService.js';
import logger from '../utils/logger.js';
class UserController {
  constructor() {}

  async signUp(req, res, next) {
    try {
      const userData = req.body;
      const createdUser = await userService.create(userData);
      console.log(createdUser);
      const token = await userService.generateToken(createdUser.id);
      res.status(201).json({ data: createdUser, token: token });
    } catch (err) {
      next(err);
    }
  }

  async signIn(req, res, next) {
    try {
      const { body } = req;
      res.send('SignIn');
    } catch (err) {
      res.send(err);
    }
  }
}

module.exports = new UserController();
