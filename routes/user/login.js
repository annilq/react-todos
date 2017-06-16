var express = require("express");
var bcrypt = require("bcrypt");
var User = require("../../models/user");
var Folder = require("../../lib/folder");

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

router
  .route("/")
  // create a user (accessed at POST http://localhost:8080/api/users)
  .post(function(req, res) {
    var user = new User(); // create a new instance of the Bear model
    user.name = req.body.name;
    user.password = req.body.password;
    // 生成10个字符的盐
    User.findOne({ name: user.name }, function(err, data) {
      if (err) res.send(err);
      if (!data) {
        res.json({ code: -1, message: "该用户不存在" });
      } else {
        bcrypt.hash(user.password, data.salt, function(err, hash) {
          if (hash === data.password) {
            req.session.uid = data._id;
            // 登录成功后配置用户默认目录
            Folder.initfolders(req.session.uid);
            res.json({ code: 0, data: user, message: "登录成功" });
          } else {
            res.json({ code: -1, message: "密码错误" });
          }
        });
      }
    });
  });
module.exports = router;
