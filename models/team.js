const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  abbv: { type: String, required: true },
  conference: { type: String, required: true },
  division: { type: String, required: true },
  siteName: { type: String, required: true },
  teamId: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  fullName: { type: String, required: true },
  isHomeTeam: Boolean,
  players: [{ type: Schema.Types.ObjectId, ref: "Player" }],
  scores: [{ type: Schema.Types.ObjectId, ref: "Score" }],
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
