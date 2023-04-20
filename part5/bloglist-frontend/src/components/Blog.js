import { useState } from "react";

const Blog = ({ blog, likeBlog, deleteBlog, showRemove }) => {
  const [expand, setExpand] = useState(false);

  const toggleExpand = () => {
    setExpand(!expand);
  };

  return (
    <div className="blog">
      <div>
        {blog.title} {blog.author}{" "}
        <button onClick={toggleExpand} id={`view-hide-btn-${blog.id}`}>
          {expand ? "hide" : "view"}
        </button>
      </div>
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
