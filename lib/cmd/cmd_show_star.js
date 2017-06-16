let Task = require("../task");
let UserCfg = require("../../config/user");
let { renderList } = require("../util");
module.exports = function() {
  Task.getTasks(UserCfg.uid, {
    star: true
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
};
