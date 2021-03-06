const Joi = require("joi");
const mongoose = require("mongoose");
const { conn } = require("..");
const jwt = require("jsonwebtoken");
const schema = Joi.object({
  name: Joi.string().min(5).max(50).required(),
  email: Joi.string().min(5).max(255).required().email(),
  password: Joi.string().min(5).max(255).required(),
  isAdmin: Joi.boolean()
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: { type: String, required: true, minlength: 5, maxlength: 1024 },
  isAdmin: { type: Boolean, default: false },
});

userSchema.methods.getAuthToken = function () {
  return jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.JWT_SECRET_KEY);
};

const User = conn.model("User", userSchema);

module.exports.User = User;
module.exports.schema = schema;
