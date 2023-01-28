import { Router } from "express";
import { create, find } from "../controllers/news.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, create)
router.get("/", find)

export default router;