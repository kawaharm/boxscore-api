const express = require("express");
const router = express.Router();
const axios = require("axios");
const nbaGame = process.env.NBA_GAME;
const { Team } = require("../models");

// GET
// Get team info
router.get("/home", async (req, res) => {
  await axios
    .get(nbaGame)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

// POST
// Post team info
router.post("/home", async (req, res) => {
  await axios
    .get(nbaGame)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
