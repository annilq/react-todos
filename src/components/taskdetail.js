import React, { Component } from "react";
class TaskDetail extends Component {
  render() {
    return (
      <div className="task-details">
        {this.props.children}
      </div>
    );
  }
}

export default TaskDetail;
