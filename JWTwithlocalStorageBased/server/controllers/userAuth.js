const bcrypt = require("bcrypt");
const UserModel = require("../models/User.js");
const { createJWT } = require("../middlewares/JWTmiddleware.js");

// ─── Register ────────────────────────────────────────────────────────────────
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email and password are required." });
  }

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ name, email, password: hashedPassword });

    const token = await createJWT({ userId: user._id, email: user.email });

    return res.status(201).json({
      message: "User registered successfully.",
      token,
      user: { id: user._id, name: user.name, email: user.email, hobbies: user.hobbies },
    });
  } catch (error) {
    console.error("registerUser error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// ─── Login ───────────────────────────────────────────────────────────────────
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = await createJWT({ userId: user._id, email: user.email });

    return res.status(200).json({
      message: "Login successful.",
      token,
      user: { id: user._id, name: user.name, email: user.email, hobbies: user.hobbies },
    });
  } catch (error) {
    console.error("loginUser error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// ─── Get Profile (protected) ─────────────────────────────────────────────────
const getProfile = async (req, res) => {
  try {
    // req.user is set by verifyJWT middleware
    const user = await UserModel.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("getProfile error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// ─── Update Hobbies (protected) ──────────────────────────────────────────────
const updateHobbies = async (req, res) => {
  const { hobbies } = req.body;

  if (!Array.isArray(hobbies)) {
    return res.status(400).json({ message: "Hobbies must be an array of strings." });
  }

  try {
    const user = await UserModel.findByIdAndUpdate(
      req.user.userId,
      { hobbies },
      { new: true, select: "-password" }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({ message: "Hobbies updated.", user });
  } catch (error) {
    console.error("updateHobbies error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = { registerUser, loginUser, getProfile, updateHobbies };
