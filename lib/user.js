var bcrypt = require("bcrypt");
let UserModel = require("../models/user");

class User {
  login(username, password) {
    return new Promise((resolve, reject) => {
      this.findUser(username).then(
        function(data) {
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
        },
        function(err) {
          if (err) reject(err);
        }
      );
    });
  }
  findUser(name) {
    return UserModel.findOne({ name });
  }
}
module.exports = new User();
