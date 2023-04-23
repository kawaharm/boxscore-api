const express = require("express");
const router = express.Router();
const Model = require("../models/model");

// GET
router.get("/getAll", async (req, res) => {
  //   res.send("Get All API");
  try {
    const data = await Model.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/getOne/:id", async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST
router.post("/post", async (req, res) => {
  //   res.send("Post API");
  const data = new Model({
    name: req.body.name,
    age: req.body.age,
  });
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT
router.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true }; // return updated data in body

    const result = await Model.findByIdAndUpdate(id, updatedData, options);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted...`);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
