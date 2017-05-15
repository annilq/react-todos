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
      dispatch({ type: "SET_FOLDER_NAME", folderName: data.data.name });
    });
  };
}
export function getTasks(id) {
  return function(dispatch, getState) {
    Request.get(Request.url + "tasks", {
      params: { id: id }
    }).then(function(data) {
      dispatch({ type: "GET_TASKS", data: data.data });
      dispatch({ type: "SET_FOLDERID", data: id });
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
