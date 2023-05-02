import { useState } from "react";
import { Link } from "react-router-dom";

const Blog = ({ blog, likeBlog, deleteBlog, showRemove }) => {
  const [expand, setExpand] = useState(false);

  const toggleExpand = () => {
    setExpand(!expand);
  };

  return (
    <div className="blog">
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      {expand && (
        <>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}{" "}
            <button onClick={() => likeBlog(blog)}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {showRemove && (
            <button onClick={() => deleteBlog(blog)}>remove</button>
          )}
        </>
      )}
    </div>
  );
};

export default Blog;
