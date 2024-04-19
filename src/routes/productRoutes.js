import express from "express";
import asyncHandler from "express-async-handler";
import {
  addProduct,
  removeProduct,
  getAllProducts,
} from "../controllers/productController.js";
import multer from "../middleware/multer.js";

const router = express.Router();

router.post("/upload", multer.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${process.env.PORT}/images/${req.file.filename}`,
  });
});

router.post("/addproduct", asyncHandler(addProduct));
router.post("/removeproduct", asyncHandler(removeProduct));
router.get("/products", asyncHandler(getAllProducts));

export default router;
