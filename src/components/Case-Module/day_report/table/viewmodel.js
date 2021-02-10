import React from "react"
import { Modal, Button } from 'antd';
import "./viewmodel.css"
import Grid from '@material-ui/core/Grid'
import axios from 'axios';
import { apiurl } from "../../../../App";
import DayreportModal from "../DayreportModal";


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
                    title="DAYREPORT VIEW"
                    visible={this.state.visible}
                    onOk={this.props.onclickok}
                    onCancel={this.handleCancel}
                    className={"simple_class"}
               
                >
                  
                    <DayreportModal   dayOppositeData={this.props.dayOppositeData} dayReportData={this.props.dayReportData}   dayCounselData={this.props.dayCounselData}/>
                   
                </Modal>
            </div>
        );
    }
}

export default Modalreact;




