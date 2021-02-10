import React from "react"
import { Modal, Button } from 'antd';
import "../../../table/viewmodel.css"

class Deletemodal extends React.Component {
  state = { visible: this.props.modalopen };


  // showModal = () => {
  //   // this.props.deleterow && this.props.deleterow()
  // };
  
  handleCancel = (e) => {
    this.props.onclickok&&this.props.onclickok()
  };

  render() {
    console.log(this.props.viewdata,"viewdata")
    return (
      <div className="delmodelwidth">
        <Modal
          title="Delete"
          visible={this.state.visible}
          onOk={this.props.deleterow}
          onCancel={this.handleCancel}
          cancelText= 'No'
          okText= 'Yes'
          okType= 'danger'
          className="delmodelwidth"
        >
          <div className={"textcontainermodel"}>
          <p>Are You Sure Do You Want to Delete ?</p>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Deletemodal;