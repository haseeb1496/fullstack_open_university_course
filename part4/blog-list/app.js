const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const {
  errorHandler,
  extractToken,
  extractUser,
} = require("./utils/middleware");

const mongoUrl = config.MONGODB_URI;
mongoose.set("strictQuery", false);
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());

app.use("/api/login", loginRouter);

app.use(extractToken);

app.use("/api/blogs", extractUser, blogsRouter);
app.use("/api/users", usersRouter);

app.use(errorHandler);

module.exports = app;
