import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: String,
    image: String,
    collegeId: { type: String, length: 7 },
    visiblity: { type: Boolean, default: true },
    privacy: { type: Boolean, default: true },
    chatRequest: { type: Boolean, default: true },
    location: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
