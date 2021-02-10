import React from "react";
import "./Cancellationdesign.css";
import Inputantd from "../../../../formcomponent/inputantd";
import Dropdownantd from "../../../../formcomponent/dropdownantd";
import Calenderbox from "../../../../formcomponent/calenderbox";
import Grid from "@material-ui/core/Grid";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import { IoMdInformationCircle } from "react-icons/io";
import Button from "react-bootstrap/Button";
import { Popover } from "antd";
import { Upload, Icon ,notification} from "antd";
import { Tooltip } from "antd";
// import './index.css';
// import { Upload,} from 'antd';
// import { UploadOutlined } from '@ant-design/icons';
// import Upload from "../../../formcomponent/uploadAntd";
// import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Table } from "antd";
import ValidationLibrary from "../../../../validationlibrary/validation";
import {
  getStatus,
  getAssociate,
  getOurReference,
  getCountry,
  getStages,
  getSubstages,
  getClientName,
  getProjectName
} from "../../TradeMark/ApplicationTradeMark/TradeAppAction/TradeAppAction";
import { connect } from "react-redux";
import { apiurl } from "../../../../App";
import moment from 'moment';
import DesignAppList from "../DesignApplication/DesignAppList.js";

import DesignCancelFiledList from './DesignCancelFiledList'
const axios = require("axios");
const text = <span>+ 4Days</span>;
const columns = [
  {
    title: "Stages",
    dataIndex: "stage ",
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
    stage: "ER Received",
    substage: "-",
    date: "14 July 2020",
    actualdate: "14 July 2020",
  },
  {
    key: "2",
    stage: "ER Reply",
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
class FiledCancellation extends React.Component {
  state = {
    tags: [],
    inputVisible: false,
    inputValue: "",
    errordummy: true,
    DesignCancel_Filed_data: {
      projectname:{
        value: "",
        validation: [],
        error: null,
        errmsg: null,
      },
      Clientpetitioner: {
        value:"",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
      },
      client_respondent: {
        value:null,
        validation: [],
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
      petitioner: {
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
      petitioner_rep: {
        value:null,
        validation: [],
        error: null,
        errmsg: null,
      },
      Comments: {
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
      hearingup_date: {
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
    await this.props.getStatus();
    await this.props.getAssociate();
    await this.props.getOurReference();
    await this.props.getCountry();
    await this.props.getStages();
    await this.props.getSubstages();
    await this.props.getClientName();
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
              if(value.Type === "Filed" && value.Process === "Cancellation"){
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
        response.data.data[9].DesCancellationfiled.filter((data, index) => {

          if (data.TfId == userid) {
            self.state.DesignCancel_Filed_data.projectname.value = data.ProjectName === "null" ? "" : data.ProjectName
            self.state.DesignCancel_Filed_data.stages.value=projectList[data.Designcanfiled.length] && projectList[data.Designcanfiled.length].Stage
            self.state.DesignCancel_Filed_data.sub_stages.value=projectList[data.Designcanfiled.length] && projectList[data.Designcanfiled.length].Substage
            self.state.DesignCancel_Filed_data.date.value=moment(moment(data.Designcanfiled[data.Designcanfiled.length-1].HearingDate, "YYYY-MM-DD").add(projectList[data.Designcanfiled.length] && projectList[data.Designcanfiled.length].TDays ? projectList[data.Designcanfiled.length].TDays : 0, 'days'))

            self.state.DesignCancel_Filed_data.Clientpetitioner.value = data.ClientPetitioner === "null" ? "" : data.ClientPetitioner
            // self.state.DesignCancel_Filed_data.client_respondent.value = data.ClientRespondent === "null" ? "" : data.ClientRespondent
            self.state.DesignCancel_Filed_data.design_num.value = data.DesignNo === "null" ? "" : data.DesignNo
            self.state.DesignCancel_Filed_data.respondent.value = data.Respondent === "null" ? "" : data.Respondent
            // self.state.DesignCancel_Filed_data.petitioner.value = data.Petitioner === "null" ? "" : data.Petitioner
            self.state.DesignCancel_Filed_data.respondent_rep.value = data.RespondentRep === "null" ? "" : data.RespondentRep
            // self.state.DesignCancel_Filed_data.petitioner_rep.value = data.PetitionerRep === "null" ? "" : moment(data.PetitionerRep)
            self.state.DesignCancel_Filed_data.Comments.value = data.Comments === "null" ? "" : data.Comments
            self.state.DesignCancel_Filed_data.status.value = data.Status === "null" ? "" : data.Status
            // self.state.DesignCancel_Filed_data.hearingup_date.value = data.DateofHearing === "null" ? "" : moment(data.DateofHearing)         

            self.setState({TrademarkItems:data.Designcanfiled,commonId:data.TfId})
          }

        })
      })
  }
})}


  checkValidation = () => {
    var mainvalue = {};
    var DesignCancel_Filed_data = this.state.DesignCancel_Filed_data;
    var targetkeys = Object.keys(DesignCancel_Filed_data);
    console.log(targetkeys, "targetkeys");
    for (var i in targetkeys) {
      var errorcheck = ValidationLibrary.checkValidation(
        DesignCancel_Filed_data[targetkeys[i]].value,
        DesignCancel_Filed_data[targetkeys[i]].validation
      );
      console.log(errorcheck, "errorcheck");
      DesignCancel_Filed_data[targetkeys[i]].error = !errorcheck.state;
      DesignCancel_Filed_data[targetkeys[i]].errmsg = errorcheck.msg;
      mainvalue[targetkeys[i]] = DesignCancel_Filed_data[targetkeys[i]].value;
      console.log(DesignCancel_Filed_data[targetkeys[i]].error,"error")
    }
    var filtererr = targetkeys.filter(
      (obj) => DesignCancel_Filed_data[obj].error == true
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
      DesignCancel_Filed_data,
    });
  };
  changeDynamic = (data, key) => {
    console.log("key", key);
    console.log("data", data);

    const params = new URLSearchParams(window.location.search)
    const status = params.get("status")

    if(key==="stages" && status){

      var Stages = this.props.designStages.filter((data,index)=>{
        return(data.Type === "Filed" && data.Process === "Cancellation")
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
        this.state.DesignCancel_Filed_data.date.value = moment(moment(this.state.TrademarkItems[this.state.TrademarkItems.length-1].HearingDate, "YYYY-MM-DD").add( datevalue ? datevalue.TDays : 0, 'days'))
    }

    var DesignCancel_Filed_data = this.state.DesignCancel_Filed_data;
    var targetkeys = Object.keys(DesignCancel_Filed_data);
    var errorcheck = ValidationLibrary.checkValidation(
      data,
      DesignCancel_Filed_data[key].validation
    );
    DesignCancel_Filed_data[key].value = data;
    DesignCancel_Filed_data[key].error = !errorcheck.state;
    DesignCancel_Filed_data[key].errmsg = errorcheck.msg;
    this.setState({ DesignCancel_Filed_data });
    var filtererr = targetkeys.filter(
      (obj) =>
        DesignCancel_Filed_data[obj].error == true ||
        DesignCancel_Filed_data[obj].error == null
    );
    if (filtererr.length > 0) {
      this.setState({ error: true, errordummy: false });
    } else {
      this.setState({ error: false });
    }
  };


  insert=()=>{

    var Stages = this.props.designStages.filter((data,index)=>{
      return(data.Type === "Filed" && data.Process === "Cancellation")
    }).filter((val,index)=>{
      if(index == this.state.DesignCancel_Filed_data.stages.value-1){
        return val.ProjectTemplateId
      }
    })

    var sub_stages = this.props.designSubStages.filter((data,index)=>{
      return(data.Type === "Filed" && data.Process === "Cancellation")
    }).filter((val,index)=>{
      if(index == this.state.DesignCancel_Filed_data.sub_stages.value-1){
        return val.ProjectTemplateId
      }
    })

    var calcaulateTDays = this.state.projectList.filter((data,index)=>{
      return(data.Type === "Filed" && data.Process === "Cancellation")
    })

    var self = this;

      let DesignCancelData = {
        projectname: this.state.DesignCancel_Filed_data.projectname.value,
        clientpetitioner:this.state.DesignCancel_Filed_data.Clientpetitioner.value,
        // clientrespondent:this.state.DesignCancel_Filed_data.client_respondent.value,
        DesignNo:this.state.DesignCancel_Filed_data.design_num.value,
        respondent:this.state.DesignCancel_Filed_data.respondent.value,
        // Petitioner:this.state.DesignCancel_Filed_data.petitioner.value,
        respondentrep:this.state.DesignCancel_Filed_data.respondent_rep.value,
        // PetitionerRep:this.state.DesignCancel_Filed_data.petitioner_rep.value,
        Comments:this.state.DesignCancel_Filed_data.Comments.value,
        Status:this.state.DesignCancel_Filed_data.status.value,
        // DateofHearing:this.state.DesignCancel_Filed_data.hearingup_date.value && moment(this.state.DesignCancel_Filed_data.hearingup_date.value).format('YYYY-MM-DD'),
        Stages:Stages[0] && Stages[0].ProjectTemplateId,
        Substages:sub_stages[0] && sub_stages[0].ProjectTemplateId,
        // date:this.state.DesignCancel_Filed_data.date.value && moment(this.state.DesignCancel_Filed_data.date.value).format('YYYY-MM-DD'),
        hearingdate:this.state.DesignCancel_Filed_data.hearing_date.value && moment(this.state.DesignCancel_Filed_data.hearing_date.value).format('YYYY-MM-DD'),
        "date":this.state.DesignCancel_Filed_data.application_date.value ? moment(moment(this.state.DesignCancel_Filed_data.application_date.value, "YYYY-MM-DD").add(calcaulateTDays[0].TDays ? calcaulateTDays[0].TDays : 0, 'days')).format('YYYY-MM-DD'): ""
      };

      axios({
        method: "post",
        url: apiurl + "/addCancellationfiled",
        data: DesignCancelData,
      })
        .then(function (response) {
          console.log(response.data.data, "responseresponse");
          notification.warning({
            message: `Design cancellation Filed data submitted successfully`,
            duration: 3.5,
            placement: "topRight",
            className: "notification_dayreport",
          });

          // self.state.opemodaldata.amount.value=""
          // self.props.showclose && self.props.showclose()
          self.setState({afterInsert:true,commonId:response.data.data});
        })
        .catch(function (error) {
          console.log(error, "error");
        });
  }

  updateSubstage=()=>{

    // var Stages = this.props.designStages.filter((data,index)=>{
    //   return(data.Type === "Filed" && data.Process === "Cancellation")
    // }).filter((val,index)=>{
    //   if(index == this.state.DesignCancel_Filed_data.stages.value-1){
    //     return val.ProjectTemplateId
    //   }
    // })

    // var sub_stages = this.props.designSubStages.filter((data,index)=>{
    //   return(data.Type === "Filed" && data.Process === "Cancellation")
    // }).filter((val,index)=>{
    //   if(index == this.state.DesignCancel_Filed_data.sub_stages.value-1){
    //     return val.ProjectTemplateId
    //   }
    // })

    if(typeof this.state.DesignCancel_Filed_data.stages.value === 'string'){
      var Stages = this.props.designStages.filter((data,index)=>{
        return(data.Type === "Filed" && data.Process === "Cancellation")
      }).filter((val,index)=>{
        if(val.Stage === this.state.DesignCancel_Filed_data.stages.value){
          return val.ProjectTemplateId
        }
      })
    }else{
      var Stages = this.props.designStages.filter((data,index)=>{
        return(data.Type === "Filed" && data.Process === "Cancellation")
      }).filter((val,index)=>{
        if(index == this.state.DesignCancel_Filed_data.stages.value-1){
          return val.ProjectTemplateId
        }
      })

    }


    if(typeof this.state.DesignCancel_Filed_data.sub_stages.value === 'string'){
      var sub_stages = this.props.designSubStages.filter((data,index)=>{
        return(data.Type === "Filed" && data.Process === "Cancellation")
      }).filter((val,index)=>{
        if(val.Substage == this.state.DesignCancel_Filed_data.sub_stages.value){
          return val.ProjectTemplateId
        }
      })
    }else{
      var sub_stages = this.props.designSubStages.filter((data,index)=>{
        return(data.Type === "Filed" && data.Process === "Cancellation")
      }).filter((val,index)=>{
        if(index == this.state.DesignCancel_Filed_data.sub_stages.value-1){
          return val.ProjectTemplateId
        }
      })
    }

  var self = this

  var myObject = {
    tfId:this.state.commonId,
    "stages": Stages[0].ProjectTemplateId,
}

this.state.DesignCancel_Filed_data.sub_stages.value && Object.assign(myObject, {"Substages":sub_stages[0] && sub_stages[0].ProjectTemplateId})
this.state.DesignCancel_Filed_data.date.value && Object.assign(myObject, { "date":this.state.DesignCancel_Filed_data.date.value?moment(this.state.DesignCancel_Filed_data.date.value).format('YYYY-MM-DD'):""})
this.state.DesignCancel_Filed_data.hearing_date.value && Object.assign(myObject, {"hearingdate":this.state.DesignCancel_Filed_data.hearing_date.value? moment(this.state.DesignCancel_Filed_data.hearing_date.value).format('YYYY-MM-DD'):""})

  axios({
    method: 'put',
    url: apiurl + "/updatecanfiledstages",
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


update=()=>{

  var clientId = this.state.DesignCancel_Filed_data.Clientpetitioner.value

  if(!Number(this.state.DesignCancel_Filed_data.Clientpetitioner.value)){
   var clientId = this.props.designReference.find((val) => {
      if(clientId==val.EmpFirstName){
        return val.EmpId 
      }
     }
     )
  }

  var statusId = this.state.DesignCancel_Filed_data.status.value

  if(!Number(this.state.DesignCancel_Filed_data.status.value)){
   var statusId = this.props.designStatus.find((val) => {
      if(statusId==val.Status){
        return val.StatusId 
      }
     }
     )
  }

  let DesignCancelData = {
    clientpetitioner:!Number(this.state.DesignCancel_Filed_data.Clientpetitioner.value)?clientId.EmpId:clientId,
    // clientrespondent:this.state.DesignCancel_Filed_data.client_respondent.value,
    DesignNo:this.state.DesignCancel_Filed_data.design_num.value,
    respondent:this.state.DesignCancel_Filed_data.respondent.value,
    // Petitioner:this.state.DesignCancel_Filed_data.petitioner.value,
    respondentrep:this.state.DesignCancel_Filed_data.respondent_rep.value,
    // PetitionerRep:this.state.DesignCancel_Filed_data.petitioner_rep.value,
    Comments:this.state.DesignCancel_Filed_data.Comments.value,
    Status:!Number(this.state.DesignCancel_Filed_data.status.value)?statusId && statusId.StatusId:statusId,
    // DateofHearing:this.state.DesignCancel_Filed_data.hearingup_date.value && moment(this.state.DesignCancel_Filed_data.hearingup_date.value).format('YYYY-MM-DD'),
    tfId:this.state.commonId
  };

  axios({
    method: 'put',
    url: apiurl + "/updatecanfiled",
    data:DesignCancelData
  })
    .then(function (response) {
      notification.warning({
        message: `Design Cancellation Filled Application has updated successfully`,
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
    this.props.designStages.map((val) => {if(val.Type==="Filed" && val.Process==="Cancellation"){
      stageArr.push(val.Stage) 
      stageArrId.push(val.ProjectTemplateId)
    }})

    var subStageArr = []
    var subStageArrId = []

    this.props.designSubStages &&
    this.props.designSubStages.map((val)=>{if(val.Type==="Filed" && val.Process==="Cancellation" && val.Substage){
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
              value={this.state.DesignCancel_Filed_data.projectname.value}
              error={this.state.DesignCancel_Filed_data.projectname.error}
              errmsg={this.state.DesignCancel_Filed_data.projectname.errmsg}
            />

            </Grid>
            <Grid item md={3} sm={5}>
              <Dropdownantd
                label={"Client Petitioner"}
                className="w-100"
                option={
                  this.props.designReference &&
                  this.props.designReference.map((val) => val.EmpFirstName)
                }
                changeData={(data) =>
                  this.changeDynamic(data, "Clientpetitioner")
                }
                value={
                  this.state.DesignCancel_Filed_data
                    .Clientpetitioner.value
                }
                error={
                  this.state.DesignCancel_Filed_data
                    .Clientpetitioner.error
                }
                errmsg={
                  this.state.DesignCancel_Filed_data
                    .Clientpetitioner.errmsg
                }
              />
            </Grid>
            <Grid item md={3} sm={5}>
              <Inputantd
                label={"Design Number"}
              
                className="w-100"
                changeData={(data) => this.changeDynamic(data, 'design_num')}
                value={this.state.DesignCancel_Filed_data.design_num.value}
                error={this.state.DesignCancel_Filed_data.design_num.error}
                errmsg={this.state.DesignCancel_Filed_data.design_num.errmsg}
                className="w-100"
              />
            </Grid>
            <Grid item md={3} sm={5}>
              <Inputantd
                label={"Respondent"}
                className="w-100"
                changeData={(data) => this.changeDynamic(data, 'respondent')}
                value={this.state.DesignCancel_Filed_data.respondent.value}
                error={this.state.DesignCancel_Filed_data.respondent.error}
                errmsg={this.state.DesignCancel_Filed_data.respondent.errmsg}
                className="w-100"
              ></Inputantd>
            </Grid>
            <Grid item md={3} sm={5}>
              <Inputantd label={"Respondent Rep"} className="w-100"
                 changeData={(data) => this.changeDynamic(data, 'respondent_rep')}
                 value={this.state.DesignCancel_Filed_data.respondent_rep.value}
                 error={this.state.DesignCancel_Filed_data.respondent_rep.error}
                 errmsg={this.state.DesignCancel_Filed_data.respondent_rep.errmsg} />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item md={3} sm={5}>
              <Inputantd label={"Comments"} className="w-100" 
                 changeData={(data) => this.changeDynamic(data, 'Comments')}
                 value={this.state.DesignCancel_Filed_data.Comments.value}
                 error={this.state.DesignCancel_Filed_data.Comments.error}
                 errmsg={this.state.DesignCancel_Filed_data.Comments.errmsg}
              />
            </Grid>
            <Grid item md={3} sm={5}>
              <Dropdownantd label={"Status"} className="w-100"
                  option={
                    this.props.designStatus &&
                    this.props.designStatus.map((val) => val.Status)
                  }
                 changeData={(data) => this.changeDynamic(data, 'status')}
                 value={this.state.DesignCancel_Filed_data.status.value}
                 error={this.state.DesignCancel_Filed_data.status.error}
                 errmsg={this.state.DesignCancel_Filed_data.status.errmsg} />
            </Grid>
            <Grid item md={3} sm={5}>
                <Calenderbox label={"Application Date"} className="w-75"
                        changeData={(data) => this.changeDynamic(data, 'application_date')}
                        value={this.state.DesignCancel_Filed_data.application_date.value}
                        error={this.state.DesignCancel_Filed_data.application_date.error}
                        errmsg={this.state.DesignCancel_Filed_data.application_date.errmsg} />
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
                    this.state.DesignCancel_Filed_data
                      .stages.value
                  }
                  error={
                    this.state.DesignCancel_Filed_data
                      .stages.error
                  }
                  errmsg={
                    this.state.DesignCancel_Filed_data
                      .stages.errmsg
                  }
                  className="w-75"
                  placeholder="ER Reply"
                ></Dropdownantd>
              </Grid>
              <Grid item md={3} sm={5}>
                <Dropdownantd
                  label={"Sub Stages"}
                  option={
                    subStageArr
                  }
                  changeData={(data) =>
                    this.changeDynamic(data, "sub_stages")
                  }
                  value={
                    this.state.DesignCancel_Filed_data
                      .sub_stages.value
                  }
                  error={
                    this.state.DesignCancel_Filed_data
                      .sub_stages.error
                  }
                  errmsg={
                    this.state.DesignCancel_Filed_data
                      .sub_stages.errmsg
                  }
                  className="w-75"
                  placeholder="Formality check Fail Yes"
                ></Dropdownantd>
              </Grid>
              <Grid item md={3} sm={5}>
                <Calenderbox label={"Statutory Deadline"} className="w-75"
                      changeData={(data) =>
                        this.changeDynamic(data, "date")
                      }
                      disabled={true}
                      value={status==="editable" ? this.state.DesignCancel_Filed_data.date.value:this.state.DesignCancel_Filed_data.application_date.value}
                ></Calenderbox>
              </Grid>
              <Grid item md={3} sm={5}>
                <div className="d-flex">
                    <Calenderbox label={"Filing Date"} className="w-100"
                      changeData={(data) => this.changeDynamic(data, 'hearing_date')}
                      value={this.state.DesignCancel_Filed_data.hearing_date.value}
                      error={this.state.DesignCancel_Filed_data.hearing_date.error}
                      errmsg={this.state.DesignCancel_Filed_data.hearing_date.errmsg}
                    ></Calenderbox>
                  <span className="circle_icon_edit">
                    <AddCircleOutline  onClick={this.checkValidation} className="Interfil_addicon" />
                  </span>
                  </div>
                </Grid>
            </Grid>
          </div>
          <DesignAppList callSubStage={this.state.callSubStage} commonId={this.state.commonId} endpoint={"viewcanfileditems"} trademark={"DesignCanfiled"}/>
        </>
      </React.Fragment>
    );
  }
}


const mapStateToProps = (state) => {
  console.log("stateeee", state);

  return {
    DesignCancel_Filed_data: state.resumeReducer.DesignCancel_Filed_data,
    designStatus: state.tradeapp.getTradestatus,
    designAssociate: state.tradeapp.getTradeassociate,
    designReference: state.tradeapp.getTradeOurReference,
    designCountry: state.tradeapp.getTradecountry,
    designStages: state.tradeapp.getTradestages,
    designSubStages: state.tradeapp.getTradeSubstages,
    designClient:state.tradeapp.getTradeClientname,
    ProjectName:state.tradeapp.getprojectName
  };
};
export default connect(mapStateToProps, {
  getStatus,
  getAssociate,
  getOurReference,
  getCountry,
  getStages,
  getSubstages,
  getClientName,
  getProjectName
})(FiledCancellation);
