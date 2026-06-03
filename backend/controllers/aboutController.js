import About from "../models/About.js";
import fs from "fs";

// CREATE / UPDATE ABOUT US
export const createOrUpdateAbout = async (req, res) => {
  try {
    const { schoolName, description, mission, vision, principalMessage } =
      req.body;

    // VALIDATION
    if (
      !schoolName ||
      !description ||
      !mission ||
      !vision ||
      !principalMessage
    ) {
      return res.status(400).json({
        success: false,
        message: "Please Fill All Required Fields",
      });
    }

    // CHECK EXISTING ABOUT
    let about = await About.findOne();

    // IMAGE PATH
    let image = about?.image || "";

    // NEW IMAGE
    if (req.file) {
      // DELETE OLD IMAGE
      if (about?.image && fs.existsSync(about.image)) {
        fs.unlinkSync(about.image);
      }

      image = req.file.path;
    }

    // IF EXISTS → UPDATE
    if (about) {
      about.schoolName = schoolName;
      about.description = description;
      about.mission = mission;
      about.vision = vision;
      about.principalMessage = principalMessage;
      about.image = image;

      await about.save();

      return res.status(200).json({
        success: true,
        message: "About Us Updated Successfully",
        about,
      });
    }

    // CREATE NEW
    about = await About.create({
      schoolName,
      description,
      mission,
      vision,
      principalMessage,
      image,
    });

    return res.status(201).json({
      success: true,
      message: "About Us Created Successfully",
      about,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// GET ABOUT US

export const getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    return res.status(200).json({
      success: true,
      about,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
