import { Router } from "express";
import { create, find, topNews, findById } from "../controllers/news.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, create);
router.get("/", find);
router.get("/top", topNews);
router.get("/:id", findById)

export default router;
