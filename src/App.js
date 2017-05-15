import React, { Component } from "react";
import LeftFolder from "./components/folderlists";
import TaskContainer from "./components/taskContainer";
class App extends Component {
  render() {
    return (
      <div className="container">
        <LeftFolder />
        <TaskContainer>
          {this.props.children}
        </TaskContainer>
      </div>
    );
  }
}

export default App;
