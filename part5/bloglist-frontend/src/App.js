import { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { decodeToken } from "react-jwt";
import Login from "./components/Login";
import Blogs from "./components/Blogs";
import Notification from "./components/Notification";
import ErrorMessage from "./components/ErrorMessage";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [loggedInUser, setLoggedInUser] = useState();
  const [blogData, setBlogData] = useState({ title: "", author: "", url: "" });
  const [notification, setNotification] = useState("");
  const [error, setError] = useState("");
  const blogRef = useRef();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      blogService.setToken(token);
      const user = decodeToken(token);
      setLoggedInUser(user);
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      blogService.getAll().then((blogs) => setBlogs(blogs));
    } else {
      setBlogs([]);
    }
  }, [isLoggedIn]);

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
      setError(error.response.data.error);
      setTimeout(() => {
        setError(null);
      }, 5000);
      console.log(error);
    }
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    setIsLoggedIn(false);
    setLoggedInUser(null);
  };

  const createBlog = async (evt) => {
    evt.preventDefault();
    try {
      const newBlog = await blogService.postBlog(blogData);
      setBlogs(blogs.concat({ ...newBlog, user: loggedInUser }));
      setBlogData({ title: "", author: "", url: "" });
      setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
      blogRef.current.toggleVisibility();
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError(null);
      }, 5000);
      console.log(error);
    }
  };

  const likeBlog = async (blog) => {
    try {
      const blogToUpdate = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
      };
      const updatedBlog = await blogService.updateBlog(blog.id, blogToUpdate);
      const newBlogs = blogs.map((b) =>
        b.id === updatedBlog.id ? { ...updatedBlog, user: blog.user } : b
      );
      setBlogs(newBlogs);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError(null);
      }, 5000);
      console.log(error);
    }
  };

  const deleteBlog = async (blog) => {
    try {
      const confirm = window.confirm(`Remove ${blog.title} by ${blog.author}?`);
      if (confirm) {
        await blogService.removeBlog(blog.id);
        setBlogs(blogs.filter((b) => b.id !== blog.id));
        setNotification(
          `blog ${blog.title} by ${blog.author} removed successfully`
        );
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      }
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError(null);
      }, 5000);
      console.log(error);
    }
  };

  return (
    <>
      <h1>{isLoggedIn ? "blogs" : "log in to application"}</h1>
      <Notification message={notification} />
      <ErrorMessage message={error} />
      {isLoggedIn ? (
        <Blogs
          blogs={blogs}
          name={loggedInUser.name}
          logout={logout}
          blogData={blogData}
          blogDataHandler={blogDataHandler}
          createBlog={createBlog}
          blogRef={blogRef}
          likeBlog={likeBlog}
          deleteBlog={deleteBlog}
          userId={loggedInUser.id}
        />
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
