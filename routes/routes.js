const routes = require("./routes/routes");
const express = require("express");
const router = express.Router();

app.use("/api", routes);

// GET
router.get("/getAll", (req, res) => {
  res.send("Get All API");
});

router.get("/getOne/:id", (req, res) => {
  res.send("Get by ID API");
});

// POST
router.post("/post", (req, res) => {
  res.send("Post API");
});

// PUT
router.put("/update/:id", (req, res) => {
  res.send("Update by ID API");
});

// DELETE
router.delete("/delete/:id", (req, res) => {
  res.send("Delete by ID API");
});

module.exports = router;
