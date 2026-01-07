import express from "express";
import { uploadVideo,getAllVideos,getVideoById } from "../controllers/videoController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// upload video (protected)
router.post("/upload", authMiddleware, uploadVideo);
router.get("/", getAllVideos);
router.get("/:id", getVideoById);


export default router;
