import React, { Component } from "react";
import { connect } from "react-redux";
import { Input, Button, Icon } from "antd";
import { deleteTask, updateTask } from "../actions/actions";

class TaskDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtask: ""
    };
  }
  onKeyPress(e) {
    if (e.key === "Enter") {
      console.log("submit");
    }
  }
  onChange(e) {
    this.setState({ subtask: e.target.value });
  }
  render() {
    let { taskData } = this.props;
    let { subtask } = taskData;
    let SubCom;
    if (subtask) {
      let subtasks = subtask.map((item, index) => <li key={index}>item</li>);
      SubCom = <div className="subtask-list task-detail-field">{subtasks}</div>;
    }
    return (
      <div className={taskData.name ? "task-detail active" : "task-detail"}>
        <div className="task-header task-detail-field">{taskData.name}</div>
        {SubCom}
        <div className="add-subtask task-detail-field">
          <Input
            value={this.state.subtask}
            placeholder="添加子任务"
            onKeyPress={this.onKeyPress.bind(this)}
            onChange={this.onChange.bind(this)}
          />
        </div>
        <div className="task-detail-field">
          <Input
            type="textarea"
            rows={4}
            value={taskData.remark}
            placeholder="填写备注"
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ taskData }) => {
  return {
    taskData
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateTask(id, value) {
      dispatch(updateTask(id, value));
    },
    deleteTask(id, value) {
      dispatch(deleteTask(id, value));
    }
  };
};
let TaskDetailContainer = connect(mapStateToProps, mapDispatchToProps)(
  TaskDetail
);
export default TaskDetailContainer;
