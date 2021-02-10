import React from "react"
import { Modal, Button } from 'antd';
import "./table/viewmodel.css"
import Grid from '@material-ui/core/Grid'
import axios from 'axios';
import { Select} from 'antd';
import Inputantd from "../../../formcomponent/inputantd";

const { Option } = Select;

class ReactModal extends React.Component {
    state = { visible: this.props.modalopen };


    showModal = () => {
        this.props.onclickok && this.props.onclickok()
    };

    handleCancel = e => {
        this.props.onclickok && this.props.onclickok()
    };

    

    render() {
        
        return (
            <div className="popup_width">
              
                <Modal
                    title="Add User Group"
                    visible={true}
                    onOk={this.props.onclickok}
                    onCancel={this.handleCancel}
                    className={"user_group"}
               
                >
            <div className="card-body ">
            <div>
                <label>
                 Group Name
                </label>
                </div>
                <Inputantd
                className="w-100"
                />
               
                </div>
               
                </Modal>
           </div>
        );
    }
}

export default ReactModal;




