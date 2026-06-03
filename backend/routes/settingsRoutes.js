import express from "express";

import {
  createOrUpdateSettings,
  getSettings,
} from "../controllers/settingsController.js";
import { isAdmin } from "../middleware/authMiddleware.js";
import uploadSettings from "../middleware/settingsUploadMiddleware.js";

const router = express.Router();

// PUBLIC ROUTE
router.get("/", getSettings);

// ADMIN ROUTE
router.post(
  "/",
  isAdmin,
  uploadSettings.single("logo"),
  createOrUpdateSettings,
);

export default router;
