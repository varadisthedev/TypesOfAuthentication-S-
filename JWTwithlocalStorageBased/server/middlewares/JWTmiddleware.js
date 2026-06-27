const jsonwebtoken = require("jsonwebtoken");
const chalk = require("chalk").default;
const log = console.log;

const createJWT = async (payload) => {
  try {
    const token = await jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return token;
  } catch (error) {
    console.error("issue in JWTmiddleware.js in createJWT()", error);
  }
};
const verifyJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }
  try {
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("issue in JWTmiddleware.js in verifyJWT()", error);
    return res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = { createJWT, verifyJWT };
