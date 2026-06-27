const express = require("express");
const cors = require("cors");
const chalk = require("chalk").default;

const app = express();
process.loadEnvFile("./.env");

const PORT = process.env.PORT;
if (!PORT) {
  throw new Error("PORT is not defined in .env file");
}

const connectToMongo = require("./services/connectToMongo");
const userRoute = require("./routes/userRoute");

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/user", userRoute);

// ─── Health check ─────────────────────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "Server is running." });
});

// ─── Start ────────────────────────────────────────────────────────────────────
connectToMongo();

app.listen(PORT, () => {
  console.log("===============================================================");
  console.log(chalk.green(`Server is running on port ${PORT}`));
  console.log(chalk.cyan(`API base: http://localhost:${PORT}/api`));
});
