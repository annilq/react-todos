var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  name: String,
  remark: String,
  subtask: Array,
  folderId: String
});

module.exports = mongoose.model("Task", TaskSchema);
