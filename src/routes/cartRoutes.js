import express from "express";
import asyncHandler from "express-async-handler";
import {
  addToCart,
  removeFromCart,
  getCart,
} from "../controllers/cartController.js";
import { fetchUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/addtocart", fetchUser, asyncHandler(addToCart));
router.post("/removefromcart", fetchUser, asyncHandler(removeFromCart));
router.post("/getcart", fetchUser, asyncHandler(getCart));

export default router;
