import React from 'react';
import ReactDOM from 'react-dom';
import './Newinterviewtable.css';
import { Modal, } from 'antd';
import Button from 'react-bootstrap/Button';
import { Grid } from '@material-ui/core';
import NewInterviewtable from './NewInterviewtable';

class NewInterviewModal extends React.Component {
    state = { visible: true };

    showModal = () => {
        this.setState({
            visible: false,
        });
    };
    handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
    render() {
        return (
            <div className="newinterview_modalMain">
                <Modal
                    visible={this.state.visible}
                    footer={null}
                    className="newinterview_modal"
                    onCancel={this.handleCancel}
                >
                    <div >
                        <h5 className="newinterview_online_heading"><b>Interview Questions</b></h5>
                    </div>
                    <div className="newinterview_contents">
                        <p>1.How would you decide on your objectives?</p>
                        <p>2.How do you manage your day?</p>
                        <p>3.What motivates you?</p>
                        <p>4.How do you cope without motivation?</p>
                        <p>5.How long were you at your last job?</p>
                        <p>6.Why did you leave your last job?</p>
                        <p>7.How have you changed in the last five years?</p>
                        <p>8.What contribution do you make to a team?</p>
                        <p>9.How do you react if you find that someone you work with does not like you?</p>
                        <p>10.Have you ever experinced such a problem during your working life?</p>
                    </div>                    
                </Modal>
                
            </div>
        );
    }
}
export default NewInterviewModal;