import express from "express";
import {
  addToCart,
  removeFromCart,
  getCart,
} from "../controllers/cartController.js";
import { fetchUser } from "../middleware/userMiddleware.js";

const router = express.Router();

router.post("/addtocart", fetchUser, addToCart);
router.post("/removefromcart", fetchUser, removeFromCart);
router.post("/getcart", fetchUser, getCart);

export default router;
