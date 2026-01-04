import express from "express";

import * as examController from "../controllers/examController.js";
import upload from "../middlewares/multerMiddleware.js";

const examRouter = express.Router();

examRouter.post(
  "/create_exam",
  upload.single("file"),
  examController.createExam
);


examRouter.get("/get_all_exams", examController.getAllExams);
examRouter.get("/delete_exam/:id", examController.getExamById);
examRouter.put("/update_exam/:id", examController.updateExam);
examRouter.delete("/delete_exam/:id", examController.deleteExam);

export default examRouter;
