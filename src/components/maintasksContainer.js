import React, { Component } from "react";
import { connect } from "react-redux";
import { getTasks, getHomeFolderInfo } from "../actions/actions";
import TaskList from "./tasklists";
import TaskListHeader from "./tasklistHeader";
class MainTask extends Component {
  componentDidMount() {
    let { id } = this.props.params;
    this.props.getTasks(id);
  }
  componentWillReceiveProps(nextProps) {
    let curid = this.props.params.id;
    let nextid = nextProps.params.id;
    if (curid !== nextid) {
      this.props.getTasks(nextid);
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
    getTasks(id) {
      dispatch(getTasks(id));
    }
  };
};
let MainTaskContainer = connect(mapStateToProps, mapDispatchToProps)(MainTask);
export default MainTaskContainer;
