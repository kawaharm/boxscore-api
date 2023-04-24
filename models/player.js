const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  last_name: { type: String, required: true },
  first_name: { type: String, required: true },
  display_name: String,
  position: String,
  minutes: Number,
  points: Number,
  assists: Number,
  turnovers: Number,
  steals: Number,
  blocks: Number,
  field_goals_attempted: Number,
  field_goals_made: Number,
  three_point_field_goals_attempted: Number,
  three_point_field_goals_made: Number,
  free_throws_attempted: Number,
  free_throws_made: Number,
  defensive_rebounds: Number,
  offensive_rebounds: Number,
  personal_fouls: Number,
  team_abbreviation: String,
  is_starter: Boolean,
  field_goal_percentage: Number,
  three_point_percentage: Number,
  free_throw_percentage: Number,
});

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
