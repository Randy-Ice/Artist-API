const express = require("express");
const router = express.Router();
const {
  getAllArtists,
  getSingleArtist,
} = require("../Controllers/artistControllers");

router.get("/", getAllArtists);

router.get("/:artistName", getSingleArtist);

module.exports = router;
