let Folder = require("../folder");
let Task = require("../task");
let UserCfg = require("../../config/user");
let { renderList } = require("../util");
module.exports = function(dir) {
  if (dir) {
    Folder.get(UserCfg.uid, { name: dir }).then(function(data) {
      if (data.length > 0) {
        Task.getTasks(UserCfg.uid, {
          folderId: data[0]._id
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
        console.log("没有当前目录");
        process.exit(0);
      }
    });
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
