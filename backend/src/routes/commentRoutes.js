import express from "express";
import { addComment,getCommentById,getCommentsByVideo} from "../controllers/commentController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ADD COMMENT
router.post("/", authMiddleware, addComment);
router.get("/single/:id", getCommentById);
router.get("/:videoId", getCommentsByVideo);

export default router;
