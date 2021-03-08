import { Router } from "express";
import userController from "../controller/users.js";
const router = Router();

router.post("/signin", userController.signIn);

module.exports = router;
