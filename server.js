var express = require("express");
var app = express();
var cors = require("cors");
var bodyParser = require("body-parser");

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var port = process.env.PORT || 8080; // set our port
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/wunderlist");
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
var folders = require('./routes/folders');
var task = require('./routes/task');
app.use("/api/folders", folders);
app.use("/api/tasks", task);
// START THE SERVER
// =============================================================================
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})
app.listen(port);
console.log("Magic happens on port " + port);
