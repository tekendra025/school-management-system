import Admission from "../models/Admission.js";

// ======================================
// CREATE ADMISSION
export const createAdmission = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      className,
      address,
      previousSchool,
      message,
    } = req.body;

    // Validation
    if (!fullName || !email || !phone || !className || !address) {
      return res.status(400).json({
        success: false,
        message: "Please Fill All Required Fields",
      });
    }

    const admission = await Admission.create({
      fullName,
      email,
      phone,
      className,
      address,
      previousSchool,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Admission Form Submitted Successfully",
      admission,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// GET ALL ADMISSIONS (ADMIN)
export const getAllAdmissions = async (req, res) => {
  try {
    const admissions = await Admission.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: admissions.length,
      admissions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// GET SINGLE ADMISSION
export const getSingleAdmission = async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id);

    if (!admission) {
      return res.status(404).json({
        success: false,
        message: "Admission Not Found",
      });
    }

    res.status(200).json({
      success: true,
      admission,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// UPDATE ADMISSION STATUS
export const updateAdmissionStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const admission = await Admission.findById(req.params.id);

    if (!admission) {
      return res.status(404).json({
        success: false,
        message: "Admission Not Found",
      });
    }

    admission.status = status || admission.status;

    await admission.save();

    res.status(200).json({
      success: true,
      message: "Admission Status Updated",
      admission,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// DELETE ADMISSION
export const deleteAdmission = async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id);

    if (!admission) {
      return res.status(404).json({
        success: false,
        message: "Admission Not Found",
      });
    }

    await admission.deleteOne();

    res.status(200).json({
      success: true,
      message: "Admission Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
