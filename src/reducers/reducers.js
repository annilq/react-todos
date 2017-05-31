function wunderlist(
  state = {
    folders: [], //文件夹
    folderInfo: {}, //文件夹信息
    tasks: [] //任务列表
  },
  action
) {
  let folders, tasks;
  switch (action.type) {
    case "SET_FOLDERS":
      // 设置当前文件夹
      folders = [...action.data];
      return Object.assign({}, state, {
        folders: folders
      });
    case "SET_FOLDER_INFO":
      // 设置当前folderId
      return Object.assign({}, state, {
        folderInfo: action.folderInfo
      });
    case "SET_TASKS":
      // 设置任务列表
      tasks = [...action.data];
      return Object.assign({}, state, {
        tasks
      });

    default:
      return state;
  }
}
export default wunderlist;
