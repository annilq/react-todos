import React, { Component } from "react";
import { connect } from "react-redux";
import { showTaskDetail, deleteTask } from "../actions/actions";
import { Button } from "antd";
class TaskItem extends Component {
  render() {
    let { task } = this.props;
    return (
      <li
        onDoubleClick={this.props.showTaskDetail.bind(this, task)}
        style={{ display: "flex" }}
      >
        <div className="task-text" style={{ flex: "1" }}>{task.name}</div>
        <div className="task-button">
          <Button
            className="edit-button"
            type="primary"
            shape="circle"
            icon="edit"
            onClick={this.props.showTaskDetail.bind(this, task)}
          />
          <Button
            className="delete-button"
            type="danger"
            shape="circle"
            icon="delete"
            onClick={this.props.deleteTask.bind(this, task._id)}
          />
        </div>
      </li>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    showTaskDetail(task) {
      dispatch(showTaskDetail(task));
    },
    deleteTask(id) {
      dispatch(deleteTask(id));
    }
  };
};
let TaskItemContainer = connect(null, mapDispatchToProps)(TaskItem);
export default TaskItemContainer;
