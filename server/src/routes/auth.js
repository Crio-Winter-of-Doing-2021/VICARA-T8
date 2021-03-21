const { Router } = require('express');
const AuthController = require('../controller/AuthController');
const AuthService = require('../services/AuthService');
const UserDAO = require('../dao/UserDAO');
const User = require('../models/User');
const router = Router();
const passport = require('passport');
const conf = require('../utils/passport');
const { verifyAccessToken } = require('../utils/jwtHelper');

// Add DI
const authController = new AuthController(new AuthService(new UserDAO(User)));

//  @desc Get User
//  @desc GET /user
router.get('/user/', verifyAccessToken, authController.getUser);

//  @desc Login
//  @route POST /login
router.post('/login', authController.login);

//  @desc Register
//  @route POST /register
router.post('/register', authController.register);

//  @desc Refresh Token
//  @route POST /refresh-token
router.post('/refresh-token', authController.refresh);

//  @desc Logout
//  @route POST /logout
//  TODO Implemented
router.post('/logout', authController.logout);

//  @desc Google OAuth
//  @route POST /google
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  })
);

//  @desc Google OAuth Callback
//  @route POST /google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  authController.googleOAuth
);

module.exports = router;
