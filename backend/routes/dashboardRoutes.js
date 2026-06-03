import express from "express";
import { getDashboardStats } from "../controllers/dashboardController.js";
import { isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// ADMIN DASHBOARD STATS
router.get("/stats", isAdmin, getDashboardStats);

export default router;
