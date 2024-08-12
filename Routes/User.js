import express from "express";
import tokenCheck from "../Middleware/tokenCheck.js";
import {
  editUser,
  getUser,
  loginUser,
  registerUser,
} from "../Controllers/User.js";

const router = express.Router();

router.get("/", tokenCheck, getUser);
router.post("/login", loginUser);
router.post("/register", registerUser);
router.patch("/edit", tokenCheck, editUser);

export default router;
