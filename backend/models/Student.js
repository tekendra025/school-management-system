import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    admissionNumber: {
      type: String,
      required: true,
      unique: true,
    },

    rollNumber: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    dateOfBirth: {
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

    address: {
      type: String,
      required: true,
    },

    guardianName: {
      type: String,
      required: true,
    },

    guardianPhone: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Student", studentSchema);
