import React from 'react';
import { Grid } from '@material-ui/core';
import './Checklist.css';
import {Icon} from 'antd';
import Dropdownantd from '../../formcomponent/dropdownantd';
import Inputantd from '../../formcomponent/inputantd';
import { IoMdEye } from "react-icons/io";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from 'react-bootstrap/Button';
import ValidationLibrary from "../../validationlibrary/validation.js";
import ChecklistModal from './ChecklistModal';

import { Modal} from 'antd';

class Checklist extends React.Component{

    constructor(props) {
        super(props);
      
        this.state = {
           visible: false,
          errordummy:true,
          checklistdata:
          {'biometric_authentication':
          {'value':'',
          validation:[{'name':'required'},{name:'alphabetsOnly'}],
          error:null,
          errmsg:null
        },
      },
    };
      }

      showModal = () => {
        this.setState({
          visible: true,
        });
      };
      handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
           
  checkValidation=()=>{
    var mainvalue={}
    var checklistdata=this.state.checklistdata;
    var checkliskeys=Object.keys(checklistdata);
    console.log(checkliskeys,"checkliskeys");
    for(var i in checkliskeys){
    var errorcheck=ValidationLibrary.checkValidation(checklistdata[checkliskeys[i]].value,checklistdata[checkliskeys[i]].validation);
    console.log(errorcheck,"errorcheck");
    checklistdata[checkliskeys[i]].error=!errorcheck.state;
    checklistdata[checkliskeys[i]].errmsg=errorcheck.msg;
    mainvalue[checkliskeys[i]] =checklistdata[checkliskeys[i]].value
    }
    var filtererr=checkliskeys.filter((obj)=>
      checklistdata[obj].error==true);
    console.log(filtererr.length)
    if(filtererr.length>0){
      this.setState({error:true})
    }else{
      this.setState({error:false})

    }
    this.setState({
      mainvalue,
      checklistdata
    })   
}

changeDynamic=(data,key)=>{
    console.log("key",key);   
    console.log("data",data);   
    var checklistdata=this.state.checklistdata;
     var checkliskeys=Object.keys(checklistdata);
     
       var errorcheck=ValidationLibrary.checkValidation(data,checklistdata[key].validation);
        checklistdata[key].value=data;
        checklistdata[key].error=!errorcheck.state;
        checklistdata[key].errmsg=errorcheck.msg;
        this.setState({checklistdata});
         var filtererr=checkliskeys.filter((obj)=>
        checklistdata[obj].error==true || checklistdata[obj].error==null );
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
                <div className ="card mt-5">
                    <div className ="card-body">
     {/* check list heading one */}
                        <Grid item md={12} sm={12} className ="checklist_heading_div d-flex" >
                            <div className ="plus_heading_div">
                                <div>
                                    <h6 className ="checklist_heading">Checklist</h6>
                                </div>
                                <div className ="plus_icon_checklist">
                                    <Icon type ="plus" />
                                </div>
                            </div>
                        </Grid>
    {/* check list heading two */}
                        <Grid item md={12} sm={12} className ="add_checklist_heading_div">
                            <h6 className ="checklist_heading">Add Checklist</h6>
                        </Grid>
     {/* Checklist dropdown */}
                    <Grid container spacing ={2} >
                        <Grid item md={2} sm={5} className ="mt-4 ml-5">
                            <Dropdownantd label = "Checklist Name"  className="w-100" />
                        </Grid>
                        <Grid item md={2} sm={5} className ="mt-4 ml-5">
                            <Dropdownantd label = "Category"  className="w-100" />
                        </Grid>
                        <Grid item md={2} sm={5} className ="mt-4 ml-5">
                            <Inputantd label = "Checklist Item"  className="w-100" />
                        </Grid>
                        <Grid item md={2} sm={5} className ="mt-4 ml-5">
                            <Dropdownantd label = "Department"  className="w-100" />
                        </Grid>
                        </Grid>
      {/* Check list border line */}
                        <div className ="checklist_activity_border">
                            <div className ="avtivity_background">
                               <p className ="top_checklist">Checklist Activity</p>
                            </div>
                            <div className ="grid_alignment_checklist">
                                <Grid container>
                                    <Grid md={11} sm={12}>
                                        <Grid container spacing ={2}  >
                                            <Grid item md={4} sm={5}>
                                                <Inputantd label ="Biometric Authentication" className="w-100" 
                                                  changeData={(data)=>this.changeDynamic(data,'biometric_authentication')} 
                                                  value={this.state.checklistdata.biometric_authentication.value} 
                                                  error={this.state.checklistdata.biometric_authentication.error} 
                                                  errmsg={this.state.checklistdata.biometric_authentication.errmsg}
                                                  />
                                            </Grid>
                                            <Grid item md={4} sm={5}>
                                                <Dropdownantd label="On Demand" className="w-100" />
                                            </Grid> 
                                            <Grid item md={4} sm={12}>
                                                <Dropdownantd label="High" className="w-100" />
                                            </Grid>
                                            </Grid>  
                                        </Grid>
                                        <Grid md={1} sm={1} className="eye_icon_checklist">
                                           < IoMdEye className ="icon_eye_checklist" />
                                        </Grid>
                                    </Grid>

                                    <Grid container className="checklist_value_padd">
                                        <Grid md={11} sm={12}>
                                            <Grid container spacing ={2}>
                                                <Grid item md={4} sm={5}>
                                                <Inputantd  placeholder="Checklist Task"  className="w-100" />
                                                </Grid>
                                                <Grid item md={4} sm={5} onClick={this.showModal}>
                                                    <Dropdownantd placeholder="Frequency" className="w-100" />
                                                </Grid> 
                                                <Grid item md={4} sm={12}>
                                                    <Dropdownantd placeholder="Priority" className="w-100" />
                                                </Grid>
                                            </Grid>  
                                        </Grid>
                                        <Grid md={1} sm={1} className="eye_icon_checklist">
                                        < AddCircleOutlineIcon  className ="add_icon_checklist" />
                                        </Grid>
                                    </Grid>
                            </div>
                        </div>
     {/*Save and Cancel Button */}
                        <Grid container direction="row" justify="center" alignItems="center" className="mt-5" spacing={3}>
                            <Grid item >
                                <Button className="btnwidth btnclr" onClick={() => this.checkValidation()}>Save</Button>
                            </Grid>
                            
                            <Grid item >
                              <Button className="btnwidth btnclr_outline">Cancel</Button>
                            </Grid>
                        </Grid>
                    </div>
                </div>

                <div>
     
        <Modal className="close_hide"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
        >
            <ChecklistModal/>



                  </Modal>
      </div>
        </React.Fragment>
                   )
    }
}
export default Checklist;
