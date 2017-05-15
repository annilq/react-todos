import React, { Component } from "react";
import { Input, Button, Icon } from "antd";
class TaskContainer extends Component {
  render() {
    return (
      <div className="content" style={{ flex: 1 }}>
        <div className="top-bar" style={{"display":"none"}}>
          <Input
            type="text"
            size="large"
            className="serach-input"
            prefix={<Icon type="search" />}
          />
          <Button className="new-note">查询</Button>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default TaskContainer;
