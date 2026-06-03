import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// LOGIN ADMIN
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // CHECK EMAIL
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin Not Found",
      });
    }

    // CHECK PASSWORD
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // GENERATE TOKEN
    const token = jwt.sign(
      {
        id: admin._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    // RESPONSE
    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      admin: {
        id: admin._id,
        email: admin.email,
      },
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
// CHANGE PASSWORD
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    // VALIDATION
    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Please Fill All Fields",
      });
    }

    // PASSWORD MATCH
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords Do Not Match",
      });
    }

    // FIND ADMIN
    const admin = await Admin.findById(req.admin.id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin Not Found",
      });
    }

    // CHECK OLD PASSWORD
    const isMatch = await bcrypt.compare(oldPassword, admin.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Old Password Incorrect",
      });
    }

    // HASH NEW PASSWORD
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    admin.password = hashedPassword;

    await admin.save();

    res.status(200).json({
      success: true,
      message: "Password Changed Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// CHANGE EMAIL
export const changeEmail = async (req, res) => {
  try {
    const { newEmail, password } = req.body;

    // VALIDATION
    if (!newEmail || !password) {
      return res.status(400).json({
        success: false,
        message: "Please Fill All Fields",
      });
    }

    // FIND ADMIN
    const admin = await Admin.findById(req.admin.id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin Not Found",
      });
    }

    // CHECK PASSWORD
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Password Incorrect",
      });
    }

    // CHECK EMAIL EXISTS
    const emailExists = await Admin.findOne({
      email: newEmail,
    });

    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: "Email Already Exists",
      });
    }

    // UPDATE EMAIL
    admin.email = newEmail;

    await admin.save();

    res.status(200).json({
      success: true,
      message: "Email Updated Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
