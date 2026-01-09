import * as examService from "../services/examServices.js";

export const createExam = async (req, res) => {
  try {
    const exam = await examService.createExam(req.body);

    res.status(201).json(exam);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllExams = async (req, res) => {
  try {
    const exams = await examService.getAllExams();
    res.json(exams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getExamById = async (req, res) => {
  try {
    const exam = await examService.getExamById(req.params.id);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }
    res.json(exam);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateExam = async (req, res) => {
  try {
    const exam = await examService.updateExam(req.params.id, req.body);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }
    res.json(exam);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteExam = async (req, res) => {
  try {
    const exam = await examService.deleteExam(req.params.id);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }
    res.json({ message: "Exam deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getTeacherExams = async (req, res) => {
  try {
    const exams = await examService.getTeacherExams(req.params.id);
    if (!exams) {
      return res.status(404).json({ message: "Exam not found" });
    }
    res.json({ data: exams });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


