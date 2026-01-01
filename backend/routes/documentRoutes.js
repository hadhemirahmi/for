import express from "express";
import documentController from "../controllers/documentController.js";
import upload from "../middlewares/multerMiddleware.js";

const router = express.Router();

router.post(
  "/create_document",
  upload.single("file"),
  documentController.createDocument
);

router.get("/get_all_documents", documentController.getAllDocuments);
router.get("/get_document_by_id/:id", documentController.getDocumentById);

router.put(
  "/update_document/:id",
  upload.single("file"),
  documentController.updateDocument
);

router.delete("/delete_document/:id", documentController.deleteDocument);

export default router;
