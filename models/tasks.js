var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  name: String,
  remark: String,
  star: { type: Boolean, default: false },
  subtask: Array,
  folderId: String
});

module.exports = mongoose.model("Task", TaskSchema);
