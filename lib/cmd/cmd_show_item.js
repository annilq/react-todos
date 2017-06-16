let Folder = require("../folder");
let Task = require("../task");
let UserCfg = require("../../config/user");
let { renderList } = require("../util");
module.exports = function(dir) {
  if (dir) {
    Task.getTasks(UserCfg.uid, {
      folderId: UserCfg.folderId
    }).then(
      function(data) {
        renderList(data);
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
        renderList(data);
        process.exit(0);
      },
      function(msg) {
        console.log(msg);
        process.exit(1);
      }
    );
  }
};
