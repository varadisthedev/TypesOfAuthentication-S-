const express = require("express");
const router = express.Router();

const userController = require("../controllers/userAuth.js");
const { verifyJWT } = require("../middlewares/JWTmiddleware.js");

// ─── Public Routes ────────────────────────────────────────────────────────────
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

// ─── Protected Routes (JWT required) ─────────────────────────────────────────
router.get("/profile", verifyJWT, userController.getProfile);
router.put("/hobbies", verifyJWT, userController.updateHobbies);

module.exports = router;
