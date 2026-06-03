import Student from "../models/Student.js";

import fs from "fs";

// ======================================
// CREATE STUDENT
export const createStudent = async (req, res) => {
  try {
    const {
      fullName,
      admissionNumber,
      rollNumber,
      email,
      phone,
      gender,
      dateOfBirth,
      className,
      section,
      address,
      guardianName,
      guardianPhone,
    } = req.body;

    // VALIDATION
    if (
      !fullName ||
      !admissionNumber ||
      !rollNumber ||
      !email ||
      !phone ||
      !gender ||
      !dateOfBirth ||
      !className ||
      !section ||
      !address ||
      !guardianName ||
      !guardianPhone
    ) {
      return res.status(400).json({
        success: false,
        message: "Please Fill All Required Fields",
      });
    }

    // CHECK EXISTING
    const existingStudent = await Student.findOne({
      admissionNumber,
    });

    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Admission Number Already Exists",
      });
    }

    // IMAGE
    let image = "";

    if (req.file) {
      image = req.file.path;
    }

    // CREATE
    const student = await Student.create({
      fullName,
      admissionNumber,
      rollNumber,
      email,
      phone,
      gender,
      dateOfBirth,
      className,
      section,
      address,
      guardianName,
      guardianPhone,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Student Added Successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// GET ALL STUDENTS
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: students.length,
      students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// GET SINGLE STUDENT
export const getSingleStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student Not Found",
      });
    }

    res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// UPDATE STUDENT
export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student Not Found",
      });
    }

    // DELETE OLD IMAGE
    if (req.file && student.image && fs.existsSync(student.image)) {
      fs.unlinkSync(student.image);
    }

    student.fullName = req.body.fullName || student.fullName;
    student.admissionNumber =
      req.body.admissionNumber || student.admissionNumber;
    student.rollNumber = req.body.rollNumber || student.rollNumber;
    student.email = req.body.email || student.email;
    student.phone = req.body.phone || student.phone;
    student.gender = req.body.gender || student.gender;
    student.dateOfBirth = req.body.dateOfBirth || student.dateOfBirth;
    student.className = req.body.className || student.className;
    student.section = req.body.section || student.section;
    student.address = req.body.address || student.address;
    student.guardianName = req.body.guardianName || student.guardianName;
    student.guardianPhone = req.body.guardianPhone || student.guardianPhone;
    student.status = req.body.status || student.status;

    // NEW IMAGE
    if (req.file) {
      student.image = req.file.path;
    }

    await student.save();

    res.status(200).json({
      success: true,
      message: "Student Updated Successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// DELETE STUDENT
export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student Not Found",
      });
    }

    // DELETE IMAGE
    if (student.image && fs.existsSync(student.image)) {
      fs.unlinkSync(student.image);
    }

    await student.deleteOne();

    res.status(200).json({
      success: true,
      message: "Student Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
