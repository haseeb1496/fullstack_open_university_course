import axios from "axios";

const baseUrl = "/api/users";

const token = `Bearer ${window.localStorage.getItem("token")}`;

const getAllUsers = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const res = await axios.get(baseUrl, config);
  return res.data;
};

export default { getAllUsers };
