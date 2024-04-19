import express from "express";
import asyncHandler from "express-async-handler";
import { signUp, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", asyncHandler(signUp));
router.post("/login", asyncHandler(login));

export default router;
