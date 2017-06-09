var register = require("./register");
var login = require("./login");
var express = require("express");
var User = require("../../models/user");
var users = express.Router(); // get an instance of the express Router

users.route("/").get(function(req, res) {
  User.find(req.query, function(err, users) {
    if (err) res.send(err);
    res.json({ code: 0, data: users, message: "" });
  });
});
function authUser(req, res, next) {
  if (req.session.uid) {
    next();
  } else {
    res.json({ code: -2, message: "账号过期,请重新登录" });
  }
}
function logout(req, res, next) {
  req.session.destroy(function(err) {
    if (err) throw err;
    res.json({ code: 0, data: null, message: "退出登录成功" });
  });
}
module.exports = { register, login, users, authUser, logout };
