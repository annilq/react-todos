var express = require("express");
var Task = require("../lib/task");
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

router
  .route("/")
  // create a task (accessed at POST http://localhost:8080/api/tasks)
  .post(function(req, res) {
    Task.post(req.session.uid, req.body.id, req.body.name).then(
      function(task) {
        res.json({ code: 0, data: task, message: "添加成功" });
      },
      function(err) {
        if (err) res.send(err);
      }
    );
  })
  .get(function(req, res) {
    Task.getTasks(req.session.uid, req.query).then(
      function(tasks) {
        res.json({ code: 0, data: tasks, message: "" });
      },
      function(err) {
        if (err) res.send(err);
      }
    );
  });
// 单个任务操作
router
  .route("/:id")
  .get(function(req, res) {
    Task.getTaskById(req.params.id).then(
      function() {
        res.json({ code: 0, data: task, message: "" });
      },
      function(err) {
        if (err) res.send(err);
      }
    );
  })
  .put(function(req, res) {
    Task.put(req.params.id, req.body).then(
      function(data) {
        res.json({ code: 0, data: data, message: "更新成功" });
      },
      function(err) {
        if (err) res.send(err);
      }
    );
  })
  .delete(function(req, res) {
    Task.del(req.params.id).then(
      function() {
        res.json({ code: 0, data: null, message: "删除成功" });
      },
      function(err) {
        if (err) res.send(err);
      }
    );
  });
module.exports = router;
