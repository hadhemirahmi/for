import express from "express";
import sessionController from "../controllers/sessionController.js";

const router = express.Router();

router.post("/create_session", sessionController.createSession);
router.get("/get_all_sessions", sessionController.getAllSessions);
router.get(
  "/get_sessions_by_student_id/:id",
  sessionController.getSessionsByStudentId
);
router.get("/get_session_by_id/:id", sessionController.getSessionById);
router.put("/update_session/:id", sessionController.updateSession);
router.delete("/delete_session/:id", sessionController.deleteSession);
router.get("/get_teacher_sessions/:id", sessionController.getTeacherSessions);
export default router;
