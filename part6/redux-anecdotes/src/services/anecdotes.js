import axios from "axios";

const BASE_URL = "http://localhost:3001/anecdotes";

const getAllAnecdotes = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

const postAnecdote = async (body) => {
  const res = await axios.post(BASE_URL, body);
  return res.data;
};

const postAnecdoteVote = async (anecdote) => {
  const res = await axios.put(`${BASE_URL}/${anecdote.id}`, anecdote);
  return res.data;
};

export default { getAllAnecdotes, postAnecdote, postAnecdoteVote };
