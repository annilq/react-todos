var express = require("express");
var app = express();
var cors = require("cors");
var bodyParser = require("body-parser");
var session = require("express-session");

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(express.static("build"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(
  session({
    secret: "annilq",
    saveUninitialized: true,
    resave: false
  })
);
app.set("port", process.env.PORT || 8080); // set our port
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/react-todos");
// 初始化数据库
require("./initdb/initdb")();
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
var routee = require("./routes");
routee(app);
// START THE SERVER
// =============================================================================
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {}
  });
});

app.listen(app.get("port"));
// var server = http.createServer(app);
// var boot = function () {
//   server.listen(app.get('port'), function(){
//     console.info('Express server listening on port ' + app.get('port'));
//   });
// }
// var shutdown = function() {
//   server.close();
// }
// if (require.main === module) {
//   boot();
// } else {
//   console.info('Running app as a module')
//   exports.boot = boot;
//   exports.shutdown = shutdown;
//   exports.port = app.get('port');
// }
