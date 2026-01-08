import Comment from "../models/comment.js";

// ADD COMMENT
export const addComment = async (req, res) => {
  try {
    const newComment = new Comment({
      text: req.body.text,
      videoId: req.body.videoId,
      userId: req.user.id,
    });

    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ message: "Failed to add comment" });
  }
};


export const getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id)
      .populate("userId", "username img");

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comment" });
  }
};

export const getCommentsByVideo = async (req, res) => {
  try {
    const comments = await Comment.find({
      videoId: req.params.videoId,
    })
      .populate("userId", "username img")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: "Failed to get comments" });
  }
};


export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
   

    // ✅ FIX HERE
    if (comment.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can delete only your comment" });
    }

    await comment.deleteOne();
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error); // 👈 add this for debugging
    res.status(500).json({ message: "Failed to delete comment" });
  }
};

