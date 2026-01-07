import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import mongoose from 'mongoose';
import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import videoRoutes from "./routes/videoRoutes.js";
dotenv.config();
const app=express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });


  // routes
app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);

// test route
app.get("/",(req,res)=>{
    res.send("Youtube Clone Backend Server Running")
})

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed",
    userId: req.user.id,
  });
});



export default app;

