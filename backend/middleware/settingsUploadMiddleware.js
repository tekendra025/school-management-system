import multer from "multer";
import path from "path";

// STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/settings");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// FILE FILTER
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only Images Allowed"), false);
  }
};

// UPLOAD
const uploadSettings = multer({
  storage,
  fileFilter,
});

export default uploadSettings;
