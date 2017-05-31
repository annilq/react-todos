import React, { Component } from "react";
import { connect } from "react-redux";
import { Input, Button, Icon } from "antd";
import { deleteTask, updateTask } from "../actions/actions";

class TaskDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskData: {},
      remark: "",
      subtask: ""
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      console.log(nextProps);
      this.setState({ taskData: nextProps.taskData });
    }
  }
  onKeyPress(e) {
    if (e.key === "Enter") {
      let { taskData } = this.state;
      let subtask = taskData.subtask || [];
      console.log(e.target.value);
      subtask.push(e.target.value);
      taskData.subtask = subtask;
      this.setState({ taskData, subtask: "" });
    }
  }
  onChange(key, e) {
    this.setState({ [key]: e.target.value });
  }
  render() {
    let { taskData } = this.state;
    let subtask = taskData.subtask || [];
    let SubCom = "";
    if (subtask.length > 0) {
      let subtasks = subtask.map((item, index) => <li key={index}>{item}</li>);
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
            onChange={this.onChange.bind(this, "subtask")}
            onKeyPress={this.onKeyPress.bind(this)}
          />
        </div>
        <div className="task-detail-field">
          <Input
            type="textarea"
            rows={4}
            value={this.state.remark}
            placeholder="填写备注"
            onChange={this.onChange.bind(this, "remark")}
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
