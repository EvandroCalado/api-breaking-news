import { Router } from "express";
import {
  create,
  find,
  topNews,
  findById,
  searchByTitle,
  findByUser,
  update,
} from "../controllers/news.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, create);
router.get("/", find);
router.get("/top", topNews);
router.get("/search", searchByTitle);
router.get("/byUser", authMiddleware, findByUser);
router.get("/:id", authMiddleware, findById);
router.patch("/:id", authMiddleware, update)

export default router;
