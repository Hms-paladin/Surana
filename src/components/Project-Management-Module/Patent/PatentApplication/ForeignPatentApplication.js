import React from "react";
import "./DesignApplication.css";
import Inputantd from "../../../../formcomponent/inputantd";
import Dropdownantd from "../../../../formcomponent/dropdownantd";
import Grid from "@material-ui/core/Grid";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import { IoMdInformationCircle } from "react-icons/io";
import Button from "react-bootstrap/Button";
import { Popover } from "antd";
import { Upload, Icon } from "antd";
import { Tooltip } from "antd";
import { Table, notification } from "antd";
import ValidationLibrary from "../../../../validationlibrary/validation";
import PatentForeignList from './PatentForeignList'
import Calenderbox from "../../../../formcomponent/calenderbox";
import {
  getStatus,
  getAssociate,
  getClass,
  getOurReference,
  getCountry,
  getAllotment,
  getStages,
  getSubstages,
  getProjectName
} from "../../TradeMark/ApplicationTradeMark/TradeAppAction/TradeAppAction";
import { getForeignAppNum } from "./Patent_Action/PatentAction";
import { connect } from "react-redux";
import { apiurl } from "../../../../App";
// import Calenderbox from "../../../../formcomponent/Calenderbox";
import moment from "moment";
import PatentList from "./DesignAppList";

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
    stage: "Application Field",
    substage: "-",
    date: "14 July 2020",
    actualdate: "14 July 2020",
  },
  {
    key: "2",
    stage: "Priority Field",
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
class ForeignpatentApplication extends React.Component {
  state = {
    tags: [],
    inputVisible: false,
    inputValue: "",
    errordummy: true,
    PatentApp_Foreign_data: {
      projectname:{
        value: "",
        validation: [],
        error: null,
        errmsg: null,
      },
      applicant: {
        value: null,
        validation: [],
        error: null,
        errmsg: null,
      },

      our_reference: {
        value: null,
        validation: [],
        error: null,
        errmsg: null,
      },
      associate: {
        value: null,
        validation: [],
        error: null,
        errmsg: null,
      },
      reply_further: {
        value: null,
        validation: [],
        error: null,
        errmsg: null,
      },
      comments: {
        value: null,
        validation: [],
        error: null,
        errmsg: null,
      },
      application_num: {
        value: null,
        validation: [],
        error: null,
        errmsg: null,
      },
      country: {
        value: "",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
      },
      further: {
        value: null,
        validation: [],
        error: null,
        errmsg: null,
      },
      stages: {
        value: "",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
      },
      sub_stages: {
        value: null,
        validation: [],
        error: null,
        errmsg: null,
      },
      Status: {
        value: null,
        validation: [],
        error: null,
        errmsg: null,
      },
      File_cover: {
        value: null,
        validation: [],
        error: null,
        errmsg: null,
      },
      app_date: {
        value: "",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
      },
      date: {
        value: null,
        validation: [],
        error: null,
        errmsg: null,
      },
      hearing_date: {
        value: "",
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
    await this.props.getForeignAppNum();
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
              if(value.Type === "Foreign" && value.Template === "Patent" && value.Process === "Application"){
                projectList.push(value)
              } 
            })
  
            this.setState({projectList:projectList})
            console.log(projectList, "projectList")

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
                  response.data.data[11].PatentappForeign.filter((data, index) => {
        
        
                    if (data.PatIndId == userid) {
        
                    self.state.PatentApp_Foreign_data.projectname.value = data.ProjectName === "null" ? "" : data.ProjectName
                    self.state.PatentApp_Foreign_data.stages.value=projectList[data.Patentforeign.length] && projectList[data.Patentforeign.length].Stage
                    self.state.PatentApp_Foreign_data.sub_stages.value=projectList[data.Patentforeign.length] && projectList[data.Patentforeign.length].Substage
                    self.state.PatentApp_Foreign_data.date.value=moment(moment(data.Patentforeign[data.Patentforeign.length-1].HearingDate, "YYYY-MM-DD").add(projectList[data.Patentforeign.length] && projectList[data.Patentforeign.length].TDays ? projectList[data.Patentforeign.length].TDays : 0, 'days'))

                    self.state.PatentApp_Foreign_data.country.value = data.Country === "null" ? "" : data.Country 
                    self.state.PatentApp_Foreign_data.File_cover.value = data.FileCover === "null" ? "" : data.FileCover
                    self.state.PatentApp_Foreign_data.applicant.value = data.Applicant === "null" ? "" : data.Applicant
                    self.state.PatentApp_Foreign_data.our_reference.value = data.ourRef === "null" ? "" : data.ourRef
                    self.state.PatentApp_Foreign_data.associate.value= data.Assosciate === "null" ? "" : data.Assosciate
                    self.state.PatentApp_Foreign_data.application_num.value = data.AppNo === "null" ? "" : data.AppNo
                    self.state.PatentApp_Foreign_data.app_date.value = data.Appdate === "null" ? "" : moment(data.Appdate)
                    self.state.PatentApp_Foreign_data.Status.value = data.Status === "null" ? "" : data.Status
                    self.state.PatentApp_Foreign_data.reply_further.value= data.RplyFurtheraction === null ? "" : moment(data.RplyFurtheraction)
                    self.state.PatentApp_Foreign_data.comments.value = data.Comment === "null" ? "" : data.Comment
                    self.state.PatentApp_Foreign_data.further.value = data.FurtherAction === null ? "" : moment(data.FurtherAction)

                      self.setState({TrademarkItems:data.Patentforeign,commonId:data.PatIndId})
                    }
        
                  })
                })
            }

          })}

  checkValidation = () => {
    var mainvalue = {};
    var PatentApp_Foreign_data = this.state.PatentApp_Foreign_data;
    var targetkeys = Object.keys(PatentApp_Foreign_data);
    console.log(targetkeys, "targetkeys");
    for (var i in targetkeys) {
      var errorcheck = ValidationLibrary.checkValidation(
        PatentApp_Foreign_data[targetkeys[i]].value,
        PatentApp_Foreign_data[targetkeys[i]].validation
      );
      console.log(errorcheck, "errorcheck");
      PatentApp_Foreign_data[targetkeys[i]].error = !errorcheck.state;
      PatentApp_Foreign_data[targetkeys[i]].errmsg = errorcheck.msg;
      mainvalue[targetkeys[i]] = PatentApp_Foreign_data[targetkeys[i]].value;
      console.log(PatentApp_Foreign_data[targetkeys[i]].error, "error");
    }
    var filtererr = targetkeys.filter(
      (obj) => PatentApp_Foreign_data[obj].error == true
    );
    console.log(filtererr.length);
    if (filtererr.length > 0) {
      this.setState({ error: false });
    } else {
      this.setState({ error: true });

      const params = new URLSearchParams(window.location.search)
      const status = params.get("status")
      {status==="editable"|| this.state.afterInsert?
      this.updateSubstage():
      this.insert()
      }
  };

  this.setState({
    // mainvalue,
    PatentApp_Foreign_data,
  });
  }


  updateSubstage=()=>{
      
    if(typeof this.state.PatentApp_Foreign_data.stages.value === 'string'){
      var Stages = this.props.designStages.filter((data,index)=>{
        return(data.Type === "Foreign" && data.Template === "Patent" && data.Process === "Application")
      }).filter((val,index)=>{
        if(val.Stage === this.state.PatentApp_Foreign_data.stages.value){
          return val.ProjectTemplateId
        }
      })
    }else{
      var Stages = this.props.designStages.filter((data,index)=>{
        return(data.Type === "Foreign" && data.Template === "Patent" && data.Process === "Application")
      }).filter((val,index)=>{
        if(index == this.state.PatentApp_Foreign_data.stages.value-1){
          return val.ProjectTemplateId
        }
      })

    }


    if(typeof this.state.PatentApp_Foreign_data.sub_stages.value === 'string'){
      var sub_stages = this.props.designSubStages.filter((data,index)=>{
        return(data.Type === "Foreign" && data.Template === "Patent" && data.Process === "Application")
      }).filter((val,index)=>{
        if(val.Substage == this.state.PatentApp_Foreign_data.sub_stages.value){
          return val.ProjectTemplateId
        }
      })
    }else{
      var sub_stages = this.props.designSubStages.filter((data,index)=>{
        return(data.Type === "Foreign" && data.Template === "Patent" && data.Process === "Application")
      }).filter((val,index)=>{
        if(index == this.state.PatentApp_Foreign_data.sub_stages.value-1){
          return val.ProjectTemplateId
        }
      })
    }

  var self = this

  var myObject = {
    patIndId:this.state.commonId,
    "stages": Stages[0].ProjectTemplateId,
}

this.state.PatentApp_Foreign_data.sub_stages.value && Object.assign(myObject, {"Substages":sub_stages[0].ProjectTemplateId})
this.state.PatentApp_Foreign_data.date.value && Object.assign(myObject, { "date":this.state.PatentApp_Foreign_data.date.value?moment(this.state.PatentApp_Foreign_data.date.value).format('YYYY-MM-DD'):""})
this.state.PatentApp_Foreign_data.hearing_date.value && Object.assign(myObject, {"hearingdate":this.state.PatentApp_Foreign_data.hearing_date.value? moment(this.state.PatentApp_Foreign_data.hearing_date.value).format('YYYY-MM-DD'):""})

  axios({
    method: 'put',
    url: apiurl + "/updatepatentforeignstages",
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


  var country = this.state.PatentApp_Foreign_data.country.value


  if(!Number(this.state.PatentApp_Foreign_data.country.value)){
   var country = this.props.designCountry.find((val) => {
      if(country==val.CounName){
        return val.CounId 
      }
     }
     )
  }

  
  var applicant = this.state.PatentApp_Foreign_data.applicant.value


  if(!Number(this.state.PatentApp_Foreign_data.applicant.value)){
   var applicant = this.props.designReference.find((val) => {
      if(applicant==val.EmpFirstName){
        return val.EmpId 
      }
     }
     )
  }

  var our_reference = this.state.PatentApp_Foreign_data.our_reference.value

  if(!Number(this.state.PatentApp_Foreign_data.our_reference.value)){
   var our_reference = this.props.designReference.find((val) => {
      if(our_reference==val.EmpFirstName){
        return val.EmpId 
      }
     }
     )
  }

  var associate = this.state.PatentApp_Foreign_data.associate.value


  if(!Number(this.state.PatentApp_Foreign_data.associate.value)){
   var associate = this.props.designAssociate.find((val) => {
      if(associate==val.AssociateName){
        return val.AssociateId 
      }
     }
     )
  }

  var self = this;

    let PatentDomData = {
      country:!Number(this.state.PatentApp_Foreign_data.country.value)?country && country.CounId:country,
      filecover:this.state.PatentApp_Foreign_data.File_cover.value,
      Applicant:!Number(this.state.PatentApp_Foreign_data.applicant.value)?applicant && applicant.EmpId:applicant,
      OurRef:!Number(this.state.PatentApp_Foreign_data.our_reference.value)?our_reference && our_reference.EmpId:our_reference,
      assosciate:!Number(this.state.PatentApp_Foreign_data.associate.value)?associate && associate.AssociateId:associate,
      AppNo:this.state.PatentApp_Foreign_data.application_num.value,
      Appdate: moment(this.state.PatentApp_Foreign_data.app_date.value).format('YYYY-MM-DD'),
      status:this.state.PatentApp_Foreign_data.Status.value,
      rplyfurtheraction:this.state.PatentApp_Foreign_data.reply_further.value?moment(this.state.PatentApp_Foreign_data.reply_further.value).format('YYYY-MM-DD'):null,
      comment:this.state.PatentApp_Foreign_data.comments.value,
      furtheraction:this.state.PatentApp_Foreign_data.further.value?moment(this.state.PatentApp_Foreign_data.further.value).format('YYYY-MM-DD'):null,
      patIndId:this.state.commonId
    };

    axios({
      method: "put",
      url: apiurl + "/updatepatentforeign",
      data: PatentDomData,
    })
      .then(function (response) {
        console.log(response.data.data, "responseresponse");
        notification.warning({
          message: `Domestic Patent Application data updated successfully`,
          duration: 3.5,
          placement: "topRight",
          className: "notification_dayreport",
        });
      })
      .catch(function (error) {
        console.log(error, "error");
      });
}

  insert=()=>{

    var Stages = this.props.designStages.filter((data,index)=>{
      return(data.Type === "Foreign" && data.Template === "Patent" && data.Process === "Application")
    }).filter((val,index)=>{
      if(index == this.state.PatentApp_Foreign_data.stages.value-1){
        return val.ProjectTemplateId
      }
    })


    var sub_stages = this.props.designSubStages.filter((data,index)=>{
      return(data.Type === "Foreign" && data.Template === "Patent" && data.Process === "Application")
    }).filter((val,index)=>{
      if(index == this.state.PatentApp_Foreign_data.sub_stages.value-1){
        return val.ProjectTemplateId
      }
    })

    var calcaulateTDays = this.state.projectList.filter((data,index)=>{
      return(data.Type === "Foreign" && data.Template === "Patent" && data.Process === "Application")
    })

    var self = this;

    let PatentForeignData = {
      projectname:this.state.PatentApp_Foreign_data.projectname.value,
      country:this.state.PatentApp_Foreign_data.country.value,
      filecover:this.state.PatentApp_Foreign_data.File_cover.value,
      Applicant:this.state.PatentApp_Foreign_data.applicant.value,
      OurRef:this.state.PatentApp_Foreign_data.our_reference.value,
      assosciate:this.state.PatentApp_Foreign_data.associate.value,
      AppNo:this.state.PatentApp_Foreign_data.application_num.value,
      Appdate: moment(this.state.PatentApp_Foreign_data.app_date.value).format('YYYY-MM-DD'),
      status:this.state.PatentApp_Foreign_data.Status.value,
      rplyfurtheraction:this.state.PatentApp_Foreign_data.reply_further.value?moment(this.state.PatentApp_Foreign_data.reply_further.value).format('YYYY-MM-DD'):null,
      comment:this.state.PatentApp_Foreign_data.comments.value,
      furtheraction:this.state.PatentApp_Foreign_data.further.value?moment(this.state.PatentApp_Foreign_data.further.value).format('YYYY-MM-DD'):null,
      Stages:Stages[0] && Stages[0].ProjectTemplateId,
      Substages:sub_stages[0] && sub_stages[0].ProjectTemplateId,
      date:this.state.PatentApp_Foreign_data.app_date.value ? moment(moment(this.state.PatentApp_Foreign_data.app_date.value, "YYYY-MM-DD").add(calcaulateTDays[0].TDays ? calcaulateTDays[0].TDays : 0, 'days')).format('YYYY-MM-DD'): "",
      hearingdate:moment(this.state.PatentApp_Foreign_data.hearing_date.value).format('YYYY-MM-DD')
    };

    axios({
      method: "post",
      url: apiurl + "/addpatentforeign",
      data: PatentForeignData,
    })
      .then(function (response) {
        console.log(response.data.data, "responseresponse");
        notification.warning({
          message: `Foreign Patent Application data submitted successfully`,
          duration: 3.5,
          placement: "topRight",
          className: "notification_dayreport",
        });
        // self.state.PatentApp_Foreign_data.further.value = "";
        // self.state.PatentApp_Foreign_data.our_reference.value = "";
        // self.state.PatentApp_Foreign_data.stages.value = "";
        // self.state.PatentApp_Foreign_data.sub_stages.value = "";
        // self.state.PatentApp_Foreign_data.applicant.value = "";
        // self.state.PatentApp_Foreign_data.File_cover.value = "";
        // self.state.PatentApp_Foreign_data.Status.value = "";
        // self.state.PatentApp_Foreign_data.app_date.value = "";
        // self.state.PatentApp_Foreign_data.application_num.value = "";
        // self.state.PatentApp_Foreign_data.application_type.value = "";
        // self.state.PatentApp_Foreign_data.associate.value = "";
        // self.state.PatentApp_Foreign_data.class.value = "";
        // self.state.PatentApp_Foreign_data.comments.value = "";
        // self.state.PatentApp_Foreign_data.country.value = "";
        // self.state.PatentApp_Foreign_data.date.value = "";
        // self.state.PatentApp_Foreign_data.reply_further.value = "";
        // self.props.showclose && self.props.showclose()
        self.setState({afterInsert:true,commonId:response.data.data});
      })
      .catch(function (error) {
        console.log(error, "error");
      });
  }


  changeDynamic = (data, key) => {
    console.log("key", key);
    console.log("data", data);

    const params = new URLSearchParams(window.location.search)
    const status = params.get("status")

    if(key==="stages" && status){

      var Stages = this.props.designStages.filter((data,index)=>{
        return(data.Type === "Foreign" && data.Template === "Patent" && data.Process === "Application")
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
        this.state.PatentApp_Foreign_data.date.value = moment(moment(this.state.TrademarkItems[this.state.TrademarkItems.length-1].HearingDate, "YYYY-MM-DD").add( datevalue ? datevalue.TDays : 0, 'days'))
    }

    var PatentApp_Foreign_data = this.state.PatentApp_Foreign_data;
    var targetkeys = Object.keys(PatentApp_Foreign_data);
    var errorcheck = ValidationLibrary.checkValidation(
      data,
      PatentApp_Foreign_data[key].validation
    );
    PatentApp_Foreign_data[key].value = data;
    PatentApp_Foreign_data[key].error = !errorcheck.state;
    PatentApp_Foreign_data[key].errmsg = errorcheck.msg;
    this.setState({ PatentApp_Foreign_data });
    var filtererr = targetkeys.filter(
      (obj) =>
        PatentApp_Foreign_data[obj].error == true ||
        PatentApp_Foreign_data[obj].error == null
    );
    if (filtererr.length > 0) {
      this.setState({ error: true, errordummy: false });
    } else {
      this.setState({ error: false });
    }
  };

  // cancelClick=()=>{
  //   this.state.PatentApp_Foreign_data.File_cover.value=""
  //   this.state.PatentApp_Foreign_data.Status.value=""
  //   this.state.PatentApp_Foreign_data.app_date.value=""
  //   this.state.PatentApp_Foreign_data.applicant.value=""
  //   this.state.PatentApp_Foreign_data.application_num.value=""
  //   this.state.PatentApp_Foreign_data.application_type.value=""
  //   this.state.PatentApp_Foreign_data.associate.value=""
  //   this.state.PatentApp_Foreign_data.comments.value=""
  //   this.state.PatentApp_Foreign_data.country.value=""
  //   this.state.PatentApp_Foreign_data.date.value=""
  //   this.state.PatentApp_Foreign_data.further.value=""
  //   this.state.PatentApp_Foreign_data.our_reference.value=""
  //   this.state.PatentApp_Foreign_data.reply_further.value=""
  //   this.state.PatentApp_Foreign_data.stages.value=""
  //   this.state.PatentApp_Foreign_data.sub_stages.value=""
  //   this.setState({})
  // }

  render() {
    console.log(this.state, "state");
    const params = new URLSearchParams(window.location.search)
    const status = params.get("status")

    var stageArr = []
    var stageArrId = []

    this.props.designStages && this.props.designStages.map((data)=>{
      if(data.Type === "Foreign" && data.Template === "Patent" && data.Process === "Application"){
        stageArr.push(data.Stage)
        stageArrId.push(data.ProjectTemplateId)
    }})

    var subStageArr = []
    var subStageArrId = []

    this.props.designSubStages && this.props.designSubStages.map((data)=>{
      if(data.Type === "Foreign" && data.Template === "Patent" && data.Process === "Application"){
        data.Substage !== '' && subStageArr.push(data.Substage)
        data.Substage !== '' && subStageArrId.push(data.ProjectTemplateId)
    }})
    return (
      <React.Fragment>
        <>
          {/* Grid content Start */}

          <div className="DomApp_main">
            <Grid container spacing={2} className="mt-3">
            <Grid item md={3} sm={5}>

            <Dropdownantd
                label={"Project Name"}
                className="w-75"
                option={
                  this.props.ProjectName &&
                  this.props.ProjectName.map((val) => val.ProjectName)
                }
                changeData={(data) =>this.changeDynamic(data, "projectname")}
                disabled={status==="editable" ? true : false}
                value={this.state.PatentApp_Foreign_data.projectname.value}
                error={this.state.PatentApp_Foreign_data.projectname.error}
                errmsg={this.state.PatentApp_Foreign_data.projectname.errmsg}
              />

              </Grid>
              <Grid item md={3} sm={5}>
                <Dropdownantd
                  label={"Country"}
                  option={
                    this.props.designCountry &&
                    this.props.designCountry.map((val) => val.CounName)
                  }
                  className="w-100"
                  changeData={(data) => this.changeDynamic(data, "country")}
                  value={this.state.PatentApp_Foreign_data.country.value}
                  error={this.state.PatentApp_Foreign_data.country.error}
                  errmsg={this.state.PatentApp_Foreign_data.country.errmsg}
                  className="w-100"
                ></Dropdownantd>
              </Grid>
              <Grid item md={3} sm={5}>
                <Inputantd
                  label={"File cover"}
                  className="w-100"
                  changeData={(data) => this.changeDynamic(data, "File_cover")}
                  value={this.state.PatentApp_Foreign_data.File_cover.value}
                  error={this.state.PatentApp_Foreign_data.File_cover.error}
                  errmsg={this.state.PatentApp_Foreign_data.File_cover.errmsg}
                />
              </Grid>
            
              <Grid item md={3} sm={5}>
                <Dropdownantd
                  label={"Our Reference"}
                  className="w-100"
                  option={
                    this.props.designReference &&
                    this.props.designReference.map((val) => val.EmpFirstName)
                  }
                  className="w-100"
                  changeData={(data) =>
                    this.changeDynamic(data, "our_reference")
                  }
                  value={this.state.PatentApp_Foreign_data.our_reference.value}
                  error={this.state.PatentApp_Foreign_data.our_reference.error}
                  errmsg={this.state.PatentApp_Foreign_data.our_reference.errmsg}
                ></Dropdownantd>
              </Grid>
              <Grid item md={3} sm={5}>
                <Dropdownantd
                  label={"Applicant"}
                  option={
                    this.props.designReference &&
                    this.props.designReference.map((val) => val.EmpFirstName)
                  }
                  className="w-100"
                  changeData={(data) => this.changeDynamic(data, "applicant")}
                  value={this.state.PatentApp_Foreign_data.applicant.value}
                  error={this.state.PatentApp_Foreign_data.applicant.error}
                  errmsg={this.state.PatentApp_Foreign_data.applicant.errmsg}
                />
              </Grid>
              <Grid item md={3} sm={5}>
                <Dropdownantd
                  label={"Associate"}
                  className="w-100"
                  option={
                    this.props.designAssociate &&
                    this.props.designAssociate.map((val) => val.AssociateName)
                  }
                  className="w-100"
                  changeData={(data) => this.changeDynamic(data, "associate")}
                  value={this.state.PatentApp_Foreign_data.associate.value}
                  error={this.state.PatentApp_Foreign_data.associate.error}
                  errmsg={this.state.PatentApp_Foreign_data.associate.errmsg}
                />
              </Grid>
              <Grid item md={3} sm={5}>
                {/* <Dropdownantd
                  label={"Application Number"}
                  className="w-100"
                  option={
                    this.props.foreignAppNum &&
                    this.props.foreignAppNum.map((val) => val.ApplicationNo)
                  }
                  changeData={(data) =>
                    this.changeDynamic(data, "application_num")
                  }
                  value={this.state.PatentApp_Foreign_data.application_num.value}
                  error={this.state.PatentApp_Foreign_data.application_num.error}
                  errmsg={this.state.PatentApp_Foreign_data.application_num.errmsg}
                /> */}
                 <Inputantd
                  label={"Application Number"}
                  className="w-100"

                  changeData={(data) =>
                    this.changeDynamic(data, "application_num")
                  }
                  value={this.state.PatentApp_Foreign_data.application_num.value}
                  error={this.state.PatentApp_Foreign_data.application_num.error}
                  errmsg={this.state.PatentApp_Foreign_data.application_num.errmsg}
                />
              </Grid>

              <Grid item md={3} sm={5}>
                <Calenderbox
                  label={"Application Date"}
                  className="w-100"
                  changeData={(data) => this.changeDynamic(data, "app_date")}
                  value={this.state.PatentApp_Foreign_data.app_date.value}
                  error={this.state.PatentApp_Foreign_data.app_date.error}
                  errmsg={this.state.PatentApp_Foreign_data.app_date.errmsg}
                />
              </Grid>
              <Grid item md={3} sm={5}>
                <Inputantd
                  label={"Status"}
                  className="w-100"
                  changeData={(data) => this.changeDynamic(data, "Status")}
                  value={this.state.PatentApp_Foreign_data.Status.value}
                  error={this.state.PatentApp_Foreign_data.Status.error}
                  errmsg={this.state.PatentApp_Foreign_data.Status.errmsg}
                />
              </Grid>

              <Grid item md={3} sm={5}>
                <Calenderbox
                  label={"Reply to Further Actions"}
                  className="w-100"
                  changeData={(data) => this.changeDynamic(data, "reply_further")}
                  value={this.state.PatentApp_Foreign_data.reply_further.value}
                  error={this.state.PatentApp_Foreign_data.reply_further.error}
                  errmsg={this.state.PatentApp_Foreign_data.reply_further.errmsg}
                />
              </Grid>

              <Grid item md={3} sm={5}>
                <Inputantd
                  label={"Comments"}
                  className="w-100"
                  changeData={(data) => this.changeDynamic(data, "comments")}
                  value={this.state.PatentApp_Foreign_data.comments.value}
                  error={this.state.PatentApp_Foreign_data.comments.error}
                  errmsg={this.state.PatentApp_Foreign_data.comments.errmsg}
                />
              </Grid>

              <Grid item md={3} sm={5}>
                <Calenderbox
                  label={"Further Action"}
                  className="w-100"
                  changeData={(data) => this.changeDynamic(data, "further")}
                  value={this.state.PatentApp_Foreign_data.further.value}
                  error={this.state.PatentApp_Foreign_data.further.error}
                  errmsg={this.state.PatentApp_Foreign_data.further.errmsg}
                />
              </Grid>
              {status==="editable"&&
                  <>
                  <Grid item md={9} sm={5}>
                  </Grid>
                  <Grid item >
                    <Button className="btnwidth btnclr domesticPatent_topalign"  onClick={()=>this.update()}>Update</Button>
                  </Grid>
                  </>
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
                    value={this.state.PatentApp_Foreign_data.stages.value}
                    error={this.state.PatentApp_Foreign_data.stages.error}
                    errmsg={this.state.PatentApp_Foreign_data.stages.errmsg}
                    className="w-100"
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
                    value={this.state.PatentApp_Foreign_data.sub_stages.value}
                    error={this.state.PatentApp_Foreign_data.sub_stages.error}
                    errmsg={this.state.PatentApp_Foreign_data.sub_stages.errmsg}
                    className="w-100"
                  ></Dropdownantd>
                </Grid>
                <Grid item md={3} sm={5}>
                  <Calenderbox
                    label={"Statutory Deadline"}
                    className="w-100"
                    changeData={(data) => this.changeDynamic(data, "date")}
                    // value={this.state.PatentApp_Foreign_data.date.value}
                    // error={this.state.PatentApp_Foreign_data.date.error}
                    // errmsg={this.state.PatentApp_Foreign_data.date.errmsg}
                    disabled={true}
                    value={status==="editable" ? this.state.PatentApp_Foreign_data.date.value:this.state.PatentApp_Foreign_data.app_date.value}
                  ></Calenderbox>
                </Grid>
                <Grid item md={3} sm={5} className="">
                  <div className="d-flex">
                    <Calenderbox label={"Filing Date"} className="w-100"
                      changeData={(data) => this.changeDynamic(data, 'hearing_date')}
                      value={this.state.PatentApp_Foreign_data.hearing_date.value}
                      error={this.state.PatentApp_Foreign_data.hearing_date.error}
                      errmsg={this.state.PatentApp_Foreign_data.hearing_date.errmsg}
                    ></Calenderbox>
                    <AddCircleOutline onClick={this.checkValidation} className="Interfil_addicon" />
                  </div>
                </Grid>
              </Grid>
            </div>
            <PatentList TrdoId={this.state.commonId} endpoint={"viewpatentforeignitems"} trademark={"patentAppFor"} />
          </div>
        </>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("stateeee", state);

  return {
    PatentApp_Foreign_data: state.resumeReducer.PatentApp_Foreign_data,
    designStatus: state.tradeapp.getTradestatus,
    designAssociate: state.tradeapp.getTradeassociate,
    designReference: state.tradeapp.getTradeOurReference,
    designCountry: state.tradeapp.getTradecountry,
    designStages: state.tradeapp.getTradestages,
    designSubStages: state.tradeapp.getTradeSubstages,
    foreignAppNum:state.patentForeign.getforeignappNum,
    ProjectName:state.tradeapp.getprojectName
  };
};
export default connect(mapStateToProps, {
  getStatus,
  getAssociate,
  getClass,
  getOurReference,
  getCountry,
  getAllotment,
  getStages,
  getSubstages,
  getForeignAppNum,
  getProjectName
})(ForeignpatentApplication);

// export default ForeignpatentApplication;
