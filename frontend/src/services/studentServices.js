import axios from "axios";
import { toast } from "react-toastify";
let BASE_URL = "http://localhost:8000/api/";

const get_student_sessions = async (id) => {
  let result = await axios.get(
    BASE_URL + "sessions/get_sessions_by_student_id/" + id
  );
  return result;
};

const get_student_subjects = async (id) => {
  let result = await axios.get(
    BASE_URL + "subjects/get_subjects_by_student_id/" + id
  );
  return result;
};



export default { get_student_sessions, get_student_subjects };
