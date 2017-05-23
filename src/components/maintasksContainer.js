import React, { Component } from "react";
import { connect } from "react-redux";
import { getTasks, getHomeFolderInfo, getFolderInfo } from "../actions/actions";
import TaskList from "./tasklists";
import TaskListHeader from "./tasklistHeader";
class MainTask extends Component {
  componentDidMount() {
    let { id } = this.props.params;
    if (id) {
      this.props.getFolderInfo(id);
    } else {
      this.props.getHomeFolderInfo();
    }
  }
  componentWillReceiveProps(nextProps) {
    let { folderInfo } = this.props;
    let curid = folderInfo._id;
    let nextId = nextProps.folderInfo && nextProps.folderInfo._id;
    if (curid !== nextId) {
      this.props.getTasks(nextId);
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
    getHomeFolderInfo() {
      dispatch(getHomeFolderInfo());
    },
    getFolderInfo(id) {
      dispatch(getFolderInfo(id));
    },
    getTasks(id) {
      dispatch(getTasks(id));
    }
  };
};
let MainTaskContainer = connect(mapStateToProps, mapDispatchToProps)(MainTask);
export default MainTaskContainer;
