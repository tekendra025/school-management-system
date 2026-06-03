import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    schoolName: {
      type: String,
      required: true,
    },

    logo: {
      type: String,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    alternatePhone: {
      type: String,
    },

    address: {
      type: String,
      required: true,
    },

    websiteDescription: {
      type: String,
    },

    footerText: {
      type: String,
    },

    openingHours: {
      type: String,
    },

    socialLinks: {
      facebook: {
        type: String,
      },

      instagram: {
        type: String,
      },

      youtube: {
        type: String,
      },

      linkedin: {
        type: String,
      },

      twitter: {
        type: String,
      },

      whatsapp: {
        type: String,
      },
      facebookPageUrl: {
        type: String,
        default: "",
      },
    },

    googleMapLink: {
      type: String,
    },

    seoKeywords: {
      type: String,
    },

    seoDescription: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Settings = mongoose.model("Settings", settingsSchema);

export default Settings;
