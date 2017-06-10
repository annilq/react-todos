var express = require("express");
var Folder = require("../models/folders");
var Task = require("../models/tasks");
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router
router
  .route("/")
  // create a folder (accessed at POST http://localhost:8080/api/folders)
  .post(function(req, res) {
    var folder = new Folder(); // create a new instance of the Folder model
    folder.userId = req.session.uid; // set the folders name (comes from the request)
    folder.name = req.body.name; // set the folders name (comes from the request)
    console.log(folder.name);
    // save the folder and check for errors
    folder.save(function(err, data) {
      if (err) res.send(err);
      res.json({ code: 0, data: data, message: "添加成功" });
    });
  })
  .get(function(req, res) {
    var query = Object.assign({ userId: req.session.uid }, req.query);
    Folder.find(query, function(err, folders) {
      if (err) res.send(err);
      res.json({ code: 0, data: folders, message: "" });
    });
  });
// 编辑文件夹信息
router
  .route("/:id")
  .get(function(req, res) {
    Folder.findById(req.params.id, function(err, folder) {
      if (err) res.send(err);
      res.json({ code: 0, data: folder, message: "" });
    });
  })
  // create a folder (accessed at POST http://localhost:8080/api/folders)
  .put(function(req, res) {
    // use our folder model to find the folder we want
    Folder.findById(req.params.id, function(err, folder) {
      if (err) res.send(err);
      folder.name = req.body.name; // update the folders info
      // save the folder
      folder.save(function(err, folderitem) {
        if (err) res.send(err);
        res.json({ code: 0, data: folderitem, message: "更新成功" });
      });
    });
  })
  .delete(function(req, res) {
    Task.remove(
      {
        folderId: req.params.id
      },
      function(err, task) {
        if (err) res.send(err);
        console.log("项目删除成功");
        Folder.remove(
          {
            _id: req.params.id
          },
          function(err, folders) {
            if (err) res.send(err);
            console.log("目录删除成功");
            res.json({ code: 0, data: null, message: "目录删除成功" });
          }
        );
      }
    );
  });
module.exports = router;
