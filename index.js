import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import cors from "cors";
import { config } from "dotenv";

const app = express();
config();

app.use(express.json());
app.use(cors());

//Database connection with mongodb atlas
mongoose.connect(process.env.MONGO_CONNECTION_STRING);

app.get("/", (req, res) => {
  res.send("Express App is Running!");
});

app.listen(process.env.PORT, (error) => {
  if (!error) {
    console.log(`Server running on port ${process.env.PORT}`);
  } else {
    console.log("Error:" + error);
  }
});
