import express from "express";

import {
  createGallery,
  getAllGallery,
  getSingleGallery,
  updateGallery,
  deleteGallery,
  deleteSingleImage,
} from "../controllers/galleryController.js";

import { isAdmin } from "../middleware/authMiddleware.js";
import uploadGallery from "../middleware/galleryUploadMiddleware.js";

const router = express.Router();

// PUBLIC ROUTES
router.get("/", getAllGallery);
router.get("/:id", getSingleGallery);

// ADMIN ROUTES
router.post("/", isAdmin, uploadGallery.array("images", 10), createGallery);
router.put("/:id", isAdmin, uploadGallery.array("images", 10), updateGallery);
router.delete("/:id", isAdmin, deleteGallery);
router.delete("/image/:galleryId", isAdmin, deleteSingleImage);

export default router;
