import sessionService from "../services/sessionServices.js";

const createSession = async (req, res) => {
  try {
    const session = await sessionService.createSession(req.body);
    res.status(201).json(session);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllSessions = async (req, res) => {
  try {
    const sessions = await sessionService.getAllSessions();
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTeacherSessions = async (req, res) => {
  try {
    const sessions = await sessionService.getTeacherSessions(req.params.id);
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSessionById = async (req, res) => {
  try {
    const session = await sessionService.getSessionById(req.params.id);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    res.status(200).json(session);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateSession = async (req, res) => {
  try {
    const session = await sessionService.updateSession(req.params.id, req.body);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    res.status(200).json(session);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteSession = async (req, res) => {
  try {
    const session = await sessionService.deleteSession(req.params.id);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    res.status(200).json({ message: "Session deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getSessionsByStudentId = async (req, res) => {
  try {
    const session = await sessionService.getSessionsByStudentId(req.params.id);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    res.status(200).json(session);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
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
