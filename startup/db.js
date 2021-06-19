const mongoose = require("mongoose");
const winston = require("winston");
module.exports = () => {
  const conn = mongoose.createConnection("mongodb://localhost/vidly", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  if (conn) winston.info("Connected to database");

  const autoIncrement = require("mongoose-auto-increment");
  autoIncrement.initialize(conn);

  return {
    conn: conn,
    autoIncrement: autoIncrement,
  };
};
