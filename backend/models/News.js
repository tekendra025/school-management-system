import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: ["News", "Notice"],
      required: true,
    },

    file: {
      type: String,
      default: "",
    },

    publishedBy: {
      type: String,
      default: "Admin",
    },
  },
  {
    timestamps: true,
  },
);

const News = mongoose.model("News", newsSchema);

export default News;
