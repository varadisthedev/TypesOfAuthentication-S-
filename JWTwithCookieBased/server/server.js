const express = require("express");
const PORT = 3000;
const cors = require("cors");
const bcrypt = require("bcrypt");
const JWT_SECRET = "super-secret-key";
const cookieParser = require("cookie-parser");
const mongoConnect = require("./config/mongoConnect");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// extended allows nested objects in the request body, which is useful for more complex data structures.
app.use(cookieParser());
app.use(cors());

// adding routes
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
app.use("/api", userRoutes);
app.use("/api/admin", adminRoutes);

// default route
app.get("/", (req, res) => {
  res.send("api running successfully");
});
// connect to MongoDB
mongoConnect();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
