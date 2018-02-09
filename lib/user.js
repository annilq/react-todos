var bcrypt = require("bcrypt");
let UserModel = require("../models/user");

class User {
  async login(username, password) {
    let user = await this.findUser(username);
    if (!user) {
      return Promise.reject("该用户不存在");
    } else {
      return new Promise(function(resolve, reject) {
        bcrypt.hash(password, user.salt, function(err, hash) {
          if (hash === user.password) {
            // 登录成功后配置用户默认目录
            return resolve(user._id);
          } else {
            return reject("密码错误");
          }
        });
      });
    }
  }
  findUser(name) {
    return UserModel.findOne({ name });
  }
}
module.exports = new User();
