import News from "../models/News.js";
import fs from "fs";

// ======================================
// CREATE NEWS / NOTICE
export const createNews = async (req, res) => {
  try {
    const { title, description, category, publishedBy } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({
        success: false,
        message: "Please Fill All Required Fields",
      });
    }

    if (category !== "News" && category !== "Notice") {
      return res.status(400).json({
        success: false,
        message: "Invalid Category",
      });
    }

    let file = "";

    if (req.file) {
      file = req.file.path;
    }

    const news = await News.create({
      title,
      description,
      category,
      file,
      publishedBy,
    });

    return res.status(201).json({
      success: true,
      message: `${category} Created Successfully`,
      news,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// GET ALL NEWS / NOTICES
export const getAllNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: news.length,
      news,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// GET SINGLE NEWS
export const getSingleNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      news,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// GET LATEST NEWS
export const getLatestNews = async (req, res) => {
  try {
    const latestNews = await News.find({
      category: "News",
    })
      .sort({ createdAt: -1 })
      .limit(5);

    return res.status(200).json({
      success: true,
      latestNews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// GET NOTICES
export const getNotices = async (req, res) => {
  try {
    const notices = await News.find({
      category: "Notice",
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      notices,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// UPDATE NEWS
export const updateNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News Not Found",
      });
    }

    const { title, description, category, publishedBy } = req.body;

    // UPDATE FILE
    if (req.file) {
      if (news.file && fs.existsSync(news.file)) {
        fs.unlinkSync(news.file);
      }

      news.file = req.file.path;
    }

    news.title = title || news.title;
    news.description = description || news.description;
    news.category = category || news.category;
    news.publishedBy = publishedBy || news.publishedBy;

    await news.save();

    return res.status(200).json({
      success: true,
      message: "Updated Successfully",
      news,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// DELETE NEWS
export const deleteNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News Not Found",
      });
    }

    if (news.file && fs.existsSync(news.file)) {
      fs.unlinkSync(news.file);
    }

    await news.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
