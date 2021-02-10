import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import './Severance.css';
import Textareaantd from '../../../formcomponent/textareaantd';
import { Grid } from '@material-ui/core';
import Button from 'react-bootstrap/Button';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import ValidationLibrary from "../../../validationlibrary/validation.js"
import {sendFeedback} from './Action';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'


class Feedbackseverance extends React.Component {
    state = {
        checkedA: false,
        checkedB: false,
        checkedC: false,
        checkedD: false,
        checkedE: false,
        checkedF: false,
        checkedG: false,
        checkedH: false,
        feedbackData:{
            "environment":{
                value:'',
                validation:[{name:'required'}],
                error:null,
                errormsg:null,
            },
            "compensation":{
                value:'',
                // validation:[{name:'required'}],
                error:null,
                errormsg:null,
            }
           
        },
        feedback:[]

 
    }


    resetForm = () => {
        const {environment,compensation} = this.state.feedbackData;

        if(this.state.checkedA) {
            // alert("sdf")
            this.setState({checkedA:false})
        }

        if(this.state.checkedB) {
            this.setState({checkedB:false})
        }

        if(this.state.checkedC) {
            this.setState({checkedC:false})
        }

        if(this.state.checkedD) {
            this.setState({checkedD:false})
        }

        if(this.state.checkedE) {
            this.setState({checkedE:false})
        }

        if(this.state.checkedF) {
            this.setState({checkedF:false})
        }

        if(this.state.checkedG) {
            this.setState({checkedG:false})
        }

        if(this.state.checkedH) {
            this.setState({checkedH:false})
        }

    

        environment.value = "";
        compensation.value = "";
        this.setState({})
    }

    Changecheckedbox = ((name,key) => event => {
        
        this.setState({ ...this.state, [name]: event.target.checked,feedback:[...this.state.feedback,{"feedbacktype":key}] },() => console.log("therafdsfksdafds",this.state.feedback));
    });

   changeDynamic = (data,key) => {
       
    var feedbackData=this.state.feedbackData;
    var severancekeys=Object.keys(feedbackData);
    
      var errorcheck=ValidationLibrary.checkValidation(data,feedbackData[key].validation);
       feedbackData[key].value=data;
       feedbackData[key].error=!errorcheck.state;
       feedbackData[key].errmsg=errorcheck.msg;
       this.setState({feedbackData});
        var filtererr=severancekeys.filter((obj)=>
       feedbackData[obj].error==true || feedbackData[obj].error==null );
       if(filtererr.length>0){
           this.setState({error:true,
               errordummy:false})
    
             
            
       }else{
           this.setState({error:false})
           
           
       }
   }

