import React from "react"
import { Modal, Button } from 'antd';
import "./viewmodel.css"
import Grid from '@material-ui/core/Grid'
import { Select} from 'antd';
import Inputantd from "../../../../formcomponent/inputantd";
import Switch from '@material-ui/core/Switch';
import ValidationLibrary from "../../../../validationlibrary/validation";
import Dropdownantd from '../../../../formcomponent/dropdownantd';
import { apiurl } from "../../../../App";

const axios = require('axios');


const { Option } = Select;

class ViewModal extends React.Component {
    state = { 
        visible: this.props.modalopen,
        switched:true,
        user_master:{
          'username':{'value':'',
          validation:[{'name':'required'}],
          error:null,
          errmsg:null
          },
          'candidatename':{'value':'',
          validation:[{'name':'required'}],
          error:null,
          errmsg:null
          },
          'password':{'value':'',
          validation:[{'name':'required'}],
          error:null,
          errmsg:null
          },
          'mobilenumber':{'value':'',
          validation:[{'name':'required'}],
          error:null,
          errmsg:null
          },
          'emailid':{'value':'',
          validation:[{'name':'required'}],
          error:null,
          errmsg:null
          },
          'usergroup':{'value':'',
          validation:[{'name':'required'}],
          error:null,
          errmsg:null
          },
        }
 };


    showModal = () => {
        this.props.onclickok && this.props.onclickok()
    };

    handleCancel = e => {
        this.props.onClickCancel && this.props.onClickCancel()
    };

    handleChange = ()=>{
        this.setState({
            switched:!this.state.switched
        })
    }

    changeDynamic = (data, key) => {
        console.log("key", key);
        console.log("data", data);
        var user_master = this.state.user_master;
        var targetkeys = Object.keys(user_master);
        var errorcheck = ValidationLibrary.checkValidation(
          data,
          user_master[key].validation
        );
        user_master[key].value = data;
        user_master[key].error = !errorcheck.state;
        user_master[key].errmsg = errorcheck.msg;
        this.setState({ user_master });
        var filtererr = targetkeys.filter(
          (obj) =>
            user_master[obj].error == true ||
            user_master[obj].error == null
        );
        if (filtererr.length > 0) {
          this.setState({ error: true, errordummy: false });
        } else {
          this.setState({ error: false });
        }
      };

