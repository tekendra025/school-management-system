import Gallery from "../models/Gallery.js";
import fs from "fs";

// ======================================
// CREATE GALLERY
export const createGallery = async (req, res) => {
  try {
    const { title } = req.body;

    // VALIDATION
    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Gallery Title Required",
      });
    }

    // CHECK IMAGES
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please Upload Images",
      });
    }

    // IMAGE PATHS
    const images = req.files.map((file) => file.path);

    // CREATE
    const gallery = await Gallery.create({
      title,
      images,
    });

    return res.status(201).json({
      success: true,
      message: "Gallery Created Successfully",
      gallery,
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
// GET ALL GALLERY
export const getAllGallery = async (req, res) => {
  try {
    const galleries = await Gallery.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: galleries.length,
      galleries,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// GET SINGLE GALLERY
export const getSingleGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      gallery,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// UPDATE GALLERY
export const updateGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery Not Found",
      });
    }

    const { title } = req.body;

    // UPDATE TITLE
    gallery.title = title || gallery.title;

    // UPDATE IMAGES
    if (req.files && req.files.length > 0) {
      // DELETE OLD IMAGES
      gallery.images.forEach((image) => {
        if (fs.existsSync(image)) {
          fs.unlinkSync(image);
        }
      });

      // NEW IMAGES
      gallery.images = req.files.map((file) => file.path);
    }

    await gallery.save();

    return res.status(200).json({
      success: true,
      message: "Gallery Updated Successfully",
      gallery,
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
// DELETE GALLERY
export const deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery Not Found",
      });
    }

    // DELETE IMAGES
    gallery.images.forEach((image) => {
      if (fs.existsSync(image)) {
        fs.unlinkSync(image);
      }
    });

    await gallery.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Gallery Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//delete single image
export const deleteSingleImage = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.galleryId);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery Not Found",
      });
    }

    const { image } = req.body;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Image path required",
      });
    }

    // REMOVE IMAGE FROM ARRAY
    gallery.images = gallery.images.filter((img) => img !== image);

    // DELETE FROM FOLDER
    if (fs.existsSync(image)) {
      fs.unlinkSync(image);
    }

    await gallery.save();

    res.status(200).json({
      success: true,
      message: "Image Deleted",
      gallery,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
