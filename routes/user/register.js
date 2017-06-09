var express = require("express");
var bcrypt = require("bcrypt");
var User = require("../../models/user");

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

router
  .route("/")
  // create a user (accessed at POST http://localhost:8080/api/users)
  .post(function(req, res) {
    var user = new User(); // create a new instance of the Bear model
    user.name = req.body.name;
    user.email = req.body.email;
    // 生成10个字符的盐
    User.findOne({ name: user.name }, function(err, data) {
      if (err) res.send(err);
      if (data) {
        res.json({ code: -1, message: "该用户已经注册过了" });
      } else {
        bcrypt.genSalt(10, function(err, salt) {
          user.salt = salt;
          bcrypt.hash(req.body.password, salt, function(err, hash) {
            user.password = hash;
            // 保存用户信息
            user.save(function(err, useritem) {
              if (err) {
                res.send(err);
              } else {
                res.json({ code: 0, data: user, message: "注册成功" });
              }
            });
          });
        });
      }
    });
  });
module.exports = router;
