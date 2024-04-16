import express from "express";
import mongoose from "mongoose";
// import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import cors from "cors";
import { config } from "dotenv";

const app = express();
config();

app.use(express.json());
app.use(cors());

//Database connection with mongodb atlas
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => console.log("DB connected..."))
  .catch((err) => console.log("DB connection error!!!", err.message));

app.get("/", (req, res) => {
  res.send("Express App is Running!");
});

//Image storage engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});

const upload = multer({ storage: storage });

//Upload endpoint for images
app.use("/images", express.static("upload/images"));

app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `$http://localhost:${process.env.PORT}/images/${req.file.filename}`,
  });
});

app.post('/addproduct')

app.listen(process.env.PORT, (error) => {
  if (!error) {
    console.log(`Server running on port ${process.env.PORT}`);
  } else {
    console.log("Error:" + error);
  }
});
