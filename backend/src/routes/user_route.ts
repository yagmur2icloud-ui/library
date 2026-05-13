import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { deleteUser, getUser, getUserOne, resetScore, updateUserByAdmin } from "../controllers/user_controller";
import { requireRole } from "../middlewares/role";

const router = Router();

router.get(
  "/",
  authMiddleware,
  requireRole("admin"),
  getUser
);

router.patch(
  "/:id",
  authMiddleware,
  requireRole("admin"),
  updateUserByAdmin
);
router.delete(
  "/:id",
  authMiddleware,
  requireRole("admin"),
  deleteUser
)
router.patch(
  "/reset/:id",
  authMiddleware,
  requireRole("admin"),
  resetScore
);


export default router;