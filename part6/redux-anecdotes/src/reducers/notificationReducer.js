import { createSlice } from "@reduxjs/toolkit";

const notificationReducer = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
  },
});

export default notificationReducer.reducer;
export const { setNotification } = notificationReducer.actions;

export const triggerNotification = (msg, time) => (dispatch) => {
  dispatch(setNotification(msg));
  setTimeout(() => dispatch(setNotification("")), time * 1000);
};
