import express from "express";
import sessionController from "../controllers/sessionController.js";

const router = express.Router();

router.post("/", sessionController.createSession);
router.get("/", sessionController.getAllSessions);
router.get("/:id", sessionController.getSessionById);
router.put("/:id", sessionController.updateSession);
router.delete("/:id", sessionController.deleteSession);

export default router;
