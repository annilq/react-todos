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
  async initfolders(uid) {
    let folders = await this.get(uid);
    if (folders.length < 1) {
      Promise.all(
        this.defalutFolder.map(folderItem => {
          this.post(uid, folderItem);
        })
      ).then(function(folders) {
        console.log("init default folders");
      });
    }
  }
  get(uid, param) {
    var query = Object.assign({ userId: uid }, param);
    return FolderModel.find(query);
  }
  getFolderById(folderId) {
    return FolderModel.findById(folderId);
  }
  post(uid, param) {
    var folder = new FolderModel(); // create a new instance of the Folder model
    folder.userId = uid; // set the folders name (comes from the request)
    folder = Object.assign(folder, param); // set the folders name (comes from the request)
    // save the folder and check for errors
    return folder.save();
  }
  put(folderId, param) {
    return FolderModel.findById(folderId);
  }
  del(folderId) {
    return TaskModel.remove({
      folderId: folderId
    });
  }
}
module.exports = new Folder();
