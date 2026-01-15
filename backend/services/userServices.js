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
async function getUserById(id) {
  try {
    let user = await User.findById(id);
    return user;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}
async function toggleUserAccountStatus(id, newStatus) {
  try {
    let user = await User.findByIdAndUpdate(id, { account_status: newStatus });
    return user;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}
async function deleteUser(id) {
  try {
    let user = await User.findByIdAndDelete(id);
    return user;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

async function updateUser(id, data) {
  try {
    let user = await User.findByIdAndUpdate(id, data);
    return user;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}




export {
  getAllUsers,
  getUserById,
  toggleUserAccountStatus,
  deleteUser,
  updateUser,
};
