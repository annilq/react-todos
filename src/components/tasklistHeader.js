import React, { Component } from "react";
import { connect } from "react-redux";
import { browserHistory } from "react-router";
import { Input, Button, Icon } from "antd";
import { addTask } from "../actions/actions";
import Request from "../util/request";
import Notify from "../util/notify";

class TaskListHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ""
    };
  }
  handleInput(e) {
    let value = e.target.value;
    this.setState({ inputValue: value });
  }
  handleInputPress(event) {
    if (event.key === "Enter") {
      this.addTask();
    }
  }
  addTask() {
    let { folderInfo } = this.props;
    let { inputValue } = this.state;
    if (!inputValue.trim()) {
      Notify("warn", "请输入任务");
      return;
    }
    this.props.addTask(folderInfo._id, inputValue);
    this.setState({
      inputValue: ""
    });
  }
  logout() {
    Request.get("/logout").then(function(data) {
      Notify("info", "退出登录");
      browserHistory.replace("/login");
    });
  }
  render() {
    let { folderInfo } = this.props;
    let addInputcom = "";
    if (folderInfo.name !== "star" && folderInfo.name !== "done") {
      addInputcom = (
        <div className="top-bar">
          <Input
            type="text"
            size="large"
            className="serach-input"
            value={this.state.inputValue}
            onChange={this.handleInput.bind(this)}
            onKeyPress={this.handleInputPress.bind(this)}
          />
          <Button className="new-note" onClick={this.addTask.bind(this)}>
            <Icon type="plus" />添加
          </Button>
        </div>
      );
    }
    return (
      <div className="task-header">
        <div className="folder-name">
          {folderInfo.name}
          <div className="logout">
            <Icon type="logout" onClick={this.logout.bind(this)} title="退出登录" />
          </div>
        </div>
        {addInputcom}
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
    addTask(id, value) {
      dispatch(addTask(id, value));
    }
  };
};
TaskListHeader = connect(mapStateToProps, mapDispatchToProps)(TaskListHeader);
export default TaskListHeader;
