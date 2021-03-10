const { Router } = require('express');
const AuthController = require('../controller/AuthController');
const router = Router();
const passport = require('passport');
const conf = require('../utils/passport');

const authController = new AuthController();
router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/refresh-token', authController.refresh);
router.post('/logout', authController.logout);
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  authController.googleOAuth
);

module.exports = router;
