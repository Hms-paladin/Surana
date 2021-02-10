import React from "react"
import { Modal, Button } from 'antd';
import "./viewmodel.css"
import Grid from '@material-ui/core/Grid'
import axios from 'axios';
import { apiurl } from "../../../../App";
import { Select} from 'antd';
import Inputantd from "../../../../formcomponent/inputantd";

const { Option } = Select;

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
        
        return (
            <div className="popup_width">
              
                <Modal
                    title="Add User"
                    visible={this.state.visible}
                    onOk={this.props.onclickok}
                    onCancel={this.handleCancel}
                    className={"simple_class"}
               
                >
            <div className="card-body ">
                    <Grid container spacing={3}>
                   
                    <Grid item md={4} sm={5} className="w-100">
                    <div>
                    <label>
                    Candidate Name 
                    </label>
                    </div>
                    <Select
                    style={{ width: "100%" }}
                    > 
                    </Select>
                    </Grid>

                    <Grid item md={4} sm={5} className="w-100">
                    <div>
                    <label>
                    User Name 
                    </label>
                    </div>
                    <Inputantd
                    className="w-100"
                    />
                    </Grid>

                    <Grid item md={4} sm={5} className="w-100">
                
                    <div>
                    <label>
                    Password 
                    </label>
                    </div>
                    <Inputantd
                    className="w-100"
                    />
                    </Grid>
                   
                    <Grid item md={4} sm={5} className="w-100">
                
                    <div>
                    <label>
                    Mobile Number 
                    </label>
                    </div>
                    <Inputantd
                    className="w-100"
                    />
                    </Grid>

                    <Grid item md={4} sm={5} className="w-100">
                
                <div>
                <label>
                Email Id 
                </label>
                </div>
                <Inputantd
                className="w-100"
                />
                </Grid>

                <Grid item md={4} sm={5} className="w-100">
                
                <div>
                <label>
                User Account 
                </label>
                </div>
                <Select
                style={{ width: "100%" }}
                > 
                </Select>
                </Grid>

                </Grid> 
                </div>
               
                </Modal>
           </div>
        );
    }
}

export default Modalreact;




