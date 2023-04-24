const express = require("express");
const router = express.Router();
const axios = require("axios");
const nbaGame = process.env.NBA_GAME;
const { Score } = require("../models");

// GET
// Get team scores
router.get("/", async (req, res) => {
  await axios
    .get(nbaGame)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/team/home", async (req, res) => {
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
// Fetch team period scores
router.post("/post/score", async (req, res) => {
  //   res.send("Post API");
  const data = new Model({
    name: req.body.name,
    age: req.body.age,
  });
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT
router.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true }; // return updated data in body

    const result = await Model.findByIdAndUpdate(id, updatedData, options);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted...`);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
