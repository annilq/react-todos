var mongoose = require("mongoose");
var db = require("../config/db");
function initdb() {
  return mongoose.connect(db.url);
}
module.exports = initdb;
