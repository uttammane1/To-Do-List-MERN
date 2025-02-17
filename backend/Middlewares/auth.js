const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ msg: "Token not found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.body.userId = decoded.userId;
    req.body.username = decoded.username;

    next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

module.exports = auth;