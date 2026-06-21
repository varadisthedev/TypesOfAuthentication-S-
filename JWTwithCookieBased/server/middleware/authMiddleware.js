const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

async function authMiddleware(req, res, next) {
  const authHeaderJWT = req.headers.authorization;
  if (!authHeaderJWT) {
    return res
      .status(401)
      .json({ message: "Authorization header jwt is missing" });
  }
  const token = authHeaderJWT.split(" ")[1]; // removed the word "authcookie" from the token
  if (!token) {
    return res
      .status(401)
      .json({ message: "Token is missing or wrong format" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // now req.user will contain the decoded token payload, which can be used in subsequent middleware or route handlers
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
