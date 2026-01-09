import express from "express";
import subjectController from "../controllers/subjectController.js";

const router = express.Router();

router.post("/create_subject", subjectController.createSubject);
router.get("/get_all_subjects", subjectController.getAllSubjects);
router.get("/get_subject_by_id/:id", subjectController.getSubjectById);
router.put("/update_subject/:id", subjectController.updateSubject);
router.delete("/delete_subject/:id", subjectController.deleteSubject);
router.get(
  "/get_subjects_by_student_id/:id",
  subjectController.getSubjectsByStudentId
);
export default router;
