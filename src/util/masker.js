import React, {Component} from 'react';
class Masker extends Component{
  render() {
    let style={
      position:"absolute",
      left:"0",
      top:"0",
      bottom:"0",
      width:"100%",
      zIndex:"-1"
    }
    return (
      <div style={style} onClick={this.props.handleMasker}>
        {this.props.children}
      </div>
    )
  }
};
export default Masker
