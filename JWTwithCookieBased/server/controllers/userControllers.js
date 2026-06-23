const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;



async function registerUser(req, res) {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });
  await user.save();
  // Create a JWT Token — include role so authMiddleware can populate req.user.role
  const token = jwt.sign({ email: user.email, userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });
  // id is coming from mongo objecct id, which is unique for each user and can be used to identify the user in future requests.

  // Store the token in the cookie
  res.cookie("authcookie", token, { maxAge: 1000 * 60 * 15, httpOnly: true }); // 15 minutes http only prevent XSS attacks
  // now authcookie stores jwt token
  res
    .status(201)
    .json({ message: "User registered successfully, token stored in cookie" });
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Include role in payload — roleMiddleware reads it from req.user.role
  const token = jwt.sign({ email: user.email, userId: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: "1d",
  });
  res.cookie("authcookie", token, { maxAge: 900000, httpOnly: true });
  res.json({ message: "Login successful, token stored in cookie" });
}

async function logoutUser(req, res) {
  try {
    res.clearCookie("authcookie"); // Clear the authcookie
    console.log("User logged out, authcookie cleared.");
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Logout failed. Please try again." });
  }
}

async function getProfile(req, res) {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user profile" });
  }
}

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
};
