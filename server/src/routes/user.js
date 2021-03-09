import { Router } from 'express';
import userController from '../controller/userController.js';
const router = Router();

router.post('/login', userController.login);
router.post('/register', userController.register);
router.post('/refresh-token', userController.refresh);

module.exports = router;
