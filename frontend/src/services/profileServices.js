import axios from "axios";
let BASE_URL = "http://localhost:8000/api/auth";
const updateProfile = async (id, data) => {
  let result = await axios.put(BASE_URL + "/update_profile/" + id, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return result.data;
};

export default { updateProfile };
