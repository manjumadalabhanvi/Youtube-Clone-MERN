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

export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find()
      .populate("user", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch videos",
    });
  }
};

export const getVideoById = async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate("user", "username email");

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch video",
    });
  }
};




