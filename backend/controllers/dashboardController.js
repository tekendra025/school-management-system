import Admission from "../models/Admission.js";
import Teacher from "../models/Teacher.js";
import Staff from "../models/Staff.js";
import News from "../models/News.js";
import Gallery from "../models/Gallery.js";
import Student from "../models/Student.js";
import Contact from "../models/Contact.js";

// ======================================
// GET DASHBOARD STATS
export const getDashboardStats = async (req, res) => {
  try {
    // COUNTS
    const admissions = await Admission.countDocuments();
    const students = await Student.countDocuments();
    const teachers = await Teacher.countDocuments();
    const staff = await Staff.countDocuments();
    const news = await News.countDocuments();
    const gallery = await Gallery.countDocuments();
    const messages = await Contact.countDocuments();

    return res.status(200).json({
      success: true,
      stats: {
        admissions,
        students,
        teachers,
        staff,
        news,
        gallery,
        messages,
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
