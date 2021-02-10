import React from "react";
import "./Rectificationdesign.css";
import Inputantd from "../../../../formcomponent/inputantd";
import Dropdownantd from "../../../../formcomponent/dropdownantd";
import Calenderbox from "../../../../formcomponent/calenderbox";
import Grid from "@material-ui/core/Grid";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import { IoMdInformationCircle } from "react-icons/io";
import Button from "react-bootstrap/Button";
import { Popover,notification } from "antd";
import { Upload, Icon } from "antd";
import { Tooltip } from "antd";
// import './index.css';
// import { Upload,} from 'antd';
// import { UploadOutlined } from '@ant-design/icons';
// import Upload from "../../../formcomponent/uploadAntd";
// import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Table } from "antd";
import ValidationLibrary from "../../../../validationlibrary/validation";
import {
  getOurReference,
  getStages,
  getSubstages,
  getClientName,
  getStatus,
  getProjectName
} from "../../TradeMark/ApplicationTradeMark/TradeAppAction/TradeAppAction";
import { connect } from "react-redux";
import { apiurl } from "../../../../App";
import moment from "moment";
import DesignRectificationDefendList from "./DesignRectificationDefendList";
import { formatCountdown } from "antd/lib/statistic/utils";
import DesignRectificationFiledList from "./DesignRectificationFiledList";
import DesignAppList from "../DesignApplication/DesignAppList.js";
// src\components\Project-Management-Module\Design\DesignApplication\DesignAppList.js

const axios = require("axios");
const text = <span>+ 4Days</span>;
const columns = [
  {
    title: "Stages",
    dataIndex: "stage",
  },
  {
    title: "Sub Stages",
    dataIndex: "substage",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Actual Date",
    dataIndex: "actualdate",
  },
];
const data = [
  {
    key: "1",
    stage: " - ",
    substage: "-",
    date: "14 July 2020",
    actualdate: "14 July 2020",
  },
  {
    key: "2",
    stage: "Date of Receiving Counter ",
    substage: "-",
    date: "18 July 2020",
    actualdate: "18 July 2020",
  },
];

const content = (
  <div>
    <p className="popover_content_edit">+ 4Days</p>
  </div>
);
class FiledRectification extends React.Component {
  state = {
    tags: [],
    inputVisible: false,
    inputValue: "",
    errordummy: true,
    DesignRect_Filed_data: {
      projectname:{
        value: "",
        validation: [],
        error: null,
        errmsg: null,
      },
      client_petitioner: {
        value:"",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
      },
      design_num: {
        value:null,
        validation: [],
        error: null,
        errmsg: null,
      },
      respondent: {
        value:null,
        validation: [],
        error: null,
        errmsg: null,
      },
      respondent_rep: {
        value:null,
        validation: [],
        error: null,
        errmsg: null,
      },
      comments: {
        value:null,
        validation: [],
        error: null,
        errmsg: null,
      },
      status: {
        value:null,
        validation: [],
        error: null,
        errmsg: null,
      },
      date_ofHearing: {
        value:null,
        validation: [],
        error: null,
        errmsg: null,
      },
      application_date: {
        value: "",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
      },
      stages: {
        value:"",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
      },
      sub_stages: {
        value:null,
        validation: [],
        error: null,
        errmsg: null,
      },
      date: {
        value:null,
        validation: [],
        error: null,
        errmsg: null,
      },
      hearing_date: {
        value:"",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
      },
    },
  };
  async componentDidMount() {
    await this.props.getOurReference();
    await this.props.getStages();
    await this.props.getSubstages();
    await this.props.getClientName();
    await this.props.getStatus();
    await this.props.getProjectName()


    this.callViewTrademark()

  }

