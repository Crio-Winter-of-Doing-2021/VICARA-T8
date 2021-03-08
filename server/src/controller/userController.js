import userService from "../services/userService.js";
import logger from "../utils/logger.js";
class UserController {
  constructor() {}

  async signUp(req, res, next) {
    try {
      const userData = req.body;
      const createdUser = await userService.create(userData);
      res.status(201).json(createdUser);
    } catch (err) {
      console.log(err);
      next();
    }
  }

  async signIn(req, res, next) {
    try {
      const { body } = req;
      res.send("SignIn");
    } catch (err) {
      res.send(err);
    }
  }
}

module.exports = new UserController();
