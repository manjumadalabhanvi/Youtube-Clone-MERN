import express from "express";
import { uploadVideo } from "../controllers/videoController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// upload video (protected)
router.post("/upload", authMiddleware, uploadVideo);

export default router;
