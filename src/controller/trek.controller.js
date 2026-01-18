import Trek from "../models/trek.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";


export const createTrek = async (req, res, next) => {
  try {
    const trek = await Trek.create(req.body);
    res.status(201).json(
      new ApiResponse(201, "Trek created successfully", trek)
    );
  } catch (error) {
    next(error);
  }
};


export const getAllTreks = async (req, res, next) => {
  try {
    const treks = await Trek.find({ status: "Upcoming" }).sort({ date: 1 });
    res.status(200).json(
      new ApiResponse(200, "Treks fetched successfully", treks)
    );
  } catch (error) {
    next(error);
  }
};


export const getSingleTrek = async (req, res, next) => {
  try {
    const trek = await Trek.findById(req.params.id);
    if (!trek) throw new ApiError(404, "Trek not found");

    res.status(200).json(
      new ApiResponse(200, "Trek fetched successfully", trek)
    );
  } catch (error) {
    next(error);
  }
};


export const updateTrek = async (req, res, next) => {
  try {
    const trek = await Trek.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!trek) throw new ApiError(404, "Trek not found");

    res.status(200).json(
      new ApiResponse(200, "Trek updated successfully", trek)
    );
  } catch (error) {
    next(error);
  }
};


export const deleteTrek = async (req, res, next) => {
  try {
    const trek = await Trek.findByIdAndDelete(req.params.id);
    if (!trek) throw new ApiError(404, "Trek not found");

    res.status(200).json(
      new ApiResponse(200, "Trek deleted successfully")
    );
  } catch (error) {
    next(error);
  }
};
