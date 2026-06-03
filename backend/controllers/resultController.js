import Result from "../models/Result.js";

import Student from "../models/Student.js";

// ======================================
// GRADE SYSTEM
// ======================================

const calculateGrade = (marks) => {
  if (marks >= 90)
    return {
      grade: "A+",
      point: 4.0,
    };

  if (marks >= 80)
    return {
      grade: "A",
      point: 3.6,
    };

  if (marks >= 70)
    return {
      grade: "B+",
      point: 3.2,
    };

  if (marks >= 60)
    return {
      grade: "B",
      point: 2.8,
    };

  if (marks >= 50)
    return {
      grade: "C+",
      point: 2.4,
    };

  if (marks >= 40)
    return {
      grade: "C",
      point: 2.0,
    };

  return {
    grade: "F",
    point: 0,
  };
};

// ======================================
// CREATE RESULT
// ======================================

export const createResult = async (req, res) => {
  try {
    const { student, examType, subjects } = req.body;

    // FIND STUDENT
    const studentData = await Student.findById(student);

    if (!studentData) {
      return res.status(404).json({
        success: false,
        message: "Student Not Found",
      });
    }

    // SUBJECTS ARRAY
    const parsedSubjects = JSON.parse(subjects);

    let totalMarks = 0;

    let totalPoints = 0;

    let fail = false;

    const processedSubjects = parsedSubjects.map((subject) => {
      totalMarks += Number(subject.marks);

      const result = calculateGrade(Number(subject.marks));

      totalPoints += result.point;

      if (Number(subject.marks) < 40) {
        fail = true;
      }

      return {
        subjectName: subject.subjectName,

        marks: subject.marks,

        grade: result.grade,
      };
    });

    const percentage = totalMarks / parsedSubjects.length;

    const gpa = totalPoints / parsedSubjects.length;

    const resultStatus = fail ? "Fail" : "Pass";

    // CREATE RESULT
    const result = await Result.create({
      student: studentData._id,

      fullName: studentData.fullName,

      admissionNumber: studentData.admissionNumber,

      rollNumber: studentData.rollNumber,

      className: studentData.className,

      section: studentData.section,

      examType,

      subjects: processedSubjects,

      totalMarks,

      percentage,

      gpa,

      resultStatus,
    });

    res.status(201).json({
      success: true,
      message: "Result Added Successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// GET ALL RESULTS
// ======================================

export const getAllResults = async (req, res) => {
  try {
    const results = await Result.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: results.length,
      results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// CHECK RESULT
// ======================================

export const checkResult = async (req, res) => {
  try {
    const { fullName, className, dateOfBirth } = req.body;

    // FIND STUDENT
    const student = await Student.findOne({
      fullName: {
        $regex: new RegExp(`^${fullName}$`, "i"),
      },
      className,
      dateOfBirth,
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student Not Found",
      });
    }

    // FIND RESULT
    const result = await Result.findOne({
      student: student._id,
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Result Not Found",
      });
    }

    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ======================================
// DELETE RESULT
export const deleteResult = async (req, res) => {
  try {
    const result = await Result.findById(req.params.id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Result Not Found",
      });
    }

    await result.deleteOne();

    res.status(200).json({
      success: true,
      message: "Result Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
