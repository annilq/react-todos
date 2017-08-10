import React from "react";
import { connect } from "react-redux";
import TaskItem from "./taskItem";
function TaskList({ tasks }) {
  let taskList = tasks.map((item, index) => (
    <TaskItem key={item._id} task={item} />
  ));
  return (
    <ul className="task-list">
      {taskList || "没有数据"}
    </ul>
  );
}
const mapStateToProps = ({ tasks }) => {
  return {
    tasks
  };
};
export default connect(mapStateToProps)(TaskList);
