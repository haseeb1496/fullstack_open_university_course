const loginRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.password);

  if (!user || !passwordCorrect) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const userData = {
    username: user.username,
    name: user.name,
    id: user._id,
  };

  const token = jwt.sign(userData, process.env.SECRET);

  res.status(200).json({ token });
});

module.exports = loginRouter;
