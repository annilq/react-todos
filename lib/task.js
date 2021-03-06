var TaskModel = require("../models/tasks");
class Task {
  getTasks(uid, param) {
    var query = Object.assign({ userId: uid }, param);
    return TaskModel.find(query);
  }
  getTaskById(taskId) {
    return TaskModel.findById(taskId);
  }
  post(uid, folderId, name) {
    var task = new TaskModel(); // create a new instance of the Bear model
    task.name = name; // set the tasks name (comes from the request)
    task.userId = uid; // set the tasks uid
    task.folderId = folderId;
    // save the task and check for errors
    return task.save();
  }
  del(taskId) {
    return TaskModel.remove({
      _id: taskId
    });
  }
  async put(taskId, param) {
    let task = await this.getTaskById(taskId);
    task = Object.assign(task, param);
    return task.save();
  }
}
module.exports = new Task();
