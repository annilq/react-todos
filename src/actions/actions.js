import Request from "../util/request";
import { browserHistory } from "react-router";
export function addFolder(name) {
  return function(dispatch, getState) {
    let state = getState();
    let { folders } = state;
    Request.post("/folders", {
      name: name
    }).then(function(data) {
      folders.push(data);
      dispatch({
        type: "SET_FOLDERS",
        data: folders
      });
    });
  };
}
export function updateFolder(name, id) {
  return function(dispatch, getState) {
    let state = getState();
    let { folders } = state;
    Request.put(`/folders/${id}`, {
      name: name
    }).then(function(data) {
      folders.forEach(item => {
        if (item._id === id) {
          item = Object.assign(item, data);
        }
      });
      dispatch({ type: "SET_FOLDERS", data: folders });
    });
  };
}
export function deleteFolder(id) {
  return function(dispatch, getState) {
    let state = getState();
    let { folders, folderInfo } = state;
    Request.delete(`/folders/${id}`).then(function(data) {
      folders = folders.filter(item => item._id !== id);
      dispatch({ type: "SET_FOLDERS", data: folders });
      // 如果删除的目录是当前目录则跳转到主目录
      if (folderInfo._id === id) {
        dispatch(setFolderInfo(folders[0]));
        browserHistory.replace("/home");
      }
    });
  };
}
export function getFolders() {
  return function(dispatch, getState) {
    Request.get("/folders").then(function(data) {
      dispatch({ type: "SET_FOLDERS", data: data });
    });
  };
}
export function getFolderInfoById(id) {
  return function(dispatch, getState) {
    Request.get(`/folders/${id}`).then(function(data) {
      dispatch(setFolderInfo(data));
    });
  };
}
export function getFolderInfoByType(type) {
  return function(dispatch, getState) {
    Request.get("/folders", {
      type: type
    }).then(function(data) {
      dispatch(setFolderInfo(data[0]));
    });
  };
}
export function setFolderInfo(data) {
  return {
    type: "SET_FOLDER_INFO",
    folderInfo: data
  };
}
export function getTasks(id) {
  return function(dispatch, getState) {
    Request.get("/tasks", {
      folderId: id
    }).then(function(data) {
      dispatch({ type: "SET_TASKS", data: data });
    });
  };
}
export function getTasksbyParam(params) {
  return function(dispatch, getState) {
    Request.get("/tasks", params).then(function(data) {
      dispatch({ type: "SET_TASKS", data: data });
    });
  };
}
/**
 * 新增项目，无id则表示在首页新增
 * @param {[type]} id   [目录id]
 * @param {[type]} name [description]
 */
export function addTask(id, name) {
  return function(dispatch, getState) {
    let state = getState();
    let { tasks } = state;
    Request.post("/tasks", {
      id,
      name
    }).then(function(data) {
      tasks.unshift(data);
      dispatch({ type: "SET_TASKS", data: tasks });
    });
  };
}
export function deleteTask(id) {
  return function(dispatch, getState) {
    let state = getState();
    let { tasks } = state;
    Request.delete(`/tasks/${id}`).then(function(data) {
      tasks = tasks.filter(item => item._id !== id);
      dispatch({ type: "SET_TASKS", data: tasks });
    });
  };
}
// 更新任务
/**
 * [updateTask 更新任务]
 * @param  {Number} [remote=1] [跟新本地任务详情]
 * @return [type]              [description]
 */
export function updateLocalTask(task) {
  return function(dispatch, getState) {
    let state = getState();
    let { tasks } = state;
    tasks.forEach(item => {
      if (item._id === task._id) {
        item = Object.assign(item, task);
      }
    });
    dispatch({ type: "SET_TASKS", data: tasks });
  };
}
// 更新远程任务
export function updateRemoteTask(task) {
  return function(dispatch, getState) {
    let state = getState();
    let { tasks } = state;
    Request.put(`/tasks/${task._id}`, task).then(function(data) {
      tasks.forEach(item => {
        if (item._id === task._id) {
          item = Object.assign(item, task);
        }
      });
      dispatch({ type: "SET_TASKS", data: tasks });
    });
  };
}
