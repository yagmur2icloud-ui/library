import { Router } from "express";
import * as bookController from "../controllers/book_controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/role";
import { upload } from "../config/multer";

const router = Router();

router.get("/", bookController.getAll);
router.get("/:id", bookController.getOne);

router.post(
  "/",
  authMiddleware,
  requireRole("admin"),
  upload.single("image"),
  bookController.create
);

router.put(
  "/:id",
  authMiddleware,
  requireRole("admin"),
  upload.single("image"),

  bookController.update
);

router.delete(
  "/:id",
  authMiddleware,
  requireRole("admin"),
  
  bookController.remove
);

export default router;