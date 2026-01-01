import subjectService from "../services/subjectServices.js";

const createSubject = async (req, res) => {
  try {
    const subject = await subjectService.createSubject(req.body);
    res.status(201).json(subject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllSubjects = async (req, res) => {
  try {
    const subjects = await subjectService.getAllSubjects();
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSubjectById = async (req, res) => {
  try {
    const subject = await subjectService.getSubjectById(req.params.id);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }
    res.status(200).json(subject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateSubject = async (req, res) => {
  try {
    const subject = await subjectService.updateSubject(req.params.id, req.body);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }
    res.status(200).json(subject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteSubject = async (req, res) => {
  try {
    const subject = await subjectService.deleteSubject(req.params.id);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }
    res.status(200).json({ message: "Subject deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
};
