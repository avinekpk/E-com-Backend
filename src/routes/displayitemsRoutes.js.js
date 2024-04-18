import express from "express";
import {
  newCollection,
  popularInWomen,
} from "../controllers/displayitemsController.js";

const router = express.Router();

router.get("/newcollection", newCollection);
router.get("/popularinwomen", popularInWomen);

export default router;
