import { Router } from 'express';
import userController from '../controller/userController.js';
const router = Router();

router.post('/login', userController.login);
router.post('/register', userController.register);

module.exports = router;