  callViewTrademark=()=>{
    axios({
      method: 'get',
      url: apiurl + "/" + "viewprojectTemplate",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response)=>{
        this.setState({projectList:response.data.data})
  
        var projectList = []
  
          response.data.data.map((value,index)=>{
              if(value.Type === "Filed" && value.Template === "Design" && value.Process === "Rectification"){
                projectList.push(value)
              } 
            })
  
            this.setState({projectList:projectList})

            const params = new URLSearchParams(window.location.search)
            const status = params.get("status")
            const userid = params.get("id")

  if (status === "editable") {
    var self = this
    axios({
      method: 'get',
      url: apiurl + "/viewtrademark",
    })
      .then(function (response) {
        console.log(response.data.data, "viewtrademark")
        response.data.data[7].DesRectfiled.filter((data, index) => {

          if (data.RfId == userid) {

            self.state.DesignRect_Filed_data.projectname.value = data.ProjectName === "null" ? "" : data.ProjectName
            self.state.DesignRect_Filed_data.stages.value=projectList[data.Designrectfiled.length] && projectList[data.Designrectfiled.length].Stage
            self.state.DesignRect_Filed_data.sub_stages.value=projectList[data.Designrectfiled.length] && projectList[data.Designrectfiled.length].Substage
            self.state.DesignRect_Filed_data.date.value=moment(moment(data.Designrectfiled[data.Designrectfiled.length-1].HearingDate, "YYYY-MM-DD").add(projectList[data.Designrectfiled.length] && projectList[data.Designrectfiled.length].TDays ? projectList[data.Designrectfiled.length].TDays : 0, 'days'))

            self.state.DesignRect_Filed_data.client_petitioner.value = data.ClientPetitioner === "null" ? "" : data.ClientPetitioner
            self.state.DesignRect_Filed_data.design_num.value = data.DesignNo === "null" ? "" : data.DesignNo
            self.state.DesignRect_Filed_data.respondent.value = data.Respondent === "null" ? "" : data.Respondent
            self.state.DesignRect_Filed_data.respondent_rep.value = data.Respondentrep === "null" ? "" : data.Respondentrep
            self.state.DesignRect_Filed_data.comments.value = data.Comments === "null" ? "" : data.Comments
            self.state.DesignRect_Filed_data.status.value = data.Status === "null" ? "" : data.Status
            // self.state.DesignRect_Filed_data.date_ofHearing.value = data.DateofHearing === "null" ? "" : moment(data.DateofHearing)

            self.setState({TrademarkItems:data.Designrectfiled,commonId:data.RfId})
          }

        })
      })
  }
})}

  checkValidation = () => {
    var mainvalue = {};
    var DesignRect_Filed_data = this.state.DesignRect_Filed_data;
    var targetkeys = Object.keys(DesignRect_Filed_data);
    console.log(targetkeys, "targetkeys");
    for (var i in targetkeys) {
      var errorcheck = ValidationLibrary.checkValidation(
        DesignRect_Filed_data[targetkeys[i]].value,
        DesignRect_Filed_data[targetkeys[i]].validation
      );
      console.log(errorcheck, "errorcheck");
      DesignRect_Filed_data[targetkeys[i]].error = !errorcheck.state;
      DesignRect_Filed_data[targetkeys[i]].errmsg = errorcheck.msg;
      mainvalue[targetkeys[i]] = DesignRect_Filed_data[targetkeys[i]].value;
    }
    var filtererr = targetkeys.filter(
      (obj) => DesignRect_Filed_data[obj].error == true
    );
    console.log(filtererr.length);
    if (filtererr.length > 0) {
      this.setState({ error: true });
    } else {
      this.setState({ error: false });
      const params = new URLSearchParams(window.location.search)
      const status = params.get("status")

      {
        status==="editable"|| this.state.afterInsert?
      this.updateSubstage():
      this.insert()
      }

    }
    this.setState({
      // mainvalue,
      DesignRect_Filed_data,
    });
  };

