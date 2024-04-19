import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import { config } from "dotenv";
import productRoutes from "./src/routes/productRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import displayitemsRoutes from "./src/routes/displayitemsRoutes.js.js";
import cartRoutes from "./src/routes/cartRoutes.js";

const app = express();
config();

app.use(express.json());
app.use(cors());
app.use(helmet());

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
