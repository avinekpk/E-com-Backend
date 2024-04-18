import express from "express";
import mongoose from "mongoose";
// import jwt from "jsonwebtoken";
// import path from "path";
import cors from "cors";
import { config } from "dotenv";
import productRoutes from "./src/routes/productRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import displayitemsRoutes from "./src/routes/displayitemsRoutes.js.js";

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

app.use("/images", express.static("upload/images"));
app.use("/", productRoutes);
app.use("/", authRoutes);
app.use("/", displayitemsRoutes);

app.listen(process.env.PORT, (error) => {
  if (!error) {
    console.log(`Server running on port ${process.env.PORT}`);
  } else {
    console.log("Error:" + error);
  }
});
