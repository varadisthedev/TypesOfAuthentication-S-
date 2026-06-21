const express = require("express");
const router = express.Router();
const Users = require("../models/User");
router.get("/allusers", async (req, res) => {
  try {
    const users = await Users.find({}); // Fetch all users from the database
    res.json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: err.message });
  }
});

module.exports = router;
