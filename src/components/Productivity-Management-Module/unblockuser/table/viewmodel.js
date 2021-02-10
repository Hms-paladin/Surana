import React from "react"
import { Modal, Button } from 'antd';
import "./viewmodel.css"
import Grid from '@material-ui/core/Grid'
import axios from 'axios';
import { apiurl } from "../../../../App";


class Modalreact extends React.Component {
    state = { visible: this.props.modalopen };


    showModal = () => {
        this.props.onclickok && this.props.onclickok()
    };

    // handleOk = e => {
    //   console.log(e);
    // this.setState({
    //   visible: false,
    // });
    // };


    handleCancel = e => {
        this.props.onclickok && this.props.onclickok()
    };

    

    render() {
        console.log(this.props.Requirementdata, "Requirementdata")
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
                        <p>{this.props.viewdata}</p>
                    </div>
                   
                </Modal>
            </div>
        );
    }
}

export default Modalreact;




