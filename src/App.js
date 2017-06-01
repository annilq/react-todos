import React, { Component } from "react";
import { Input, Button, Icon } from "antd";
import FolderListContainer from "./components/folderlists";
class App extends Component {
  render() {
    return (
      <div className="container">
        <FolderListContainer />
          <div className="content" style={{ flex: 1, display: "flex" }}>
            <div className="top-bar" style={{ display: "none" }}>
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
      </div>
    );
  }
}

export default App;
