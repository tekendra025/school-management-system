import express from "express";

import {
  createResult,
  getAllResults,
  checkResult,
  deleteResult,
} from "../controllers/resultController.js";

import { isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// PUBLIC
router.post("/check", checkResult);

// ADMIN
router.post("/", isAdmin, createResult);
router.get("/", isAdmin, getAllResults);
router.delete("/:id", isAdmin, deleteResult);

export default router;
