var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  name: String,
  remark: String,
  userId: String,
  status: { type: Boolean, default: false },
  star: { type: Boolean, default: false },
  folderId: String
});

module.exports = mongoose.model("Task", TaskSchema);
