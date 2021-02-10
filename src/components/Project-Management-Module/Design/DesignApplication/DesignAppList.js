import React from "react";
import tableschema from './DesignAppSchema.json';
import ProjectDynTable from './DesignAppTable/DynTable'
import Grid from '@material-ui/core/Grid';
// import "./previewresume.css"
import { apiurl } from '../../../../App'
import {Modal,Button} from 'antd'
import { Input } from 'antd';
import './DesignApplication.css';
import Calenderbox from "../../../../formcomponent/calenderbox";
import moment from "moment";


const axios = require('axios');

class DesignAppList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userdata: null,
      edituserdata: null,
      usertabledata: [],
      edit: null,
      modalShow: false,
      modalShowsms: false,
      commonId:this.props.commonId
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

   changeDynamic=(data,key)=>{
    console.log(data,"dataaa")
    console.log(key,"dataaa")

    this.setState({
      [key]:data
    })
     this.recallcalender(data,key)
  }

  actualdateUpdate=(id,statedate)=>{
    var self = this
    if(this.props.trademark==="DesignIndiaFilling"){
      axios({
        method: 'put',
        url: apiurl + "/updatedesigndomesticItems",
        data: {
          actualdate: moment(this.state[statedate]).format("YYYY-MM-DD"),
          desIndId: this.state.commonId,
          dInId:id
        },
      })
        .then(function (response) {
          self.recallactualdate()
        })
    }else if(this.props.trademark==="Designrectfiled"){
      axios({
        method: 'put',
        url: apiurl + "/updaterectfiledItems",
        data: {
          actualdate: moment(this.state[statedate]).format("YYYY-MM-DD"),
          rfId: this.state.commonId,
          rfiledId:id
        },
      })
        .then(function (response) {
          self.recallactualdate()
        })
    }else if(this.props.trademark === "DesignrectDefended"){
      axios({
        method: 'put',
        url: apiurl + "/updaterectdefendedItems",
        data: {
          actualdate: moment(this.state[statedate]).format("YYYY-MM-DD"),
          rdId: this.state.commonId,
          rdefId:id
        },
      })
        .then(function (response) {
          self.recallactualdate()
        })
    }else if(this.props.trademark === "DesignInternationalFilling"){
      axios({
        method: 'put',
        url: apiurl + "/updatedesignstageItems",
        data: {
          actualdate: moment(this.state[statedate]).format("YYYY-MM-DD"),
          desInId: this.state.commonId,
          tdId:id
        },
      })
        .then(function (response) {
          self.recallactualdate()
        })
    }
    else if(this.props.trademark === "DesignCanfiled"){
      axios({
        method: 'put',
        url: apiurl + "/updatecanfiledItems",
        data: {
          actualdate: moment(this.state[statedate]).format("YYYY-MM-DD"),
          tfId: this.state.commonId,
          tcfId:id
        },
      })
        .then(function (response) {
          self.recallactualdate()
        })
    }else if(this.props.trademark === "DesignCanDefended"){
      axios({
        method: 'put',
        url: apiurl + "/updatecandefendedItems",
        data: {
          actualdate: moment(this.state[statedate]).format("YYYY-MM-DD"),
          cdId: this.state.commonId,
          tcdId:id
        },
      })
        .then(function (response) {
          self.recallactualdate()
        })
    }else if(this.props.trademark === "copyright"){
      axios({
        method: 'put',
        url: apiurl + "/updatecopyrightstages",
        data: {
          actualdate: moment(this.state[statedate]).format("YYYY-MM-DD"),
          copyId: this.state.commonId,
          crId:id
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
        // var tagvalue = []
        response.data.data.map((data,index)=>{
          if(self.state.commonId==data.DesIndId || self.state.commonId==data.DesInId ||  self.state.commonId == data.RfId || self.state.commonId == data.RdId || self.state.commonId == data.CdId || self.state.commonId == data.TfId || self.state.commonId == data.id){
          usertabledata.push({
            stages:data.Stage,
            subStages:data.Substage,
            date:data.Date,
            actual_date:(data.ActualDate===null?<div className="previous_stageFlex">
              <Calenderbox breakclass="d-none" 
              changeData={(data) => self.changeDynamic(data, 'actual_date'+index)} value={self.state["actual_date"+index] ? self.state["actual_date"+index] : moment()}
               />
            <Button className="stage_btn" onClick={()=>self.actualdateUpdate(data.DInId?data.DInId:data.RdefId?data.RdefId:data.RfiledId?data.RfiledId:data.TdId?data.TdId:data.TcdId?data.TcdId:data.TcfId?data.TcfId:data.CrId?data.CrId:"",'actual_date'+index)}>Save</Button></div>:data.ActualDate),
            // id:index
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
    this.setState({commonId:newProps.commonId})
    newProps.commonId && this.subStageItem()
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
        console.log(self.state.commonId,"subStageItem")
        console.log(response.data.data,"subStageItem")
        var usertabledata = []
        // var tagvalue = []
        response.data.data.map((data,index)=>{
          if(self.state.commonId==data.DesIndId || self.state.commonId==data.DesInId ||  self.state.commonId == data.RfId || self.state.commonId == data.RdId  || self.state.commonId == data.CdId || self.state.commonId == data.TfId || self.state.commonId == data.id){
          usertabledata.push({
            stages:data.Stage,
            subStages:data.Substage,
            date:data.Date,
            // actual_date:(data.ActualDate===null?<div className="previous_stageFlex">
            //   <Calenderbox breakclass="d-none" 
            //   changeData={(data) => self.changeDynamic(data, 'actual_date'+index)} value={self.state["actual_date"+index] ? self.state["actual_date"+index] : moment()}
            //    />
            // <Button className="stage_btn" onClick={()=>self.actualdateUpdate(data.DInId?data.DInId:data.RdefId?data.RdefId:data.RfiledId?data.RfiledId:data.TdId?data.TdId:data.TcdId?data.TcdId:data.TcfId?data.TcfId:data.CrId?data.CrId:"",'actual_date'+index)}>Save</Button></div>:data.ActualDate),
            // id:index
            actual_date:data.HearingDate,
            id:data.ProjectTemplateId
          })
        }
        })      
        self.setState({usertabledata:usertabledata,userfulldata:response.data.data})
        self.props.usertabledata(usertabledata)
        console.log(usertabledata,"user")
      })
      .catch(function (error) {
        console.log(error, "error");
      });
  }

  // componentDidMount(){
  //  this.subStageItem()
  //    }

     recallcalender=(datadate,key)=>{
      var self = this
      var usertabledata = []
          // var tagvalue = []
          this.state.userfulldata.map((data,index)=>{
            console.log(self.state["actual_date"+index],"index")
            if(self.state.commonId==data.DesIndId || self.state.commonId==data.DesInId ||  self.state.commonId == data.RfId || self.state.commonId == data.RdId || self.state.commonId == data.CdId || self.state.commonId == data.TfId || self.state.commonId == data.id){
            usertabledata.push({
              stages:data.Stage,
              subStages:data.Substage,
              date:data.Date,
              actual_date:(data.ActualDate===null?<div className="previous_stageFlex">
                <Calenderbox breakclass="d-none" 
                // || Object.keys(this.state).map.includes()
                changeData={(data) => self.changeDynamic(data, 'actual_date'+index)} value={key  === "actual_date"+index ? datadate : self.state["actual_date"+index]}
                 />
              <Button className="stage_btn" onClick={()=>self.actualdateUpdate(data.DInId?data.DInId:data.RdefId?data.RdefId:data.RfiledId?data.RfiledId:data.TdId?data.TdId:data.TcdId?data.TcdId:data.TcfId?data.TcfId:data.CrId?data.CrId:"",'actual_date'+index)}>Save</Button></div>:data.ActualDate),
              // id:index
              id:data.ProjectTemplateId
            })
          }
          })      
          self.setState({usertabledata:usertabledata})
     }


  render() {
  //   console.log(this.state.usertabledata,"usertabledata")
  console.log(this.state.commonId,"actual_date")


  //   const searchdata = this.state.usertabledata.filter((data) => {
  //     return data
  // })
    return (
      <div>
        <div className="filedOpp_tablemain">
          <div className="table_x_scroll">
          <ProjectDynTable
            editData={(data) => this.editData(data)}
            deleteData={(data) => this.deleteData(data)}
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
export default DesignAppList;