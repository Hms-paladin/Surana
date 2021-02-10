import React from 'react';
import { Grid } from '@material-ui/core';
import Textareaantd from '../../../formcomponent/textareaantd'
import { Modal, Calendar, DatePicker } from 'antd';
import Oppositeparty from './ResultView';
import DRAhistory from './DRAhistoryModal';
import Calenderbox from '../../../formcomponent/calenderbox';
import './Case.css';
import DDRAhistory from './DDRAhistory';

class Casedetails extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            // hours: 0,
            // seconds: 0,
            // minutes: 0,
            // settimeon: false,
            // changebtn: true,
            // open: false,
            // Hearing: false,
            OppositeParty: false,
            CounselDetails:false,
            // backdrop:true,
            type:'',
            title:'',
            visible:false,
            DRAhistory:false,DDRAhistory:false
        }
    }
    handleClickOpen=(s,title)=>
    {
      console.log("type",title,s)
      this.setState({
        type:s,
        title
      })
      this.setState({OppositeParty:true,CounselDetails:true,visible:true,DRAhistory:true,DDRAhistory:true})
    
    }  
    handleOk = e => {
        console.log(e);
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
    render(){
        return(
        <React.Fragment>
            <div className="card card-min-height mt-3">
                <div className="card card-body">
                    {/* <div className="casedet_border"> */}
                    <h4 className="casedetails_heading">L&T Case Details</h4>
                        <Grid container spacing={1}>
                            <Grid item md={4} sm={12} className="casedet_border">
                                <div className="casedetail_option">
                                    <div className="option_type">
                                        <div className="suboption">
                                            <div >Case Type</div>
                                            <div >:</div>
                                        </div>
                                        <div className="subreply ml-2">OS</div>
                                    </div>
                                    <div className="option_type">
                                        <div className="suboption">
                                            <div >Internal case no</div>
                                            <div >:</div>
                                        </div>
                                        <div className="subreply ml-2">OS/231/2020</div>
                                    </div>
                                    <div className="option_type">
                                        <div className="suboption">
                                            <div >Court name</div>
                                            <div className="ml-1">:</div>
                                        </div>
                                        <div className="subreply ml-2">Madras high court</div>
                                    </div>
                                    <div className="option_type">
                                        <div className="suboption">
                                            <div >Case no</div>
                                            <div >:</div>
                                        </div>
                                        <div className="subreply ml-2">1-C-11 in 436-11</div>
                                    </div>
                                    <div className="option_type">
                                        <div className="suboption">
                                            <div >City</div>
                                            <div >:</div>
                                        </div>
                                        <div className="subreply ml-2">Chennai</div>
                                    </div>
                                    <div className="option_type">
                                        <div className="suboption">
                                            <div >Opposite Party</div>
                                            <div >:</div>
                                        </div>
                                        <div className="subreply_link ml-2" onClick={() => this.handleClickOpen("opposite_party")}>
                                            Ranjith&co
                                            {/* <Textareaantd className={"w-100"}/> */}
                                        </div>
                                    </div>                                   
                                </div>
                            </Grid>
                            <Grid item md={4} sm={12} className="casedet_border">
                                <div className="casedetail_option">
                                    <div className="option_type">
                                        <div className="suboption">
                                            <div >Outside Counsel</div>
                                            <div >:</div>
                                        </div>
                                        <div className="subreply ml-2">Vinay</div>
                                    </div>
                                    <div className="option_type">
                                        <div className="suboption">
                                            <div >DRA</div>
                                            <div >:</div>
                                        </div>
                                        <div className="subreply_dra ml-2" onClick={() => this.handleClickOpen("dra_history")}>Pradeep</div>
                                    </div>
                                    <div className="option_type">
                                        <div className="suboption">
                                            <div >DDRA</div>
                                            <div className="ml-1">:</div>
                                        </div>
                                        <div className="subreply_dra ml-2" onClick={() => this.handleClickOpen("ddra_history")}>vinay</div>
                                    </div>
                                    <div className="option_type">
                                        <div className="suboption">
                                            <div >Due Date</div>
                                            <div >:</div>
                                        </div>
                                        <div className="subreply ml-2">18 July 2020</div>
                                    </div>
                                    <div className="option_type">
                                        <div className="suboption">
                                            <div >Counsel</div>
                                            <div >:</div>
                                        </div>
                                        <div className="subreply_link ml-2" onClick={() => this.handleClickOpen("counsel_details")} >
                                            Krishna
                                        </div>
                                    </div>                                   
                                </div>
                            </Grid>
                            <Grid item md={4} sm={12}>
                                <div className="casedetail_option">
                                    <div className="option_type">
                                        <div className="suboption">
                                            <div >Adjournment Taken</div>
                                            <div >:</div>
                                        </div>
                                        <div className="subreply ml-2">Yes</div>
                                    </div>
                                    <div className="option_type">
                                        <div className="suboption">
                                            <div >Adjournment Date</div>
                                            <div >:</div>
                                        </div>
                                        <div className="subreply ml-2">20 July 2020</div>
                                    </div>
                                    <div className="option_type">
                                        <div className="suboption">
                                            <div >No.of Adjournment</div>
                                            <div className="ml-1">:</div>
                                        </div>
                                        <div className="subreply ml-2">03</div>
                                    </div>                                    
                                    <div className="option_type">
                                        <div className="suboption">
                                            <div >Details</div>
                                            <div >:</div>
                                        </div>
                                        <div className="subreply_details ml-2">
                                            {/* <Textareaantd className={"w-100"}/> */}
                                        </div>
                                    </div>  
                                    <div className="option_type">
                                        <div className="suboption">
                                            <div >Disposal Number</div>
                                            <div className="ml-1">:</div>
                                        </div>
                                        <div className="subreply ml-2">123456789</div>
                                    </div>         
                                    <div className="option_type">
                                        <div className="suboption">
                                            <div>Physical Bundle move on </div>
                                            <div className="ml-1">:</div>
                                        </div>
                                        <div className="w-75 ml-2">
                                            <DatePicker/>
                                        </div>
                                    </div>                                          
                                </div>
                            </Grid>
                        </Grid>
                        <Modal
                            className="casedetails_modal"
                            footer={null}
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}>
                                {this.state.type === "opposite_party" && <Oppositeparty/> || this.state.type === "dra_history" && <DRAhistory/> || this.state.type==='ddra_history' && <DDRAhistory/>}
                                    
                        </Modal>
                </div>
            </div>
        </React.Fragment>
        )
    }
}
export default Casedetails;