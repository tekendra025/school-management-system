import mongoose from "mongoose";

const admissionSchema = new mongoose.Schema(
  {
    fullName: {
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

    className: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    previousSchool: {
      type: String,
    },

    message: {
      type: String,
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  },
);

const Admission = mongoose.model("Admission", admissionSchema);

export default Admission;
