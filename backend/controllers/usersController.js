import {
  deleteUser,
  getAllUsers,
  getUserById,
  toggleUserAccountStatus,
  updateUser,
} from "../services/userServices.js";
const allUsers = async (req, res) => {
  try {
    let users = await getAllUsers();
    res.status(201).json({ data: users });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

const UserById = async (req, res) => {
  try {
    let users = await getUserById(req.params.id);
    res.status(201).json({ data: users });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

const delete_user = async (req, res) => {
  try {
    let users = await deleteUser(req.params.id);
    res.status(201).json({ data: users });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

const update_user = async (req, res) => {
  try {
    let users = await updateUser(req.params.id, req.body);
    res.status(201).json({ data: users });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

const toggle_status = async (req, res) => {
  try {
    let users = await toggleUserAccountStatus(
      req.params.id,
      req.body.newStatus
    );
    console.log(req.body, req.params.id);
    res.status(201).json({ data: users });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

export { allUsers, update_user, delete_user, toggle_status, UserById };
