import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";

import createAdmin from "./utils/createAdmin.js";
import adminRoutes from "./routes/adminRoutes.js";
import admissionRoutes from "./routes/admissionRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import staffRoutes from "./routes/staffRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// Static Folder
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/admissions", admissionRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/results", resultRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("School Website API Running");
});

// DATABASE + SERVER
const startServer = async () => {
  try {
    await connectDB();

    await createAdmin();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server Running On Port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
