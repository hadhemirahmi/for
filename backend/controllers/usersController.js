import { getAllUsers } from "../services/userServices.js";
const allUsers = async (req, res) => {
  try {
    let users = await getAllUsers();
    res.status(201).json({ data: users });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

export { allUsers };
