function wunderlist(
  state = {
    folders: [], //文件夹
    folderInfo: {},//文件夹信息
    tasks: [], //任务列表
    taskData: {}, //任务详情
  },
  action
) {
  let folders, tasks;
  switch (action.type) {
    case "GET_FOLDERS":
      // 获取当前文件夹
      folders = action.data;
      return Object.assign({}, state, {
        folders: folders
      });
    case "SET_FOLDER_INFO":
      // 获取当前folderId
      return Object.assign({}, state, {
        folderInfo: action.folderInfo
      });

    case "ADD_FOLDER":
      // 新增文件夹
      let folder = action.data;
      folders = Object.assign([], state.folders);
      folders.push(folder);
      return Object.assign({}, state, {
        folders: folders
      });

    case "ADD_TASK":
      // 新增任务
      let task = action.data;
      tasks = Object.assign([], state.tasks);
      tasks.unshift(task);
      return Object.assign({}, state, {
        tasks: tasks
      });
    case "TASK_DATA":
      // 新增任务
      let taskData = action.data;
      return Object.assign({}, state, {
        taskData
      });
    case "GET_TASKS":
      // 获取任务列表
      console.log(action.data);
      tasks = Object.assign([], action.data);

      return Object.assign({}, state, {
        tasks
      });

    default:
      return state;
  }
}
export default wunderlist;
