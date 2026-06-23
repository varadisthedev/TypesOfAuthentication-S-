const mongoose = require("mongoose");
const chalk = require("chalk").default;
const connectMongo = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error("MONGO_URI is not defined in the environment variables");
    }
    await mongoose.connect(mongoURI);
    console.log(chalk.green("✓ Connected to MongoDB"));
  } catch (error) {
    console.error(chalk.red("✗ Error connecting to MongoDB:"), error);
    process.exit(1);
  }
};
module.exports = connectMongo;
