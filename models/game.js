const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  scores: {
    home: { type: Array, required: true },
    away: { type: Array, required: true },
  },
  teams: {
    home: [{ type: Schema.Types.ObjectId, ref: "Team", required: true }],
    away: [{ type: Schema.Types.ObjectId, ref: "Team", required: true }],
  },
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
