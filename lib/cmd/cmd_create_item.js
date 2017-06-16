let Folder = require("../folder");
let Task = require("../task");
let UserCfg = require("../../config/user");
module.exports = function(type, name) {
  if (type == "folder") {
    Folder.post(UserCfg.uid, name).then(
      function(data) {
        console.log("Folder", data.name, "created!");
        process.exit(0);
      },
      function(msg) {
        console.log(msg);
        process.exit(1);
      }
    );
  } else {
    Task.post(UserCfg.uid, UserCfg.folderId, name).then(
      function(data) {
        console.log("todo", data.name, "created!");
        process.exit(0);
      },
      function(msg) {
        console.log(msg);
        process.exit(1);
      }
    );
  }
};
