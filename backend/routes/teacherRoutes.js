import express from "express";

import {
  createTeacher,
  getAllTeachers,
  getSingleTeacher,
  updateTeacher,
  deleteTeacher,
} from "../controllers/teacherController.js";

import { isAdmin } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// PUBLIC ROUTES
router.get("/", getAllTeachers);
router.get("/:id", getSingleTeacher);

// ADMIN ROUTES
router.post("/", isAdmin, upload.single("image"), createTeacher);
router.put("/:id", isAdmin, upload.single("image"), updateTeacher);
router.delete("/:id", isAdmin, deleteTeacher);

export default router;
