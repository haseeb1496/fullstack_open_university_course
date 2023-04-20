import axios from "axios";
const baseUrl = "/api/blogs";

let token = "";

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(baseUrl, config);
  return response.data;
};

const postBlog = async (body) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, body, config);
  return response.data;
};

const updateBlog = async (id, body) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${id}`, body, config);
  return response.data;
};

const removeBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default { getAll, setToken, postBlog, updateBlog, removeBlog };
