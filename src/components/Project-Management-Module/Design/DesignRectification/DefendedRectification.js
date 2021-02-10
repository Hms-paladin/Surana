import React from "react";
import '../DesignCancellation/Cancellationdesign.css';
import Inputantd from "../../../../formcomponent/inputantd";
import Dropdownantd from "../../../../formcomponent/dropdownantd";
import Calenderbox from "../../../../formcomponent/calenderbox";
import Grid from "@material-ui/core/Grid";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import { IoMdInformationCircle } from "react-icons/io";
import Button from "react-bootstrap/Button";
import { Popover } from "antd";
import { Upload, Icon,notification } from "antd";
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
import DesignAppList from "../DesignApplication/DesignAppList";

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
class DefendedRectification extends React.Component {
  state = {
    tags: [],
    inputVisible: false,
    inputValue: "",
    errordummy: true,
    DesignRecti_Defended_data: {
      projectname:{
        value: "",
        validation: [],
        error: null,
        errmsg: null,
      },
      client_respondent: {
        value:"",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
      },
      design_number: {
        value:null,
        validation: [],
        error: null,
        errmsg: null,
      },
      Petitioner: {
        value:null,
        validation: [],
        error: null,
        errmsg: null,
      },
      Petitioner_rep: {
        value:null,
        validation: [],
        error: null,
        errmsg: null,
      },
      Datehearing_date: {
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
              if(value.Type === "Defended" && value.Template === "Design" && value.Process === "Rectification"){
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
        response.data.data[6].DesignRectdefended.filter((data, index) => {

          if (data.RdId == userid) {
            self.state.DesignRecti_Defended_data.projectname.value = data.ProjectName === "null" ? "" : data.ProjectName
            self.state.DesignRecti_Defended_data.stages.value=projectList[data.Designrectdefended.length] && projectList[data.Designrectdefended.length].Stage
            self.state.DesignRecti_Defended_data.sub_stages.value=projectList[data.Designrectdefended.length] && projectList[data.Designrectdefended.length].Substage
            self.state.DesignRecti_Defended_data.date.value=moment(moment(data.Designrectdefended[data.Designrectdefended.length-1].HearingDate, "YYYY-MM-DD").add(projectList[data.Designrectdefended.length] && projectList[data.Designrectdefended.length].TDays ? projectList[data.Designrectdefended.length].TDays : 0, 'days'))

            self.state.DesignRecti_Defended_data.client_respondent.value = data.ClientRespondent === "null" ? "" : data.ClientRespondent
            self.state.DesignRecti_Defended_data.design_number.value = data.DesignNo === "null" ? "" : data.DesignNo
            self.state.DesignRecti_Defended_data.Petitioner.value = data.Petitioner === "null" ? "" : data.Petitioner
            self.state.DesignRecti_Defended_data.Petitioner_rep.value = data.PetitionerRep === "null" ? "" : data.PetitionerRep
            self.state.DesignRecti_Defended_data.Comments.value = data.Comments === "null" ? "" : data.Comments
            self.state.DesignRecti_Defended_data.status.value = data.Status === "null" ? "" : data.Status
            // self.state.DesignRecti_Defended_data.Datehearing_date.value = data.DateofHearing === "null" ? "" : moment(data.DateofHearing)

            self.setState({TrademarkItems:data.Designrectdefended,commonId:data.RdId})
          }

        })
      })
  }
})}

  checkValidation = () => {
    var mainvalue = {};
    var DesignRecti_Defended_data = this.state.DesignRecti_Defended_data;
    var targetkeys = Object.keys(DesignRecti_Defended_data);
    console.log(targetkeys, "targetkeys");
    for (var i in targetkeys) {
      var errorcheck = ValidationLibrary.checkValidation(
        DesignRecti_Defended_data[targetkeys[i]].value,
        DesignRecti_Defended_data[targetkeys[i]].validation
      );
      console.log(errorcheck, "errorcheck");
      DesignRecti_Defended_data[targetkeys[i]].error = !errorcheck.state;
      DesignRecti_Defended_data[targetkeys[i]].errmsg = errorcheck.msg;
      mainvalue[targetkeys[i]] =
        DesignRecti_Defended_data[targetkeys[i]].value;
    }
    var filtererr = targetkeys.filter(
      (obj) => DesignRecti_Defended_data[obj].error == true
    );
    console.log(filtererr.length);
    if (filtererr.length > 0) {
      this.setState({ error: true });
    } else {
      this.setState({ error: false });
      const params = new URLSearchParams(window.location.search)
      const status = params.get("status")
      {status==="editable"|| this.state.afterInsert?
      this.updateSubstage():
      this.insert()
      }
  }
    this.setState({
      // mainvalue,
      DesignRecti_Defended_data,
    });
  };

  updateSubstage=()=>{

    // var Stages = this.props.designStages.filter((data,index)=>{
    //   return(data.Type === "Defended" && data.Template === "Design" && data.Process === "Rectification")
    // }).filter((val,index)=>{
    //   if(index == this.state.DesignRecti_Defended_data.stages.value-1){
    //     return val.ProjectTemplateId
    //   }
    // })

    // console.log(Stages,"StagesStages")

    // var sub_stages = this.props.designSubStages.filter((data,index)=>{
    //   return(data.Type === "Defended" && data.Template === "Design" && data.Process === "Rectification")
    // }).filter((val,index)=>{
    //   if(index == this.state.DesignRecti_Defended_data.sub_stages.value-1){
    //     return val.ProjectTemplateId
    //   }
    // })

    if(typeof this.state.DesignRecti_Defended_data.stages.value === 'string'){
      var Stages = this.props.designStages.filter((data,index)=>{
        return(data.Type === "Defended" && data.Template === "Design" && data.Process === "Rectification")
      }).filter((val,index)=>{
        if(val.Stage === this.state.DesignRecti_Defended_data.stages.value){
          return val.ProjectTemplateId
        }
      })
    }else{
      var Stages = this.props.designStages.filter((data,index)=>{
        return(data.Type === "Defended" && data.Template === "Design" && data.Process === "Rectification")
      }).filter((val,index)=>{
        if(index == this.state.DesignRecti_Defended_data.stages.value-1){
          return val.ProjectTemplateId
        }
      })

    }


    if(typeof this.state.DesignRecti_Defended_data.sub_stages.value === 'string'){
      var sub_stages = this.props.designSubStages.filter((data,index)=>{
        return(data.Type === "Defended" && data.Template === "Design" && data.Process === "Rectification")
      }).filter((val,index)=>{
        if(val.Substage == this.state.DesignRecti_Defended_data.sub_stages.value){
          return val.ProjectTemplateId
        }
      })
    }else{
      var sub_stages = this.props.designSubStages.filter((data,index)=>{
        return(data.Type === "Defended" && data.Template === "Design" && data.Process === "Rectification")
      }).filter((val,index)=>{
        if(index == this.state.DesignRecti_Defended_data.sub_stages.value-1){
          return val.ProjectTemplateId
        }
      })
    }

  var self = this

  var myObject = {
    rdId:this.state.commonId,
    "stages": Stages[0].ProjectTemplateId,
}

this.state.DesignRecti_Defended_data.sub_stages.value && Object.assign(myObject, {"Substages":sub_stages[0] && sub_stages[0].ProjectTemplateId})
this.state.DesignRecti_Defended_data.date.value && Object.assign(myObject, { "date":this.state.DesignRecti_Defended_data.date.value?moment(this.state.DesignRecti_Defended_data.date.value).format('YYYY-MM-DD'):""})
this.state.DesignRecti_Defended_data.hearing_date.value && Object.assign(myObject, {"hearingdate":this.state.DesignRecti_Defended_data.hearing_date.value? moment(this.state.DesignRecti_Defended_data.hearing_date.value).format('YYYY-MM-DD'):""})

  axios({
    method: 'put',
    url: apiurl + "/updaterectdefendedstages",
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
        return(data.Type === "Defended" && data.Template === "Design" && data.Process === "Rectification")
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
        this.state.DesignRecti_Defended_data.date.value = moment(moment(this.state.TrademarkItems[this.state.TrademarkItems.length-1].HearingDate, "YYYY-MM-DD").add( datevalue ? datevalue.TDays : 0, 'days'))
    }

    var DesignRecti_Defended_data = this.state.DesignRecti_Defended_data;
    var targetkeys = Object.keys(DesignRecti_Defended_data);
    var errorcheck = ValidationLibrary.checkValidation(
      data,
      DesignRecti_Defended_data[key].validation
    );
    DesignRecti_Defended_data[key].value = data;
    DesignRecti_Defended_data[key].error = !errorcheck.state;
    DesignRecti_Defended_data[key].errmsg = errorcheck.msg;
    this.setState({ DesignRecti_Defended_data });
    var filtererr = targetkeys.filter(
      (obj) =>
        DesignRecti_Defended_data[obj].error == true ||
        DesignRecti_Defended_data[obj].error == null
    );
    if (filtererr.length > 0) {
      this.setState({ error: true, errordummy: false });
    } else {
      this.setState({ error: false });
    }
  };
  
  update=()=>{

    
    var clientId = this.state.DesignRecti_Defended_data.client_respondent.value

    if(!Number(this.state.DesignRecti_Defended_data.client_respondent.value)){
     var clientId = this.props.designReference.find((val) => {
        if(clientId==val.EmpFirstName){
          return val.EmpId 
        }
       }
       )
    }

    var statusId = this.state.DesignRecti_Defended_data.status.value

    if(!Number(this.state.DesignRecti_Defended_data.status.value)){
     var statusId = this.props.designStatus.find((val) => {
        if(statusId==val.Status){
          return val.StatusId 
        }
       }
       )
    }

    var DesignRectiDefendData = {
      clientrespondent: !Number(this.state.DesignRecti_Defended_data.client_respondent.value)?clientId.EmpId:clientId,
      DesignNo: this.state.DesignRecti_Defended_data.design_number.value,
      Petitioner: this.state.DesignRecti_Defended_data.Petitioner.value,
      PetitionerRep: this.state.DesignRecti_Defended_data.Petitioner_rep.value,
      // DateofHearing: this.state.DesignRecti_Defended_data.Datehearing_date.value && moment(this.state.DesignRecti_Defended_data.Datehearing_date.value).format("YYYY-MM-DD"),
      Comments: this.state.DesignRecti_Defended_data.Comments.value,
      Status: !Number(this.state.DesignRecti_Defended_data.status.value)?statusId && statusId.StatusId:statusId,
      rdId:this.state.commonId
    };
    axios({
      method: "put",
      url: apiurl + "/updaterectdefended",
      data: DesignRectiDefendData,
    })
    .then(function (response) {
      console.log(response.data.data, "responseresponse");
      notification.warning({
        message: `Design Rectification Defended data updated successfully`,
        duration: 3.5,
        placement: "topRight",
        className: "notification_dayreport",
      });
    })
  }

  insert=()=>{


    var Stages = this.props.designStages.filter((data,index)=>{
      return(data.Type === "Defended" && data.Template === "Design" && data.Process === "Rectification")
    }).filter((val,index)=>{
      if(index == this.state.DesignRecti_Defended_data.stages.value-1){
        return val.ProjectTemplateId
      }
    })

    console.log(Stages,"StagesStages")

    var sub_stages = this.props.designSubStages.filter((data,index)=>{
      return(data.Type === "Defended" && data.Template === "Design" && data.Process === "Rectification")
    }).filter((val,index)=>{
      if(index == this.state.DesignRecti_Defended_data.sub_stages.value-1){
        return val.ProjectTemplateId
      }
    })

    var calcaulateTDays = this.state.projectList.filter((data,index)=>{
      return(data.Type === "Defended" && data.Template === "Design" && data.Process === "Rectification")
    })

    var self = this;
    var DesignRectiDefendData = {
      projectname: this.state.DesignRecti_Defended_data.projectname.value,
      clientrespondent: this.state.DesignRecti_Defended_data.client_respondent.value,
      DesignNo: this.state.DesignRecti_Defended_data.design_number.value,
      Petitioner: this.state.DesignRecti_Defended_data.Petitioner.value,
      PetitionerRep: this.state.DesignRecti_Defended_data.Petitioner_rep.value,
      // DateofHearing: this.state.DesignRecti_Defended_data.Datehearing_date.value && moment(this.state.DesignRecti_Defended_data.Datehearing_date.value).format("YYYY-MM-DD"),
      Comments: this.state.DesignRecti_Defended_data.Comments.value,
      Status: this.state.DesignRecti_Defended_data.status.value,
      Stages: Stages[0] && Stages[0].ProjectTemplateId,
      Substages: sub_stages[0] && sub_stages[0].ProjectTemplateId,
      // date: this.state.DesignRecti_Defended_data.date.value && moment(this.state.DesignRecti_Defended_data.date.value).format("YYYY-MM-DD"),
      "date":this.state.DesignRecti_Defended_data.application_date.value ? moment(moment(this.state.DesignRecti_Defended_data.application_date.value, "YYYY-MM-DD").add(calcaulateTDays[0].TDays ? calcaulateTDays[0].TDays : 0, 'days')).format('YYYY-MM-DD'): "",
      hearingdate:this.state.DesignRecti_Defended_data.hearing_date.value && moment(this.state.DesignRecti_Defended_data.hearing_date.value).format("YYYY-MM-DD"),
    };
    axios({
      method: "post",
      url: apiurl + "/addRectdefended",
      data: DesignRectiDefendData,
    })
    .then(function (response) {
      console.log(response.data.data, "responseresponse");
      notification.warning({
        message: `Design Rectification Defended data submitted successfully`,
        duration: 3.5,
        placement: "topRight",
        className: "notification_dayreport",
      });
      // self.state.DesignRecti_Defended_data.client_respondent.value = "";
      // self.state.DesignRecti_Defended_data.design_number.value = "";
      // self.state.DesignRecti_Defended_data.Petitioner_rep.value = "";
      // self.state.DesignRecti_Defended_data.Petitioner.value = "";
      // self.state.DesignRecti_Defended_data.date.value ="";
      // self.state.DesignRecti_Defended_data.Comments.value ="";
      // self.state.DesignRecti_Defended_data.stages.value ="";
      // self.state.DesignRecti_Defended_data.status.value ="";
      // self.state.DesignRecti_Defended_data.sub_stages.value ="";
      // self.state.DesignRecti_Defended_data.hearing_date.value ="";
      // self.props.showclose && self.props.showclose()
      self.setState({afterInsert:true,commonId:response.data.data})
    })
    .catch(function (error) {
      console.log(error, "error");
    });
  }

  render() {
    const params = new URLSearchParams(window.location.search)
    const status = params.get("status")

    var stageArr = []
    var stageArrId = []

    this.props.designStages &&
    this.props.designStages.map((val) => {if(val.Type==="Defended" && val.Template === "Design" && val.Process === "Rectification"){
      stageArr.push(val.Stage) 
      stageArrId.push(val.ProjectTemplateId)
    }})

    var subStageArr = []
    var subStageArrId = []

    this.props.designSubStages &&
    this.props.designSubStages.map((val)=>{if(val.Type==="Defended" && val.Template === "Design" && val.Process === "Rectification" && val.Substage){
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
              value={this.state.DesignRecti_Defended_data.projectname.value}
              error={this.state.DesignRecti_Defended_data.projectname.error}
              errmsg={this.state.DesignRecti_Defended_data.projectname.errmsg}
            />

            </Grid>
            <Grid item md={3} sm={5}>
              <Dropdownantd
                label={"Client Respondent"}
                option={
                  this.props.designReference &&
                  this.props.designReference.map((val) => val.EmpFirstName)
                }
                changeData={(data) =>
                  this.changeDynamic(data, "client_respondent")
                }
                value={
                  this.state.DesignRecti_Defended_data.client_respondent.value
                }
                error={
                  this.state.DesignRecti_Defended_data.client_respondent.error
                }
                errmsg={
                  this.state.DesignRecti_Defended_data.client_respondent.errmsg
                }
                className="w-100"
              ></Dropdownantd>
            </Grid>
            <Grid item md={3} sm={5}>
              <Inputantd
                label={"Design Number"}
                changeData={(data) => this.changeDynamic(data, "design_number")}
                value={
                  this.state.DesignRecti_Defended_data.design_number.value
                }
                error={
                  this.state.DesignRecti_Defended_data.design_number.error
                }
                errmsg={
                  this.state.DesignRecti_Defended_data.design_number.errmsg
                }
                className="w-100"
              />
            </Grid>

            <Grid item md={3} sm={5}>
              <Inputantd
                label={"Petitioner"}
                changeData={(data) => this.changeDynamic(data, "Petitioner")}
                value={this.state.DesignRecti_Defended_data.Petitioner.value}
                error={this.state.DesignRecti_Defended_data.Petitioner.error}
                errmsg={this.state.DesignRecti_Defended_data.Petitioner.errmsg}
                className="w-100"
              />
            </Grid>

            <Grid item md={3} sm={5}>
              <Inputantd
                label={"Petitioner Rep"}
                className="w-100"
                changeData={(data) =>
                  this.changeDynamic(data, "Petitioner_rep")
                }
                value={
                  this.state.DesignRecti_Defended_data.Petitioner_rep.value
                }
                error={
                  this.state.DesignRecti_Defended_data.Petitioner_rep.error
                }
                errmsg={
                  this.state.DesignRecti_Defended_data.Petitioner_rep.errmsg
                }
              />
            </Grid>
            {/* <Grid item md={3} sm={5}>
              <Calenderbox
                label={"Date of Hearing"}
                className="w-100"
                changeData={(data) => this.changeDynamic(data, "Datehearing_date")}
                value={this.state.DesignRecti_Defended_data.Datehearing_date.value}
                error={this.state.DesignRecti_Defended_data.Datehearing_date.error}
                errmsg={
                  this.state.DesignRecti_Defended_data.Datehearing_date.errmsg
                }
              />
            </Grid> */}
            <Grid item md={3} sm={5}>
              <Inputantd
                label={"Comments"}
                className="w-100"
                changeData={(data) => this.changeDynamic(data, "Comments")}
                value={this.state.DesignRecti_Defended_data.Comments.value}
                error={this.state.DesignRecti_Defended_data.Comments.error}
                errmsg={this.state.DesignRecti_Defended_data.Comments.errmsg}
              />
            </Grid>
            <Grid item md={3} sm={5}>
              <Dropdownantd
                label={"Status"}
                className="w-100"
                option={
                  this.props.designStatus &&
                  this.props.designStatus.map((val) => val.Status)
                }
                changeData={(data) => this.changeDynamic(data, "status")}
                value={this.state.DesignRecti_Defended_data.status.value}
                error={this.state.DesignRecti_Defended_data.status.error}
                errmsg={this.state.DesignRecti_Defended_data.status.errmsg}
              />
            </Grid>
            <Grid item md={3} sm={5}>
                <Calenderbox label={"Application Date"} className="w-75"
                        changeData={(data) => this.changeDynamic(data, 'application_date')}
                        value={this.state.DesignRecti_Defended_data.application_date.value}
                        error={this.state.DesignRecti_Defended_data.application_date.error}
                        errmsg={this.state.DesignRecti_Defended_data.application_date.errmsg} />
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
                  disableto={this.state.TrademarkItems && this.state.TrademarkItems.length}
                  changeData={(data) => this.changeDynamic(data, "stages")}
                  value={this.state.DesignRecti_Defended_data.stages.value}
                  error={this.state.DesignRecti_Defended_data.stages.error}
                  errmsg={this.state.DesignRecti_Defended_data.stages.errmsg}
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
                  changeData={(data) => this.changeDynamic(data, "sub_stages")}
                  value={this.state.DesignRecti_Defended_data.sub_stages.value}
                  error={this.state.DesignRecti_Defended_data.sub_stages.error}
                  errmsg={
                    this.state.DesignRecti_Defended_data.sub_stages.errmsg
                  }
                  className="w-75"
                  placeholder="Formality check Fail Yes"
                ></Dropdownantd>
              </Grid>
              <Grid item md={3} sm={5}>
                <Calenderbox
                  label={"Statutory Deadline"}
                  className="w-75"
                  changeData={(data) => this.changeDynamic(data, "date")}
                  disabled={true}
                  value={status==="editable" ? this.state.DesignRecti_Defended_data.date.value:this.state.DesignRecti_Defended_data.application_date.value}
                ></Calenderbox>
              </Grid>
              <Grid item md={3} sm={5} className="">
                  <div className="d-flex">
                    <Calenderbox label={"Filing Date"} className="w-100"
                      changeData={(data) => this.changeDynamic(data, 'hearing_date')}
                      value={this.state.DesignRecti_Defended_data.hearing_date.value}
                      error={this.state.DesignRecti_Defended_data.hearing_date.error}
                      errmsg={this.state.DesignRecti_Defended_data.hearing_date.errmsg}
                    ></Calenderbox>
                    <AddCircleOutline onClick={this.checkValidation} className="Interfil_addicon" />
                  </div>
                </Grid>
            </Grid>
          </div>
                  <DesignAppList callSubStage={this.state.callSubStage} commonId={this.state.commonId} endpoint={"viewrectdefendeditems"} trademark={"DesignrectDefended"} />
        </>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  console.log("stateeee", state);

  return {
    DesignRecti_Defended_data: state.resumeReducer.DesignRecti_Defended_data,
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
})(DefendedRectification);
