const UserModel = require("../models/userModel.js");
const { createJWT, verifyJWT } = require("../middlewares/JWTmiddleware.js");
const registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.create({ email, password });
    return res
      .status(201)
      .json({ message: "User registered successfully.", user });
    // issue jwt at this point and send it back to the user
  } catch (error) {
    console.error("issue in userOperations.js in registerUser()", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const updateUserEmail = async (req, res) => {
  const { userId, newEmail, password } = req.body;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password." });
    }
    // proceed when pass
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { email: newEmail },
      { new: true },
    );
    return res
      .status(200)
      .json({ message: "User email updated successfully.", user });
  } catch (error) {
    console.error("issue in userOperations.js in updateUserEmail()", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password." });
    }
    // issue jwt at this point and send it back to the user
    const token = createJWT({ userId: user._id, email: user.email });
    
    return res.status(200).json({ message: "Login successful.", token });
  } catch (error) {
    console.error("issue in userOperations.js in loginUser()", error);
    return res.status(500).json({ message: "Internal server error.", error });
  }
};
