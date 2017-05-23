import React, { Component } from "react";
import FolderListContainer from "./components/folderlists";
import MainContainer from "./components/mainContainer";
class App extends Component {
  render() {
    return (
      <div className="container">
        <FolderListContainer />
        <MainContainer>
          {this.props.children}
        </MainContainer>
      </div>
    );
  }
}

export default App;
