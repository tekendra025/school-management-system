import express from "express";

import {
  createStaff,
  getAllStaff,
  getSingleStaff,
  updateStaff,
  deleteStaff,
} from "../controllers/staffController.js";

import { isAdmin } from "../middleware/authMiddleware.js";

import uploadStaff from "../middleware/staffUploadMiddleware.js";

const router = express.Router();

// PUBLIC ROUTES
router.get("/", getAllStaff);
router.get("/:id", getSingleStaff);

// ADMIN ROUTES
router.post("/", isAdmin, uploadStaff.single("image"), createStaff);
router.put("/:id", isAdmin, uploadStaff.single("image"), updateStaff);
router.delete("/:id", isAdmin, deleteStaff);

export default router;
