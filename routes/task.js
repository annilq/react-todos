var express = require("express");
var Task = require("../models/tasks");

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

router
  .route("/")
  // create a task (accessed at POST http://localhost:8080/api/tasks)
  .post(function(req, res) {
    var task = new Task(); // create a new instance of the Bear model
    task.name = req.body.name; // set the tasks name (comes from the request)
    task.folderId = req.body.id;
    console.log(task.name);
    // save the task and check for errors
    task.save(function(err) {
      if (err) res.send(err);
      res.json({ _id: task._id, name: task.name });
    });
  })
  .get(function(req, res) {
    const { id } = req.query;
    if (id) {
      Task.find({ folderId: id }, function(err, tasks) {
        if (err) res.send(err);
        res.json(tasks);
      });
    } else {
      Task.find(function(err, tasks) {
        if (err) res.send(err);
        res.json(tasks);
      });
    }
  });
// 单个任务操作
router
  .route("/:id")
  .get(function(req, res) {
    Task.findById(req.params.d, function(err, task) {
      if (err) res.send(err);
      res.json(task);
    });
  })
  .put(function(req, res) {
    Task.findById(req.params.id, function(err, task) {
      if (err) res.send(err);
      task = Object.assign(task, req.body); // update the tasks info
      // save the task
      task.save(function(err) {
        if (err) res.send(err);
        res.json({ message: "task updated!" });
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

        res.json({ message: "Successfully deleted" });
      }
    );
  });
module.exports = router;
