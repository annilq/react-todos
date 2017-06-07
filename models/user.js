var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  folders: {
    type: Array,
    required: true,
    default: []
  },
  password: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model("User", UserSchema);
