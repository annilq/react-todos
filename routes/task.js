var express = require("express");
var Task = require("../models/tasks");
var Folder = require("../models/folders");

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

router
  .route("/")
  // create a task (accessed at POST http://localhost:8080/api/tasks)
  .post(function(req, res) {
    var task = new Task(); // create a new instance of the Bear model
    task.name = req.body.name; // set the tasks name (comes from the request)
    task.userId = req.session.uid; // set the tasks name (comes from the request)
    if (req.body.id) {
      task.folderId = req.body.id;
    }
    console.log(task.name);
    // save the task and check for errors
    task.save(function(err, taskitem) {
      if (err) res.send(err);
      res.json({ code: 0, data: taskitem, message: "添加成功" });
    });
  })
  .get(function(req, res) {
    var query = Object.assign({ userId: req.session.uid }, req.query);
    Task.find(query, function(err, tasks) {
      if (err) res.send(err);
      res.json({ code: 0, data: tasks, message: "" });
    });
  });
// 单个任务操作
router
  .route("/:id")
  .get(function(req, res) {
    Task.findById(req.params.d, function(err, task) {
      if (err) res.send(err);
      res.json({ code: 0, data: task, message: "" });
    });
  })
  .put(function(req, res) {
    Task.findById(req.params.id, function(err, task) {
      if (err) res.send(err);
      task = Object.assign(task, req.body); // update the tasks info
      // save the task
      task.save(function(err, data) {
        if (err) res.send(err);
        res.json({ code: 0, data: data, message: "更新成功" });
      });
    });
  })
  .delete(function(req, res) {
    Task.remove(
      {
        _id: req.params.id
      },
      function(err, folder) {
        if (err) res.send(err);
        res.json({ code: 0, data: null, message: "删除成功" });
      }
    );
  });
module.exports = router;
