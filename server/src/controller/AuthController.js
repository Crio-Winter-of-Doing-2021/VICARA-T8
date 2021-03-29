// @desc AuthController Class
class AuthController {
  constructor(AuthService) {
    this.authService = AuthService;
  }

  // @desc Get User
  getUser = async (req, res, next) => {
    try {
      const id = req.payload.aud;
      const user = await this.authService.getUser(id);
      res.status(201).json({ status: 'success', user: user });
    } catch (err) {
      next(err);
    }
  };

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
      const { refreshToken } = req.body;
      const tokens = await this.authService.refreshToken(refreshToken);
      res.status(200).json({ status: 'success', tokens });
    } catch (err) {
      next(err);
    }
  };

  // @method Google OAuth Backend
  googleOAuth = async (req, res, next) => {
    try {
      const userData = req.user._json;
      const tokens = await this.authService.googleOAuth(userData);
      res.status(200).json({ status: 'success', tokens });
    } catch (err) {
      next(err);
    }
  };

  // @method Google Frontend
  googleFEOAuth = async (req, res, next) => {
    try {
      const userData = req.body.user;
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
