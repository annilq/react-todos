import React, { Component } from "react";
import { connect } from "react-redux";
import { Input, Button, Icon } from "antd";
import { addTask } from "../actions/actions";

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
  addTask() {
    let { folderInfo } = this.props;
    let { inputValue } = this.state;
    this.props.addTask(folderInfo._id, inputValue);
    this.setState({
      inputValue: ""
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
          />
          <Button className="new-note" onClick={this.addTask.bind(this)}>
            <Icon type="plus" />添加
          </Button>
        </div>
      );
    }
    return (
      <div className="task-header">
        <div className="folder-name">{folderInfo.name}</div>
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
