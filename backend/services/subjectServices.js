import subject from "../models/Subject.js";

const createSubject = async (data) => {
  return await subject.create(data);
};

const getAllSubjects = async () => {
  return await subject.find();
};

const getSubjectById = async (id) => {
  return await subject.findById(id);
};

const updateSubject = async (id, data) => {
  return await subject.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

const deleteSubject = async (id) => {
  return await subject.findByIdAndDelete(id);
};

export default {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
};
