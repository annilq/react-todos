var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  name: String,
  remark: String,
  status: { type: Boolean, default: false },
  star: { type: Boolean, default: false },
  subtask: Array,
  folderId: String
});

module.exports = mongoose.model("Task", TaskSchema);
