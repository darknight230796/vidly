const express = require("express");
const { schema, User } = require("../models/user");
const router = express.Router();
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");

router.get("/me", auth, async (req, res) => {
  return res.send(await User.findById(req.user._id).select('-password'));
});

router.post("/", async (req, res) => {
  if (schema.validate(req.body).error)
    return res
      .status(400)
      .send(schema.validate(req.body).error.details[0].message);

  let user = new User(_.pick(req.body, ["name", "email","isAdmin"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);
  try {
    user = await user.save();
    const token = user.getAuthToken();
    res.header("x-auth-token", token).send(_.pick(user, ["name", "email"]));
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
