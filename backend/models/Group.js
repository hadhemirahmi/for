import mongoose from "mongoose";
import User from "./User.js";

let groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  students: [{ type: mongoose.Types.ObjectId, ref: User, required: true }],
});

const Group = mongoose.model("Group", groupSchema);
export default Group;
