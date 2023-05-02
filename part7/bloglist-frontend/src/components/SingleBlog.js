const SingleBlog = ({ blog }) => {
  return (
    <>
      <h1>{blog.title}</h1>
      <div>{blog.url}</div>
      <div>
        {blog.likes} likes <button onClick={() => likeBlog(blog)}>like</button>
      </div>
      <div>added by {blog.author}</div>
    </>
  );
};

export default SingleBlog;
