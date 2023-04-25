const express = require("express");
const router = express.Router();
const axios = require("axios");
const nbaGame = process.env.NBA_GAME;
const Team = require("../models/team");

// GET
// Get all teams
router.get("/", async (req, res) => {
  Team.find({})
    .then((teams) => {
      res.send(teams);
    })
    .catch((err) => {
      console.log("Error finding teams", err);
      res.json({ message: "An error occured. Please try again." });
    });
});

// Get home team info
router.get("/home", async (req, res) => {
  Team.findOne({ isHomeTeam: true })
    .then((team) => {
      res.send(team);
    })
    .catch((err) => {
      console.log("Error finding team", err);
      res.json({ message: "An error occured. Please try again." });
    });
});

// Get home team info
router.get("/away", async (req, res) => {
  Team.findOne({ isHomeTeam: false })
    .then((team) => {
      res.send(team);
    })
    .catch((err) => {
      console.log("Error finding team", err);
      res.json({ message: "An error occured. Please try again." });
    });
});

// POST
// Post home team info
router.post("/home", async (req, res) => {
  const game = await axios.get(nbaGame);
  if (game) {
    const homeTeam = gameStats.data.home_team;
    const newHomeTeam = new Team({
      firstName: homeTeam["first_name"],
      lastName: homeTeam["last_name"],
      abbv: homeTeam["abbreviation"],
      conference: homeTeam["conference"],
      division: homeTeam["division"],
      siteName: homeTeam["site_name"],
      teamId: homeTeam["team_id"],
      city: homeTeam["city"],
      state: homeTeam["state"],
      fullName: homeTeam["full_name"],
      isHomeTeam: true,
    });
    newHomeTeam
      .save()
      .then((createdTeam) => res.json(createdTeam))
      .catch((err) => console.log(err));
  } else {
    console.log("Error. Game stats could not be fetched.");
  }
});

// Away Team
router.post("/away", async (req, res) => {
  const game = await axios.get(nbaGame);
  if (game) {
    const awayTeam = gameStats.data.away_team;
    const newAwayTeam = new Team({
      firstName: awayTeam["first_name"],
      lastName: awayTeam["last_name"],
      abbv: awayTeam["abbreviation"],
      conference: awayTeam["conference"],
      division: awayTeam["division"],
      siteName: awayTeam["site_name"],
      teamId: awayTeam["team_id"],
      city: awayTeam["city"],
      state: awayTeam["state"],
      fullName: awayTeam["full_name"],
      isHomeTeam: false,
    });
    newAwayTeam
      .save()
      .then((createdTeam) => res.json(createdTeam))
      .catch((err) => console.log(err));
  } else {
    console.log("Error. Game stats could not be fetched.");
  }
});

// DELETE
// Delete team by id
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Team.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted...`);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
