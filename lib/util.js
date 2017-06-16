const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
function renderList(lists) {
  lists.forEach(item => renderItem(item.name));
}

function renderItem(name) {
  console.log(chalk.green(name));
}
function saveuid(uid) {
  fs.writeFileSync(
    path.resolve(__dirname, "../config/user.json"),
    JSON.stringify({ uid: uid })
  );
}

exports.saveuid = saveuid;
exports.renderItem = renderItem;
exports.renderList = renderList;
