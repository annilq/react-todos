const ModuleType = {
  todo: "create todos",
  folder: "create folder"
};
module.exports = function(type) {
  console.log(ModuleType[type]);
};
