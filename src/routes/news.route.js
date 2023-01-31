import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  create,
  find,
  topNews,
  findById,
  searchByTitle,
  findByUser,
  update,
  erase,
  like,
  addComment,
  deleteComment,
} from "../controllers/news.controller.js";

const router = Router();

router.post("/", authMiddleware, create);
router.get("/", find);
router.get("/top", topNews);
router.get("/search", searchByTitle);
router.get("/byUser", authMiddleware, findByUser);
router.get("/:id", authMiddleware, findById);
router.patch("/:id", authMiddleware, update);
router.delete("/:id", authMiddleware, erase);
router.patch("/like/:id", authMiddleware, like);
router.patch("/comment/:id", authMiddleware, addComment);
router.patch("/comment/:id/:idComment", authMiddleware, deleteComment);

export default router;
