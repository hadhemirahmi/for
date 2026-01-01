import mongoose from "mongoose";
import Group from "./group.js";
import User from "./User.js";
import subject from "./Subject.js";

let sessionSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    start_time: {
      type: String,
      required: true,
    },
    end_time: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      Enum: ["course", "TP", "TD", "Exam"],
    },
    status: {
      type: String,
      default: "scheduled",
      Enum: ["scheduled", "cancelled", "done", "postponed"],
    },
    group: {
      type: mongoose.Types.ObjectId,
      ref: Group,
    },
    teacher_id: {
      type: mongoose.Types.ObjectId,
      ref: User,
    },
    subject: {
      type: mongoose.Types.ObjectId,
      ref: subject,
    },
  },
  { timestamps: true }
);

const Session = mongoose.model("Session", sessionSchema);
export default Session;
