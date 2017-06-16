var TaskModel = require("../models/tasks");
class Task {
  initfolders(uid, param) {
    return new Promise(function(resolve, reject) {
      var query = Object.assign({ userId: uid }, param);
      TaskModel.find(query, function(err, tasks) {
        if (err) reject(err);
        resolve(tasks);
      });
    });
  }
  getTasks(uid, param) {
    return new Promise(function(resolve, reject) {
      var query = Object.assign({ userId: uid }, param);
      TaskModel.find(query, function(err, tasks) {
        if (err) reject(err);
        resolve(tasks);
      });
    });
  }
  getTaskById(taskId) {
    return new Promise(function(resolve, reject) {
      TaskModel.findById(taskId, function(err, task) {
        if (err) reject(err);
        resolve(tasks);
      });
    });
  }
  post(uid, folderId, name) {
    return new Promise(function(resolve, reject) {
      var task = new TaskModel(); // create a new instance of the Bear model
      task.name = name; // set the tasks name (comes from the request)
      task.userId = uid; // set the tasks uid
      task.folderId = folderId;
      console.log(task.name);
      // save the task and check for errors
      task.save(function(err, data) {
        if (err) reject(err);
        resolve(data);
      });
    });
  }
  del(taskId) {
    return new Promise(function(resolve, reject) {
      TaskModel.remove(
        {
          _id: taskId
        },
        function(err, data) {
          if (err) reject(err);
          resolve(data);
        }
      );
    });
  }
  put(taskId, param) {
    return new Promise(function(resolve, reject) {
      TaskModel.findById(taskId, function(err, task) {
        if (err) res.send(err);
        task = Object.assign(task, param); // update the tasks info
        // save the task
        task.save(function(err, data) {
          if (err) reject(err);
          resolve(data);
        });
      });
    });
  }
}
module.exports = new Task();
