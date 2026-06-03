import Teacher from "../models/Teacher.js";
import fs from "fs";

// ======================================
// CREATE TEACHER
export const createTeacher = async (req, res) => {
  try {
    const {
      name,
      subject,
      designation,
      education,
      experience,
      facebook,
      linkedin,
      twitter,
      instagram,
    } = req.body;

    // VALIDATION
    if (!name || !subject || !education || !experience) {
      return res.status(400).json({
        success: false,
        message: "Please Fill All Required Fields",
      });
    }

    // IMAGE CHECK
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Teacher Image Required",
      });
    }

    // IMAGE PATH
    const image = req.file.path;

    // CREATE
    const teacher = await Teacher.create({
      name,
      subject,
      designation,
      education,
      experience,
      image,

      socialLinks: {
        facebook,
        linkedin,
        twitter,
        instagram,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Teacher Created Successfully",
      teacher,
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
// GET ALL TEACHERS
export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: teachers.length,
      teachers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// GET SINGLE TEACHER
export const getSingleTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      teacher,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// UPDATE TEACHER
export const updateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher Not Found",
      });
    }

    const {
      name,
      subject,
      designation,
      education,
      experience,
      facebook,
      linkedin,
      twitter,
      instagram,
    } = req.body;

    // UPDATE IMAGE
    if (req.file) {
      // DELETE OLD IMAGE
      if (fs.existsSync(teacher.image)) {
        fs.unlinkSync(teacher.image);
      }

      teacher.image = req.file.path;
    }

    // UPDATE DATA
    teacher.name = name || teacher.name;
    teacher.designation = designation || teacher.designation;
    teacher.subject = subject || teacher.subject;
    teacher.education = education || teacher.education;
    teacher.experience = experience || teacher.experience;

    // SOCIAL LINKS
    teacher.socialLinks.facebook = facebook || teacher.socialLinks.facebook;
    teacher.socialLinks.linkedin = linkedin || teacher.socialLinks.linkedin;
    teacher.socialLinks.twitter = twitter || teacher.socialLinks.twitter;
    teacher.socialLinks.instagram = instagram || teacher.socialLinks.instagram;

    await teacher.save();

    return res.status(200).json({
      success: true,
      message: "Teacher Updated Successfully",
      teacher,
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
// DELETE TEACHER
// ======================================

export const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher Not Found",
      });
    }

    // DELETE IMAGE
    if (fs.existsSync(teacher.image)) {
      fs.unlinkSync(teacher.image);
    }

    await teacher.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Teacher Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
