var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  name: String,
  folderId: String
});

module.exports = mongoose.model("Task", TaskSchema);
