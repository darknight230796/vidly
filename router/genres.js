const express = require("express");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const { Genre, schema } = require("../models/genre");
const router = express.Router();
router.get("/",async (req, res) => {
  return res.send(await Genre.find());
});

router.get("/:id", async (req, res) => {
  let genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send(`ID: ${req.params.id} not found`);
  res.send(genre);
});

router.post("/", auth, async (req, res) => {
  if (!schema.validate(req.body).error) {
    let genre = new Genre();
    genre.name = req.body.name;
    let result = await genre.save();
    res.send(result);
  } else {
    res.status(400).send(schema.validate(req.body).error.details[0].message);
  }
});

router.put("/:id",auth, async (req, res) => {
  if (schema.validate(req.body).error)
    return res
      .status(400)
      .send(schema.validate(req.body).error.details[0].message);
  let genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!genre) return res.status(404).send(`ID: ${req.params.id} not found`);
  res.send(genre);
});

router.delete("/:id",[auth,admin], async (req, res) => {
  let result = await Genre.findByIdAndDelete(req.params.id);

  if (!result) return res.status(404).send(`ID: ${req.params.id} not found`);

  res.send(result);
});

module.exports = router;
