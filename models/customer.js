const Joi = require("joi");
const mongoose = require("mongoose");
const { conn } = require("..");
const schema = Joi.object({
    name: Joi.string().min(3).required(),
    phone: Joi.string().min(10).max(10).required(),
    isGold: Joi.boolean(),
  });
  const customerSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 255 },
    phone: { type: String, required: true, minlength: 10, maxlength: 10 },
    isGold: { type: Boolean, default: false },
  });
  
  const Customer = conn.model("Customer", customerSchema);

  module.exports.schema = schema;
  module.exports.Customer = Customer;