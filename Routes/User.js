import express from "express";
import tokenCheck from "../Middleware/tokenCheck.js";
import { getUser, loginUser, registerUser } from "../Controllers/User.js";

const router = express.Router();

router.get("/", tokenCheck, getUser);
router.post("/login", loginUser);
router.post("/register", registerUser);

export default router;
