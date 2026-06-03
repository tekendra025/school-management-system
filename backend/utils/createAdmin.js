import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";

const createAdmin = async () => {
  const adminExists = await Admin.findOne({
    email: "admin@gmail.com",
  });

  if (adminExists) {
    console.log("Admin Already Exists");
    return;
  }

  const hashedPassword = await bcrypt.hash("admin123", 10);

  await Admin.create({
    email: "admin@gmail.com",
    password: hashedPassword,
  });

  console.log("Default Admin Created");
};

export default createAdmin;
