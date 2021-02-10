import React from "react"
import { Modal, Button } from 'antd';
import "./viewmodel.css"

class Modalreact extends React.Component {
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
          title="VIEW"
          visible={this.state.visible}
          onOk={this.props.onclickok}
          onCancel={this.handleCancel}
          className={this.props.modelclassName}
          // cancelText= 'No'
          // okText= 'Yes'
          // okType= 'danger'
        >
          <div className={"textcontainermodel"}>
            {/* <p>{this.props.viewdata}</p> */}
            <p>Hii</p>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Modalreact;