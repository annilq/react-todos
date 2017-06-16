var express = require("express");
var Folder = require("../lib/folder");
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router
router
  .route("/")
  // create a folder (accessed at POST http://localhost:8080/api/folders)
  .post(function(req, res) {
    Folder.post(req.session.uid, req.body).then(
      function(data) {
        res.json({ code: 0, data: data, message: "添加成功" });
      },
      function(err) {
        if (err) res.send(err);
      }
    );
  })
  .get(function(req, res) {
    Folder.get(req.session.uid, req.query).then(
      function(data) {
        res.json({ code: 0, data: data, message: "" });
      },
      function(err) {
        if (err) res.send(err);
      }
    );
  });
// 编辑文件夹信息
router
  .route("/:id")
  .get(function(req, res) {
    Folder.getFolderById(req.params.id).then(
      function(folder) {
        res.json({ code: 0, data: folder, message: "" });
      },
      function(err) {
        if (err) res.send(err);
      }
    );
  })
  // create a folder (accessed at POST http://localhost:8080/api/folders)
  .put(function(req, res) {
    // use our folder model to find the folder we want
    Folder.put(req.params.id, req.body).then(
      function(folder) {
        res.json({ code: 0, data: folder, message: "" });
      },
      function(err) {
        if (err) res.send(err);
      }
    );
  })
  .delete(function(req, res) {
    Folder.del(req.params.id).then(
      function(folder) {
        res.json({ code: 0, data: folder, message: "删除成功" });
      },
      function(err) {
        if (err) res.send(err);
      }
    );
  });
module.exports = router;
