import React from "react"
import { Modal, Button } from 'antd';
import "./table/viewmodel.css"
import Grid from '@material-ui/core/Grid'
import axios from 'axios';
import { Select} from 'antd';
import Inputantd from "../../../formcomponent/inputantd";
import ValidationLibrary from "../../../validationlibrary/validation";
import {addusergroup,updateusergroup} from "../action/usergroupAction";
import {connect} from 'react-redux';

const { Option } = Select;

class ReactModal extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
        Group_formdata:
          {'Group_name':
          {'value': props.editData ? props.editData.group : '',
          validation:[{'name':'required'}],
          error:null,
          errmsg:null
        },        
      },
        }
    }


    showModal = () => {
        this.props.onclickok && this.props.onclickok()
    };

    handleCancel = e => {
        this.props.onclickok && this.props.onclickok()
    };

    changeDynamic=(data,key)=>{
        console.log("key",key);   
        console.log("data",data);   
        var Group_formdata = this.state.Group_formdata;
         var targetkeys=Object.keys(Group_formdata ) ;
           var errorcheck=ValidationLibrary.checkValidation(data,Group_formdata [ key].validation);
            Group_formdata [ key].value=data;
            Group_formdata [ key].error=!errorcheck.state;
            Group_formdata [ key].errmsg=errorcheck.msg;
            this.setState({Group_formdata } );
             var filtererr=targetkeys.filter((obj)=>
            Group_formdata [ obj].error==true || Group_formdata [ obj].error==null );
            if(filtererr.length>0){
                this.setState({error:true,
                    errordummy:false})
            }else{
                this.setState({error:false})
            }
      }


      checkValidation=()=>{
        var mainvalue={}
        var Group_formdata=this.state.Group_formdata;
        var targetkeys=Object.keys(Group_formdata);
        console.log(targetkeys,"targetkeys");
        for(var i in targetkeys){
        var errorcheck=ValidationLibrary.checkValidation(Group_formdata[targetkeys[i]].value,Group_formdata[targetkeys[i]].validation);
        console.log(errorcheck,"errorcheck");
        Group_formdata[targetkeys[i]].error=!errorcheck.state;
        Group_formdata[targetkeys[i]].errmsg=errorcheck.msg;
        mainvalue[targetkeys[i]] =Group_formdata[targetkeys[i]].value
        }
        var filtererr=targetkeys.filter((obj)=>
          Group_formdata[obj].error==true);
        console.log(filtererr.length)
        if(filtererr.length>0){
          this.setState({error:true})
        }else{
          this.setState({error:false})
          if(!this.props.edit) {
            this.submitGroupName()
            this.props.onclickok()
          }else{
             this.updateGroupName()
             this.props.onclickok()
          }
        }
        this.setState({
          mainvalue,
          Group_formdata
        })   
    }

    submitGroupName = () => {
        this.props.dispatch(addusergroup(this.state.Group_formdata.Group_name.value,this.props.getUserGroup))
    }
    
    updateGroupName = () => {
        this.props.dispatch(updateusergroup(this.state.Group_formdata.Group_name.value,this.props.editData.id,this.props.getUserGroup))
    }

    render() {
 
        return (
            <div className="popup_width">
              
                <Modal
                    title= {!this.props.edit ? "Add User Group" : "Update User Group"}
                    visible={this.props.visible}
                    onOk={this.props.onclickok}
                    onCancel={this.handleCancel}
                    className={"user_group"}
               
                >
            <div className="card-body ">
                    <Inputantd
                    label={"Group Name"} 
                    value={this.state.Group_formdata.Group_name.value} 
                    error={this.state.Group_formdata.Group_name.error} 
                    errmsg={this.state.Group_formdata.Group_name.errmsg}
                    changeData={(data)=>this.changeDynamic(data,'Group_name')} 
                    />
            </div>
               
               <div className="usergroup_btn">
               <button className="cancelusermaster"  onClick={this.props.onclickok}>Cancel</button>
               <button className="createusermaster"  onClick={()=>this.checkValidation()}>{!this.props.edit ? "Create" : "Update"}</button>
               </div>
                </Modal>
           </div>
        );
    }
}

export default connect()(ReactModal);




