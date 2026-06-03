import Settings from "../models/Settings.js";

import fs from "fs";

// ======================================
// CREATE / UPDATE SETTINGS
export const createOrUpdateSettings = async (req, res) => {
  try {
    const {
      schoolName,
      email,
      phone,
      alternatePhone,
      address,
      websiteDescription,
      footerText,
      openingHours,
      facebook,
      instagram,
      youtube,
      linkedin,
      twitter,
      whatsapp,
      facebookPageUrl,
      googleMapLink,
      seoKeywords,
      seoDescription,
    } = req.body;

    // VALIDATION
    if (!schoolName || !email || !phone || !address) {
      return res.status(400).json({
        success: false,
        message: "Required Fields Missing",
      });
    }

    // FIND EXISTING
    let settings = await Settings.findOne();

    let logo = settings?.logo || "";

    // NEW LOGO
    if (req.file) {
      // DELETE OLD LOGO
      if (settings?.logo && fs.existsSync(settings.logo)) {
        fs.unlinkSync(settings.logo);
      }

      logo = req.file.path;
    }

    // UPDATE EXISTING
    if (settings) {
      settings.schoolName = schoolName;
      settings.email = email;
      settings.phone = phone;
      settings.alternatePhone = alternatePhone;
      settings.address = address;
      settings.websiteDescription = websiteDescription;
      settings.footerText = footerText;
      settings.openingHours = openingHours;
      settings.googleMapLink = googleMapLink;
      settings.seoKeywords = seoKeywords;
      settings.seoDescription = seoDescription;
      settings.logo = logo;

      // SOCIAL LINKS
      settings.socialLinks.facebook = facebook;
      settings.socialLinks.instagram = instagram;
      settings.socialLinks.youtube = youtube;
      settings.socialLinks.linkedin = linkedin;
      settings.socialLinks.twitter = twitter;
      settings.socialLinks.facebookPageUrl = facebookPageUrl;
      settings.socialLinks.whatsapp = whatsapp;

      await settings.save();

      return res.status(200).json({
        success: true,
        message: "Settings Updated Successfully",
        settings,
      });
    }

    // CREATE NEW
    settings = await Settings.create({
      schoolName,
      email,
      phone,
      alternatePhone,
      address,
      websiteDescription,
      footerText,
      openingHours,
      logo,
      googleMapLink,
      seoKeywords,
      seoDescription,

      socialLinks: {
        facebook,
        instagram,
        youtube,
        linkedin,
        twitter,
        whatsapp,
        facebookPageUrl,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Settings Created Successfully",
      settings,
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
// GET SETTINGS
export const getSettings = async (req, res) => {
  try {
    const settings = await Settings.findOne();

    return res.status(200).json({
      success: true,
      settings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
