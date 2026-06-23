// No dotenv needed — Node 22 loads .env natively via --env-file (see package.json dev script)
const express = require("express");
const cors = require("cors");
const chalk = require("chalk").default;
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const mongoConnect = require("./services/connectMongo");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// extended allows nested objects in the request body, which is useful for more complex data structures.
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173", // Vite default dev port
    credentials: true, // required for cookies to be sent cross-origin
    // with credentials true, u cant use wildcard cors in case of cookies hased auth
  })
);
// adding routes
const userRoutes = require("./routes/userRoute");
const adminRoutes = require("./routes/adminRoute");
app.use(["/api", "/api/api"], userRoutes);
app.use(["/api/admin", "/api/api/admin"], adminRoutes);

// default route
app.get("/", (req, res) => {
  res.send("api running successfully");
});
// connect to MongoDB
mongoConnect();

app.listen(PORT, () => {
  console.clear();
  console.log(chalk.white(`Server is running on port ${chalk.blueBright(PORT)}`));
});
