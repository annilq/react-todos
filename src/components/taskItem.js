import React, { Component } from "react";
import { connect } from "react-redux";
import {
  deleteTask,
  updateRemoteTask,
  updateLocalTask
} from "../actions/actions";
import { Button, Modal, Checkbox } from "antd";
const confirm = Modal.confirm;
class TaskItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false
    };
  }
  showEditView(id) {
    console.log(this.refs[id]);
    this.setState({ edit: !this.state.edit });
    let dom = this.refs[id];
    // dom.focus()
    setTimeout(
      function() {
        dom.focus();
      },
      100
    );
  }
  savetask(task) {
    this.setState({ edit: !this.state.edit });
    this.props.updateRemoteTask(task);
  }
  changetask(task, e) {
    task.name = e.target.value;
    this.props.updateLocalTask(task);
  }
  render() {
    let { task } = this.props;
    return (
      <li>
        <div
          className="display-item"
          style={{ display: this.state.edit ? "none" : "flex" }}
        >
          <Checkbox
            onChange={this.props.setStatus.bind(this, task)}
            checked={task.status}
          />
          <div
            onDoubleClick={this.showEditView.bind(this, task._id)}
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
        </div>
        <div
          onBlur={this.savetask.bind(this, task)}
          className="edit-item"
          style={{ display: this.state.edit ? "flex" : "none" }}
        >
          <div style={{ flex: "1" }}>
            <input
              type="text"
              ref={task._id}
              value={task.name}
              onChange={this.changetask.bind(this, task)}
            />
          </div>
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
      dispatch(updateRemoteTask(task));
    },
    setStatus(task) {
      task.status = !task.status;
      dispatch(updateRemoteTask(task));
    },
    updateRemoteTask(task) {
      dispatch(updateRemoteTask(task));
    },
    updateLocalTask(task) {
      dispatch(updateLocalTask(task));
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
