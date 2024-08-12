import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  region: { type: String, required: true },
  lat: { type: String, required: true },
  long: { type: String, required: true },
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

const Post = mongoose.model("Post", postSchema);
export default Post;
