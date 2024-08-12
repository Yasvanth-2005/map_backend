import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  region: { type: String, required: true },
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
  context: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  replys: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    default: [],
  },
  isComment: { type: Boolean, default: false },
});

const Post = mongoose.Model("Post", postSchema);
export default Post;
