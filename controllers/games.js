const express = require("express");
const router = express.Router();
const axios = require("axios");
const nbaGame = process.env.NBA_GAME;
const Game = require("../models/game");
const Team = require("../models/team");

// GET
// Get team scores
router.get("/", async (req, res) => {});

// Get home team info
router.get("/home", async (req, res) => {
  try {
    const response = await axios.get(nbaGame);
    const teamBio = response.data.home_team;
    res.send(teamBio);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Pseudocode
// Feed hits at most every 15 seconds
// Static info: Team names, home/away, total innings/quarters
// Dynamic info: scores, record, current inning/quarter

// POST
// Post new game
router.post("/", async (req, res) => {
  const game = await axios.get(nbaGame);
  if (game) {
    const gameStats = game.data;
    let homeTeam = await Team.findOne({
      teamId: gameStats["home_team"]["team_id"],
    });
    let awayTeam = await Team.findOne({
      teamId: gameStats["away_team"]["team_id"],
    });
    if (homeTeam || awayTeam) {
      console.log("THERE IS AN EXISTING HOEM TEAM", homeTeam);
      console.log("THERE IS AN EXISTING AWAY TEAM", awayTeam);
    }
    if (!homeTeam) {
      console.log("THIS IS A NEW HOME TEAM");
      homeTeam = await new Team({
        firstName: gameStats["home_team"]["first_name"],
        lastName: gameStats["home_team"]["last_name"],
        abbv: gameStats["home_team"]["abbreviation"],
        conference: gameStats["home_team"]["conference"],
        division: gameStats["home_team"]["division"],
        siteName: gameStats["home_team"]["site_name"],
        teamId: gameStats["home_team"]["team_id"],
        city: gameStats["home_team"]["city"],
        state: gameStats["home_team"]["state"],
        fullName: gameStats["home_team"]["full_name"],
        isHomeTeam: true,
      });
      homeTeam
        .save()
        .then((createdTeam) => res.json(createdTeam))
        .catch((err) => console.log(err));

      console.log(homeTeam);
    }
    if (!awayTeam) {
      console.log("THIS IS A NEW AWAY TEAM");

      awayTeam = await new Team({
        firstName: gameStats["away_team"]["first_name"],
        lastName: gameStats["away_team"]["last_name"],
        abbv: gameStats["away_team"]["abbreviation"],
        conference: gameStats["away_team"]["conference"],
        division: gameStats["away_team"]["division"],
        siteName: gameStats["away_team"]["site_name"],
        teamId: gameStats["away_team"]["team_id"],
        city: gameStats["away_team"]["city"],
        state: gameStats["away_team"]["state"],
        fullName: gameStats["away_team"]["full_name"],
        isHomeTeam: false,
      });
      awayTeam
        .save()
        .then((createdTeam) => res.json(createdTeam))
        .catch((err) => console.log(err));

      console.log(awayTeam);
    }
    const newGame = new Game({
      scores: {
        home: gameStats["home_period_scores"],
        away: gameStats["away_period_scores"],
      },
      teams: {
        home: homeTeam,
        away: awayTeam,
      },
    });
    newGame
      .save()
      .then((createdGame) => res.send(createdGame))
      .catch((err) => console.log(err));
  }
});

// DELETE
// Delete game by id
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Game.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted...`);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
