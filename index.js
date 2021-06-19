const winston = require('winston');
const express = require("express");

require('./startup/errorHandling')();
const {conn,autoIncrement} = require('./startup/db')();
module.exports.autoIncrement = autoIncrement;
module.exports.conn = conn;

const app = express();
require('./startup/routers')(app);
require('./startup/config')();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  winston.info(`Server running on ${port}`);
});
