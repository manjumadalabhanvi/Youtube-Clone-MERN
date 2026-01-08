import express from "express";
import { addComment } from "../controllers/commentController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ADD COMMENT
router.post("/", authMiddleware, addComment);

export default router;
