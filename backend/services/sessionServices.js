import Session from "../models/session.js";

const createSession = async (data) => {
  return await Session.create(data);
};

const getAllSessions = async () => {
  return await Session.find()
    .populate("group")
    .populate("teacher_id")
    .populate("subject");
};

const getSessionById = async (id) => {
  return await Session.findById(id)
    .populate("group")
    .populate("teacher_id")
    .populate("subject");
};

const updateSession = async (id, data) => {
  return await Session.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

const deleteSession = async (id) => {
  return await Session.findByIdAndDelete(id);
};

export default {
  createSession,
  getAllSessions,
  getSessionById,
  updateSession,
  deleteSession,
};
