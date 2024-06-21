const { DataTypes } = require("sequelize");
const sequelize = require("../Database/db");

const Artist = sequelize.define(
  "artist",
  {
    // id: {
    //   type: DataTypes.INTEGER,
    //   primaryKey: true,
    //   autoIncrement: true,
    // },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    singer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    member1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    member2: {
      type: DataTypes.STRING,
    },
    member3: {
      type: DataTypes.STRING,
    },
    member4: {
      type: DataTypes.STRING,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);
module.exports = Artist;
