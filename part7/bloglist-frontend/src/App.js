import { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { decodeToken } from "react-jwt";
import Login from "./components/Login";
import Blogs from "./components/Blogs";
import Users from "./components/Users";
import User from "./components/User";
import SingleBlog from "./components/SingleBlog";
import Notification from "./components/Notification";
import ErrorMessage from "./components/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "./reducers/errorReducer";
import {
  appendBlogs,
  increaseBlogLike,
  initializeBlogs,
  removeBlogById,
} from "./reducers/blogReducer";
import { useMatch } from "react-router-dom";
import userService from "./services/users";
import { Routes, Route } from "react-router-dom";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [loggedInUser, setLoggedInUser] = useState();
  const [blogData, setBlogData] = useState({ title: "", author: "", url: "" });
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      blogService.setToken(token);
      const user = decodeToken(token);
      setLoggedInUser(user);
      setIsLoggedIn(true);
      userService.getAllUsers().then((res) => {
        setUserList(res);
      });
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(initializeBlogs());
    }
  }, [isLoggedIn]);

  const blogRef = useRef();
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const userMatch = useMatch("/users/:id");
  const user = userMatch
    ? userList.find((u) => u.id === userMatch.params.id)
    : null;
  const blogMatch = useMatch("/blogs/:id");
  let blog;

  useEffect(() => {
    blog = blogMatch ? blogs.find((b) => b.id === blogMatch.params.id) : null;
  }, [blogs]);

  const loginDataHandler = (value, key) => {
    const data = { ...loginData };
    data[key] = value;
    setLoginData(data);
  };

  const blogDataHandler = (value, key) => {
    const data = { ...blogData };
    data[key] = value;
    setBlogData(data);
  };

  const login = async (evt) => {
    evt.preventDefault();
    try {
      const response = await loginService.userLogin({
        username: loginData.username,
        password: loginData.password,
      });
      window.localStorage.setItem("token", response.token);
      setLoginData({ username: "", password: "" });
      blogService.setToken(response.token);
      setIsLoggedIn(true);
      const user = decodeToken(response.token);
      setLoggedInUser(user);
    } catch (error) {
      console.log(error);
      dispatch(setError(error.response.data.error));
      setTimeout(() => {
        dispatch(setError(""));
      }, 5000);
    }
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    setIsLoggedIn(false);
    setLoggedInUser(null);
  };

  const createBlog = async (evt) => {
    evt.preventDefault();
    dispatch(appendBlogs(blogData, loggedInUser));
    setBlogData({ title: "", author: "", url: "" });
    blogRef.current.toggleVisibility();
  };

  const likeBlog = async (blog) => {
    dispatch(increaseBlogLike(blog, blog.user));
  };

  const deleteBlog = async (blog) => {
    const confirm = window.confirm(`Remove ${blog.title} by ${blog.author}?`);
    if (confirm) {
      dispatch(removeBlogById(blog));
    }
  };

  return (
    <>
      {isLoggedIn && (
        <p>
          {loggedInUser?.name} logged in{" "}
          <button onClick={logout}>logout</button>
        </p>
      )}
      <h1>{isLoggedIn ? "blogs" : "log in to application"}</h1>
      <Notification />
      <ErrorMessage />
      {isLoggedIn ? (
        <>
          <Routes>
            <Route path="/users" element={<Users users={userList} />} />
            <Route path="/users/:id" element={<User user={user} />} />
            <Route
              path="/blogs/:id"
              element={<SingleBlog blog={blog} likeBlog={likeBlog} />}
            />
            <Route
              path="/"
              element={
                <Blogs
                  blogs={blogs}
                  blogData={blogData}
                  blogDataHandler={blogDataHandler}
                  createBlog={createBlog}
                  blogRef={blogRef}
                  likeBlog={likeBlog}
                  deleteBlog={deleteBlog}
                  userId={loggedInUser.id}
                />
              }
            />
          </Routes>
        </>
      ) : (
        <Login
          loginData={loginData}
          loginDataHandler={loginDataHandler}
          login={login}
        />
      )}
    </>
  );
};

export default App;
