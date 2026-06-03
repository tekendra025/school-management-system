import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  subjectName: {
    type: String,
    required: true,
  },

  marks: {
    type: Number,
    required: true,
  },

  grade: {
    type: String,
  },
});

const resultSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    fullName: {
      type: String,
      required: true,
    },

    admissionNumber: {
      type: String,
      required: true,
    },

    rollNumber: {
      type: String,
      required: true,
    },

    className: {
      type: String,
      required: true,
    },

    section: {
      type: String,
      required: true,
    },

    examType: {
      type: String,
      required: true,
    },

    subjects: [subjectSchema],

    totalMarks: {
      type: Number,
      default: 0,
    },

    percentage: {
      type: Number,
      default: 0,
    },

    gpa: {
      type: Number,
      default: 0,
    },

    resultStatus: {
      type: String,
      enum: ["Pass", "Fail"],
      default: "Pass",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Result", resultSchema);
