var bcrypt = require("bcrypt");
var UserModel = require("../../models/user");
function User(user) {}
class User {
  constructor(user) {
    this.user = user;
  }
  getUserByName() {
    return new Promise(function(resolve, reject) {
      UserModel.findOne({ name: this.user.name }, function(err, user) {
        if (err) reject(err);
        resolve(user);
      });
    });
  }
  saveUser() {
    // 保存用户信息
    var user = UserModel(this.user);
    user.save(function(err, useritem) {
      if (err) res.send(err);
      res.json({ code: 0, data: useritem, message: "注册成功" });
    });
  }
  hashPassword() {
    bcrypt.genSalt(10, function(err, salt) {
      this.user.salt = salt;
      bcrypt.hash(this.user.password, salt, function(err, hash) {
        this.user.password = hash;
      });
    });
  }
  authUser() {
    return new Promise(function(resolve, reject) {
      this.getUserByName().then(function(user) {
        console.log(user);
        resolve(user);
      });
    });
  }
}
module.exports = User;
