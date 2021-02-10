import React from "react";
import tableschema from './PatentTable/TableLTRschema.json';
import InternationalDynTable from './PatentTable/DynTable.jsx'
import { apiurl } from "../../../../App";
import './DesignApplication.css';
import moment from "moment";

const axios = require('axios');

class PatentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value:"",
      userdata: null,
      edituserdata: null,
      usertabledata: [],
      edit: null,
      modalShow: false,
      modalShowsms: false,
      TrdoId:this.props.TrdoId,
      projectList:[]
    };
  }

   changeDynamic=(data,key)=>{
    this.setState({
      [key]:data
    })
     this.recallcalender(data,key)
     this.projectTemplateData()
  }

  actualdateUpdate=(id,statedate)=>{
    var self = this
    if(this.props.trademark==="international"){
      axios({
        method: 'put',
        url: apiurl + "/updatestageappItems",
        data: {
          actualdate: moment(this.state[statedate]).format("YYYY-MM-DD"),
          trId: this.state.TrdoId,
          taId:id
        },
      })
        .then(function (response) {
          self.recallactualdate()
        })
    }
    // else if(this.props.trademark==="filed"){
    //   axios({
    //     method: 'put',
    //     url: apiurl + "/updatestageoppItems",
    //     data: {
    //       actualdate: moment(this.state[statedate]).format("YYYY-MM-DD"),
    //       tropId: this.state.TrdoId,
    //       troId:id
    //     },
    //   })
    //     .then(function (response) {
    //       self.recallactualdate()
    //     })
    // }
    // else if(this.props.trademark==="defended"){
    //   axios({
    //     method: 'put',
    //     url: apiurl + "/updatedefendedItems",
    //     data: {
    //       actualdate: moment(this.state[statedate]).format("YYYY-MM-DD"),
    //       tdId: this.state.TrdoId,
    //       tdeId:id
    //     },
    //   })
    //     .then(function (response) {
    //       self.recallactualdate()
    //     })
    // }
    // else{
    //   axios({
    //     method: 'put',
    //     url: apiurl + "/updatestageItems",
    //     data: {
    //       actualdate: moment(this.state[statedate]).format("YYYY-MM-DD"),
    //       trdoId: this.state.TrdoId,
    //       tmId:id
    //     },
    //   })
    //     .then(function (response) {
    //       self.recallactualdate()
    //     })
    // }

  }

  UNSAFE_componentWillReceiveProps(newProps){
    console.log(newProps,"newprops")
    this.setState({TrdoId:newProps.TrdoId,rowStages:newProps.rowStages})
    newProps.TrdoId && this.subStageItem()
  }

  subStageItem=()=>{
    var self = this
    axios({
      method: 'get',
      // url: apiurl + "/viewpreviousDesignItems",
      url: apiurl + "/" + this.props.endpoint,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(function (response) {
        console.log(self.state.TrdoId,"subStageItem")
        console.log(response.data.data,"subStageItem")
        var usertabledata = []
        response.data.data.map((data,index)=>{
          if(self.state.TrdoId==data.PatentId || self.state.TrdoId==data.PatIndId || self.state.TrdoId==data.PapctId || self.state.TrdoId==data.TropId || self.state.TrdoId==data.TdId){
          usertabledata.push({
            stages:data.Stage,
            subStages:data.Substage,
            date:data.Date,
            actual_date:data.HearingDate,
            id:data.ProjectTemplateId
          })
        }
        })      
        self.setState({usertabledata:usertabledata,userfulldata:response.data.data})
        self.props.usertabledata(usertabledata)
      })
      .catch(function (error) {
        console.log(error, "error");
      });
  }

  render() {
    return (
      <div>
        <div className="filedOpp_tablemain">
          <div className="table_x_scroll">
          <InternationalDynTable
            tabledata={this.state.usertabledata}
            primaryKey="userId"
            tableschema={tableschema.fields}
            editclose={"editicon"}
            deleteclose={"deleteicon"}
            mainclassName={"userwidth"}
            tablehead={"Previous Stages Items"}
            viewclose={"viewicon"}
          />
          
        </div>
        </div>
      </div>
    )
  }
}
export default PatentList;