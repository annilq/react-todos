import React from "react";
import TaskItem from "./taskItem";
function TaskList({ tasks }) {
  let taskList;
  if (tasks) {
    taskList = tasks.map((item, index) => (
      <TaskItem key={item._id} task={item} />
    ));
  }
  return (
    <ul className="task-list">
      {taskList}
    </ul>
  );
}

export default TaskList;
