var express = require("express");
var app = express();
var cors = require("cors");
var bodyParser = require("body-parser");
var session = require("express-session");
const MongoStore = require("connect-mongo")(session);
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(express.static("build"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.set("port", process.env.PORT || 8080); // set our port
var mongoose = require("./initdb/initdb")();
app.use(
  session({
    secret: "annilq",
    saveUninitialized: true,
    resave: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
var route = require("./routes");
route(app);
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
// START THE SERVER
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
