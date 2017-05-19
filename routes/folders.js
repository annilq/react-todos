var express = require("express");
var Folder = require("../models/folders");
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router
router
  .route("/")
  // create a folder (accessed at POST http://localhost:8080/api/folders)
  .post(function(req, res) {
    var folder = new Folder(); // create a new instance of the Folder model
    folder.name = req.body.name; // set the folders name (comes from the request)
    console.log(folder.name);
    // save the folder and check for errors
    folder.save(function(err) {
      if (err) res.send(err);
      res.json({ _id: folder._id, name: folder.name });
    });
  })
  .get(function(req, res) {
    Folder.find(req.query, function(err, folders) {
      if (err) res.send(err);
      res.json(folders);
    });
  });
// 编辑文件夹信息
router
  .route("/:id")
  .get(function(req, res) {
    Folder.findById(req.params.id, function(err, folder) {
      if (err) res.send(err);
      res.json(folder);
    });
  })
  // create a folder (accessed at POST http://localhost:8080/api/folders)
  .put(function(req, res) {
    // use our folder model to find the folder we want
    Folder.findById(req.params.id, function(err, folder) {
      if (err) res.send(err);
      folder.name = req.body.name; // update the folders info
      // save the folder
      folder.save(function(err) {
        if (err) res.send(err);

        res.json({ message: "Folder updated!" });
      });
    });
  })
  .delete(function(req, res) {
    Folder.remove(
      {
        _id: req.params.id
      },
      function(err, folder) {
        if (err) res.send(err);

        res.json({ message: "Successfully deleted" });
      }
    );
  });
module.exports = router;
