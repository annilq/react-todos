var fs = require("fs");
var shell = require("shelljs");
let { login } = require("../user");
module.exports = function(user) {
  let username = user.split(":")[0];
  let password = user.split(":")[1];
  login(username, password).then(
    function(uid) {
      console.log("登录成功");
      global.uid = uid;
      process.stdout.write(" $todo>:");
      process.stdin.on("data", function(buf) {
        let cmd = buf.toString();
        // 判断当前命令是否在定义当中
        if (cmd) {
          shell.exec("todo " + cmd, function(code, stdout, stderr) {
            console.log("111", global.uid);
            // process.stdout.write(" $todo>:");
          });
        } else {
          shell.echo("请输入正确命令");
        }
      });
      // shell.stuin('cmd');
    },
    function(msg) {
      console.log(msg);
      shell.exit(1);
    }
  );
};
