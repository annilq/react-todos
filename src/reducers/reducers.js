function wunderlist(
  state = {
    folders: [], //文件夹
    folderId: -1,
    tasks: [], //任务列表
    taskData: {}, //任务详情
    folderName: "" //文件夹名字
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
    case "SET_FOLDERID":
      // 获取当前folderId
      return Object.assign({}, state, {
        folderId: action.data
      });

    case "SET_FOLDER_NAME":
      // 获取当前folderId
      return Object.assign({}, state, {
        folderName: action.folderName
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
      // console.log(action.data);
      // let task = action.data;
      // return Object.assign({}, state, {
      //   tasks: task
      // });
      break;
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
