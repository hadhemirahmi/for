import express from "express";
import { login, register } from "../controllers/authController.js";
import upload from "../middlewares/multerMiddleware.js";
const authRouter = express.Router();

authRouter.post("/register", upload.single("image"), register);
authRouter.post("/login", login);

export default authRouter;
