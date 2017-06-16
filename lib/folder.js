var FolderModel = require("../models/folders");
var TaskModel = require("../models/tasks");
class Folder {
  constructor() {}
  get(uid, param) {
    return new Promise(function(resolve, reject) {
      var query = Object.assign({ userId: uid }, param);
      FolderModel.find(query, function(err, folders) {
        if (err) reject(err);
        resolve(folders);
      });
    });
  }
  getFolderById(folderId) {
    return new Promise(function(resolve, reject) {
      FolderModel.findById(folderId, function(err, folders) {
        if (err) reject(err);
        resolve(folders);
      });
    });
  }
  post(uid, param) {
    return new Promise(function(resolve, reject) {
      var folder = new FolderModel(); // create a new instance of the Folder model
      folder.userId = uid; // set the folders name (comes from the request)
      folder.name = param.name; // set the folders name (comes from the request)
      console.log(folder.name);
      // save the folder and check for errors
      folder.save(function(err, data) {
        if (err) reject(err);
        resolve(data);
      });
    });
  }
  put(folderId, param) {
    return new Promise(function(resolve, reject) {
      FolderModel.findById(folderId, function(err, folder) {
        if (err) reject(err);
        folder.name = param.name; // update the folders info
        // save the folder
        folder.save(function(err, data) {
          if (err) reject(err);
          resolve(data);
        });
      });
    });
  }
  del(folderId) {
    return new Promise(function(resolve, reject) {
      TaskModel.remove(
        {
          folderId: folderId
        },
        function(err, task) {
          if (err) reject(err);
          console.log("项目删除成功");
          FolderModel.remove(
            {
              _id: folderId
            },
            function(err, data) {
              if (err) reject(err);
              console.log("目录删除成功");
              if (err) reject(err);
              resolve(data);
            }
          );
        }
      );
    });
  }
}
module.exports = new Folder();
