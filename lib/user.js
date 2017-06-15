var bcrypt = require("bcrypt");
let User = require("../models/user");
function login(username, password) {
  return new Promise(function(resolve, reject) {
    User.findOne({ name: username }, function(err, data) {
      if (err) res.send(err);
      if (!data) {
        reject("该用户不存在");
      } else {
        bcrypt.hash(password, data.salt, function(err, hash) {
          if (hash === data.password) {
            // 登录成功后配置用户默认目录
            resolve(data._id);
          } else {
            reject("密码错误");
          }
        });
      }
    });
  });
}
module.exports = { login };
