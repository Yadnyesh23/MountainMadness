import jwt from "jsonwebtoken";
import Admin from "../models/admin.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError(400, "Email and password are required");
    }

    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin) {
      throw new ApiError(401, "Invalid credentials");
    }

    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
      throw new ApiError(401, "Invalid credentials");
    }

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json(
      new ApiResponse(200, "Admin login successful", {
        token,
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email
        }
      })
    );
  } catch (error) {
    next(error);
  }
};
