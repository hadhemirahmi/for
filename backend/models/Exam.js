import mongoose from "mongoose";
import User from "./User.js";
import Document from "./Document.js";

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

    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
      },
    ],

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
  },
  { timestamps: true }
);

let Examn = mongoose.model("Exam", examSchema);

export default Examn;
