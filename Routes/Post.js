import express from "express";
import {
  createPost,
  editPost,
  getRegionPosts,
  getUserPosts,
  postComment,
} from "../Controllers/Post.js";

const router = express.Router();

router.post("/new", createPost);
router.edit("/edit/:id", editPost);
router.post("/comment/:id", postComment);
router.get("/region/:id", getRegionPosts);
router.get("/user/:id", getUserPosts);

export default router;
