const Joi = require("joi");
const mongoose = require("mongoose");
const { autoIncrement, conn } = require("..");
const schema = Joi.object({
  name: Joi.string().min(3).required(),
});

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 255 },
});

genreSchema.plugin(autoIncrement.plugin, "Genre");

const Genre = conn.model("Genre", genreSchema);

module.exports.Genre = Genre;
module.exports.schema = schema;
module.exports.genreSchema = genreSchema;
