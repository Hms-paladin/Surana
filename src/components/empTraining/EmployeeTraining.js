import React, { Component } from 'react';
// import { reduxForm, Form } from 'redux-form';
// import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Dropdownantd from '../../formcomponent/dropdownantd';
import Calenderbox from '../../formcomponent/calenderbox';
import Textareaantd from '../../formcomponent/textareaantd';
import Inputantd from '../../formcomponent/inputantd';
import Button from 'react-bootstrap/Button';
import ValidationLibrary from "../../validationlibrary/validation.js";
import {apiurl} from "../../App";
const axios = require('axios');



class EmployeeTraining extends React.Component{

    state = {
        changeval:true,
        emptrainingdata:
        {'training_name':
        {'value':'',
        validation:[{'name':'required'},{name:'alphabetwithspace'}],
        error:"",
        errmsg:null
      },
      'type':
        {'value':'',
        validation:[{'name':''}],
        error:null,
        errmsg:null
      },
      'topic':
      {'value':'',
      validation:[{name:'alphabetsOnly'}],
      error:null,
      errmsg:null
    },
    'description':
        {'value':'',
        validation:[{name:'alphabetsOnly'}],
        error:null,
        errmsg:null
      },
      'from_date':
        {'value':'',
        validation:[],
        error:null,
        errmsg:null
      },
      'to_date':
        {'value':'',
        validation:[],
        error:null,
        errmsg:null
      },
    }
}

changeDynamic=(data,key)=>{
    console.log("key",key);   
    console.log("data",data);   
    var emptrainingdata=this.state.emptrainingdata;
     var targetkeys=Object.keys(emptrainingdata);
     
       var errorcheck=ValidationLibrary.checkValidation(data,emptrainingdata[key].validation);
        emptrainingdata[key].value=data;
        emptrainingdata[key].error=!errorcheck.state;
        emptrainingdata[key].errmsg=errorcheck.msg;
        this.setState({emptrainingdata});
         var filtererr=targetkeys.filter((obj)=>
        emptrainingdata[obj].error==true || emptrainingdata[obj].error==null );
        if(filtererr.length>0){
            this.setState({error:true,
                errordummy:false})
        }else{
            this.setState({error:false})
        }
  }
    
      callroot=()=>{
        this.setState({changeval:false})
        
        var emptrainingdata=this.state.emptrainingdata;
        var targetkeys=Object.keys(emptrainingdata);
        console.log(targetkeys);
        for(var i in targetkeys){
        var errorcheck=ValidationLibrary.checkValidation(emptrainingdata[targetkeys[i]].value,emptrainingdata[targetkeys[i]].validation);
        console.log(errorcheck);
        emptrainingdata[targetkeys[i]].error=!errorcheck.state;
        emptrainingdata[targetkeys[i]].errmsg=errorcheck.msg;
        }
        var filtererr=targetkeys.filter((obj)=>
          emptrainingdata[obj].error==true);
        console.log(filtererr.length)
        if(filtererr.length>0){
          this.setState({error:true})
        }else{
          this.setState({error:false})
    
        }
        this.setState({emptrainingdata})

    
        axios({
            method: 'post',
            url: apiurl+'/addtraining',
            headers:{
              Accept:'application/json',
              'Content-Type':'application/json',
            },
            data: {
              "empId":9,
              "training":emptrainingdata.training_name.value,
              "type":emptrainingdata.type.value,
              "topic":emptrainingdata.topic.value,
              "description":emptrainingdata.description.value,
              "fromdate":emptrainingdata.from_date.value,
              "todate":emptrainingdata.to_date.value,
            }
          })
          .then(function (response) {
            console.log(response,"responsepayrolldata");
          })
          .catch(function (error) {
            console.log(error);
          });
    
      }
    
    render(){
        return(
            
                <div className="card card-min-height top_move">
                    <div className="card-body card-body-padding">
                    <Grid container spacing={3}>
                        <Grid item md={3} sm={12}>
                            <Dropdownantd label={"Training Name"} 
                            className={"w-100"} 
                            option={["Class A","Class B"]}
                            changeData={(data)=>this.changeDynamic(data,'training_name')} 
                            value={this.state.emptrainingdata.training_name.value} 
                            error={this.state.emptrainingdata.training_name.error} 
                            errmsg={this.state.emptrainingdata.training_name.errmsg}
                            required
                            >
                            </Dropdownantd>
                        </Grid>
                       
                        <Grid md={1} />
                        <Grid item md={3} sm={12}>
                            <Dropdownantd label={"Type"}
                             className={"w-100"} 
                             option={["Class A","Class B"]}
                             changeData={(data)=>this.changeDynamic(data,'type')} 
                                value={this.state.emptrainingdata.type.value} 
                                error={this.state.emptrainingdata.type.error} 
                                errmsg={this.state.emptrainingdata.type.errmsg}
                             ></Dropdownantd>
                        </Grid>
                      
                        <Grid md={1} />
                        <Grid item md={3} sm={12}>
                            <Inputantd label={"Topic"}
                             className={"w-100"}
                             changeData={(data)=>this.changeDynamic(data,'topic')}
                            value={this.state.emptrainingdata.topic.value} 
                            error={this.state.emptrainingdata.topic.error} 
                            errmsg={this.state.emptrainingdata.topic.errmsg}
                             ></Inputantd>
                        </Grid>
                       
                        <Grid md={1} />
                        <Grid item md={3} sm={12}>
                            <Textareaantd label={"Description"} 
                            className={"w-100"}
                            changeData={(data)=>this.changeDynamic(data,'description')} 
                            value={this.state.emptrainingdata.description.value} 
                            error={this.state.emptrainingdata.description.error} 
                            errmsg={this.state.emptrainingdata.description.errmsg}
                            />
                        </Grid>
                        <Grid md={1} />
                        <Grid item md={3} sm={12}>

                            <Calenderbox label={"From Date"} format={"DD-MM-YYYY"}
                             className={"w-100"}
                             changeData={(data)=>this.changeDynamic(data,'from_date')} 
                                value={this.state.emptrainingdata.from_date.value} 
                                error={this.state.emptrainingdata.from_date.error} 
                                errmsg={this.state.emptrainingdata.from_date.errmsg}>
                             </Calenderbox>
                        </Grid>
                        <Grid md={1} />
                        <Grid item md={3} sm={12}>
                            <Calenderbox label={"To Date"} 
                            className={"w-100"}
                            changeData={(data)=>this.changeDynamic(data,'to_date')} 
                            value={this.state.emptrainingdata.to_date.value} 
                            error={this.state.emptrainingdata.to_date.error} 
                            errmsg={this.state.emptrainingdata.to_date.errmsg}>
                            </Calenderbox>
                            </Grid>
                            </Grid>
                           
                             <Grid container
                            direction="row"
                            justify="center"
                            alignItems="center" 
                            className="gridbtnalign"
                            spacing={3}>
                            <Grid item >
                            <Button size="lg" className="btnmargin btnwidth btnclr"onClick={()=>this.callroot()}> Save</Button>
                            </Grid>
                            <Grid item >
                            <Button size="lg" className="btnwidth btnclr_outline">Cancel</Button>
                            </Grid>
                        </Grid>
                            </div>
                            </div>
                        
                            );
                            }
                }
 
 export default EmployeeTraining;