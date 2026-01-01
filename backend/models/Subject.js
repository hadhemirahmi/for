import mongoose from "mongoose";

let subjectSchema = new mongoose.Schema({
  subject_name: {
    type: String,
  },
  description: {
    type: String,
  },
});

let subject = mongoose.model("subject", subjectSchema);

export default subject;
