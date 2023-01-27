import { Router } from "express";
import { validId, validUser } from "../middlewares/global.middlewares.js";
import { create, find, findById, update } from "../controllers/user.controller.js";

const router = Router();

router.post("/", create);
router.get("/", find);
router.get("/:id", validId, validUser, findById);
router.patch("/:id", validId, validUser, update);

export default router;
