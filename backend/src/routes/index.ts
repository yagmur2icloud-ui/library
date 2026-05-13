import { Router } from "express";
import authRoutes from "./auth.route";
import book from "./book"
import borrow from "./borrow"
import user from "./user_route"
const router = Router();

router.use("/auth", authRoutes);
router.use("/book",book)
router.use("/borrow",borrow)
router.use("/user",user)
export default router;