import { Router } from "express";
import {  getMyProfile, login, register, } from "../controllers/auth_controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { me } from "../controllers/auth_controller_me";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.get("/profile", authMiddleware, getMyProfile);
router.get("/me", authMiddleware, me);
export default router;
