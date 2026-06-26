const express = require("express");
const app = express();

const chalk = require("chalk").default;
const connectToMongo = require("./services/connectToMongo");
process.loadEnvFile("./.env");
const PORT = process.env.PORT;
console.log(PORT);
if (!PORT) {
  throw new Error("PORT is not defined in .env file");
}
app.use(cors());
app.use(express.json());
app.use(express.static("public")); // For serving frontend
app.use(express.urlencoded({ extended: true }));

// connecting db
connectToMongo();

// listening
app.listen(PORT, () => {
  console.clear();
  console.log(
    "===============================================================",
  );
  console.log(chalk.green(`Server is running on port ${PORT}`));
});
