var express = require("express");
var bcrypt = require("bcrypt");
var User = require("../../lib/user");
var Folder = require("../../lib/folder");

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

router
  .route("/")
  // create a user (accessed at POST http://localhost:8080/api/users)
  .post(function(req, res) {
    // 生成10个字符的盐
    User.login(req.body.name, req.body.password)
      .then(function(uid) {
        req.session.uid = uid;
        Folder.initfolders(uid);
        res.json({ code: 0, data: uid, message: "登录成功" });
      })
      .catch(function(msg) {
        res.json({ code: -1, message: msg });
      });
  });
module.exports = router;
