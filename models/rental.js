const Joi = require("joi");
const mongoose = require("mongoose");
const { conn } = require("..");
Joi.objectId = require('joi-objectid')(Joi);
const schema = Joi.object({
  movieId: Joi.objectId().required(),
  customerId: Joi.objectId().required(),
});

const rentalSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: { type: String, required: true, minlength: 3, maxlength: 255 },
      phone: { type: String, required: true, minlength: 10, maxlength: 10 },
      isGold: { type: Boolean, default: false },
    }),
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 255,
      },
      dailyRentalRate: {
        type: Number,
        required: true,
        default: 0,
      },
    }),
  },
  dateOut: {
    type: Date,
    require: true,
    default: Date.now,
  },
  dateReturn: {
    type: Date,
  },
});

const Rental = conn.model("Rental", rentalSchema);

module.exports.Rental = Rental;
module.exports.schema = schema;
