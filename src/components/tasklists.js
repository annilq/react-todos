import React, { Component } from "react";
import { connect } from "react-redux";
import { Input, Button, Icon } from "antd";
import {
  getTasks,
  getFolderInfo,
  addTask,
  showTaskDetail
} from "../actions/actions";

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ""
    };
  }
  componentDidMount() {
    let { id } = this.props.params;
    this.props.getTasks(id);
    this.props.getFolderInfo(id);
  }
  componentWillReceiveProps(nextProps) {
    let curid = this.props.params.id;
    let nextid = nextProps.params.id;
    if (curid !== nextid) {
      this.props.getTasks(nextid);
      this.props.getFolderInfo(nextid);
    }
  }
  handleInput(e) {
    let value = e.target.value;
    this.setState({ inputValue: value });
  }
  addTask() {
    let { id } = this.props.params;
    let { inputValue } = this.state;
    this.props.addTask(id, inputValue);
    this.setState({
      inputValue: ""
    });
  }
  render() {
    let { tasks } = this.props;
    let taskList;
    if (tasks) {
      taskList = tasks.map((item, index) => (
        <li
          key={index}
          onDoubleClick={this.props.showTaskDetail.bind(this, item)}
        >
          {item.name}
        </li>
      ));
    }
    return (
      <div className="task-container" style={{ flex: 1 }}>
        <div className="task-header">
          <div className="folder-name">{this.props.folderName}</div>
          <div className="top-bar">
            <Input
              type="text"
              size="large"
              className="serach-input"
              value={this.state.inputValue}
              onChange={this.handleInput.bind(this)}
            />
            <Button className="new-note" onClick={this.addTask.bind(this)}>
              <Icon type="plus" />添加
            </Button>
          </div>
        </div>
        <ul className="task-list">
          {taskList}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = ({ tasks, folderName }) => {
  return {
    tasks,
    folderName
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getTasks(id) {
      dispatch(getTasks(id));
    },
    addTask(id, value) {
      dispatch(addTask(id, value));
    },
    showTaskDetail(data) {
      dispatch(showTaskDetail(data));
    },
    getFolderInfo(id) {
      dispatch(getFolderInfo(id));
    }
  };
};
let TaskListContainer = connect(mapStateToProps, mapDispatchToProps)(TaskList);
export default TaskListContainer;
