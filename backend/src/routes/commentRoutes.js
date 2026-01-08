import express from "express";
import { addComment,getCommentById,getCommentsByVideo,deleteComment} from "../controllers/commentController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ADD COMMENT
router.post("/", authMiddleware, addComment);
router.get("/single/:id", getCommentById);
router.delete("/:id", authMiddleware, deleteComment);
router.get("/:videoId", getCommentsByVideo);

export default router;
