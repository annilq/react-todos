var Folder = require("../models/folders");
function setIndexFolder() {
  var indexFolder = [
    {
      name: "home",
      type: 1,
      fixed: true
    },
    {
      name: "like",
      type: 2,
      fixed: true
    },
    {
      name: "done",
      type: 3,
      fixed: true
    }
  ];
  let promises = indexFolder.map(function(folderItem) {
    let promise = new Promise(function(resolve, reject) {
      var folder = new Folder(); // create a new instance of the Folder model
      folder.name = folderItem.name; // set the folders name
      folder.fixed = folderItem.fixed; // set the folders fixed
      folder.type = folderItem.type; // set the folders type
      folder.save(function(err) {
        if (err) reject(err);
        resolve({ _id: folder.id, name: folder.name, fixed: folder.fixed });
      });
    });
    return promise;
  });
  return promises;
}
function initdb() {
  Folder.find(function(err, folders) {
    if (err) res.send(err);
    if (folders.length < 1) {
      Promise.all(setIndexFolder()).then(function(folders) {
        console.log(folders);
      });
    }
  });
}
module.exports = initdb;
