import Group from "../models/group.js";

const createGroup = async (data) => {
  return await Group.create(data);
};

const getAllGroups = async () => {
  return await Group.find().populate("students");
};

const getGroupById = async (id) => {
  return await Group.findById(id).populate("students");
};

const updateGroup = async (id, data) => {
  return await Group.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

const deleteGroup = async (id) => {
  return await Group.findByIdAndDelete(id);
};

export default {
  createGroup,
  getAllGroups,
  getGroupById,
  updateGroup,
  deleteGroup,
};
