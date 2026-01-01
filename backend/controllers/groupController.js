import groupService from "../services/groupServices.js";

const createGroup = async (req, res) => {
  try {
    const group = await groupService.createGroup(req.body);
    res.status(201).json(group);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllGroups = async (req, res) => {
  try {
    const groups = await groupService.getAllGroups();
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getGroupById = async (req, res) => {
  try {
    const group = await groupService.getGroupById(req.params.id);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    res.status(200).json(group);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateGroup = async (req, res) => {
  try {
    const group = await groupService.updateGroup(req.params.id, req.body);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    res.status(200).json(group);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteGroup = async (req, res) => {
  try {
    const group = await groupService.deleteGroup(req.params.id);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    res.status(200).json({ message: "Group deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default {
  createGroup,
  getAllGroups,
  getGroupById,
  updateGroup,
  deleteGroup,
};
