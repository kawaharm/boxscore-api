require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;
const routes = require("./routes/routes");

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

// Connect to routes
app.use("/api", routes);

// Server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = server;
