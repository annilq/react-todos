var Folder = require("../models/folders");
function setIndexFolder(uid) {
  var indexFolder = [
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
  let promises = indexFolder.map(function(folderItem) {
    let promise = new Promise(function(resolve, reject) {
      var folder = new Folder(); // create a new instance of the Folder model
      folder.userId = uid; // set the folders name
      folder.name = folderItem.name; // set the folders name
      folder.fixed = folderItem.fixed; // set the folders fixed
      folder.type = folderItem.type; // set the folders type
      folder.save(function(err, folder) {
        if (err) reject(err);
        resolve(folder);
      });
    });
    return promise;
  });
  return promises;
}
function initdb(uid) {
  Folder.find({ userId: uid }, function(err, folders) {
    if (err) res.send(err);
    if (folders.length < 1) {
      Promise.all(setIndexFolder(uid)).then(function(folders) {});
    }
  });
}
module.exports = initdb;
