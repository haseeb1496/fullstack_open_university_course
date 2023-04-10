const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

usersRouter.post("/", async (req, res) => {
  let { username, name, password } = req.body;
  if (password) {
    if (password.length < 3) {
      return res
        .status(400)
        .json({ error: "Password length must be atleast 3 characters" });
    }
    password = await bcrypt.hash(password, 10);
  }
  const newUser = new User({
    username,
    name,
    password,
  });

  const savedUser = await newUser.save();
  res.json(savedUser);
});

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
  });
  res.json(users);
});

module.exports = usersRouter;
