import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    schoolName: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    mission: {
      type: String,
      required: true,
    },

    vision: {
      type: String,
      required: true,
    },

    principalMessage: {
      type: String,
      required: true,
    },

    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const About = mongoose.model("About", aboutSchema);

export default About;
