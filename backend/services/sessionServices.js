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

const getSessionsByStudentId = async (id) => {
  let result = (
    await Session.find().populate("group").populate("subject")
  ).filter((el) => el.group.students.includes(id));

  return result;
};

const getTeacherSessions = async (id) => {
  let result = await Session.find({ teacher_id: id })
    .populate("group")
    .populate("subject");

  return result;
};

export default {
  createSession,
  getAllSessions,
  getSessionById,
  updateSession,
  deleteSession,
  getSessionsByStudentId,
  getTeacherSessions,
};
