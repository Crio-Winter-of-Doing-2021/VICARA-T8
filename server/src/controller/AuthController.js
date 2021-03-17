// @desc AuthController Class
class AuthController {
  constructor(AuthService) {
    this.authService = AuthService;
  }

  // @desc Register
  register = async (req, res, next) => {
    try {
      const userData = req.body;
      const tokens = await this.authService.create(userData);
      res.status(201).json({ status: 'success', tokens });
    } catch (err) {
      next(err);
    }
  };

  // @desc Login
  login = async (req, res, next) => {
    try {
      const userData = req.body;
      const tokens = await this.authService.login(userData);
      res.status(200).json({ status: 'success', tokens });
    } catch (err) {
      next(err);
    }
  };

  // @desc Refresh Token
  refresh = async (req, res, next) => {
    try {
      console.log('1');
      const { refreshToken } = req.body;
      const tokens = await this.authService.refreshToken(refreshToken);
      res.status(200).json({ status: 'success', tokens });
    } catch (err) {
      next(err);
    }
  };

  // @method Google OAuth
  googleOAuth = async (req, res, next) => {
    try {
      const userData = req.user._json;
      const tokens = await this.authService.googleOAuth(userData);
      res.status(200).json({ status: 'success', tokens });
    } catch (err) {
      next(err);
    }
  };

  logout = async (req, res, next) => {
    try {
      // TODO Logout the User
      res.send(200).json({ status: 'success' });
    } catch (err) {}
  };
}

module.exports = AuthController;
