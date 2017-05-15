var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var FolderSchema   = new Schema({
    name: String
});

module.exports = mongoose.model('Folder', FolderSchema);
