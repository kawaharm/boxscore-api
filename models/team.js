const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  abbv: { type: String, required: true },
  conference: { type: String, required: true },
  division: { type: String, required: true },
  site_name: { type: String, required: true },
  team_id: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  full_name: { type: String, required: true },
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
