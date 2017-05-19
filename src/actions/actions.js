import axios from "axios";
let Request = axios;
Request.url = "http://127.0.0.1:8080/api/";

export function addFolder(name) {
  return function(dispatch, getState) {
    Request.post(Request.url + "folders", {
      name: name
    }).then(function(data) {
      dispatch({
        type: "ADD_FOLDER",
        data: data.data
      });
    });
  };
}
export function getFolders() {
  return function(dispatch, getState) {
    Request.get(Request.url + "folders").then(function(data) {
      dispatch({ type: "GET_FOLDERS", data: data.data });
    });
  };
}
export function getFolderInfo(id) {
  return function(dispatch, getState) {
    Request.get(Request.url + "folders/" + id).then(function(data) {
      dispatch(setFolderInfo(data.data));
    });
  };
}
export function getHomeFolderInfo() {
  return function(dispatch, getState) {
    Request.get(Request.url + "folders", {
      params: { type: 1 }
    }).then(function(data) {
      console.log(data);
      dispatch(setFolderInfo(data.data[0]));
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
    Request.get(Request.url + "tasks", {
      params: { id: id }
    }).then(function(data) {
      dispatch({ type: "GET_TASKS", data: data.data });
    });
  };
}
export function addTask(id, name) {
  return function(dispatch, getState) {
    Request.post(Request.url + "tasks", {
      id,
      name
    }).then(function(data) {
      dispatch({ type: "ADD_TASK", data: data.data });
    });
  };
}
export function deleteTask(id) {
  return function(dispatch, getState) {
    Request.delete(Request.url + "tasks", {
      id,
      name
    }).then(function(data) {
      dispatch({ type: "DELETE_TASK", data: data.data });
    });
  };
}
export function updateTask(id) {
  return function(dispatch, getState) {
    Request.put(Request.url + "tasks", {
      id,
      name
    }).then(function(data) {
      dispatch({ type: "UPDATE_TASK", data: data.data });
    });
  };
}
export function showTaskDetail(data) {
  return {
    type: "TASK_DATA",
    data
  };
}
