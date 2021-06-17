const express = require("express");
const { Customer } = require("../models/customer");
const { Movie } = require("../models/movie");
const { Rental, schema } = require("../models/rental");
const router = express.Router();

router.get("/", async (req, res) => {
  return res.send(await Rental.find());
});

router.get("/:id", async (req, res) => {
  let rental = await Rental.findById(req.params.id);
  if (!rental) return res.status(404).send(`ID ${req.params.id} not found`);
  res.send(rental);
});

router.post("/", async (req, res) => {
  if (schema.validate(req.body).error)
    return res
      .status(400)
      .send(schema.validate(req.body).error.details[0].message);

  let customer = await Customer.findById(req.body.customerId);
  if (!customer)
    return res.status(404).send(`Customer ${req.body.customerId} not found`);

  let movie = await Movie.findById(req.body.movieId);
  if (!movie)
    return res.status(404).send(`Movie ${req.body.movieId} not found`);

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
      isGold: customer.isGold,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  return res.send(await rental.save());
});

router.put("/:id", async (req, res) => {
  if (schema.validate(req.body).error)
    return res
      .status(400)
      .send(schema.validate(req.body).error.details[0].message);

  let customer = await Customer.findById(req.body.customerId);
  if (!customer)
    return res.status(404).send(`Customer ${req.body.customerId} not found`);

  let movie = await Movie.findById(req.body.movieId);
  if (!movie)
    return res.status(404).send(`Movie ${req.body.movieId} not found`);

  let result = await Rental.findByIdAndUpdate(
    req.params.id,
    {
      customer: {
        _id: customer._id,
        name: customer.name,
        phone: customer.phone,
        isGold: customer.isGold,
      },
      movie: {
        _id: movie._id,
        title: movie.title,
        dailyRentalRate: movie.dailyRentalRate,
      },
    },
    { new: true }
  );

  return res.send(result);
});

router.delete("/:id", async (req, res) => {
  return res.send(await Rental.findByIdAndDelete(req.params.id));
});

router.post("/:id", async(req,res)=>{
    return res.send(await Rental.findByIdAndUpdate(req.params.id,{
        dateReturn: Date.now()
    }));
})

module.exports = router;
