const Joi = require("joi");
const mongoose = require("mongoose");
const { conn } = require("..");
const { genreSchema } = require("./genre");

const schema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  numberInStock: Joi.number().min(0).required(),
  dailyRentalRate: Joi.number().min(0).required(),
  genre: Joi.object().required(),
});
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 255,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  numberInStock: {
    type: Number,
    required: true,
    default: 0,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Movie = conn.model("Movie", movieSchema);

module.exports.schema = schema;
module.exports.Movie = Movie;
