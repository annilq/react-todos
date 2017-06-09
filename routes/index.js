var express = require("express");
var router = express.Router(); // get an instance of the express Router

var user = require("./user/user");
var folders = require("./folders");
var task = require("./task");
function routers(app) {
  app.use("/api/register", user.register);
  app.use("/api/login", user.login);
  app.use("/api/logout", user.authUser, user.logout);
  app.use("/api/users", user.authUser, user.users);
  app.use("/api/folders", user.authUser, folders);
  app.use("/api/tasks", user.authUser, task);
}
module.exports = routers;
