import React, { Component } from "react";
import LeftFolder from "./components/folderlists";
import MainContainer from "./components/mainContainer";
class App extends Component {
  render() {
    return (
      <div className="container">
        <LeftFolder />
        <MainContainer>
          {this.props.children}
        </MainContainer>
      </div>
    );
  }
}

export default App;