  updateSubstage=()=>{

    // var Stages = this.props.designStages.filter((data,index)=>{
    //   return(data.Type === "Filed" && data.Template === "Design" && data.Process === "Rectification")
    // }).filter((val,index)=>{
    //   if(index == this.state.DesignRect_Filed_data.stages.value-1){
    //     return val.ProjectTemplateId
    //   }
    // })

    // var sub_stages = this.props.designSubStages.filter((data,index)=>{
    //   return(data.Type === "Filed" && data.Template === "Design" && data.Process === "Rectification")
    // }).filter((val,index)=>{
    //   if(index == this.state.DesignRect_Filed_data.sub_stages.value-1){
    //     return val.ProjectTemplateId
    //   }
    // })

    if(typeof this.state.DesignRect_Filed_data.stages.value === 'string'){
      var Stages = this.props.designStages.filter((data,index)=>{
        return(data.Type === "Filed" && data.Template === "Design" && data.Process === "Rectification")
      }).filter((val,index)=>{
        if(val.Stage === this.state.DesignRect_Filed_data.stages.value){
          return val.ProjectTemplateId
        }
      })
    }else{
      var Stages = this.props.designStages.filter((data,index)=>{
        return(data.Type === "Filed" && data.Template === "Design" && data.Process === "Rectification")
      }).filter((val,index)=>{
        if(index == this.state.DesignRect_Filed_data.stages.value-1){
          return val.ProjectTemplateId
        }
      })

    }


    if(typeof this.state.DesignRect_Filed_data.sub_stages.value === 'string'){
      var sub_stages = this.props.designSubStages.filter((data,index)=>{
        return(data.Type === "Filed" && data.Template === "Design" && data.Process === "Rectification")
      }).filter((val,index)=>{
        if(val.Substage == this.state.DesignRect_Filed_data.sub_stages.value){
          return val.ProjectTemplateId
        }
      })
    }else{
      var sub_stages = this.props.designSubStages.filter((data,index)=>{
        return(data.Type === "Filed" && data.Template === "Design" && data.Process === "Rectification")
      }).filter((val,index)=>{
        if(index == this.state.DesignRect_Filed_data.sub_stages.value-1){
          return val.ProjectTemplateId
        }
      })
    }

  var self = this

  var myObject = {
    rfId:this.state.commonId,
    "stages": Stages[0].ProjectTemplateId,
}

this.state.DesignRect_Filed_data.sub_stages.value && Object.assign(myObject, {"Substages":sub_stages[0] && sub_stages[0].ProjectTemplateId})
this.state.DesignRect_Filed_data.date.value && Object.assign(myObject, { "date":this.state.DesignRect_Filed_data.date.value?moment(this.state.DesignRect_Filed_data.date.value).format('YYYY-MM-DD'):""})
this.state.DesignRect_Filed_data.hearing_date.value && Object.assign(myObject, {"hearingdate":this.state.DesignRect_Filed_data.hearing_date.value? moment(this.state.DesignRect_Filed_data.hearing_date.value).format('YYYY-MM-DD'):""})

  axios({
    method: 'put',
    url: apiurl + "/updaterectfiledstages",
    data:
      myObject
    
  })
    .then(function (response) {
      notification.warning({
        message: `Stages updated successfully`,
        duration: 3.5,
        placement: "topRight",
        className: "notification_dayreport",
      });
      self.setState({callSubStage:true})
      self.callViewTrademark()
      })

}
  
