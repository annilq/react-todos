let User = require("../user");
let {saveuid} = require("../util");
module.exports = function(user) {
  let username = user.split(":")[0];
  let password = user.split(":")[1];
  User.login(username, password).then(
    function(uid) {
      console.log("登录成功", uid);
      // global.uid = uid;
      saveuid(uid)
      process.exit(0);
    },
    function(msg) {
      console.log(msg);
      process.exit(1);
    }
  );
};
