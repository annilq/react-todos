import React, { Component } from "react";
import TaskItem from "./taskItem";
class TaskList extends Component {
  render() {
    let { tasks} = this.props;
    let taskList;
    if (tasks) {
      taskList = tasks.map((item, index) => (
        <TaskItem key={index} task={item} />
      ));
    }
    return (
      <div className="task-container" style={{ flex: 1 }}>
        <ul className="task-list">
          {taskList}
        </ul>
      </div>
    );
  }
}
export default TaskList;
