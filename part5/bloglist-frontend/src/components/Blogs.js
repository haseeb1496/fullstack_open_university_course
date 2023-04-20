import Blog from "../components/Blog";
import CreateBlog from "./CreateBlog";
import Toggleable from "./Toggleable";

const Blogs = ({
  blogs,
  name,
  logout,
  blogData,
  blogDataHandler,
  createBlog,
  blogRef,
  likeBlog,
  deleteBlog,
  userId,
}) => (
  <>
    <p>
      {name} logged in <button onClick={logout}>logout</button>
    </p>
    <Toggleable buttonLabel="create new blog" ref={blogRef}>
      <CreateBlog
        blogData={blogData}
        blogDataHandler={blogDataHandler}
        createBlog={createBlog}
      />
    </Toggleable>
    {blogs
      .sort((a, b) => b.likes - a.likes)
      .map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          likeBlog={likeBlog}
          deleteBlog={deleteBlog}
          showRemove={userId === blog.user.id}
        />
      ))}
  </>
);

export default Blogs;
