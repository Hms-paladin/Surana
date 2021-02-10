import React from "react";
import tableschema from './InternationalFilingSchema.json';
import InternationalDynTable from './InternationalTable/DynTable'
import Grid from '@material-ui/core/Grid';
// import "./previewresume.css"
import { apiurl } from "../../../../App";
import {Modal} from 'antd'
import { Input,Button } from 'antd';
import Calenderbox from "../../../../formcomponent/calenderbox";
import './TrademarkApplication.css';
import moment from "moment";

const axios = require('axios');

class InternationalList extends React.Component {
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
  setModalShow = (e) => {
    this.setState({
      modalShow: e
    })
  }
  setModalShowsms = (e) => {
    this.setState({
      modalShowsms: e
    })
  }
  deleteData = (e) => {
    this.state.usertabledata.splice(e.sno - 1, 1)
    var i
    for (i = 0; i < this.state.usertabledata.length; i++) {
      this.state.usertabledata[i].sno = i + 1
    }
    this.setState({ usertabledata: this.state.usertabledata })
  }
  multideleteData = (e) => {
    let storearr = e
    let sortvalue = storearr.sort(function (a, b) {
      return a - b;
    });
    console.log(sortvalue)
    let i = 1
    for (i = 1; i < storearr.length + 1; i++) {
      this.state.usertabledata.splice(sortvalue[storearr.length - i] - 1, 1)
    }
    let j
    for (j = 0; j < this.state.usertabledata.length; j++) {
      this.state.usertabledata[j].sno = j + 1
    }
    this.setState({
      selected: [],
      usertabledata: this.state.usertabledata
    })
  }

   changeDynamic=(data,key)=>{
    console.log(data,"dataaa")
    console.log(key,"dataaa")

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
    else if(this.props.trademark==="filed"){
      axios({
        method: 'put',
        url: apiurl + "/updatestageoppItems",
        data: {
          actualdate: moment(this.state[statedate]).format("YYYY-MM-DD"),
          tropId: this.state.TrdoId,
          troId:id
        },
      })
        .then(function (response) {
          self.recallactualdate()
        })
    }
    else if(this.props.trademark==="defended"){
      axios({
        method: 'put',
        url: apiurl + "/updatedefendedItems",
        data: {
          actualdate: moment(this.state[statedate]).format("YYYY-MM-DD"),
          tdId: this.state.TrdoId,
          tdeId:id
        },
      })
        .then(function (response) {
          self.recallactualdate()
        })
    }
    else{
      axios({
        method: 'put',
        url: apiurl + "/updatestageItems",
        data: {
          actualdate: moment(this.state[statedate]).format("YYYY-MM-DD"),
          trdoId: this.state.TrdoId,
          tmId:id
        },
      })
        .then(function (response) {
          self.recallactualdate()
        })
    }

  }

