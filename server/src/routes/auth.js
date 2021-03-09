const { Router } = require('express');
const AuthController = require('../controller/AuthController');
const router = Router();

const authController = new AuthController();
router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/refresh-token', authController.refresh);
router.post('/logout', authController.logout);

module.exports = router;
