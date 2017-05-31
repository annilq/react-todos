import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteTask, updateTask } from "../actions/actions";
import { Button, Modal, Checkbox } from "antd";
const confirm = Modal.confirm;
class TaskItem extends Component {
  showTask() {
    console.log("showdetail");
  }
  render() {
    let { task } = this.props;
    return (
      <li style={{ display: "flex" }}>
        <Checkbox
          onChange={this.props.setStatus.bind(this, task)}
          checked={task.status}
        />
        <div
          onClick={this.showTask.bind(this, task)}
          className="task-text"
          style={{ flex: "1" }}
        >
          {task.name}
        </div>
        <div className="task-button">
          <Button
            className="edit-button"
            type={task.star ? "primary" : "default"}
            shape="circle"
            icon="star"
            onClick={this.props.starTask.bind(this, task)}
          />
          <Button
            className="delete-button"
            type="danger"
            shape="circle"
            icon="delete"
            onClick={this.props.delConform.bind(this, task._id)}
          />
        </div>
      </li>
    );
  }
}
const mapStateToProps = ({ tasks }) => {
  return {
    tasks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    starTask(task) {
      task.star = !task.star;
      dispatch(updateTask(task));
    },
    setStatus(task) {
      task.status = !task.status;
      dispatch(updateTask(task));
    },
    delConform(id) {
      confirm({
        title: "删除",
        content: "确定删除当前项目?",
        onOk() {
          // 删除该控件
          dispatch(deleteTask(id));
        }
      });
    }
  };
};
let TaskItemContainer = connect(mapStateToProps, mapDispatchToProps)(TaskItem);
export default TaskItemContainer;
