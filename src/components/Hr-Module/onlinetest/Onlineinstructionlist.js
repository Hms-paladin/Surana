
import React from 'react';
import ReactDOM from 'react-dom';
import './Onlineinstruction.css';
import { Modal, } from 'antd';
import Button from 'react-bootstrap/Button';
import { Grid } from '@material-ui/core';
import Onlinetest from './onlinetest';

class Onlineinstructionlist extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            visible:true,
            totalquestions:null,
            duration:null
        }

        console.log("jsdf7sd9fysdfisdf",this.props)
    }


    showModal = () => {
        this.setState({
            visible: false,
        });
        this.props.changeState()
    };

  
    render() {
       console.log("sdfjhsdjfhsdjfhsjdfds",this.props.questionBank)
       const { questionBank } = this.props;
        return (
            <div>
                <Modal
                    visible={this.state.visible}
                    footer={null}
                    className="crosshide"
                >
                    <div >
                        <h5 className="online_heading"><b>Online Test Instructions</b></h5>
                    </div>
                    <div className="contents">
                        <p style={{fontWeight:'700'}}>Steps For Accessing Your Exam Online:</p>
                        <p>Close all programs,including email</p>
                        <p>Click on the Click here to open the exam link provided in the email from The College </p>
                        <p>Click"Login For Your Exam Here" at the bottom of the screen</p>
                        <p>Have your proctor enter the Username and password provided in the mail  from The College and click enter</p>
                        <p>To begin the exam,click on the link to the appropriate exam listed under Online Assessments</p>
                        <p>Before starting the exam:</p>
                        <p>Please verify that the student's last name appears correctly within the User ID box.</p>
                    </div>
                    <div className="second_contents">
                        <div>
                            <h6 className="half_heading"><b>Test Information</b></h6>
                        </div>
                        <div className="ml-2">
                            <div className="half_headingtest" >
                                <p>Name of the test:<span className="font_clr">Online Test</span></p>
                            </div>
                      
                             
                        <div className="flex question_text">
                                <p className="text_duration">Duration of test:<span className="font_clr">{questionBank[0].Duration}Mins</span></p>
                                <p className="move_content">No of Questions:<span className="font_clr">{questionBank[0].MaximumQuestions}</span></p>
                            </div>
                              
                           
                            
                        </div>
                    </div >
                    <Grid container spacing={3}
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item >
                            <Button onClick={this.showModal} className="mt-3 btn_space_polls">Start Test</Button>
                        </Grid>

                    </Grid>
                </Modal>
        {this.state.visible===false?
                <Onlinetest questionBank={this.props.questionBank} dispatch={this.props.dispatch} history={this.props.history} candidateId={this.props.candidateId} designationId={this.props.designationId}/>:null}
            </div>
        );
    }
}
export default Onlineinstructionlist;