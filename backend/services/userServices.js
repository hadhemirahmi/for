import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
/*
data = {
email : password: username ;, course 

*/
async function getAllUsers() {
  try {
    let users = await User.find();
    return users;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

export { getAllUsers };
