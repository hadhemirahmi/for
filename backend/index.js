import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/authRoutes.js";
import usersRouter from "./routes/usersRoutes.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import examRouter from "./routes/examRoutes.js";
import subjectRouter from "./routes/subjectRoutes.js";
import groupRouter from "./routes/groupRoutes.js";
import sessionRouter from "./routes/sessionRoutes.js";
import documentRouter from "./routes/documentRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

let server = express();
server.use(express.json());
server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);
server.use("/api/exams", examRouter);
server.use("/api/subjects", subjectRouter);
server.use("/api/groups", groupRouter);
server.use("/api/sessions", sessionRouter);
server.use("/api/documents", documentRouter);
server.listen(process.env.PORT, () => {
  console.log("serveur en marche !");
});

server.use(express.static(path.join(__dirname, "public")));
server.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("database connected succesfully !");
  })
  .catch((err) => {
    console.log(err);
  });
