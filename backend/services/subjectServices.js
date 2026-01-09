import subject from "../models/Subject.js";
import sessionServices from "./sessionServices.js";
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
  return await subject.findByIdAndUpdate(id, data);
};

const deleteSubject = async (id) => {
  return await subject.findByIdAndDelete(id);
};

const getSubjectsByStudentId = async (id) => {
  let studentsSessions = await sessionServices.getSessionsByStudentId(id);
  console.log(studentsSessions);
  const uniqueSubjectNames = [
    ...new Set(
      studentsSessions.map((item) => item.subject?.subject_name).filter(Boolean)
    ),
  ];
  return uniqueSubjectNames;
};

export default {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
  getSubjectsByStudentId,
};
