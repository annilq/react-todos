let Folder = require("../folder");
let Task = require("../task");
let UserCfg = require("../../config/user");
module.exports = function(dir) {
  if (dir) {
    Task.get(UserCfg.uid, {
      folderId: UserCfg.folderId
    }).then(
      function(data) {
        console.log(data);
        process.exit(0);
      },
      function(msg) {
        console.log(msg);
        process.exit(1);
      }
    );
  } else {
    Folder.get(UserCfg.uid).then(
      function(data) {
        console.log(data);
        process.exit(0);
      },
      function(msg) {
        console.log(msg);
        process.exit(1);
      }
    );
  }
};
