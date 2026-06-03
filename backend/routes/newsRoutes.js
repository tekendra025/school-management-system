import express from "express";
import {
  createNews,
  getAllNews,
  getSingleNews,
  getLatestNews,
  getNotices,
  updateNews,
  deleteNews,
} from "../controllers/newsController.js";
import { isAdmin } from "../middleware/authMiddleware.js";
import uploadNews from "../middleware/newsUploadMiddleware.js";

const router = express.Router();

// PUBLIC ROUTES
router.get("/", getAllNews);
router.get("/latest", getLatestNews);
router.get("/notices", getNotices);
router.get("/:id", getSingleNews);

// ADMIN ROUTES
router.post("/", isAdmin, uploadNews.single("file"), createNews);
router.put("/:id", isAdmin, uploadNews.single("file"), updateNews);
router.delete("/:id", isAdmin, deleteNews);

export default router;
