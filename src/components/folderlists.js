import React, { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { Modal, Input, Icon, Button } from "antd";
import { addFolder, setFolderInfo, getFolders } from "../actions/actions";
class LeftFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }
  componentDidMount() {
    this.props.getFolders();
  }
  addfolder() {
    if (!this.state.foldername) return;
    this.props.addFolder(this.state.foldername);
  }
  showModal() {
    this.setState({
      visible: true
    });
  }
  handleOk() {
    this.addfolder();
    this.setState({
      visible: false
    });
  }
  handleCancel() {
    this.setState({
      visible: false
    });
  }
  handleInput(e) {
    this.setState({
      foldername: e.target.value
    });
  }
  onFolderClick(folderInfo) {
    console.log(folderInfo);
    this.props.setFolderInfo(folderInfo);
  }
  render() {
    let { folders, folderInfo } = this.props;
    let folderList;
    if (folders) {
      folderList = folders.map((item, index) => (
        <li
          key={item._id}
          onClick={this.onFolderClick.bind(this, item)}
          className={folderInfo.folderId === item._id ? "active" : ""}
        >
          <Link to={"/folders/" + item._id}>
            <Icon type="folder" />{item.name}
          </Link>
        </li>
      ));
    }
    return (
      <div className="left-folder">
        <div className="app-logo">react-todos</div>
        <ul className="folder-list">
          {folderList}
        </ul>
        <Button className="add-folder-btn" onClick={this.showModal.bind(this)}>
          新增
        </Button>
        <Modal
          title="输入文件夹名称"
          visible={this.state.visible}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
        >
          <Input
            type="text"
            value={this.state.foldername}
            onChange={this.handleInput.bind(this)}
          />
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = ({ folders, folderInfo }) => {
  return {
    folders,
    folderInfo
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addFolder(name) {
      dispatch(addFolder(name));
    },
    setFolderInfo(data) {
      dispatch(setFolderInfo(data));
    },
    getFolders() {
      dispatch(getFolders());
    }
  };
};
let LeftFolderContainer = connect(mapStateToProps, mapDispatchToProps)(
  LeftFolder
);

export default LeftFolderContainer;
