const mongoose = require("mongoose");
const chalk = require("chalk").default;
require("dotenv").config();

const log = console.log;

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not defined in .env file");
}

const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    log(chalk.green("Connected to MongoDB"));
  } catch (error) {
    log(chalk.red("Error connecting to MongoDB:"), error.message);
    process.exit(1); // fail fast — app can't run without DB
  }
};

mongoose.connection.on("disconnected", () => {
  log(chalk.yellow("MongoDB disconnected"));
});

mongoose.connection.on("error", (err) => {
  log(chalk.red("MongoDB connection error:"), err.message);
});

// Handle app termination gracefully
// os signal: SIGINT (Ctrl+C)
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  log(chalk.yellow("MongoDB connection closed on app termination"));
  process.exit(0);
});

module.exports = connectToMongo;
