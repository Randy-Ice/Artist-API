const sequelize = require("./db");
const chalk = require("chalk");
const logger = require("../Log/winston");
const Artist = require("../Models/artistModel");
const Albums = require("../Models/albumsModel");

Artist.hasMany(Albums);
Albums.belongsTo(Artist);
const DatabaseConnection = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    logger.info(chalk.blue("Database connection established"));
  } catch (err) {
    logger.error(err.message);
    //process.exit(1);
  }
};

module.exports = DatabaseConnection;
