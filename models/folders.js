var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var FolderSchema = new Schema({
  name: String,
  fixed: Boolean
});

module.exports = mongoose.model("Folder", FolderSchema);
