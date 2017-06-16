var mongoose = require("mongoose");
var db = require("../config/db");
mongoose.Promise = global.Promise;
function initdb() {
  return mongoose.connect(db.url);
}
module.exports = initdb;
