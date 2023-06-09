require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const databaseUrl = process.env.DATABASE_URL;
const routes = require("./routes/routes");

// Connect Database
mongoose.connect(databaseUrl);
const db = mongoose.connection;
db.once("connected", () => {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});
db.on("error", (error) => {
  console.log(error);
});

const app = express();
app.use(express.json());

// // Connect to routes
// app.use("/api", routes);

// Controllers
app.use("/games", require("./controllers/games"));
app.use("/teams", require("./controllers/teams"));

// Server
const PORT = process.env.PORT || 8001;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = server;