      checkValidation = () => {
        var mainvalue = {};
        var user_master = this.state.user_master;
        var targetkeys = Object.keys(user_master);
        console.log(targetkeys, "targetkeys");
        for (var i in targetkeys) {
          var errorcheck = ValidationLibrary.checkValidation(
            user_master[targetkeys[i]].value,
            user_master[targetkeys[i]].validation
          );
          console.log(errorcheck, "errorcheck");
          user_master[targetkeys[i]].error = !errorcheck.state;
          user_master[targetkeys[i]].errmsg = errorcheck.msg;
          mainvalue[targetkeys[i]] = user_master[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter(
          (obj) => user_master[obj].error == true
        );
        console.log(filtererr.length);
        if (filtererr.length > 0) {
          this.setState({ error: true });
        } else {
          this.setState({ error: false });
          {this.props.editData ?
            this.update():
          this.insert()}
    }
    this.setState({
    //   mainvalue,
      user_master
    })   
  }

  update=()=>{

    // if(!Number(this.state.user_master.candidatename.value)){
    //  var candidatename = this.state.candidateList.find((val) => {
    //     if(this.state.user_master.candidatename.value==val.EmpName){
    //       return val.EmpId 
    //     }}
    //    )
    // }else{
    //   var candidatename = this.state.candidateList[this.state.user_master.candidatename.value-1].EmpId
    // }

    // console.log(candidatename,"candidatename")

    if(!Number(this.state.user_master.usergroup.value)){
      var usergroup = this.state.getGroup.find((val) => {
         if(this.state.user_master.usergroup.value==val.group_name){
           return val.id 
         }}
        )
     }else{
       var usergroup = this.state.getGroup[this.state.user_master.usergroup.value-1].id
     }

    console.log(usergroup,"usergroup")


    axios({
      method: 'put',
      url: apiurl + "/editUser",
      data:{
        "active_flag": this.state.switched?"1":"0",
        "created_by": "1",
        "employee_id":this.state.candidateId,
        "username": this.state.user_master.username.value,
        "password": this.state.user_master.password.value,
        "mobileno": this.state.user_master.mobilenumber.value,
        "email": this.state.user_master.emailid.value,
        "groupId": typeof usergroup === "object" ? usergroup.id : usergroup,
        "user_id":"2"
        }
    })
      .then( (response)=>{
          this.props.onclickok()
      })
  }

  insert=()=>{

    var candidatename = this.state.candidateList[this.state.user_master.candidatename.value-1].EmpId
    var usergroup = this.state.getGroup[this.state.user_master.usergroup.value-1].id

    axios({
      method: 'post',
      url: apiurl + "/insertUser",
      data:{
        "active_flag": this.state.switched?"1":"0",
        "created_by": "1",
        "employee_id":candidatename,
        "username": this.state.user_master.username.value,
        "password": this.state.user_master.password.value,
        "mobileno": this.state.user_master.mobilenumber.value,
        "email": this.state.user_master.emailid.value,
        "groupId": usergroup,
        "user_id":"0"
        }
    })
      .then( (response)=>{
          this.props.onclickok()
      })
  }

  componentDidMount(){

    axios({
      method: 'get',
      url: apiurl + "/getGroupMaster",
    })
      .then( (response)=>{
        this.setState({getGroup:response.data.data})
      })

      axios({
        method: 'get',
        url: apiurl + "/getCandidateName",
      })
        .then( (response)=>{
          console.log(response.data.data,"getcandidatelist")
          this.setState({candidateList:response.data.data[0]})
        })

        console.log(this.props.editData,"editData")

        const { editData } = this.props

        if(editData){
          this.state.user_master.candidatename.value = editData.candidate_name
          this.state.user_master.username.value = editData.user_name
          this.state.user_master.password.value = editData.password
          this.state.user_master.mobilenumber.value = editData.mobileno
          this.state.user_master.emailid.value = editData.email
          this.state.user_master.usergroup.value = editData.group_name
          this.setState({switched:editData.active_flag==1?true:false,candidateId:editData.employee_id})
        }

  }

    render() {

      console.log(this.state.switched,"switched")
        
        return (
            <div className="popup_width">
              
                <Modal
                    title="Add User"
                    visible={true}
                    onOk={this.props.onclickok}
                    onCancel={this.handleCancel}
                    className={"adduser_modal"}
                >

            <div className="card-body ">
                    <Grid container spacing={3}>
                   
                    <Grid item md={4} sm={5} className="w-100">
                    <Dropdownantd label={"Candidate Name"} className="w-100"
                    option={                  
                      this.state.candidateList &&
                      this.state.candidateList.map((val) => val.EmpName)}
                    changeData={(data)=>this.changeDynamic(data,'candidatename')} 
                    value={this.state.user_master.candidatename.value} 
                    error={this.state.user_master.candidatename.error} 
                    errmsg={this.state.user_master.candidatename.errmsg}/>
                    
                    </Grid>

                    <Grid item md={4} sm={5} className="w-100">
                    <Inputantd label={"User Name"} className="w-100"
                    changeData={(data)=>this.changeDynamic(data,'username')} 
                    value={this.state.user_master.username.value} 
                    error={this.state.user_master.username.error} 
                    errmsg={this.state.user_master.username.errmsg}/>
                    </Grid>

                    <Grid item md={4} sm={5} className="w-100">

                    <Inputantd label={"Password"} className="w-100"
                    changeData={(data)=>this.changeDynamic(data,'password')} 
                    value={this.state.user_master.password.value} 
                    error={this.state.user_master.password.error} 
                    errmsg={this.state.user_master.password.errmsg}/>
                    </Grid>
                   
                    <Grid item md={4} sm={5} className="w-100">

                    <Inputantd label={"Mobile Number"} className="w-100"
                    changeData={(data)=>this.changeDynamic(data,'mobilenumber')} 
                    value={this.state.user_master.mobilenumber.value} 
                    error={this.state.user_master.mobilenumber.error} 
                    errmsg={this.state.user_master.mobilenumber.errmsg}/>
                    </Grid>

                    <Grid item md={4} sm={5} className="w-100">

                  <Inputantd label={"Email Id"} className="w-100"
                    changeData={(data)=>this.changeDynamic(data,'emailid')} 
                    value={this.state.user_master.emailid.value} 
                    error={this.state.user_master.emailid.error} 
                    errmsg={this.state.user_master.emailid.errmsg}/>
                </Grid>

                <Grid item md={4} sm={5} className="w-100">

                <Dropdownantd label={"User Group"} className="w-100"
                    option={                  
                      this.state.getGroup &&
                      this.state.getGroup.map((val) => val.group_name)}
                    changeData={(data)=>this.changeDynamic(data,'usergroup')} 
                    value={this.state.user_master.usergroup.value} 
                    error={this.state.user_master.usergroup.error} 
                    errmsg={this.state.user_master.usergroup.errmsg}/>
                </Grid>

                <Grid item md={6} sm={5} className="w-100">
               
                <label>
               Active
                </label>
               
                <Switch
                    checked={this.state.switched}
                    onChange={this.handleChange}
                    color="primary"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
                </Grid>
                
                <Grid item md={6} sm={5} className="w-100 usermaster_btn">
               
               <button className="cancelusermaster" onClick={this.handleCancel} >Cancel</button>
               {this.props.editData ?
               <button className="createusermaster" onClick={this.checkValidation}>Update</button>
                :
               <button className="createusermaster" onClick={this.checkValidation}>Create</button>
                }
                </Grid>

                </Grid> 
                </div>
               
                </Modal>
           </div>
        );
    }
}

export default ViewModal;




