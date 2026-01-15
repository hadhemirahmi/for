import axios from "axios";

let BASE_URL = "http://localhost:8000/api/documents";

const getSubjectDocuments = async (id) => {
  let result = await axios.get(BASE_URL + "/get_subject_documents/" + id);
  return result.data;
};

export default { getSubjectDocuments };
