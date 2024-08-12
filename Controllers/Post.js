import Post from "../Models/Post.js";

// Create a new post
export const createPost = async (req, res) => {
  const { region, lat, long, context } = req.body;
  const user_id = req.user_id;

  try {
    const post = await Post.create({
      region,
      lat,
      long,
      context,
      user: user_id,
      isComment: false,
    });

    if (!post) {
      return res.status(400).json({ message: "Post creation failed" });
    }

    // Populate the user and send the response
    const populatedPost = await Post.findById(post._id).populate(
      "user",
      "username image"
    );
    return res
      .status(201)
      .json({ message: "Post created successfully", post: populatedPost });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Edit an existing post
export const editPost = async (req, res) => {
  const { context } = req.body;
  const user_id = req.user_id;
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId).populate("user", "username image");
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.user._id.toString() !== user_id) {
      return res.status(403).json({ message: "Not Authorized" });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { context },
      { new: true }
    ).populate("user", "username image");

    return res
      .status(200)
      .json({ message: "Post updated successfully", post: updatedPost });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Post a comment
export const postComment = async (req, res) => {
  const { region, lat, long, context } = req.body;
  const user_id = req.user_id;
  const post_id = req.params.id;

  try {
    // Create a new comment
    const comment = await Post.create({
      region,
      lat,
      long,
      context,
      user: user_id,
      isComment: true,
    });

    // Add the comment to the original post's replys
    await Post.findByIdAndUpdate(post_id, {
      $push: { replys: comment._id },
    });

    // Populate the user and the replys
    const updatedPost = await Post.findById(post_id)
      .populate("user", "username image")
      .populate({
        path: "replys",
        populate: {
          path: "user",
          select: "username image",
        },
      });

    if (!comment) {
      return res.status(400).json({ message: "Comment creation failed" });
    }

    return res
      .status(201)
      .json({ message: "Comment created successfully", post: updatedPost });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Posts by Region
export const getRegionPosts = async (req, res) => {
  const { region } = req.params;
  try {
    const regionPosts = await Post.find({ region })
      .populate("user", "username image")
      .populate({
        path: "replys",
        populate: {
          path: "user",
          select: "username image",
        },
      });
    return res.status(200).json({ posts: regionPosts });
  } catch (error) {
    console.log(error.message);
    return res.status(500).message({ message: "Internal Server Error" });
  }
};

// Get User Posts
export const getUserPosts = async (req, res) => {
  const user_id = req.user_id;

  try {
    const userPosts = await Post.find({ user: user_id })
      .populate("user", "username image")
      .populate({
        path: "replys",
        populate: {
          path: "user",
          select: "username image",
        },
      });
    return res.status(200).json({ posts: userPosts });
  } catch (error) {
    console.log(error.message);
    return res.status(500).message({ message: "Internal Server Error" });
  }
};
