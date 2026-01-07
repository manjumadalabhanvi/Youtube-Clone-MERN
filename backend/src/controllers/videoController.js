import Video from "../models/Video.js";

export const uploadVideo = async (req, res) => {
  try {
    const { title, description, videoUrl, thumbnailUrl } = req.body;

    // basic validation
    if (!title || !videoUrl || !thumbnailUrl) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const video = new Video({
      title,
      description,
      videoUrl,
      thumbnailUrl,
      user: req.user.id   // comes from authMiddleware
    });

    await video.save();

    res.status(201).json({
      message: "Video uploaded successfully",
      video
    });
  } catch (error) {
    res.status(500).json({ message: "Video upload failed" });
  }
};

