import React from 'react';
import { Grid } from '@material-ui/core';
import Dropdownantd from '../../../formcomponent/dropdownantd';
import Calenderbox from '../../../formcomponent/calenderbox';
import { Button } from 'react-bootstrap';
import ValidationLibrary from "../../../validationlibrary/validation"
class AppraisalRating extends React.Component{
    constructor(props) {
        super(props);
      
        this.state = {
          errordummy:true,
          appraisalratingdata:
          {'apprating_appraiser':
          {'value':'',
          validation:[{'name':'required'}],
          error:null,
          errmsg:null
        },
        'date_of_appraisal':
          {'value':'',
          validation:[{'name':'required'}],
          error:null,
          errmsg:null
        },
        'since_last':
          {'value':'',
          validation:[{'name':'required'}],
          error:null,
          errmsg:null
        },
        'appraisee':
          {'value':'',
          validation:[{'name':'required'}],
          error:null,
          errmsg:null
        },
        'current_position':
          {'value':'',
          validation:[{'name':'required'}],
          error:null,
          errmsg:null
        },        
      },
    };
      }
    
        
    
    checkValidation=()=>{
        var mainvalue={}
        var appraisalratingdata=this.state.appraisalratingdata;
        var targetkeys=Object.keys(appraisalratingdata);
        console.log(targetkeys,"targetkeys");
        for(var i in targetkeys){
        var errorcheck=ValidationLibrary.checkValidation(appraisalratingdata[targetkeys[i]].value,appraisalratingdata[targetkeys[i]].validation);
        console.log(errorcheck,"errorcheck");
        appraisalratingdata[targetkeys[i]].error=!errorcheck.state;
        appraisalratingdata[targetkeys[i]].errmsg=errorcheck.msg;
        mainvalue[targetkeys[i]] =appraisalratingdata[targetkeys[i]].value
        }
        var filtererr=targetkeys.filter((obj)=>
          appraisalratingdata[obj].error==true);
        console.log(filtererr.length)
        if(filtererr.length>0){
          this.setState({error:true})
        }else{
          this.setState({error:false})
    
        }
        this.setState({
          mainvalue,
          appraisalratingdata
        })   
    }
    changeDynamic=(data,key)=>{
        console.log("key",key);   
        console.log("data",data);   
        var appraisalratingdata=this.state.appraisalratingdata;
         var targetkeys=Object.keys(appraisalratingdata);
         
           var errorcheck=ValidationLibrary.checkValidation(data,appraisalratingdata[key].validation);
            appraisalratingdata[key].value=data;
            appraisalratingdata[key].error=!errorcheck.state;
            appraisalratingdata[key].errmsg=errorcheck.msg;
            this.setState({appraisalratingdata});
             var filtererr=targetkeys.filter((obj)=>
            appraisalratingdata[obj].error==true || appraisalratingdata[obj].error==null );
            if(filtererr.length>0){
                this.setState({error:true,
                    errordummy:false})
            }else{
                this.setState({error:false})
            }
      }
    render(){
        return(
            <React.Fragment>
            <div className="card top_move">
                <div className="card-body">
                    <div className="appRating_head">
                        <h5>Appraisal Rating</h5>
                    </div>
                    <div className="mt-3">
                        <h5>Appraiser Details</h5>
                        <Grid container spacing={1}>
                            <Grid item md={3} sm={5}>
                                <Dropdownantd label="Appraiser" className="w-100" option={["xx","yy"]}
                                changeData={(data)=>this.changeDynamic(data,'apprating_appraiser')} 
                                   value={this.state.appraisalratingdata.apprating_appraiser.value} 
                                   error={this.state.appraisalratingdata.apprating_appraiser.error} 
                                   errmsg={this.state.appraisalratingdata.apprating_appraiser.errmsg}/>
                            </Grid>
                            <Grid item md={1} sm={1}/>
                            <Grid item md={3} sm={5}>
                                <Calenderbox placeholder={"dd-mm-yyyy"} label="Date Of Appraisal" className="w-100"
                                changeData={(data)=>this.changeDynamic(data,'date_of_appraisal')} 
                                value={this.state.appraisalratingdata.date_of_appraisal.value} 
                                error={this.state.appraisalratingdata.date_of_appraisal.error} 
                                errmsg={this.state.appraisalratingdata.date_of_appraisal.errmsg}/>
                            </Grid>
                        </Grid>
                    </div>
                    <div className="mt-3">
                        <h5>Appraisee Details</h5>
                        <Grid container spacing={1}>
                            <Grid item md={3} sm={5}>
                                <Dropdownantd label="Appraisee" className="w-100" option={["xx","yy"]}
                                changeData={(data)=>this.changeDynamic(data,'appraisee')} 
                                value={this.state.appraisalratingdata.appraisee.value} 
                                error={this.state.appraisalratingdata.appraisee.error} 
                                errmsg={this.state.appraisalratingdata.appraisee.errmsg}/>
                            </Grid>
                            <Grid item md={1} sm={1}/>
                            <Grid item md={3} sm={5}>
                                <Dropdownantd label="Current Position" className="w-100" option={["xx","yy"]}
                                changeData={(data)=>this.changeDynamic(data,'current_position')} 
                                value={this.state.appraisalratingdata.current_position.value} 
                                error={this.state.appraisalratingdata.current_position.error} 
                                errmsg={this.state.appraisalratingdata.current_position.errmsg}/>
                            </Grid>
                            <Grid item md={1} sm={1}/>
                            <Grid item md={3} sm={5}>
                                <Calenderbox placeholder={"dd-mm-yyyy"} label="Since Last" className="w-100"
                                changeData={(data)=>this.changeDynamic(data,'since_last')} 
                                value={this.state.appraisalratingdata.since_last.value} 
                                error={this.state.appraisalratingdata.since_last.error} 
                                errmsg={this.state.appraisalratingdata.since_last.errmsg}/>
                            </Grid>
                        </Grid>
                    </div>
                    
                    <Grid container> 
                        <Grid item md={12} sm={12}>
                        <div className="appRating_box">
                            <div className="appRating_btnbox">
                                <span>Punctuality</span>
                            </div>
                            <Grid container spacing={1}>
                                <Grid item md={4} sm={6} className="appRating_grid">
                                    <Grid container>
                                        <Grid item md={12} sm={12}>
                                            <div className="appRating_para">
                                                <p>Always on time and completes the Tasks well ahead of time</p>
                                            </div>
                                        </Grid>
                                        <Grid item md={12} sm={12}>
                                            <div className="appRating_paging">
                                                <Button className="appRating_page">1</Button>
                                                <Button className="appRating_page">2</Button>
                                                <Button className="appRating_page">3</Button>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>                                
                                <Grid item md={4} sm={6} className="appRating_grid">
                                <Grid container>
                                    <Grid item md={12} sm={12}>
                                    <div className="appRating_para">
                                        <p>Maintains the time and completes the Task with few reminders</p>
                                    </div>
                                    </Grid>
                                        <Grid item md={12} sm={12}>
                                            <div className="appRating_paging">
                                                <Button className="appRating_page">4</Button>
                                                <Button className="appRating_page">5</Button>
                                                <Button className="appRating_page">6</Button>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item md={4} sm={12} className="appRating_grid">
                                <Grid container>
                                    <Grid itemd md={12} sm={12}>
                                    <div className="appRating_para">
                                        <p>Unable to keep up with times and Requires constant reminders to Complete the tasks</p>
                                    </div>
                                    </Grid>
                                        <Grid item md={12} sm={12}>
                                            <div className="appRating_paging">
                                                <Button className="appRating_page">7</Button>
                                                <Button className="appRating_page">8</Button>
                                                <Button className="appRating_pageselect">9</Button>
                                                <Button className="appRating_page">NA</Button>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>                                                           
                            </Grid>
                            <Grid container
                                direction="row"
                                justify="center"
                                alignItems="center" 
                                className="mt-2"
                                spacing={3}>
                                <Grid item >
                                    <Button className="appRating_btnsize btnclr">Prev</Button>
                                </Grid>
                                <Grid item >
                                    <Button className="appRating_btnsize btnclr">Next</Button>
                                </Grid>
                            </Grid>
                        </div>
                        </Grid>
                    </Grid>
                    
                    <Grid container
                                direction="row"
                                justify="center"
                                alignItems="center" 
                                className="mt-3"
                                spacing={3}>
                                <Grid item >
                                <Button className="btnwidth btnclr" 
                                onClick={()=>this.checkValidation()}
                                >Submit</Button>
                                </Grid>
                                <Grid item >
                                <Button className="btnwidth btnclr_outline">Cancel</Button>
                                </Grid>
                    </Grid>
                </div>
            </div>
            </React.Fragment>
        )
    }
}
export default AppraisalRating;