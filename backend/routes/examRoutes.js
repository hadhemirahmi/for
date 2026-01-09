import express from "express";

import * as examController from "../controllers/examController.js";
import upload from "../middlewares/multerMiddleware.js";

const examRouter = express.Router();

examRouter.post(
  "/create_exam",

  examController.createExam
);

examRouter.get("/get_all_exams", examController.getAllExams);
examRouter.get("/delete_exam/:id", examController.getExamById);
examRouter.put("/update_exam/:id", examController.updateExam);
examRouter.delete("/delete_exam/:id", examController.deleteExam);
examRouter.get("/get_teacher_exams/:id", examController.getTeacherExams);
examRouter.get("/get_exam_by_id/:id", examController.getExamById);
export default examRouter;
