import { createSlice } from "@reduxjs/toolkit";

const errorReducer = createSlice({
  name: "error",
  initialState: "",
  reducers: {
    setError(state, action) {
      return action.payload;
    },
  },
});

export default errorReducer.reducer;
export const { setError } = errorReducer.actions;
