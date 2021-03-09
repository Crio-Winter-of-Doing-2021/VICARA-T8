const AuthService = require('../services/AuthService');

class AuthController {
  constructor() {
    this.authService = new AuthService();
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  async register(req, res, next) {
    try {
      const userData = req.body;
      const tokens = await this.authService.create(userData);
      res.status(201).json(tokens);
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const userData = req.body;
      const tokens = await this.authService.login(userData);
      res.status(200).json(tokens);
    } catch (err) {
      next(err);
    }
  }

  async refresh(req, res, next) {
    try {
      console.log('1');
      const { refreshToken } = req.body;
      const tokens = await this.authService.refreshToken(refreshToken);
      res.status(200).json(tokens);
    } catch (err) {
      next(err);
    }
  }

  async logout(req, res, next) {
    try {
      // TODO Logout the User
      res.send(200).json({ message: 'success' });
    } catch (err) {}
  }
}

module.exports = AuthController;
