import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getTasks,
  getTasksbyParam,
  getFolderInfoByType,
  getFolderInfoById
} from "../actions/actions";
import TaskList from "./tasklists";
import TaskListHeader from "./tasklistHeader";
class MainTask extends Component {
  componentDidMount() {
    let { id } = this.props.params;
    let { params } = this.props.route;
    if (id) {
      this.props.getFolderInfoById(id);
    } else {
      this.props.getFolderInfoByType(params.type);
    }
  }
  componentWillReceiveProps(nextProps) {
    let nextparams = nextProps.route.params;
    let { folderInfo } = this.props;
    let curid = folderInfo._id;
    let nextId = nextProps.folderInfo && nextProps.folderInfo._id;
    if (curid !== nextId) {
      if (nextparams && nextparams.query) {
        this.props.getTasksbyParam(nextparams.query);
      } else {
        this.props.getTasks(nextId);
      }
    }
  }
  render() {
    let { tasks } = this.props;
    return (
      <div className="task-container" style={{ flex: 1 }}>
        <TaskListHeader />
        <TaskList tasks={tasks} />
      </div>
    );
  }
}
const mapStateToProps = ({ tasks, folderInfo }) => {
  return {
    tasks,
    folderInfo
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getFolderInfoByType(type) {
      dispatch(getFolderInfoByType(type));
    },
    getFolderInfoById(id) {
      dispatch(getFolderInfoById(id));
    },
    getTasksbyParam(params) {
      dispatch(getTasksbyParam(params));
    },
    getTasks(id) {
      dispatch(getTasks(id));
    }
  };
};
let MainTaskContainer = connect(mapStateToProps, mapDispatchToProps)(MainTask);
export default MainTaskContainer;
