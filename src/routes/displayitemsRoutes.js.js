import express from "express";
import asyncHandler from "express-async-handler";
import {
  newCollection,
  popularInWomen,
} from "../controllers/displayitemsController.js";

const router = express.Router();

router.get("/newcollection", asyncHandler(newCollection));
router.get("/popularinwomen", asyncHandler(popularInWomen));

export default router;
