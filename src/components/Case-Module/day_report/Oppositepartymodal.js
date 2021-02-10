import React from 'react';
import './NewDayreport.css';

class Oppositeparty extends React.Component{
    render(){
        return(
            <React.Fragment>
                <div >
                    <h4 className="opposite_title">Opposite Party Details</h4>
                </div>
                <div className="oppositemodal_option">
                                    <div className="oppositemodal_type">
                                        <div className="opposite_suboption">
                                            <div >Name</div>
                                            <div >:</div>
                                        </div>
                                        <div className="opposite_subreply ml-2">Ranjith&Co</div>
                                    </div>
                                    <div className="oppositemodal_type">
                                        <div className="opposite_suboption">
                                            <div >Phone no</div>
                                            <div >:</div>
                                        </div>
                                        <div className="opposite_subreply ml-2">9876543210</div>
                                    </div>
                                    <div className="oppositemodal_type">
                                        <div className="opposite_suboption">
                                            <div >Email id</div>
                                            <div className="ml-1">:</div>
                                        </div>
                                        <div className="opposite_subreply ml-2">Ranjith@rajin.com</div>
                                    </div>
                                    <div className="oppositemodal_type">
                                        <div className="opposite_suboption">
                                            <div >Address</div>
                                            <div >:</div>
                                        </div>
                                        <div className="opposite_subreply ml-2">No.1,nehru street,chennai-600063</div>
                                    </div>
                                    <div className="oppositemodal_type">
                                        <div className="opposite_suboption">
                                            <div >City</div>
                                            <div >:</div>
                                        </div>
                                        <div className="opposite_subreply ml-2">Chennai</div>
                                    </div>  
                              
                              
                              
                                    {/* <Button key="back" onClick={this.handleCancel}>
                                  Return
                                </Button>
                                <Button key="submit" type="primary" onClick={this.handleOk}>
                                  Submit
                                </Button>                                   */}
                                </div>
            </React.Fragment>
        )
    }
}
export default Oppositeparty;