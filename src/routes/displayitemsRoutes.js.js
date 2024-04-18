import express from "express";
import { newCollection } from "../controllers/displayitemsController.js";

const router = express.Router();

router.get("/newcollection", newCollection);

export default router;
