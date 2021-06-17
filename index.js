const config = require("config");
require("dotenv").config();
const express = require("express");
const debug = require("debug")("app:startUp");

const mongoose = require("mongoose");

const conn = mongoose.createConnection("mongodb://localhost/vidly", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(conn);
module.exports.autoIncrement = autoIncrement;
module.exports.conn = conn;
const app = express();
const homeRouter = require("./router/home");
const port = process.env.PORT || 3000;
const generesRouter = require("./router/genres");
const customerRouter = require("./router/customers");
const movieRouter = require("./router/movies");
const rentalRouter = require("./router/rentals");
const userRouter = require("./router/users");
const authRouter = require("./router/auth");
app.use(express.json());
app.use("/", homeRouter);
app.use("/api/genres", generesRouter);
app.use("/api/customers", customerRouter);
app.use("/api/movies", movieRouter);
app.use("/api/rentals", rentalRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
