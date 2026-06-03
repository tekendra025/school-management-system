import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    designation: {
      type: String,
    },
    subject: {
      type: String,
      required: true,
    },

    education: {
      type: String,
      required: true,
    },

    experience: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    socialLinks: {
      facebook: {
        type: String,
      },

      linkedin: {
        type: String,
      },

      twitter: {
        type: String,
      },

      instagram: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  },
);

const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;
