var FolderModel = require("../models/folders");
var TaskModel = require("../models/tasks");
class Folder {
  constructor() {
    this.defalutFolder = [
      {
        name: "home",
        type: "home",
        fixed: true
      },
      {
        name: "star",
        type: "star",
        fixed: true
      },
      {
        name: "done",
        type: "done",
        fixed: true
      }
    ];
  }
  initfolders(uid) {
    this.get(uid).then(
      folders => {
        if (folders.length < 1) {
          Promise.all(
            this.defalutFolder.map(folderItem => {
              this.post(uid, folderItem);
            })
          ).then(function(folders) {
            console.log("init default folders");
          });
        }
      },
      err => {
        if (err) reject(err);
      }
    );
  }
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
      folder = Object.assign(folder, param); // set the folders name (comes from the request)
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
