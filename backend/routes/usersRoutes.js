import express from "express";
import { allUsers } from "../controllers/usersController.js";
import jwtMiddleware from "../middlewares/jwtMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";
const usersRouter = express.Router();

usersRouter.get(
  "/get_all_users",
  jwtMiddleware,
  roleMiddleware("admin"),
  allUsers
);

export default usersRouter;
