var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var FolderSchema = new Schema({
  name: String,
  type: Number,
  fixed: Boolean
});

module.exports = mongoose.model("Folder", FolderSchema);
