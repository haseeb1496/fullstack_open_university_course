import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";
import { setError } from "./errorReducer";

const blogReducer = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload.sort((a, b) => b.likes - a.likes);
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
    updateBlog(state, action) {
      return state
        .map((blog) => (blog.id === action.payload.id ? action.payload : blog))
        .sort((a, b) => b.likes - a.likes);
    },
    addBlog(state, action) {
      state.push(action.payload);
    },
  },
});

export default blogReducer.reducer;
export const { setBlogs, removeBlog, updateBlog, addBlog } =
  blogReducer.actions;

export const initializeBlogs = () => async (dispatch) => {
  const res = await blogService.getAll();
  dispatch(setBlogs(res));
};

export const removeBlogById = (blog) => async (dispatch) => {
  try {
    await blogService.removeBlog(blog.id);
    dispatch(removeBlog(blog.id));
    dispatch(
      setNotification(
        `blog ${blog.title} by ${blog.author} removed successfully`
      )
    );
    setTimeout(() => {
      dispatch(setNotification(""));
    }, 5000);
  } catch (error) {
    console.log(error);
    dispatch(setError(error.response.data.error));
    setTimeout(() => {
      dispatch(setError(""));
    }, 5000);
  }
};

export const increaseBlogLike = (blog, user) => async (dispatch) => {
  try {
    const blogToUpdate = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    };
    const updatedBlog = await blogService.updateBlog(blog.id, blogToUpdate);
    dispatch(updateBlog({ ...updatedBlog, user }));
  } catch (error) {
    console.log(error);
    dispatch(setError(error.response.data.error));
    setTimeout(() => {
      dispatch(setError(""));
    }, 5000);
  }
};

export const appendBlogs = (blog, user) => async (dispatch) => {
  try {
    const newBlog = await blogService.postBlog(blog);
    dispatch(addBlog({ ...newBlog, user }));
    dispatch(
      setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    );
    setTimeout(() => {
      dispatch(setNotification(""));
    }, 5000);
  } catch (error) {
    console.log(error);
    dispatch(setError(error.response.data.error));
    setTimeout(() => {
      dispatch(setError(""));
    }, 5000);
  }
};
