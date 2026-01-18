import express from "express";
import {
  createTrek,
  getAllTreks,
  getSingleTrek,
  updateTrek,
  deleteTrek,
} from "../controller/trek.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public
router.get("/", getAllTreks);
router.get("/:id", getSingleTrek);

// Admin (Protected)
router.post("/", authMiddleware, createTrek);
router.put("/:id", authMiddleware, updateTrek);
router.delete("/:id", authMiddleware, deleteTrek);

export default router;
