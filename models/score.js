const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scoreSchema = new Schema({
  homeScore: Array,
  awayScore: Array,
  homeTeam: [{ type: Schema.Types.ObjectId, ref: "Team" }],
  awayTeam: [{ type: Schema.Types.ObjectId, ref: "Team" }],
});

const Score = mongoose.model("Score", scoreSchema);

module.exports = Score;