  changeDynamic = (data, key) => {
    console.log("key", key);
    console.log("data", data);

    const params = new URLSearchParams(window.location.search)
    const status = params.get("status")

    if(key==="stages" && status){

      var Stages = this.props.designStages.filter((data,index)=>{
        return(data.Type === "Filed" && data.Template === "Design" && data.Process === "Rectification")
      }).filter((val,index)=>{
        if(index == data-1){
          return val.ProjectTemplateId
        }
      })

      var datevalue = this.state.projectList.find((value,index)=>{
        if(Stages[0].ProjectTemplateId == value.ProjectTemplateId){
          return value.TDays
        }
      })
        this.state.DesignRect_Filed_data.date.value = moment(moment(this.state.TrademarkItems[this.state.TrademarkItems.length-1].HearingDate, "YYYY-MM-DD").add( datevalue ? datevalue.TDays : 0, 'days'))
    }

    var DesignRect_Filed_data = this.state.DesignRect_Filed_data;
    var targetkeys = Object.keys(DesignRect_Filed_data);
    var errorcheck = ValidationLibrary.checkValidation(
      data,
      DesignRect_Filed_data[key].validation
    );
    DesignRect_Filed_data[key].value = data;
    DesignRect_Filed_data[key].error = !errorcheck.state;
    DesignRect_Filed_data[key].errmsg = errorcheck.msg;
    this.setState({ DesignRect_Filed_data });
    var filtererr = targetkeys.filter(
      (obj) =>
        DesignRect_Filed_data[obj].error == true ||
        DesignRect_Filed_data[obj].error == null
    );
    if (filtererr.length > 0) {
      this.setState({ error: true, errordummy: false });
    } else {
      this.setState({ error: false });
     
    }
      this.setState({
        // mainvalue,
        DesignRect_Filed_data,
      });
  };


  insert=()=>{
    var Stages = this.props.designStages.filter((data,index)=>{
      return(data.Type === "Filed" && data.Template === "Design" && data.Process === "Rectification")
    }).filter((val,index)=>{
      if(index == this.state.DesignRect_Filed_data.stages.value-1){
        return val.ProjectTemplateId
      }
    })

    var sub_stages = this.props.designSubStages.filter((data,index)=>{
      return(data.Type === "Filed" && data.Template === "Design" && data.Process === "Rectification")
    }).filter((val,index)=>{
      if(index == this.state.DesignRect_Filed_data.sub_stages.value-1){
        return val.ProjectTemplateId
      }
    })

    var calcaulateTDays = this.state.projectList.filter((data,index)=>{
      return(data.Type === "Filed" && data.Template === "Design" && data.Process === "Rectification")
    })

    var self = this;
      var DesignFiledRectiData={
        projectname: this.state.DesignRect_Filed_data.projectname.value,
        clientpetitioner:this.state.DesignRect_Filed_data.client_petitioner.value,
        DesignNo:this.state.DesignRect_Filed_data.design_num.value,
        Respondent:this.state.DesignRect_Filed_data.respondent.value,
        RespondentRep:this.state.DesignRect_Filed_data.respondent_rep.value,
        Comments:this.state.DesignRect_Filed_data.comments.value,
        Status:this.state.DesignRect_Filed_data.status.value,
        // DateofHearing:this.state.DesignRect_Filed_data.date_ofHearing.value && moment(this.state.DesignRect_Filed_data.date_ofHearing.value).format('YYYY-MM-DD'),
        Stages:Stages[0].ProjectTemplateId,
        Substages:sub_stages[0] && sub_stages[0].ProjectTemplateId,
        // date:this.state.DesignRect_Filed_data.date.value && moment(this.state.DesignRect_Filed_data.date.value).format('YYYY-MM-DD'),
        "date":this.state.DesignRect_Filed_data.application_date.value ? moment(moment(this.state.DesignRect_Filed_data.application_date.value, "YYYY-MM-DD").add(calcaulateTDays[0].TDays ? calcaulateTDays[0].TDays : 0, 'days')).format('YYYY-MM-DD'): "",
        hearingdate:this.state.DesignRect_Filed_data.hearing_date.value && moment(this.state.DesignRect_Filed_data.hearing_date.value).format('YYYY-MM-DD')
      }
      axios({
        method: "post",
        url: apiurl + "/addRectfiled",
        data: DesignFiledRectiData,
      })
      .then(function (response) {
        console.log(response.data.data, "responseresponse");
        notification.warning({
          message: `Design Rectification Filed data submitted successfully`,
          duration: 3.5,
          placement: "topRight",
          className: "notification_dayreport",
        });
        // self.state.DesignRect_Filed_data.client_respondent.value = "";
        // self.state.DesignRect_Filed_data.design_number.value = "";
        // self.state.DesignRect_Filed_data.respondent_rep.value = "";
        // self.state.DesignRect_Filed_data.respondent.value = "";
        // self.state.DesignRect_Filed_data.date.value ="";
        // self.state.DesignRect_Filed_data.comments.value ="";
        // self.state.DesignRect_Filed_data.stages.value ="";
        // self.state.DesignRect_Filed_data.status.value ="";
        // self.state.DesignRect_Filed_data.sub_stages.value ="";
        // self.state.DesignRect_Filed_data.date_ofHearing.value ="";
        // self.props.showclose && self.props.showclose()
        self.setState({afterInsert:true,commonId:response.data.data})
      })
      .catch(function (error) {
        console.log(error, "error");
      });

  }

