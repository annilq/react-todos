import React, { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { Modal, Input, Icon, Button } from "antd";
import {
  addFolder,
  setFolderInfo,
  getFolders,
  deleteFolder,
  updateFolder
} from "../actions/actions";
const confirm = Modal.confirm;
class FolderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      foldername: "",
      folderId: ""
    };
  }
  componentDidMount() {
    this.props.getFolders();
  }
  addfolder() {
    if (!this.state.foldername) return;
    console.log(this.state.folderId);
    if (this.state.folderId) {
      this.props.updateFolder(this.state.foldername, this.state.folderId);
    } else {
      this.props.addFolder(this.state.foldername);
    }
  }
  editFolder(folder, e) {
    e.stopPropagation();
    console.log(folder);
    this.setState({
      visible: true,
      foldername: folder.name,
      folderId: folder._id
    });
  }
  showModal() {
    this.setState({
      visible: true,
      folderId: ""
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
    this.props.setFolderInfo(folderInfo);
  }
  delConfirm(id) {
    console.log(id);
    let { delConfirm } = this.props;
    let _this = this;
    confirm({
      title: "删除",
      content: "删除当前目录会将该目录下面的项目一起删除",
      onOk() {
        // 删除该控件
        delConfirm(id);
        _this.handleCancel();
      }
    });
  }
  render() {
    let { folders } = this.props;
    let folderList;
    if (folders) {
      folderList = folders.map((item, index) => {
        let editCom = "";
        if (!item.fixed) {
          editCom = (
            <div
              style={{
                position: "absolute",
                right: "-10px",
                top: "0"
              }}
              className="edit-folder"
              onClick={this.editFolder.bind(this, item)}
            >
              <Icon type="edit" />
            </div>
          );
        }
        return (
          <li
            key={item._id}
            onClick={this.onFolderClick.bind(this, item)}
            style={{ position: "relative" }}
          >
            <Link
              to={
                item.type === "folder"
                  ? "/folders/" + item._id
                  : "/" + item.type
              }
            >
              <Icon
                type={item.type === "done" ? "check-square-o" : item.type}
              />
              {item.name}
            </Link>
            {editCom}
          </li>
        );
      });
    }
    let { folderId, foldername } = this.state;
    let delBtn = "";
    if (folderId) {
      delBtn = (
        <Button
          type="danger"
          shape="circle"
          icon="delete"
          size="large"
          className="delete-folder"
          onClick={this.delConfirm.bind(this, folderId)}
        />
      );
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
            value={foldername}
            id={folderId}
            onChange={this.handleInput.bind(this)}
          />
          {delBtn}
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
    updateFolder(name, id) {
      dispatch(updateFolder(name, id));
    },
    setFolderInfo(data) {
      dispatch(setFolderInfo(data));
    },
    delConfirm(id) {
      dispatch(deleteFolder(id));
    },
    getFolders() {
      dispatch(getFolders());
    }
  };
};
let FolderListContainer = connect(mapStateToProps, mapDispatchToProps)(
  FolderList
);

export default FolderListContainer;
