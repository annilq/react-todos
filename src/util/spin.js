import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Spin} from 'antd';
import Masker from './masker';
class Spiner extends Component{
  render() {
    let spinerstyle={
      zIndex:"999",
      position:"fixed",
      left:"50%",
      top:"50%",
      width:"40px"
    }
    return (
      <Masker>
        <div style={spinerstyle}>
          <Spin spinning={this.props.loading}></Spin>
        </div>
      </Masker>
    )
  }
};
Spiner.show=function(){
  if(!this.isShow){
    this.isShow=true;
    this.container = document.createElement('div');
    document.body.appendChild(this.container);
    ReactDOM.render(<Spiner />, this.container);

  }
}
Spiner.close=function(){
  if(this.container){
    ReactDOM.unmountComponentAtNode(this.container);
    document.body.removeChild(this.container);
    this.container=null;
    this.isShow=false;
  }
}
export default Spiner;
