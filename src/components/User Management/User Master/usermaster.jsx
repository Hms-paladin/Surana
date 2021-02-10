import React from "react";
import EnhancedTable from "./table/DynTable";
import { Modal } from 'antd';
import UsermasterSchema from "./UsermasterSchema.json";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import './usermaster.css'

import ViewModel from "./table/Viewmodel";
import {connect} from 'react-redux';
import {getUserMasterDetails} from "./usermasteraction/UserMasterAction";
import {insertUserMaster} from "./usermasteraction/UserMasterAction";
import axios from 'axios';
import { apiurl } from "../../../App";
import Chip from '@material-ui/core/Chip';


class UserMaster extends React.Component{

    constructor(props) {
        super(props);
      
        this.state = {
          userdata:null,
          edituserdata:null,
          modalvisible:false,
          usermasterdetails:[],
          edit:false,
          modalShow:false,
          modalShowsms:false,
          visible:false,
          falseWhenGetRes:true
        };
      }

      handleOk = e => {
        console.log(e);
        this.setState({
          modalvisible: false,
        });
        this.getUserMasterDetails()
      };
    
      handleCancel = e => {
        console.log(e);
        this.setState({
          modalvisible: false,editId:"",editData:""
        });
      };

  componentDidMount() {
    // this.props.dispatch(getUserMasterDetails())
    this.getUserMasterDetails()
  }

  getUserMasterDetails = () =>{
    axios({
      method:'get',
      url:apiurl+'/getUser',
      Header:{
          Accept:'application/json',
          'Content-Type':'application/json'
      },
  }).then((response)=>{

    var usermasterdetails = []

    response.data.data.map((data)=>{
      usermasterdetails.push({user_name:data.user_name,mobileno:data.mobileno,email:data.email,group_name:data.group_name,active_flag:(data.active_flag?<Chip label="Active" className="status_usermaster_active" variant="outlined" /> : <Chip label="In-Active" className="status_usermaster_inactive" variant="outlined" />),id:data.id})
    })

      this.setState({
        usermasterdetailsAllValue:response.data.data,
        usermasterdetails:usermasterdetails
      },()=>this.setState({emptyTrue:true}))
  }).catch((error)=>{
  })
  }

      check = () => {
         this.setState({modalvisible: true})
      }
  
      editClick=(id)=>{
      var editData = this.state.usermasterdetailsAllValue.find((value)=>{
          if(value.id === id){
            return value
          }
        })
        this.setState({editId:id,editData:editData,modalvisible: true})
      }

    render(){
      console.log(this.state.usermasterdetails,"interimId")    
        return(
            <div>
             <div className="">
                <AddCircleOutlineIcon className="usergrp_addicon" onClick={() => this.check()} />
             </div>

              <div className="table_x_scroll">
              {this.state.usermasterdetails.length > 0 && <EnhancedTable 
                          onclickok={this.handleOk}
                          tabledata={this.state.usermasterdetails && this.state.usermasterdetails} 
                          primaryKey="userId" 
                          tableschema={UsermasterSchema.fields} 
                          editOpen={(id,rowdata)=>this.editClick(id,rowdata)}
                          mainclassName={"userwidth"}
                          tablehead={"User Master"}
                        />}

            </div>  
             {this.state.modalvisible && <ViewModel onClickCancel={this.handleCancel} onclickok={this.handleOk} editData={this.state.editData} editid={this.state.editId} />}             
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
  // usermasterdetails : state.usermaster.usermaster
})

export default connect(mapStateToProps)(UserMaster);