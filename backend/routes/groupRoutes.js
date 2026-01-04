import express from "express";
import groupController from "../controllers/groupController.js";

const router = express.Router();

router.post("/create_group", groupController.createGroup);
router.get("/get_all_groups", groupController.getAllGroups);
router.get("/get_group_by_id/:id", groupController.getGroupById);
router.put("/update_group/:id", groupController.updateGroup);
router.delete("/delete_group/:id", groupController.deleteGroup);

export default router;
