import Document from "../models/Document.js";

const createDocument = async (data) => {
  return await Document.create(data);
};

const getAllDocuments = async () => {
  return await Document.find().populate("owner");
};

const getSubjectDocuments = async (id) => {
  return await Document.find({ subject: id });
};

const getTeacherDocuments = async (id) => {
  return await Document.find({ owner: id }).populate("owner");
};

const getDocumentById = async (id) => {
  return await Document.findById(id).populate("owner").populate("subject");
};

const updateDocument = async (id, data) => {
  return await Document.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

const deleteDocument = async (id) => {
  return await Document.findByIdAndDelete(id);
};

export default {
  createDocument,
  getAllDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
  getTeacherDocuments,
  getSubjectDocuments,
};
