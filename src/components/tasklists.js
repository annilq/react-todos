import React from "react";
import TaskItem from "./taskItem";
function TaskList({ tasks }) {
  let taskList;
  if (tasks.length > 0) {
    taskList = tasks.map((item, index) => (
      <TaskItem key={item._id} task={item} />
    ));
  } else {
    taskList = <div className="no-data">没有数据</div>;
  }
  return (
    <ul className="task-list">
      {taskList}
    </ul>
  );
}

export default TaskList;
