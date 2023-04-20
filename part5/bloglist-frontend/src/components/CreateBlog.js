const CreateBlog = ({ blogData, blogDataHandler, createBlog }) => (
  <form onSubmit={createBlog}>
    <h2>create new blog</h2>
    <div>
      title{" "}
      <input
        id="title-input"
        value={blogData.title}
        placeholder="enter title"
        onChange={(evt) => blogDataHandler(evt.target.value, "title")}
      />
    </div>
    <div>
      author{" "}
      <input
        id="author-input"
        value={blogData.author}
        placeholder="enter author"
        onChange={(evt) => blogDataHandler(evt.target.value, "author")}
      />
    </div>
    <div>
      url{" "}
      <input
        id="url-input"
        value={blogData.url}
        placeholder="enter url"
        onChange={(evt) => blogDataHandler(evt.target.value, "url")}
      />
    </div>
    <button type="submit" id="create-blog-btn">
      create
    </button>
  </form>
);

export default CreateBlog;
