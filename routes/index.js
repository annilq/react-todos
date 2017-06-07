var express = require("express");
var router = express.Router(); // get an instance of the express Router

var folders = require("./folders");
var task = require("./task");
function routers(app) {
  app.use("/api/folders", folders);
  app.use("/api/tasks", task);
}
module.exports = routers;
