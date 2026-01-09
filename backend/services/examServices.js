import Exam from "../models/Exam.js";
import Document from "../models/Document.js";

export const createExam = async (data) => {
  // Create Document first

  // Create Exam with document ID
  const exam = await Exam.create(data);

  return exam;
};

export const getAllExams = async () => {
  return Exam.find()
    .populate("students")
    .populate("owner")
    .populate("document");
};

export const getTeacherExams = async (id) => {
  return Exam.find({ owner: id })
    .populate("group")
    .populate("owner")
    .populate("document");
};

export const getExamById = async (id) => {
  return Exam.findById(id)
    .populate("group")
    .populate("owner")
    .populate("document");
};

export const updateExam = async (id, data) => {
  return Exam.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteExam = async (id) => {
  return Exam.findByIdAndDelete(id);
};
