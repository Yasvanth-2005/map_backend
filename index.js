import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import userRouter from "./Routes/User.js";
import postRouter from "./Routes/Post.js";

// middleware
const app = express();
app.use(cors());
dotenv.config();
app.use(bodyParser.json({ extended: true, limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// Routes
app.use("/user", userRouter);
app.use("/post", postRouter);

// Db connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => {
      console.log("Database connection established");
      console.log("Server running on port 5000");
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
