import React from 'react';
import './NewDayreport.css';

class Counselmodal extends React.Component{
    render(){
        return(
            <React.Fragment>
                <div >
                    <h4 className="counsel_title">Counsel Details</h4>
                </div>
                <div className="counselmodal_option">
                                    <div className="counselmodal_type">
                                        <div className="counsel_suboption">
                                            <div >Name</div>
                                            <div >:</div>
                                        </div>
                                        <div className="counsel_subreply ml-2">Krishna</div>
                                    </div>
                                    <div className="counselmodal_type">
                                        <div className="counsel_suboption">
                                            <div >Phone no</div>
                                            <div >:</div>
                                        </div>
                                        <div className="counsel_subreply ml-2">9876543210</div>
                                    </div>
                                    <div className="counselmodal_type">
                                        <div className="counsel_suboption">
                                            <div >Email id</div>
                                            <div className="ml-1">:</div>
                                        </div>
                                        <div className="counsel_subreply ml-2">Krishna@surana.com</div>
                                    </div>
                                    <div className="counselmodal_type">
                                        <div className="counsel_suboption">
                                            <div >Address</div>
                                            <div >:</div>
                                        </div>
                                        <div className="counsel_subreply ml-2">No.1,kumaran street,chennai-600063</div>
                                    </div>
                                    <div className="counselmodal_type">
                                        <div className="counsel_suboption">
                                            <div >City</div>
                                            <div >:</div>
                                        </div>
                                        <div className="counsel_subreply ml-2">Chennai</div>
                                    </div>                                    
                                </div>
            </React.Fragment>
        )
    }
}
export default Counselmodal;