var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var FolderSchema = new Schema({
  userId: String,
  name: String,
  type: { type: String, default: "folder" },
  fixed: Boolean
});

module.exports = mongoose.model("Folder", FolderSchema);
