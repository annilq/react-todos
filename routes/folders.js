var express = require("express");
var Folder = require("../models/folders");
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router
function setIndexFolder() {
  var indexFolder = [
    {
      name: "home"
    },
    {
      name: "like"
    },
    {
      name: "done"
    }
  ];
  let promises = indexFolder.map(function(folderItem) {
    let promise = new Promise(function(resolve, reject) {
      var folder = new Folder(); // create a new instance of the Folder model
      folder.name = folderItem.name; // set the folders name
      folder.save(function(err) {
        if (err) reject(err);
        resolve({ _id: folder.id, name: folder.name });
      });
    });
    return promise;
  });
  return promises;
}

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
    Folder.find(function(err, folders) {
      console.log(folders.length);
      if (err) res.send(err);
      // 如果没有目录新增首页目录
      if (folders.length < 1) {
        Promise.all(setIndexFolder()).then(function(folders) {
          res.json(folders);
        });
      } else {
        res.json(folders);
      }
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
