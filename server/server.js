import express from "express";
import userRoute from "./routes/userRoute.js";
import adminRoute from "./routes/adminRoute.js";
import apiRoute from "./routes/apiRoute.js";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect("mongodb://localhost:27017/MyDB").then(() => {
  console.log("Connected to MongoDB");
});

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(req.method, ":", req.url);
  next();
});

app.use(cors());

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));

app.use("/", userRoute);

app.use("/admin", adminRoute);

app.use("/api", apiRoute);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
