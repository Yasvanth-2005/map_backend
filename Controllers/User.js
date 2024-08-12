import jwt from "jsonwebtoken";
import User from "../Models/User.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  const { username, email, password, phoneNumber, image, collegeId } = req.body;

  try {
    // Finding username
    const user1 = await User.findOne({ username });
    if (user1) {
      return res.status(404).json({ message: "Username Already Exists" });
    }

    // Finding Email
    const user2 = await User.findOne({ email });
    if (user2) {
      return res.status(404).json({ message: "Email Already Exists" });
    }

    // Hashing Password
    var hashedPassword = await bcrypt.hash(password, 12);

    var user = await User.create({
      email: email.toLowerCase(),
      phoneNumber,
      collegeId,
      password: hashedPassword,
      username,
      image,
    });

    // Generating jwt token
    const token = await jwt.sign(
      { user_id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    user.password = "";
    hashedPassword = "";
    return res.status(201).json({
      message: "User Registered Successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const loginUser = async (req, res) => {
  var { email, password } = req.body;
  email = email.toLowerCase();

  try {
    // Finding User
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Inavalid Email/Password" });
    }

    // Checking Password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(404).json({ message: "Inavalid Email/Password" });
    }

    // creating jwt token
    const token = await jwt.sign(
      { user_id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    user.password = "";
    password = "";

    return res
      .status(200)
      .json({ message: "Logged in successfully", token, user });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUser = async (req, res) => {
  const user_id = req.user_id;

  try {
    const user = await User.findOne({ user_id });
    if (!user) {
      return res.status(404).json({ message: "No User found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
