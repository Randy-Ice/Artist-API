require("dotenv").config();
const chalk = require("chalk");
const logger = require("./Log/winston");
const morgan = require("morgan");
const helmet = require("helmet");
const { rateLimit } = require("express-rate-limit");
const express = require("express");
const PORT = process.env.PORT;
const app = express();
const DatabaseConnection = require("./Database/association and connection");
const artistRouter = require("./Routes/artistRoutes");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message:
    "Too many requests created from this IP, please try again after 15 minutes",
  statusCode: 429,
});
//! uncaught exceptions and handlers
process.on("uncaughtException", (ex) => {
  logger.error(ex.message);
  process.exit(1);
});
process.on("unhandledRejection", (ex) => {
  logger.error(ex.message);
  process.exit(1);
});
//! end of uncaught exceptions and handlers

//= middleware
app.use(express.json());
app.use(helmet());
app.use(limiter);
if (app.get("env") === "development") {
  app.use(morgan("dev"));
}

//+ register routes

app.get("/", (req, res) => {
  res.status(200).json({ message: "Simple music API" });
});
app.use("/api/v1/artists", artistRouter);

//^ catch all routes
app.all("*", (req, res) => {
  res.status(404).json({
    message: "Sorry, nothing here right now 😓",
  });
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
  console.log(chalk.green("heyoo"));
});
//- Database connection
DatabaseConnection();
