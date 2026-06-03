import express from "express";

import {
  createAdmission,
  getAllAdmissions,
  getSingleAdmission,
  updateAdmissionStatus,
  deleteAdmission,
} from "../controllers/admissionController.js";

import { isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// PUBLIC ROUTE
router.post("/", createAdmission);

// ADMIN ROUTES
router.get("/", isAdmin, getAllAdmissions);
router.get("/:id", isAdmin, getSingleAdmission);
router.put("/:id", isAdmin, updateAdmissionStatus);
router.delete("/:id", isAdmin, deleteAdmission);

export default router;
