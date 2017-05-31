function wunderlist(
  state = {
    folders: [], //文件夹
    folderInfo: {}, //文件夹信息
    tasks: [], //任务列表
    taskData: {} //任务详情
  },
  action
) {
  let folders, tasks;
  switch (action.type) {
    case "SET_FOLDERS":
      // 获取当前文件夹
      folders = [...action.data];
      return Object.assign({}, state, {
        folders: folders
      });
    case "SET_FOLDER_INFO":
      // 获取当前folderId
      return Object.assign({}, state, {
        folderInfo: action.folderInfo
      });
    case "TASK_DATA":
      // 新增任务
      let taskData = action.data;
      return Object.assign({}, state, {
        taskData
      });
    case "SET_TASKS":
      // 获取任务列表
      tasks = [...action.data];
      return Object.assign({}, state, {
        tasks
      });

    default:
      return state;
  }
}
export default wunderlist;
