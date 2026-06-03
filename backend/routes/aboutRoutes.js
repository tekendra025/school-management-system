import express from "express";
import {
  createOrUpdateAbout,
  getAbout,
} from "../controllers/aboutController.js";
import { isAdmin } from "../middleware/authMiddleware.js";
import uploadAbout from "../middleware/aboutUploadMiddleware.js";

const router = express.Router();

// PUBLIC ROUTE
router.get("/", getAbout);

// ADMIN ROUTE
router.post("/", isAdmin, uploadAbout.single("image"), createOrUpdateAbout);

export default router;
