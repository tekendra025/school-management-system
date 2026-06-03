import express from "express";

import {
  createStudent,
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";

import { isAdmin } from "../middleware/authMiddleware.js";
import uploadStudent from "../middleware/studentUploadMiddleware.js";

const router = express.Router();

// PUBLIC
router.get("/", getAllStudents);
router.get("/:id", getSingleStudent);

// ADMIN
router.post("/", isAdmin, uploadStudent.single("image"), createStudent);
router.put("/:id", isAdmin, uploadStudent.single("image"), updateStudent);
router.delete("/:id", isAdmin, deleteStudent);

export default router;
