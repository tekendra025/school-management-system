import express from "express";
import { isAdmin } from "../middleware/authMiddleware.js";
import {
  changeEmail,
  changePassword,
  loginAdmin,
} from "../controllers/adminController.js";

const router = express.Router();

// LOGIN
router.post("/login", loginAdmin);

// CHANGE PASSWORD
router.put("/change-password", isAdmin, changePassword);

// CHANGE EMAIL
router.put("/change-email", isAdmin, changeEmail);

export default router;
