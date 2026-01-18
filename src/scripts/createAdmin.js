import dotenv from "dotenv";
import mongoose from "mongoose";
import Admin from "../models/admin.model.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const adminExists = await Admin.findOne({
      email: "admin@mountainmadness.com",
    });

    if (adminExists) {
      console.log("Admin already exists");
      process.exit();
    }

    await Admin.create({
      name: "Mountain Madness Admin",
      email: "admin@mountainmadness.com",
      password: "admin123",
    });

    console.log("Admin created successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();
