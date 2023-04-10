const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { name: 1, username: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const tokenUser = request.user;
  const user = await User.findById(tokenUser.id);
  const blog = new Blog({ ...request.body, user: user.id });
  const postedBlog = await blog.save();
  user.blogs = user.blogs.concat(postedBlog._id);
  await user.save();
  response.status(200).json(postedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const tokenUser = request.user;
  const blogToDelete = await Blog.findById(request.params.id);
  if (tokenUser.id === blogToDelete.user.toString()) {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } else {
    response.status(401).json({
      error:
        "Delete action can only be performed by the user that created the blog",
    });
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const postedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    {
      new: true,
      runValidators: true,
      context: "query",
    }
  );
  if (postedBlog) {
    response.json(postedBlog);
  } else {
    response.status(404).end();
  }
});

module.exports = blogsRouter;
