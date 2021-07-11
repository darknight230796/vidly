const mongoose = require("mongoose");
const winston = require("winston");
const config = require('config');
module.exports = () => {
  const conn = mongoose.createConnection(config.get('db'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  if (conn) winston.info(`Connected to database ${config.get('db')}`);

  const autoIncrement = require("mongoose-auto-increment");
  autoIncrement.initialize(conn);

  return {
    conn: conn,
    autoIncrement: autoIncrement,
  };
};
