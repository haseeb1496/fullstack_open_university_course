import Blog from "../components/Blog";
import CreateBlog from "./CreateBlog";
import Toggleable from "./Toggleable";

const Blogs = ({
  blogs,
  blogData,
  blogDataHandler,
  createBlog,
  blogRef,
  likeBlog,
  deleteBlog,
  userId,
}) => {
  return (
    <>
      <Toggleable buttonLabel="create new blog" ref={blogRef}>
        <CreateBlog
          blogData={blogData}
          blogDataHandler={blogDataHandler}
          createBlog={createBlog}
        />
      </Toggleable>
      {blogs.map((blog) => (
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
};

export default Blogs;