  update=()=>{

    var clientId = this.state.DesignRect_Filed_data.client_petitioner.value

    if(!Number(this.state.DesignRect_Filed_data.client_petitioner.value)){
     var clientId = this.props.designReference.find((val) => {
        if(clientId==val.EmpFirstName){
          return val.EmpId 
        }
       }
       )
    }

    var statusId = this.state.DesignRect_Filed_data.status.value

    if(!Number(this.state.DesignRect_Filed_data.status.value)){
     var statusId = this.props.designStatus.find((val) => {
        if(statusId==val.Status){
          return val.StatusId 
        }
       }
       )
    }

    var DesignFiledRectiData={
      clientpetitioner:!Number(this.state.DesignRect_Filed_data.client_petitioner.value)?clientId.EmpId:clientId,
      DesignNo:this.state.DesignRect_Filed_data.design_num.value,
      Respondent:this.state.DesignRect_Filed_data.respondent.value,
      RespondentRep:this.state.DesignRect_Filed_data.respondent_rep.value,
      Comments:this.state.DesignRect_Filed_data.comments.value,
      Status:!Number(this.state.DesignRect_Filed_data.status.value)?statusId && statusId.StatusId:statusId,
      // DateofHearing:this.state.DesignRect_Filed_data.date_ofHearing.value && moment(this.state.DesignRect_Filed_data.date_ofHearing.value).format('YYYY-MM-DD'),
      rfId:this.state.commonId
    }
    // console.log(this.state., "report");

    axios({
      method: 'put',
      url: apiurl + "/updaterectfiled",
      data:DesignFiledRectiData
    })
      .then(function (response) {
        notification.warning({
          message: `Design Rectification Filled Application has updated successfully`,
          duration: 3.5,
          placement: "topRight",
          className: "notification_dayreport",
        });
        })

  }

