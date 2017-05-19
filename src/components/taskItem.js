import React, { Component } from "react";
import { connect } from "react-redux";
import { showTaskDetail } from "../actions/actions";
import {Icon } from "antd";
class TaskItem extends Component {
  render() {
    let { task } = this.props;
    return (
      <li
        onDoubleClick={this.props.showTaskDetail.bind(this, task)}
      >
        {task.name}
      </li>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    showTaskDetail() {
      dispatch(showTaskDetail());
    }
  };
};
let TaskItemContainer = connect(null, mapDispatchToProps)(TaskItem);
export default TaskItemContainer;
