import mongoose from "mongoose";
import User from "./User.js";
import Subject from "./Subject.js";

const documentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Subject,
    },
    date: {
      type: Date,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    type: {
      type: String,
      default: "course",
      Enum: ["course", "TP", "TD", "Exam"],
    },
    file_path: {
      type: String,
    },
  },
  { timestamps: true }
);

const Document = mongoose.model("Document", documentSchema);
export default Document;
