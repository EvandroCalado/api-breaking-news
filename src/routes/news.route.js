import { Router } from "express";
import { create, find } from "../controllers/news.controller.js";

const router = Router();

router.post("/", create)
router.get("/", find)

export default router;