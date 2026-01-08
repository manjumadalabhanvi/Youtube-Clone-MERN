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
