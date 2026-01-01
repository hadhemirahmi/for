import Document from "../models/Document.js";

const createDocument = async (data) => {
  return await Document.create(data);
};

const getAllDocuments = async () => {
  return await Document.find().populate("owner");
};

const getDocumentById = async (id) => {
  return await Document.findById(id).populate("owner");
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
};
