const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  const token = req.cookies?.authcookie;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication cookie (authcookie) is missing" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Contains email and userId
    req.userId = decoded.userId; // Set req.userId to match controller expectation
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = authMiddleware;
