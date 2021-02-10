import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import Grid from '@material-ui/core/Grid';
import Calenderbox from '../../../formcomponent/calenderbox';
import Dropdownantd from '../../../formcomponent/dropdownantd';
import {Radio} from 'antd';
import './HearingModal.css';
import ValidationLibrary from "../../../validationlibrary/validation";
import { Switch,DatePicker } from 'antd';
import { apiurl } from "../../../App";
import { connect } from "react-redux";
import {gethearingTask,gethearingParty} from '../Action/HearingAction';
import axios from 'axios';
import Inputantd from '../../../formcomponent/inputantd';
import Textareaantd from '../../../formcomponent/textareaantd';

class HearingModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          checked:false,
          TsId:3,
          value:1,
          radioon:false,
          errordummy:true,

          status_zero:0,
          status_one:1,
          status_two:2,

          hearingmodaldata:
          {        
        'outcome':
        {
          'value':'',
          validation:[{'name':'required'}],
          error:null,
          errmsg:null
        },
        'actionTask':
        {
          'value':'',
          validation:[{'name':'required'}],
          error:null,
          errmsg:null
        },
        'nextHearingDate':
          {'value':'',
          validation:[{'name':'required'}],
          error:null,
          errmsg:null
        },
        'TaskAssignedTo':
          {'value':'',
          validation:[{'name':'required'}],
          error:null,
          errmsg:null
        },
        'TaskCompletion':
          {'value':'',
          validation:[{'name':'required'}],
          error:null,
          errmsg:null
        },
        'TakenParty':
          {'value':'',
          validation:[{'name':'required'}],
          error:null,
          errmsg:null
        },
        'TakenBy':
          {'value':'',
          validation:[{'name':'required'}],
          error:null,
          errmsg:null
        },
        'reason':
          {'value':'',
          validation:[{'name':'required'}],
          error:null,
          errmsg:null
        },
        'hearingdate':
          {'value':'',
          validation:[{'name':'required'}],
          error:null,
          errmsg:null
        },
      },
    };
    
      }

      async componentDidMount() {
                await this.props.gethearingTask();
                await this.props.gethearingParty();
               }
    updateModal=(data)=>{
        console.log(data,"heardata")
               }
    clickon=(e)=>{
        this.setState({
            radioon:true
        })
    }
    yesClick=(e)=>{
        this.setState({
            radioon:false,
        })
    }
    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    }
    checkValidation=()=>{
        var mainvalue={}
        var hearingmodaldata=this.state.hearingmodaldata;
        var hearingmodalkeys=Object.keys(hearingmodaldata);
        console.log(hearingmodalkeys,"hearingmodalkeys");
        for(var i in hearingmodalkeys){
        var errorcheck=ValidationLibrary.checkValidation(hearingmodaldata[hearingmodalkeys[i]].value,hearingmodaldata[hearingmodalkeys[i]].validation);
        console.log(errorcheck,"errorcheck");
        hearingmodaldata[hearingmodalkeys[i]].error=!errorcheck.state;
        hearingmodaldata[hearingmodalkeys[i]].errmsg=errorcheck.msg;
        mainvalue[hearingmodalkeys[i]]=hearingmodaldata[hearingmodalkeys[i]].value
        }
        var filtererr=hearingmodalkeys.filter((obj)=>
          hearingmodaldata[obj].error==true);
        console.log(filtererr.length)
        if(filtererr.length>0){
          this.setState({error:true})
        }else{
          this.setState({error:false})

          var self = this;
          var hearingData=[]
          if(this.state.checked === true){
            hearingData=
              {
                "TsId":this.state.TsId,
                "ClientId":this.props.hearingClient,
                "ProjectId":this.props.hearingProject,
                "createdon":this.state.hearingmodaldata.hearingdate.value,
                "caseoutcome":this.state.hearingmodaldata.outcome.value,
                "status":this.state.status_two

              }
            
          }
          else if(this.state.value === 1){
            hearingData=
              {
                "TsId":this.state.TsId,
                "ClientId":this.props.hearingClient,
                "ProjectId":this.props.hearingProject,
                "createdon":this.state.hearingmodaldata.hearingdate.value,
                "caseoutcome":this.state.hearingmodaldata.outcome.value,
                "actiontask":this.state.hearingmodaldata.actionTask.value,
                "taskassignedto":this.state.hearingmodaldata.TaskAssignedTo.value,
                "nexthearingdate":this.state.hearingmodaldata.nextHearingDate.value,
                "taskcompletion":this.state.hearingmodaldata.TaskCompletion.value,
                "takenparty":this.state.hearingmodaldata.TakenParty.value,
                "takenby":this.state.hearingmodaldata.TakenBy.value,
                "reason":this.state.hearingmodaldata.reason.value,
                "status":this.state.status_one
              }
            
          }
          else if(this.state.value === 0){
            hearingData =
              {
                "TsId":this.state.TsId,
                "ClientId":this.props.hearingClient,
                "ProjectId":this.props.hearingProject,
                "createdon":this.state.hearingmodaldata.hearingdate.value,
                "caseoutcome":this.state.hearingmodaldata.outcome.value,
                "actiontask":this.state.hearingmodaldata.actionTask.value,
                "taskassignedto":this.state.hearingmodaldata.TaskAssignedTo.value,
                "nexthearingdate":this.state.hearingmodaldata.nextHearingDate.value,
                "taskcompletion":this.state.hearingmodaldata.TaskCompletion.value,
                "status":this.state.status_zero
              }
            
          }
          
          console.log(hearingData,"hearingData")
          axios({
            method: "post",
            url: apiurl + "/addhearing",
            data:hearingData
          }).then(function (response) {
              console.log(response.data.data, "responseresponse");
              self.setState({});
            })
            .catch(function (error) {
              console.log(error, "error");
            });
        }
        this.setState({
          mainvalue,
          hearingmodaldata
        })   
    }
    changeDynamic=(data,key)=>{
        console.log("key",key);   
        console.log("data",data);   
        var hearingmodaldata=this.state.hearingmodaldata;
         var hearingmodalkeys=Object.keys(hearingmodaldata);
           var errorcheck=ValidationLibrary.checkValidation(data,hearingmodaldata[key].validation);
            hearingmodaldata[key].value=data;
            hearingmodaldata[key].error=!errorcheck.state;
            hearingmodaldata[key].errmsg=errorcheck.msg;
            console.log(hearingmodaldata[key].value,"keyval")
            this.setState({hearingmodaldata});
             var filtererr=hearingmodalkeys.filter((obj)=>
            hearingmodaldata[obj].error==true || hearingmodaldata[obj].error==null );
            if(filtererr.length>0){
                this.setState({error:true,
                    errordummy:false})
            }else{
                this.setState({error:false})
            }
      }

      SwitchCheck=()=>{
        this.setState({
          checked:!this.state.checked
          // checked:true
        })
      }
    render() {
      console.log(this.props,"props")
      console.log(this.state.hearingmodaldata.TakenParty.value,"taken")
        return (
            <React.Fragment>
                {/* <Card>
                        <Card.Body> */}
                <Grid item md={4} sm={6}>
                    <h6 className="Hearing_form-subheading">Add Hearing Details</h6>
                </Grid>
                <Grid spacing={2} style={{ display: 'flex' }} className="mt-3">
                    <Grid item md={3} sm={4}>
                      <p>Client Name: {this.props.hearingClient}</p>
                    </Grid>
                    <Grid item md={3} sm={4}>
                        <p>Project:{this.props.hearingProject}</p>
                    </Grid>
                    <Grid item md={6} sm={4}>
                      <p className="date_dist">
                        Date:
                      <Calenderbox className="ml-3" className="hearing_date"
                      changeData={(data)=>this.changeDynamic(data,'hearingdate')} 
                      value={this.state.hearingmodaldata.hearingdate.value} 
                      error={this.state.hearingmodaldata.hearingdate.error} 
                      errmsg={this.state.hearingmodaldata.hearingdate.errmsg}/></p> 
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item md={8} sm={5} className="hearing_textarea">                        
                          <Textareaantd placeholder="Outcome" className="timesheetinput"
                          changeData={(data)=>this.changeDynamic(data,'outcome')}
                          value={this.state.hearingmodaldata.outcome.value}
                          error={this.state.hearingmodaldata.outcome.error}
                          errmsg={this.state.hearingmodaldata.outcome.errmsg}
                          />
                    </Grid>
                    <Grid item md={2}>
                        <div className="mt-5">Case Closed</div>
                    </Grid>
                    <Grid item md={2} sm={5}>
                        <div className="mt-5">
                        <Switch onClick={this.SwitchCheck}/>
                        </div>
                    </Grid>
                    {this.state.checked === false ?
                    <>
                    <Grid item md={7} sm={5}>                        
                        <Inputantd placeholder="Action Task" className="w-100"
                        changeData={(data)=>this.changeDynamic(data,'actionTask')}
                        value={this.state.hearingmodaldata.actionTask.value}
                        error={this.state.hearingmodaldata.actionTask.error}
                        errmsg={this.state.hearingmodaldata.actionTask.errmsg}
                        />
                    </Grid>
                    <Grid item md={4} sm={4}>
                        <Calenderbox placeholder="Next Hearing Date" className="w-100"
                        changeData={(data)=>this.changeDynamic(data,'nextHearingDate')} 
                        value={this.state.hearingmodaldata.nextHearingDate.value} 
                        error={this.state.hearingmodaldata.nextHearingDate.error} 
                        errmsg={this.state.hearingmodaldata.nextHearingDate.errmsg}></Calenderbox>
                    </Grid>
                    <Grid item md={7} sm={6}>
                        <Dropdownantd placeholder="Task Assigned to" className="w-100"
                        option={this.props.hearingTask && this.props.hearingTask.map((val)=>val.EmpName)}
                        changeData={(data)=>this.changeDynamic(data,'TaskAssignedTo')} 
                        value={this.state.hearingmodaldata.TaskAssignedTo.value} 
                        error={this.state.hearingmodaldata.TaskAssignedTo.error} 
                        errmsg={this.state.hearingmodaldata.TaskAssignedTo.errmsg} />
                    </Grid>
                    <Grid item md={4} sm={4}>
                        <Calenderbox placeholder="Task Completion" className="w-100" 
                        changeData={(data)=>this.changeDynamic(data,'TaskCompletion')} 
                        value={this.state.hearingmodaldata.TaskCompletion.value} 
                        error={this.state.hearingmodaldata.TaskCompletion.error} 
                        errmsg={this.state.hearingmodaldata.TaskCompletion.errmsg}/>
                    </Grid>
                    <Grid item md={12} sm={6}>
                        <h6 className="Hearing_form-subheading">Adjournment Taken Details</h6>
                    </Grid>
                    <Grid item md={12} sm={6}>
                        <Grid container spacing={3}>
                      <Grid item md={3} sm={6}> 
                      <label style={{width:"100%"}}>
                            Adjournment Taken
                        </label>  
                        <Radio.Group onChange={this.onChange} value={this.state.value} className="mt-1">
                            <Radio value={1} onClick={this.yesClick}>Yes</Radio>
                            <Radio value={0}  onClick ={this.clickon}>No</Radio>
                        </Radio.Group>
                    </Grid>
                <Grid item md={7} sm={6}>
                {this.state.radioon == false ?
                    <Grid container>
                        <Grid item md={5} sm={6}>
                            <Dropdownantd label="Taken Party" className="w-100"
                            option={this.props.hearingParty && this.props.hearingParty.map((val)=>val.TakenPartyName)}
                            changeData={(data)=>this.changeDynamic(data,'TakenParty')} 
                            value={this.state.hearingmodaldata.TakenParty.value} 
                            error={this.state.hearingmodaldata.TakenParty.error} 
                            errmsg={this.state.hearingmodaldata.TakenParty.errmsg}/>
                        </Grid>
                        <Grid item md={1} sm={1}/>
                        <Grid item md={5} sm={6}>
                          {this.state.hearingmodaldata.TakenParty.value === 2 ?
                            <Inputantd label="Taken By" className="w-100"
                            option={this.props.hearingTask && this.props.hearingTask.map((val)=>val.EmpName)}
                            changeData={(data)=>this.changeDynamic(data,'TakenBy')} 
                            value={this.state.hearingmodaldata.TakenBy.value} 
                            error={this.state.hearingmodaldata.TakenBy.error} 
                            errmsg={this.state.hearingmodaldata.TakenBy.errmsg}/>
                            
                            :

                            <Dropdownantd label="Taken By" className="w-100"
                            option={this.props.hearingTask && this.props.hearingTask.map((val)=>val.EmpName)}
                            changeData={(data)=>this.changeDynamic(data,'TakenBy')} 
                            value={this.state.hearingmodaldata.TakenBy.value} 
                            error={this.state.hearingmodaldata.TakenBy.error} 
                            errmsg={this.state.hearingmodaldata.TakenBy.errmsg}/>
                          }
                        </Grid>
                    </Grid>
                        : null
                }
                </Grid>
                </Grid>
                </Grid>
                        <Grid item md={11} sm={6} className="hearing_textarea">
                            <>
                            {this.state.radioon == false ?
                            <Textareaantd label="Reason" className="w-100 "
                            changeData={(data)=>this.changeDynamic(data,'reason')} 
                            value={this.state.hearingmodaldata.reason.value} 
                            error={this.state.hearingmodaldata.reason.error} 
                            errmsg={this.state.hearingmodaldata.reason.errmsg}/>
                            : null      
                            }
                            </>
                  </Grid> 
                  </> 
                  : null
                  }   
                  </Grid>
                  <Grid container
                direction="row"
                justify="center"
                alignItems="center" 
                className="mt-2 "
                spacing={3}>
                    <Grid item >
                    <Button className="btnwidth btnclr_outline" onClick={this.props.closeModal}>Cancel</Button>
                    </Grid>
                    <Grid item>
                    <Button className="btnwidth btnclr" onClick={()=>this.checkValidation()}>Save</Button>
                    </Grid>
                </Grid>
                {/* </Card.Body>
                    </Card> */}
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
      console.log("state in ope", state);
    
      return {
      //   opemodaldata: state.resumeReducer.opemodaldata,
        hearingTask:state.hearing.gethearingTask,
        hearingParty:state.hearing.gethearingParty
      };
    };
    
    export default connect(mapStateToProps, {
      gethearingTask,
      gethearingParty,
    })(HearingModal);
  
// export default HearingModal;