  render() {

    const params = new URLSearchParams(window.location.search)
    const status = params.get("status")

    var stageArr = []
    var stageArrId = []

    this.props.designStages &&
    this.props.designStages.map((val) => {if(val.Type === "Filed" && val.Template === "Design" && val.Process === "Rectification"){
      stageArr.push(val.Stage) 
      stageArrId.push(val.ProjectTemplateId)
    }})

    var subStageArr = []
    var subStageArrId = []

    this.props.designSubStages &&
    this.props.designSubStages.map((val)=>{if(val.Type === "Filed" && val.Template === "Design" && val.Process === "Rectification" && val.Substage){
      subStageArr.push(val.Substage)
      subStageArrId.push(val.ProjectTemplateId)
    }})

    return (
      <React.Fragment>
        <>
          {/* Grid content Start */}

          <Grid container spacing={2} className="mt-3">
          <Grid item md={3} sm={5}>

          <Dropdownantd
              label={"Project Name"}
              className="w-100"
              option={
                this.props.ProjectName &&
                this.props.ProjectName.map((val) => val.ProjectName)
              }
              changeData={(data) =>this.changeDynamic(data, "projectname")}
              disabled={status==="editable" ? true : false}
              value={this.state.DesignRect_Filed_data.projectname.value}
              error={this.state.DesignRect_Filed_data.projectname.error}
              errmsg={this.state.DesignRect_Filed_data.projectname.errmsg}
            />

            </Grid>
            <Grid item md={3} sm={5}>
              <Dropdownantd
                label={"Client Petitioner"}
                option={
                  this.props.designReference &&
                  this.props.designReference.map((val) => val.EmpFirstName)
                }
                className="w-100"
                changeData={(data) =>
                  this.changeDynamic(data, "client_petitioner")
                }
                value={
                  this.state.DesignRect_Filed_data.client_petitioner.value
                }
                error={
                  this.state.DesignRect_Filed_data.client_petitioner.error
                }
                errmsg={
                  this.state.DesignRect_Filed_data.client_petitioner.errmsg
                }
              />
            </Grid>
  
            <Grid item md={3} sm={5}>
              <Inputantd
                label={"Design Number"}
                className="w-100"
                changeData={(data) =>
                  this.changeDynamic(data, "design_num")
                }
                value={
                  this.state.DesignRect_Filed_data.design_num.value
                }
                error={
                  this.state.DesignRect_Filed_data.design_num.error
                }
                errmsg={
                  this.state.DesignRect_Filed_data.design_num.errmsg
                }
              />
            </Grid>
            <Grid item md={3} sm={5}>
              <Inputantd
                label={"Respondent"}
                className="w-100"
                changeData={(data) =>
                  this.changeDynamic(data, "respondent")
                }
                value={
                  this.state.DesignRect_Filed_data.respondent.value
                }
                error={
                  this.state.DesignRect_Filed_data.respondent.error
                }
                errmsg={
                  this.state.DesignRect_Filed_data.respondent.errmsg
                }
              ></Inputantd>
            </Grid>

           
            <Grid item md={3} sm={5}>
              <Inputantd label={"Respondent Rep"} className="w-100"
                changeData={(data) =>
                  this.changeDynamic(data, "respondent_rep")
                }
                value={
                  this.state.DesignRect_Filed_data.respondent_rep.value
                }
                error={
                  this.state.DesignRect_Filed_data.respondent_rep.error
                }
                errmsg={
                  this.state.DesignRect_Filed_data.respondent_rep.errmsg
                }
               />
            </Grid>
            
            <Grid item md={3} sm={5}>
              <Inputantd label={"Comments"} className="w-100" 
               changeData={(data) =>
                this.changeDynamic(data, "comments")
              }
              value={
                this.state.DesignRect_Filed_data.comments.value
              }
              error={
                this.state.DesignRect_Filed_data.comments.error
              }
              errmsg={
                this.state.DesignRect_Filed_data.comments.errmsg
              }
              />
            </Grid>
            <Grid item md={3} sm={5}>
              <Dropdownantd label={"Status"} className="w-100" 
              option={
                this.props.designStatus &&
                this.props.designStatus.map((val) => val.Status)
              }
               changeData={(data) =>
                this.changeDynamic(data, "status")
              }
              value={
                this.state.DesignRect_Filed_data.status.value
              }
              error={
                this.state.DesignRect_Filed_data.status.error
              }
              errmsg={
                this.state.DesignRect_Filed_data.status.errmsg
              }/>
            </Grid>
            <Grid item md={3} sm={5}>
                <Calenderbox label={"Application Date"} className="w-75"
                        changeData={(data) => this.changeDynamic(data, 'application_date')}
                        value={this.state.DesignRect_Filed_data.application_date.value}
                        error={this.state.DesignRect_Filed_data.application_date.error}
                        errmsg={this.state.DesignRect_Filed_data.application_date.errmsg} />
              </Grid>
              {status==="editable"&&
                  <Grid item md={6} sm={5} >
                    <Button className="btnwidth btnclr indiafilling_topalign"  onClick={()=>this.update()}>Update</Button>
                  </Grid>
  }
          </Grid>

          <div className="border_edit" />
          <h5>Current Stage</h5>
          <div className="circle_icon_par">
            <Grid container spacing={2}>
              <Grid item md={3} sm={5}>
                <Dropdownantd
                  label={"Stages"}
                  option={
                    stageArr
                  }
                  changeData={(data) =>
                    this.changeDynamic(data, "stages")
                  }
                  disableto={this.state.TrademarkItems && this.state.TrademarkItems.length}
                  value={
                    this.state.DesignRect_Filed_data.stages.value
                  }
                  error={
                    this.state.DesignRect_Filed_data.stages.error
                  }
                  errmsg={
                    this.state.DesignRect_Filed_data.stages.errmsg
                  }
                  className="w-75"
                ></Dropdownantd>
              </Grid>
              <Grid item md={3} sm={5}>
                <Dropdownantd
                  label={"Sub Stages"}
                  option={
                    subStageArr
                  }
                  className="w-75"
                  changeData={(data) =>
                    this.changeDynamic(data, "sub_stages")
                  }
                  value={
                    this.state.DesignRect_Filed_data.sub_stages.value
                  }
                  error={
                    this.state.DesignRect_Filed_data.sub_stages.error
                  }
                  errmsg={
                    this.state.DesignRect_Filed_data.sub_stages.errmsg
                  }
                ></Dropdownantd>
              </Grid>
             <Grid item md={3} sm={5}>
               <Calenderbox className="w-75"
               label={"Statutory Deadline"}
                 changeData={(data) =>
                    this.changeDynamic(data, "date")
                  }
                  disabled={true}
                  value={status==="editable" ? this.state.DesignRect_Filed_data.date.value:this.state.DesignRect_Filed_data.application_date.value}
               />
             </Grid>
             <Grid item md={3} sm={5}>
                <div className="d-flex">
                    <Calenderbox label={"Filing Date"} className="w-100"
                      changeData={(data) => this.changeDynamic(data, 'hearing_date')}
                      value={this.state.DesignRect_Filed_data.hearing_date.value}
                      error={this.state.DesignRect_Filed_data.hearing_date.error}
                      errmsg={this.state.DesignRect_Filed_data.hearing_date.errmsg}
                    ></Calenderbox>
                  <span className="circle_icon_edit">
                    <AddCircleOutline  onClick={this.checkValidation} className="Interfil_addicon" />
                  </span>
                  </div>
                </Grid>
            </Grid>
          </div>
        <DesignAppList callSubStage={this.state.callSubStage} commonId={this.state.commonId} endpoint={"viewrectfileditems"} trademark={"Designrectfiled"}/>
          {/* Grid content End */}

          {/* Table content start */}
          {/* <div className="table_info_par">
                    <div className="table_class">
                        <h5 className="previous_text_edit">Pervious Stages Items</h5>
                        <Table columns={columns} dataSource={data} bordered pagination={false}/>
                    </div>                    
                        <div className="demo">
                            <div >
                            <Tooltip placement="topLeft" title={text} className="info_icon_edit">
                            <IoMdInformationCircle />
                            </Tooltip>
                            </div>
                            </div>
                    </div> */}
          {/* Table content end */}
        </>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  console.log("stateeee", state);

  return {
    DesignRect_Filed_data: state.resumeReducer.DesignRect_Filed_data,
    designReference: state.tradeapp.getTradeOurReference,
    designStages: state.tradeapp.getTradestages,
    designSubStages: state.tradeapp.getTradeSubstages,
    designClient:state.tradeapp.getTradeClientname,
    designStatus: state.tradeapp.getTradestatus,
    ProjectName:state.tradeapp.getprojectName
  };
};
export default connect(mapStateToProps, {
  getOurReference,
  getStages,
  getSubstages,
  getClientName,
  getStatus,
  getProjectName
})(FiledRectification);
