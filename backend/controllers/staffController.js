import Staff from "../models/Staff.js";
import fs from "fs";

// ======================================
// CREATE STAFF
export const createStaff = async (req, res) => {
  try {
    const { name, position, education, experience } = req.body;

    // VALIDATION
    if (!name || !position || !education || !experience) {
      return res.status(400).json({
        success: false,
        message: "Please Fill All Required Fields",
      });
    }

    // IMAGE CHECK
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Staff Image Required",
      });
    }

    // CREATE STAFF
    const staff = await Staff.create({
      name,
      position,
      education,
      experience,

      image: req.file.path,
    });

    return res.status(201).json({
      success: true,
      message: "Staff Created Successfully",
      staff,
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
// GET ALL STAFF
export const getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: staff.length,
      staff,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// GET SINGLE STAFF
export const getSingleStaff = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      staff,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// UPDATE STAFF
export const updateStaff = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff Not Found",
      });
    }

    const { name, position, education, experience } = req.body;

    // UPDATE IMAGE
    if (req.file) {
      // DELETE OLD IMAGE
      if (fs.existsSync(staff.image)) {
        fs.unlinkSync(staff.image);
      }

      staff.image = req.file.path;
    }

    // UPDATE DATA
    staff.name = name || staff.name;
    staff.position = position || staff.position;
    staff.education = education || staff.education;
    staff.experience = experience || staff.experience;

    await staff.save();

    return res.status(200).json({
      success: true,
      message: "Staff Updated Successfully",
      staff,
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
// DELETE STAFF
export const deleteStaff = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff Not Found",
      });
    }

    // DELETE IMAGE
    if (fs.existsSync(staff.image)) {
      fs.unlinkSync(staff.image);
    }

    await staff.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Staff Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
