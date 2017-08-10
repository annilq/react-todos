import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getTasks,
  getTasksbyParam,
  getFolderInfoByType,
  getFolderInfoById
} from "../actions/actions";
import FolderListContainer from "./folderlists";
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
    return (
      <div className="container">
        <FolderListContainer />
        <div className="task-container" style={{ flex: 1 }}>
          <TaskListHeader />
          <TaskList />
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ folderInfo }) => {
  return {
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
export default connect(mapStateToProps, mapDispatchToProps)(MainTask);
