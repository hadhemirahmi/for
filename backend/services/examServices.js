import Exam from "../models/Exam.js";
import Document from "../models/Document.js";

export const createExamWithDocument = async (examData, file, ownerId) => {
  // Create Document first
  const document = await Document.create({
    title: file.originalname,
    date: new Date(),
    owner: ownerId,
  });

  // Create Exam with document ID
  const exam = await Exam.create({
    ...examData,
    owner: ownerId,
    document: document._id,
  });

  return exam;
};

export const getAllExams = async () => {
  return Exam.find()
    .populate("students")
    .populate("owner")
    .populate("document");
};

export const getExamById = async (id) => {
  return Exam.findById(id)
    .populate("students")
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
