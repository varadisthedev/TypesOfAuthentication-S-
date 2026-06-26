const mongoose = require("mongoose");
const chalk = require("chalk").default;
const log = console.log;
process.loadEnvFile("./.env");
if (!process.env.MONGO_URI) {
  console.log(process.env.MONGO_URI);
  throw new Error("MONGO_URI is not defined in .env file");
}
const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    log(chalk.green("Connected to MongoDB"));
  } catch (error) {
    log(chalk.red("Error connecting to MongoDB:"), error);
  }
};
module.exports = connectToMongo;
