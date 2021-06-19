const config = require("config");
require("dotenv").config();

module.exports = ()=>{
    if(!process.env.JWT_SECRET_KEY) throw new Error("JwT key not present");
}