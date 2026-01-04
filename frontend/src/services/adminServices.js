import axios from "axios";
import { toast } from "react-toastify";
let BASE_URL = "http://localhost:8000/api/";

const get_users = async () => {
  let result = await axios.get(BASE_URL + "users/get_all_users");
  return result;
};

const create_group = async (data) => {
  let result = await axios.post(BASE_URL + "groups/create_group", data);
  return result;
};

const get_all_groups = async () => {
  let result = await axios.get(BASE_URL + "groups/get_all_groups");
  return result;
};

const delete_group = async (id) => {
  let result = await axios.delete(BASE_URL + "groups/delete_group/" + id);
  toast.error("groupe supprimé!");
  return result;
};

const get_group_by_id = async (id) => {
  let result = await axios.get(BASE_URL + "groups/get_group_by_id/" + id);
  return result;
};

const update_group = async (id, data) => {
  let result = await axios.put(BASE_URL + "groups/update_group/" + id, data);
  return result;
};

//--------------------------------------------users-----------------------------

const toggle_user_account_status = async (id, newStatus) => {
  console.log("service status:", newStatus, id);
  let result = await axios.put(
    BASE_URL + "users/toggle_user_account_status/" + id,
    newStatus
  );
  return result;
};

const delete_user = async (id) => {
  let result = await axios.delete(BASE_URL + "users/delete_user/" + id);
  return result;
};

const update_user = async (id, data) => {
  let result = await axios.put(BASE_URL + "users/update_user/" + id, data);
  return result;
};

const get_user_by_id = async (id) => {
  let result = await axios.get(BASE_URL + "users/get_user_by_id/" + id);
  return result;
};
//-------------------------------------------------------------------------document management
const create_document = async (data) => {
  let result = await axios.post(
    BASE_URL + "documents/create_document",
    data,
  );
  return result;
};

const get_all_documents = async () => {
  let result = await axios.get(BASE_URL + "documents/get_all_documents");
  return result;
};
const delete_document = async (id) => {
  let result = await axios.delete(BASE_URL + "documents/delete_document/" + id);
  toast.error("Document supprimé!");
  return result;
};

const get_document_by_id = async (id) => {
  let result = await axios.get(BASE_URL + "documents/get_document_by_id/" + id);
  return result;
};
const update_document = async (id, data) => {
  let result = await axios.put(BASE_URL + "documents/update_document/" + id, data);
  return result;
};
//------------------------exam management--------------------------------------------

const create_exam = async (data) => {
  let result = await axios.post(
    BASE_URL + "exams/create_exam",
    data,
  );
  return result;
};
const get_all_exams = async () => {
  let result = await axios.get(BASE_URL + "exams/get_all_exams");
  return result;
};
const delete_exam = async (id) => {
  let result = await axios.delete(BASE_URL + "exams/delete_exam/" + id);
  toast.error("Examen supprimé!");
  return result;
};
const get_exam_by_id = async (id) => {
  let result = await axios.get(BASE_URL + "exams/get_exam_by_id/" + id);
  return result;
};
const update_exam = async (id, data) => {
  let result = await axios.put(BASE_URL + "exams/update_exam/" + id, data);
  return result;
};

//------------------------Session management--------------------------------------------
const create_session = async (data) => {
  let result = await axios.post(
    BASE_URL + "sessions/create_session",
    data,
  );
  return result;
};
const get_all_sessions = async () => {
  let result = await axios.get(BASE_URL + "sessions/get_all_sessions");
  return result;
};
const delete_session = async (id) => {
  let result = await axios.delete(BASE_URL + "sessions/delete_session/" + id);
  toast.error("Session supprimée!");
  return result;
};
const get_session_by_id = async (id) => {
  let result = await axios.get(BASE_URL + "sessions/get_session_by_id/" + id);
  return result;
};
const update_session = async (id, data) => {
  let result = await axios.put(BASE_URL + "sessions/update_session/" + id, data);
  return result;
};

export default {
  get_users,
  create_group,
  get_all_groups,
  delete_group,
  get_group_by_id,
  update_group,
  toggle_user_account_status,
  delete_user,
  update_user,
  get_user_by_id,
  create_document,
  get_all_documents,
  delete_document,
  get_document_by_id,
  update_document,
  create_exam,
  get_all_exams,
  delete_exam,
  get_exam_by_id,
  update_exam,
  create_session,
  get_all_sessions,
  delete_session,
  get_session_by_id,
  update_session,
  
};
