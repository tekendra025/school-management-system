import multer from "multer";
import path from "path";

// STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/news");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "-"));
  },
});

// FILE FILTER
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    // Images
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",

    // PDF
    "application/pdf",

    // Word
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

    // Excel
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

    // PowerPoint
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only Images, PDF, Word, Excel and PowerPoint files are allowed.",
      ),
      false,
    );
  }
};

// UPLOAD
const uploadNews = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20 MB
  },
});

export default uploadNews;
