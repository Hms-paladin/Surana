
import React from 'react';
import EnhancedTable from "./table/DynTable";
import Unblockuserschema from './Unblockuserschema.json';
import Button from '@material-ui/core/Button'
import { Popconfirm } from 'antd';
import './unblockuser.css';
import { Modal } from 'antd';
import { apiurl } from "../../../App";


const axios = require('axios');

class Unblockuser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible:false,
            userdata: null,
            edituserdata: null,
            modalvisible: false,
            usertabledata: [],
            edit: null
        };
        
    }
    handleOk=()=>{
        this.setState({
            visible:false
        })
    }
    handleCancel=()=>{
        this.setState({
            visible:false
        })
    }
    unblockModal=()=>{
        this.setState({
            visible:true
        })
    }
    ViewData=(data)=>{
        return (
          <div>
            <Button className="upper_case" onClick={this.unblockModal} variant="contained">Unblock</Button>
          </div>
          )};

          componentDidMount(){
            var self = this
            var unblockbtn=<Button className="upper_case" onClick={this.unblockModal} variant="contained">Unblock</Button>
          axios({
            method: 'get',
            url: apiurl + "/unblockusers",
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          })
            .then(function (response) {
              console.log(response.data.data,"resdata")
              var usertabledata = []
              response.data.data.map((data,index)=>{
                usertabledata.push({
                    name:data.EmpFirstName,
                    department:data.Department,
                    last_entered:data.TSDATE,
                    days:data.Days,
                    unblock:(unblockbtn ),
                    id:index
                })               
              })
            //   usertabledata.push({unblock:this.ViewData({id:1})})

              self.setState({usertabledata:usertabledata})
            })
            .catch(function (error) {
              console.log(error, "error");
            });
             }
    

    render() {
        return (
            <div>
                <EnhancedTable
                    tabledata={this.state.usertabledata}
                    primaryKey="userId"
                    tableschema={Unblockuserschema.fields} />
                <div className="unblockmodelwidth">
                    <Modal
                    title="Unsubmit"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    cancelText= 'Cancel'
                    okText= 'Ok'
                    // okType= 'danger'
                    className="unblockmodelwidth"
                    >
                    <div className={"unblockcontainermodel"}>
                        <p className="text-center">Are You Sure Do You Want to Unblock?</p>
                    </div>
                    </Modal>
                </div>
            </div>
        )
    }
}
export default Unblockuser;