import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteReducer = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      return state.map((anecdote) =>
        anecdote.id === action.payload.id ? action.payload : anecdote
      );
    },
    addAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export default anecdoteReducer.reducer;
export const { voteAnecdote, addAnecdote, setAnecdotes } =
  anecdoteReducer.actions;

export const intializeAnecdotes = () => async (dispatch) => {
  const anecdotes = await anecdoteService.getAllAnecdotes();
  dispatch(setAnecdotes(anecdotes));
};

export const addNewAnecdote = (body) => async (dispatch) => {
  const newAnecdote = await anecdoteService.postAnecdote(body);
  dispatch(addAnecdote(newAnecdote));
};

export const voteForAnecdote = (anecdote) => async (dispatch) => {
  await anecdoteService.postAnecdoteVote(anecdote);
  dispatch(voteAnecdote(anecdote));
};
