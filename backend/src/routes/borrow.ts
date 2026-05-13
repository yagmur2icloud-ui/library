import { Router } from "express";
import { borrow, getAllOrders, returnBook } from "../controllers/borrow.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/role";



const router = Router();
router.post("/", authMiddleware,requireRole("admin"), borrow);

router.post("/return", authMiddleware,requireRole("admin"), returnBook);
router.get("/",authMiddleware,requireRole("admin"),getAllOrders);

export default router