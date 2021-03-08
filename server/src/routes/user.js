import { Router } from "express";
import userController from "../controller/userController.js";
const router = Router();

router.post("/signin", userController.signIn);
router.post("/signup", userController.signUp);

module.exports = router;
