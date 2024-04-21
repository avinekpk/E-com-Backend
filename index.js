import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import { config } from "dotenv";
import productRoutes from "./src/routes/productRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import displayitemsRoutes from "./src/routes/displayitemsRoutes.js.js";
import cartRoutes from "./src/routes/cartRoutes.js";
import { loggingMiddleware } from "./src/middleware/loggingMiddleware.js";

export const app = express();
config();

app.use(express.json());
app.use(helmet());
app.use(function (req, res, next) {
  const allowedOrigins = [
    "http://dev-ak-ecom-webapp.s3-website-us-east-1.amazonaws.com",
    "http://d34ihhe9bgn5xp.cloudfront.net",
    "http://dev-ak-ecom-admin.s3-website-us-east-1.amazonaws.com",
  ];

  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE",
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type",
  );

  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

app.options("*", cors());
// app.use(
//   cors({
//     origin: process.env.FRONTEND_ORIGIN,
//     methods: ["GET", "POST"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   }),
// );
app.use(loggingMiddleware);

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
app.use("/", cartRoutes);

app.listen(process.env.PORT, (error) => {
  if (!error) {
    console.log(`Server running on port ${process.env.PORT}`);
  } else {
    console.log("Error:" + error);
  }
});
