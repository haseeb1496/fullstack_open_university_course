const mongoose = require("mongoose");
const app = require("../app");
const supertest = require("supertest");
const Blog = require("../models/blog");
const { initialBlogs, blogsInDb, getTestToken } = require("./test_helper");

const api = supertest(app);
let token = "";

beforeEach(async () => {
  let userId = "";
  const tokenData = await getTestToken();
  token = tokenData.token;
  userId = tokenData.userId;
  await Blog.deleteMany({});
  for (let blog of initialBlogs) {
    let blogObj = new Blog({ ...blog, user: userId });
    await blogObj.save();
  }
});

describe("blog api tests", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body).toHaveLength(initialBlogs.length);
  });

  test("blog post contains 'id' field", async () => {
    const blog = await blogsInDb();
    expect(blog[0].id).toBeDefined();
  });

  test("a blog can be added", async () => {
    const newBlog = {
      title: "New Title",
      author: "New Author",
      url: "www.newurl.com",
      likes: 10,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAfterPost = await blogsInDb();
    expect(blogsAfterPost).toHaveLength(initialBlogs.length + 1);

    const title = blogsAfterPost.map((n) => n.title);
    expect(title).toContain("New Title");
  });

  test("'likes' are set to 0 if no 'likes' property given", async () => {
    const newBlog = {
      title: "New Title",
      author: "New Author",
      url: "www.newurl.com",
    };

    const response = await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const postedBlog = response.body;
    expect(postedBlog.likes).toBe(0);
    expect(postedBlog.title).toBe("New Title");
  });

  test("api returns 400 status code if 'title' is missing", async () => {
    const newBlog = {
      author: "New Author",
      url: "www.newurl.com",
      likes: 10,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `Bearer ${token}`)
      .expect(400);
  });

  test("api returns 400 status code if 'url' is missing", async () => {
    const newBlog = {
      title: "New Title",
      author: "New Author",
      likes: 10,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `Bearer ${token}`)
      .expect(400);
  });

  test("a blog can be deleted", async () => {
    const blogsBeforePost = await blogsInDb();
    const blogToDelete = blogsBeforePost[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

    const blogsAfterDelete = await blogsInDb();
    const titles = blogsAfterDelete.map((b) => b.title);

    expect(titles).not.toContain(blogToDelete.title);
  });

  test("a blog can be updated", async () => {
    const blogsBeforeUpdate = await blogsInDb();
    const blogToUpdate = blogsBeforeUpdate[0];

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ ...blogToUpdate, likes: 20 })
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAfterUpdate = await blogsInDb();
    const updatedBlog = blogsAfterUpdate.find(
      (blog) => blog.id === blogToUpdate.id
    );
    expect(updatedBlog.likes).toBe(20);
  });
  test("api returns 401 if no token provided", async () => {
    const newBlog = {
      title: "New Title",
      author: "New Author",
      url: "www.newurl.com",
      likes: 10,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(401)
      .expect("Content-Type", /application\/json/);

    const blogsAfterPost = await blogsInDb();
    expect(blogsAfterPost).toHaveLength(initialBlogs.length);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
