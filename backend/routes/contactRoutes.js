import express from "express";

import {
  createContactMessage,
  getAllContactMessages,
  getSingleContactMessage,
  deleteContactMessage,
} from "../controllers/contactController.js";

import { isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// PUBLIC ROUTE
router.post("/", createContactMessage);

// ADMIN ROUTES
router.get("/", isAdmin, getAllContactMessages);
router.get("/:id", isAdmin, getSingleContactMessage);
router.delete("/:id", isAdmin, deleteContactMessage);

export default router;
