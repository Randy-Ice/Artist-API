const { DataTypes } = require("sequelize");
const sequelize = require("../Database/db");

const Album = sequelize.define(
  "album",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    releaseDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    length: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    producer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tract1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tract2: {
      type: DataTypes.STRING,
    },
    tract3: {
      type: DataTypes.STRING,
    },
    tract4: {
      type: DataTypes.STRING,
    },
    tract5: {
      type: DataTypes.STRING,
    },
    tract6: {
      type: DataTypes.STRING,
    },
    tract7: {
      type: DataTypes.STRING,
    },
    tract8: {
      type: DataTypes.STRING,
    },
    tract9: {
      type: DataTypes.STRING,
    },
    tract10: {
      type: DataTypes.STRING,
    },
    tract11: {
      type: DataTypes.STRING,
    },
    tract12: {
      type: DataTypes.STRING,
    },
    tract13: {
      type: DataTypes.STRING,
    },
    tract14: {
      type: DataTypes.STRING,
    },
    tract15: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false }
);

module.exports = Album;
