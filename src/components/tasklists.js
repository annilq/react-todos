import React, { Component } from "react";
import TaskItem from "./taskItem";
class TaskList extends Component {
  render() {
    let { tasks } = this.props;
    let taskList;
    if (tasks) {
      taskList = tasks.map((item, index) => (
        <TaskItem key={index} task={item} />
      ));
    }
    return (
      <ul className="task-list">
        {taskList}
      </ul>
    );
  }
}
export default TaskList;
