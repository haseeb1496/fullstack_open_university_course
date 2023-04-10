const logger = require("../utils/logger");
const jwt = require("jsonwebtoken");

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);
  if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "Token invalid" });
  }
  next(error);
};

const extractToken = (req, res, next) => {
  const auth = req.get("authorization");
  if (auth && auth.startsWith("Bearer ")) {
    req.token = auth.replace("Bearer ", "");
    next();
  } else {
    return res.status(401).json({ error: "Token invalid" });
  }
};

const extractUser = (req, res, next) => {
  const token = req.token;
  const tokenUser = jwt.verify(token, process.env.SECRET);
  if (!tokenUser.id) {
    return res.status(401).json({ error: "Token invalid" });
  } else {
    req.user = tokenUser;
    next();
  }
};

module.exports = { errorHandler, extractToken, extractUser };