   checkValidation=()=>{
    var mainvalue={}
    var feedbackData=this.state.feedbackData;
    var severancekeys=Object.keys(feedbackData);
    console.log(severancekeys,"severancekeys");
    for(var i in severancekeys){
    var errorcheck=ValidationLibrary.checkValidation(feedbackData[severancekeys[i]].value,feedbackData[severancekeys[i]].validation);
    console.log(errorcheck,"errorcheck");
    feedbackData[severancekeys[i]].error=!errorcheck.state;
    feedbackData[severancekeys[i]].errmsg=errorcheck.msg;
    mainvalue[severancekeys[i]] =feedbackData[severancekeys[i]].value
    }
    var filtererr=severancekeys.filter((obj)=>
      feedbackData[obj].error==true);
    console.log(filtererr.length)
    if(filtererr.length>0){
      this.setState({error:true})
      
    }else{
      this.setState({error:false})
      this.props.dispatch(sendFeedback(this.state.feedback,this.state.feedbackData.environment.value))

      this.resetForm()
      
    }
    this.setState({
      mainvalue,
      feedbackData
    })   
}


converter = () => {

    
    var specialHandlers = {
        "#editor":function(element,renderer){
            return true
        }
    }


    var doc = new jsPDF();
     var page;

   
    //  html2canvas(document.getElementById('converter'),{
    //      onrendered:function(canvas){
    //        page = canvas.toDataURL('image/jpeg',1.0);
    //      }
       
    // });


  
  
        doc.text("Severance Feedback Form", 10, 12, ); // 15,13 for css
      
    doc.fromHTML(document.getElementById('converter'),10,10,{'width':180});

    doc.save("Severance Feedback Form.pdf")

    console.log("sdfjshdfjhsdjfhsjdfhsdfj",doc)
}
    render() {
        return (
            <div className="card mt-3" id="converter" >
                <div className="card-body">
                    <div className="downicon">
                        <div className="content-download">
                            <SaveAltIcon onClick={this.converter} />
                            <p>Download</p>
                        </div>
                    </div>


                    <div>
                        <p>1. Which of the following influenced your decision to leave the company?</p>
                        <div className="section">
                            <Checkbox
                                color="primary"
                                onChange={this.Changecheckedbox('checkedA','compensation')}
                                value="checkedA"
                                checked={this.state.checkedA}
                            />
                            <p className="m-0">Compensation</p>
                        </div>

                    </div>
                    <div>
                        <div className="section">
                            <Checkbox
                                color="primary"
                                onChange={this.Changecheckedbox('checkedB','new job')}
                                value="checkedB" checked={this.state.checkedB}
                            />
                            <p className="m-0">New Job</p>
                        </div>
                    </div>
                    <div>
                        <div className="section">
                            <Checkbox
                                color="primary"
                                onChange={this.Changecheckedbox('checkedC','personal reason')}
                                value="checkedC" checked={this.state.checkedC}
                            />
                            <p className="m-0">Personal Reason</p>
                        </div>
                    </div>
                    <div>
                        <div className="section">
                            <Checkbox
                                color="primary"
                                onChange={this.Changecheckedbox('checkedD','relocation')}
                                value="checkedD" checked={this.state.checkedD}
                            />
                            <p className="m-0">Relocation</p>
                        </div>
                    </div>
                    <div>
                        <div className="section">
                            <Checkbox
                                color="primary"
                                onChange={this.Changecheckedbox('checkedE','conflict with co-workers')}
                                value="checkedE" checked={this.state.checkedE}
                            />
                            <p className="m-0">Conflict with co-workers</p>
                        </div>
                    </div>
                    <div>
                        <div className="section">
                            <Checkbox
                                color="primary"
                                onChange={this.Changecheckedbox('checkedF','benefits')}
                                value="checkedF" checked={this.state.checkedF}
                            />
                            <p className="m-0">Benefits</p>
                        </div>
                    </div>
                    <div>
                        <div className="section">
                            <Checkbox
                                color="primary"
                                onChange={this.Changecheckedbox('checkedG','retirement')}
                                value="checkedG" checked={this.state.checkedG}
                            />
                            <p className="m-0">Retirement</p>
                        </div>
                    </div>
                    <div>
                        <div className="section">
                            <Checkbox
                                color="primary"
                                onChange={this.Changecheckedbox('checkedH','other')}
                                value="checkedH" checked={this.state.checkedH}
                            />
                            <p className="m-0">Other</p>
                        </div>
                    </div>
                </div>
                <div className="ml-4">
                    <p>2. How did you feel about the following?</p>
                    <p className="ml-2 mb-0">Your Work environment</p>
                    <Textareaantd className="feedback_shade" value={this.state.feedbackData.environment.value} changeData={(data) => this.changeDynamic(data,'environment')} error={this.state.feedbackData.environment.error}
                            errmsg={this.state.feedbackData.environment.errmsg}>

                    </Textareaantd>

                    <p className="mt-3 ml-2 mb-0" >Your Compensation</p>
                    <Textareaantd className="feedback_shade" changeData={(data) => this.changeDynamic(data,'compensation')} value={this.state.feedbackData.compensation.value} error={this.state.feedbackData.compensation.error}
                            errmsg={this.state.feedbackData.compensation.errmsg}></Textareaantd>
                </div>
                <Grid container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    className="mt-5"
                    spacing={3}>
                    <Grid item >
                        <Button className="btnwidth btnclr" onClick={() => this.checkValidation()}>Submit</Button>
                    </Grid>
                    <Grid item>
                        <Button className="btnwidth btnclr_outline" onClick={this.resetForm}>Cancel</Button>
                    </Grid>

                </Grid>
            </div >
        )
    }
}
export default Feedbackseverance;