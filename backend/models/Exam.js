import mongoose from "mongoose";
import User from "./User.js";
import Document from "./Document.js";
import Group from "./Group.js";

const examSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
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
    document: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Document,
      required: true,
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Group,
      required: true,
    },
  },
  { timestamps: true }
);

let Examn = mongoose.model("Exam", examSchema);

export default Examn;
