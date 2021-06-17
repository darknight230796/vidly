const express = require("express");
const { Movie, schema } = require("../models/movie");
const router = express.Router();

router.get("/", async (req, res) => {
  return res.send(await Movie.find());
});

router.get("/:id", async (req, res) => {
  let movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).send(`ID: ${req.params.id} not found`);
  res.send(movie);
});

router.post("/", async (req, res) => {
  if (!schema.validate(req.body).error) {
    let movie = new Movie();
    //movie = { ...req.body };
    movie.title = req.body.title;
    movie.numberInStock = req.body.numberInStock;
    movie.dailyRentalRate = req.body.dailyRentalRate;
    movie.genre = req.body.genre;
    
    let result = await movie.save();
    res.send(result);
  } else {
    res.status(400).send(schema.validate(req.body).error.details[0].message);
  }
});

router.put("/:id", async (req, res) => {
  if (schema.validate(req.body).error)
    return res
      .status(400)
      .send(schema.validate(req.body).error.details[0].message);
  let movie = await Movie.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { new: true }
  );
  if (!movie) return res.status(404).send(`ID: ${req.params.id} not found`);
  res.send(movie);
});

router.delete("/:id", async (req, res) => {
  let result = await Movie.findByIdAndDelete(req.params.id);

  if (!result) return res.status(404).send(`ID: ${req.params.id} not found`);

  res.send(result);
});

module.exports = router;
