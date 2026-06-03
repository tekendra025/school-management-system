import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    position: {
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
  },
  {
    timestamps: true,
  },
);

const Staff = mongoose.model("Staff", staffSchema);

export default Staff;
