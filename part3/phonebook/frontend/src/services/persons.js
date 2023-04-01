import axios from "axios";

const baseURL = "/api/persons";

const getAll = () => axios.get(baseURL).then((res) => res.data);

const createPerson = (person) =>
  axios.post(baseURL, person).then((res) => res.data);

const deletePerson = (id) => axios.delete(`${baseURL}/${id}`);

const updatePerson = (id, person) =>
  axios.put(`${baseURL}/${id}`, person).then((res) => res.data);

export default { getAll, createPerson, deletePerson, updatePerson };
