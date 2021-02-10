import React from "react"
import { Modal, Button } from 'antd';
import "./viewmodel.css"

class CouncelView extends React.Component {
  state = { visible: this.props.modalopen };


  showModal = () => {
    this.props.onclickok&&this.props.onclickok()
  };

  // handleOk = e => {
  //   console.log(e);
    // this.setState({
    //   visible: false,
    // });
  // };
  

  handleCancel = e => {
    this.props.onclickok&&this.props.onclickok()
  };

  render() {
    console.log(this.props.viewdata,"viewdata")
    return (
      <div>
        {/* <Button type="primary" onClick={this.showModal}>
          Open Modal
        </Button> */}
        <Modal
          title="Councel Details"
          visible={this.state.visible}
          onOk={this.props.onclickok}
          onCancel={this.handleCancel}
          className={this.props.modelclassName}
          // cancelText= 'No'
          // okText= 'Yes'
          // okType= 'danger'
        >
          <div className={"textcontainermodel"}>
          <div className="d-flex">
              <div className="titlekey">
                <div>Name</div>
                <div>Email</div>
                <div>Phone</div>
                <div>Address</div>
              </div>

              <div className="d-flex titlevalue">
                <div>
                  <div>:</div>
                  <div>:</div>
                  <div>:</div>
                  <div>:</div>
                </div>
                <div>
                  <div>{this.props.CouncelDataView.Name}</div>
                  <div>{this.props.CouncelDataView.Email}</div>
                  <div>{this.props.CouncelDataView.phone}</div>
                  <div>{this.props.CouncelDataView.Address}</div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default CouncelView;