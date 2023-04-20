import axios from "axios";

const baseUrl = "/api/login";

const userLogin = async (body) => {
  const response = await axios.post(baseUrl, body);
  return response.data;
};

export default { userLogin };
