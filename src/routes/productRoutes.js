import express from "express";
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

router.post("/addproduct", addProduct);
router.post("/removeproduct", removeProduct);
router.get("/products", getAllProducts);

export default router;
