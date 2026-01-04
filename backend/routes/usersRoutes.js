import express from "express";
import {toggle_status, 
  allUsers,
  delete_user,
  update_user,
  UserById,
} from "../controllers/usersController.js";
import jwtMiddleware from "../middlewares/jwtMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";
const usersRouter = express.Router();

usersRouter.get(
  "/get_all_users",
  // jwtMiddleware,
  // roleMiddleware("admin"),
  allUsers
);

usersRouter.get(
  "/get_user_by_id/:id",
  // jwtMiddleware,
  // roleMiddleware("admin"),
  UserById
);
usersRouter.delete(
  "/delete_user/:id",
  // jwtMiddleware,
  // roleMiddleware("admin"),
  delete_user
);
usersRouter.put(
  "/update_user/:id",
  // jwtMiddleware,
  // roleMiddleware("admin"),
  update_user
);
usersRouter.put(
  "/toggle_user_account_status/:id",
  // jwtMiddleware,
  // roleMiddleware("admin"),
  toggle_status
);

export default usersRouter;
