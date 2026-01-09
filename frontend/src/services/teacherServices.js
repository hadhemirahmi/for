import axios from "axios";
import { toast } from "react-toastify";
let BASE_URL = "http://localhost:8000/api/";

const add_document = async (data) => {
  try {
    let result = await axios.post(
      BASE_URL + "documents/create_document",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    toast.success("document ajouté avec succes ! ");
    return result.data;
  } catch (err) {
    console.log(err);
  }
};

const get_teacher_documents = async (id) => {
  try {
    let result = await axios.get(
      BASE_URL + "documents/get_teacher_documents/" + id
    );
    return result.data;
  } catch (err) {
    console.log(err);
  }
};

const delete_document = async (id) => {
  try {
    let result = await axios.delete(
      BASE_URL + "documents/delete_document/" + id
    );
    return result.data;
  } catch (err) {
    console.log(err);
  }
};
const get_document_by_id = async (id) => {
  try {
    let result = await axios.get(
      BASE_URL + "documents/get_document_by_id/" + id
    );
    return result;
  } catch (err) {
    console.log(err);
  }
};

const update_document = async (id, data) => {
  try {
    let result = await axios.put(
      BASE_URL + "documents/update_document/" + id,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return result.data;
  } catch (err) {
    console.log(err);
  }
};

const get_groups = async () => {
  try {
    let result = await axios.get(BASE_URL + "groups/get_all_groups/");
    return result;
  } catch (err) {
    console.log(err);
  }
};
const create_exam = async (data) => {
  try {
    let result = await axios.post(BASE_URL + "exams/create_exam/", data);
    return result;
  } catch (err) {
    console.log(err);
  }
};

const get_teacher_exams = async (id) => {
  try {
    let result = await axios.get(BASE_URL + "exams/get_teacher_exams/" + id);
    return result;
  } catch (err) {
    console.log(err);
  }
};

const get_teacher_exam_by_id = async (id) => {
  try {
    let result = await axios.get(BASE_URL + "exams/get_exam_by_id/" + id);
    return result;
  } catch (err) {
    console.log(err);
  }
};

const delete_exam = async (id) => {
  try {
    let result = await axios.delete(BASE_URL + "exams/delete_exam/" + id);
    return result.data;
  } catch (err) {
    console.log(err);
  }
};

const update_exam = async (id, data) => {
  try {
    let result = await axios.put(BASE_URL + "exams/update_exam/" + id, data);
    return result.data;
  } catch (err) {
    console.log(err);
  }
};

export default {
  add_document,
  get_teacher_documents,
  delete_document,
  get_document_by_id,
  update_document,
  get_groups,
  create_exam,
  get_teacher_exams,
  delete_exam,
  get_teacher_exam_by_id,
  update_exam,
};
