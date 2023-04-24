const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scoreSchema = new Schema({
  periodScores: Array,
});

const Score = mongoose.model("Score", scoreSchema);

module.exports = Score;
