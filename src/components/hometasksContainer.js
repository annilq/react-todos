import React, { Component } from "react";
import { connect } from "react-redux";
import { getTasks, getHomeFolderInfo } from "../actions/actions";
import TaskList from "./tasklists";
import TaskListHeader from "./tasklistHeader";
class HomeList extends Component {
  componentDidMount() {
    this.props.getHomeFolderInfo();
  }
  componentWillReceiveProps(nextProps) {
    let { folderInfo } = this.props;
    let curid = folderInfo._id;
    let nextId=nextProps.folderInfo&&nextProps.folderInfo._id;
    if (curid!==nextId) {
      this.props.getTasks(curid);
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
let HomeListContainer = connect(mapStateToProps, mapDispatchToProps)(HomeList);
export default HomeListContainer;
