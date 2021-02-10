import React from "react"
import { Modal, Button } from 'antd';
import "./viewmodel.css"
import axios from 'axios';
import { apiurl } from '../../../../App';
import {deleteRow} from '../../action/usergroupAction';
import {connect} from 'react-redux';

class Deletemodal extends React.Component {
  state = { visible: this.props.modalopen };

  handleCancel = (e) => {
    this.props.onclickok&&this.props.onclickok()
  };
  
  deleterow = () => {
      this.props.dispatch(deleteRow(this.props.deleteId,this.props.getUserGroup))
      this.setState({visible:false})
  }

  render() {
    console.log(this.props.viewdata,"viewdata")
    return (
      <div className="delmodelwidth">
        <Modal
          title="Delete"
          visible={this.state.visible}
          onOk={this.deleterow}
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

export default connect()(Deletemodal);