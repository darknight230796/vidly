const express = require("express");
const auth = require("../middleware/auth");
const { Customer, schema } = require("../models/customer");
const router = express.Router();

router.get("/", async (req, res) => {
  return res.send(await Customer.find());
});

router.get("/:id", async (req, res) => {
  let customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).send(`ID: ${req.params.id} not found`);
  res.send(customer);
});

router.post("/",auth, async (req, res) => {
  if (!schema.validate(req.body).error) {
    let customer = new Customer();

    customer.name = req.body.name;
    customer.phone = req.body.phone;
    if (req.body.isGold) customer.isGold = true;

    let result = await customer.save();
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
  let customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, phone: req.body.phone, isGold: req.body.isGold },
    { new: true }
  );
  if (!customer) return res.status(404).send(`ID: ${req.params.id} not found`);
  res.send(customer);
});

router.delete("/:id",auth, async (req, res) => {
  let result = await Customer.findByIdAndDelete(req.params.id);

  if (!result) return res.status(404).send(`ID: ${req.params.id} not found`);

  res.send(result);
});

module.exports = router;