  recallactualdate=()=>{
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
        console.log(response.data.data,"resdata")
        var usertabledata = []
        response.data.data.map((data,index)=>{
          if(self.state.TrdoId==data.Domestic || self.state.TrdoId==data.International || self.state.TrdoId==data.TropId || self.state.TrdoId==data.TdId){
          usertabledata.push({
            stages:data.Stage,
            subStages:data.Substage,
            date:data.Date,
            actual_date:(data.HearingDate===null?<div className="previous_stageFlex">
              <Calenderbox breakclass="d-none" 
              changeData={(data) => self.changeDynamic(data, 'actual_date'+index)} value={self.state["actual_date"+index] ? self.state["actual_date"+index] : moment()}
               />
            <Button className="stage_btn" onClick={()=>self.actualdateUpdate(data.TmId?data.TmId:data.TaId?data.TaId:data.TroId?data.TroId:data.TdeId,'actual_date'+index)}>Save</Button></div>:data.HearingDate),
            id:data.ProjectTemplateId
          })
        }
        })      
        self.setState({usertabledata:usertabledata,userfulldata:response.data.data})
        console.log(usertabledata,"user")
      })
      .catch(function (error) {
        console.log(error, "error");
      });
  }

  UNSAFE_componentWillReceiveProps(newProps){
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
        // var tagvalue = []
        response.data.data.map((data,index)=>{
          if(self.state.TrdoId==data.Domestic || self.state.TrdoId==data.International || self.state.TrdoId==data.TropId || self.state.TrdoId==data.TdId){
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
        console.log(self.props,"insertOnlyFalse")

      })
      .catch(function (error) {
        console.log(error, "error");
      });
  }

     recallcalender=(datadate,key)=>{
      var self = this
      var usertabledata = []
          // var tagvalue = []
          this.state.userfulldata.map((data,index)=>{
            console.log(self.state["actual_date"+index],"index")
            if(self.state.TrdoId==data.Domestic || self.state.TrdoId==data.International || self.state.TrdoId==data.TropId || self.state.TrdoId==data.TdId){
            usertabledata.push({
              stages:data.Stage,
              subStages:data.Substage,
              date:data.Date,
              actual_date:(data.HearingDate===null?<div className="previous_stageFlex">
                <Calenderbox breakclass="d-none" 
                changeData={(data) => self.changeDynamic(data, 'actual_date'+index)} value={key  === "actual_date"+index ? datadate : self.state["actual_date"+index]}
                 />
              <Button className="stage_btn" onClick={()=>self.actualdateUpdate(data.TmId?data.TmId:data.TaId?data.TaId:data.TroId?data.TroId:data.TdeId,'actual_date'+index)}>Save</Button></div>:data.HearingDate),
              id:data.ProjectTemplateId
            })
          }
          })      
          self.setState({usertabledata:usertabledata})
     }

     projectTemplateData=()=>{
      axios({
        method: 'get',
        url: apiurl + "/" + "viewprojectTemplate",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then((response)=>{
          var projectListLength = []
          response.data.data.map((value,index)=>{
              if(this.props.trademark === "indiaFilling" && value.Template==='Trademark' && value.Process ==='Application'&&value.Type==="IndiaFiling"){
                projectListLength.push(value)
              }
            })

          var projectList = []
          projectListLength.length !== this.state.usertabledata.length  && response.data.data.map((value,index)=>{
            if(this.props.trademark === "indiaFilling" && value.Template==='Trademark' && value.Process ==='Application'&&value.Type==="IndiaFiling")
              projectList.push({                
                stages:value.Stage,
                subStages:value.Substage,
                date:this.state.usertabledata[this.state.usertabledata.length-1]  && moment(moment(this.state.usertabledata[this.state.usertabledata.length-1].actual_date, "YYYY-MM-DD").add(value.TDays ? value.TDays : 0, 'days')).format('YYYY-MM-DD'),
                actual_date:<div className="previous_stageFlex">
                <Calenderbox breakclass="d-none"
                changeData={(data) => this.changeDynamic(data, 'completionDate')} value={this.state.completionDate}
                />
              <Button className="stage_btn" onClick={()=>this.props.autoTemplateUpdate(value,moment(moment(this.state.usertabledata[this.state.usertabledata.length-1].actual_date, "YYYY-MM-DD").add(value.TDays ? value.TDays : 0, 'days')).format('YYYY-MM-DD'),this.state.completionDate)} >Save</Button></div>,
              id:index
              })
          })

          this.setState({projectList:projectList})

        })
     }


  render() {
    return (
      <div>
        <div className="filedOpp_tablemain">
          <div className="table_x_scroll">
          <InternationalDynTable
            editData={(data) => this.editData(data)}
            deleteData={(data) => this.deleteData(data)}
            tabledata={this.state.usertabledata}
            primaryKey="userId"
            tableschema={tableschema.fields}
            multideleteData={(data) => this.multideleteData(data)}
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
export default InternationalList;