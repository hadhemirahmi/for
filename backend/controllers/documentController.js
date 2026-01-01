import documentService from "../services/documentServices.js";

const createDocument = async (req, res) => {
  try {
    const data = {
      ...req.body,
      file_path: req.file ? req.file.path : null,
    };

    const document = await documentService.createDocument(data);
    res.status(201).json(document);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllDocuments = async (req, res) => {
  try {
    const documents = await documentService.getAllDocuments();
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDocumentById = async (req, res) => {
  try {
    const document = await documentService.getDocumentById(req.params.id);
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }
    res.status(200).json(document);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateDocument = async (req, res) => {
  try {
    const data = {
      ...req.body,
    };

    if (req.file) {
      data.file_path = req.file.path;
    }

    const document = await documentService.updateDocument(req.params.id, data);

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.status(200).json(document);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteDocument = async (req, res) => {
  try {
    const document = await documentService.deleteDocument(req.params.id);
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }
    res.status(200).json({ message: "Document deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default {
  createDocument,
  getAllDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
};
