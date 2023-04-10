const { countBy, uniqBy, keys, sumBy } = require("lodash");

const dummy = (blogs) => 1;

const totalLikes = (blogs) => blogs.reduce((sum, val) => sum + val.likes, 0);

const favoriteBlog = (blogs) => {
  if (!blogs.length) {
    return "No blogs found";
  }
  let favBlog = {
    title: blogs[0].title,
    author: blogs[0].author,
    likes: blogs[0].likes,
  };
  let mostLikes = 0;
  blogs.forEach((blog) => {
    if (blog.likes > mostLikes) {
      mostLikes = blog.likes;
      favBlog = { title: blog.title, author: blog.author, likes: blog.likes };
    }
  });
  return favBlog;
};

const mostBlogs = (blogList) => {
  if (!blogList.length) {
    return "No blogs found";
  }
  let blogs = 0;
  let author = "";
  const count = countBy(blogList, "author");
  keys(count).forEach((key) => {
    if (count[key] > blogs) {
      blogs = count[key];
      author = key;
    }
  });
  return { author, blogs };
};

const mostLikes = (blogs) => {
  if (!blogs.length) {
    return "No blogs found";
  }
  const authors = uniqBy(blogs, "author");
  let author = "";
  let likes = 0;
  authors
    .map((a) => a.author)
    .forEach((key) => {
      const sumLikes = sumBy(
        blogs.filter((blog) => blog.author === key),
        "likes"
      );
      if (sumLikes > likes) {
        likes = sumLikes;
        author = key;
      }
    });
  return { author, likes };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
