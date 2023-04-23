require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;

// Connect Database
mongoose.connect(mongoString);
const database = mongoose.connection;
// Error handling
database.on("error", (error) => {
  console.log(error);
});
database.once("connected", () => {
  console.log("Database Connected.");
});

const app = express();
app.use(express.json());

// Server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = server;
