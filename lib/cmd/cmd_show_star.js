let Task = require("../task");
let UserCfg = require("../../config/user");
module.exports = function() {
  Task.get(UserCfg.uid, {
    star: true
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
};
