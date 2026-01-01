import express from "express";

import * as examController from "../controllers/examController.js";
import upload from "../middlewares/multerMiddleware.js";

const examRouter = express.Router();

examRouter.post("/", upload.single("file"), examController.createExam);

examRouter.get("/", examController.getAllExams);
examRouter.get("/:id", examController.getExamById);
examRouter.put("/:id", examController.updateExam);
examRouter.delete("/:id", examController.deleteExam);

export default examRouter;
