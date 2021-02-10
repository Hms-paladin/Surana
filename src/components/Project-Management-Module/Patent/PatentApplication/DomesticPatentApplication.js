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
import PatentList from './DesignAppList.js'
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
import { getApplicationNum } from "./Patent_Action/PatentAction";
import { connect } from "react-redux";
import { apiurl } from "../../../../App";
// import Calenderbox from "../../../../formcomponent/Calenderbox";
import moment from "moment";

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
class DomesticPatentApplication extends React.Component {
  state = {
    tags: [],
    inputVisible: false,
    inputValue: "",
    errordummy: true,
    projectList:[],
    PatentApp_Dom_data: {
      projectname:{
        value: "",
        validation: [],
        error: null,
        errmsg: null,
      },
      ClientRef: {
        value: "",
        validation: [{ name: "required" }],
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
      deadline: {
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
      hearing_date: {
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
    },
  };
  async componentDidMount() {
    await this.props.getStatus();
    await this.props.getAssociate();
    await this.props.getOurReference();
    await this.props.getCountry();
    await this.props.getStages();
    await this.props.getSubstages();
    await this.props.getApplicationNum();
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
              if(value.Type === "IndiaFiling" && value.Template === "Patent" && value.Process === "Application"){
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
                  response.data.data[10].PatentappDomestic.filter((data, index) => {
        
        
                    if (data.PatentId == userid) {
                    self.state.PatentApp_Dom_data.projectname.value = data.ProjectName === "null" ? "" : data.ProjectName
                    self.state.PatentApp_Dom_data.stages.value=projectList[data.Patentdomestic.length] && projectList[data.Patentdomestic.length].Stage
                    self.state.PatentApp_Dom_data.sub_stages.value=projectList[data.Patentdomestic.length] && projectList[data.Patentdomestic.length].Substage
                    self.state.PatentApp_Dom_data.date.value=moment(moment(data.Patentdomestic[data.Patentdomestic.length-1].HearingDate, "YYYY-MM-DD").add(projectList[data.Patentdomestic.length] && projectList[data.Patentdomestic.length].TDays ? projectList[data.Patentdomestic.length].TDays : 0, 'days'))
        
                    self.state.PatentApp_Dom_data.Status.value = data.Status === "null" ? "" : data.Status 
                    self.state.PatentApp_Dom_data.File_cover.value = data.FileCover === "null" ? "" : data.FileCover
                    self.state.PatentApp_Dom_data.ClientRef.value = data.ClientRef === "null" ? "" : data.ClientRef
                    self.state.PatentApp_Dom_data.our_reference.value = data.ourRef === "null" ? "" : data.ourRef
                    self.state.PatentApp_Dom_data.associate.value= data.Assosciate === "null" ? "" : data.Assosciate
                    self.state.PatentApp_Dom_data.application_num.value = data.ApplicatioNo === "null" ? "" : data.ApplicatioNo
                    self.state.PatentApp_Dom_data.app_date.value = data.ApplicationDate === "null" ? "" : moment(data.ApplicationDate)
                    self.state.PatentApp_Dom_data.country.value = data.Country === "null" ? "" : data.Country
                    self.state.PatentApp_Dom_data.deadline.value= data.Deadline === null ? "" : moment(data.Deadline)
                    self.state.PatentApp_Dom_data.comments.value = data.Comment === "null" ? "" : data.Comment
                    self.state.PatentApp_Dom_data.further.value = data.FurtherAction === null ? "" : moment(data.FurtherAction)
        
                      self.setState({TrademarkItems:data.Patentdomestic,commonId:data.PatentId})
                    }
        
                  })
                })
            }

          })}


          updateSubstage=()=>{
      
            if(typeof this.state.PatentApp_Dom_data.stages.value === 'string'){
              var Stages = this.props.designStages.filter((data,index)=>{
                return(data.Type === "IndiaFiling" && data.Template === "Patent" && data.Process === "Application")
              }).filter((val,index)=>{
                if(val.Stage === this.state.PatentApp_Dom_data.stages.value){
                  return val.ProjectTemplateId
                }
              })
            }else{
              var Stages = this.props.designStages.filter((data,index)=>{
                return(data.Type === "IndiaFiling" && data.Template === "Patent" && data.Process === "Application")
              }).filter((val,index)=>{
                if(index == this.state.PatentApp_Dom_data.stages.value-1){
                  return val.ProjectTemplateId
                }
              })
        
            }
        
        
            if(typeof this.state.PatentApp_Dom_data.sub_stages.value === 'string'){
              var sub_stages = this.props.designSubStages.filter((data,index)=>{
                return(data.Type === "IndiaFiling" && data.Template === "Patent" && data.Process === "Application")
              }).filter((val,index)=>{
                if(val.Substage == this.state.PatentApp_Dom_data.sub_stages.value){
                  return val.ProjectTemplateId
                }
              })
            }else{
              var sub_stages = this.props.designSubStages.filter((data,index)=>{
                return(data.Type === "IndiaFiling" && data.Template === "Patent" && data.Process === "Application")
              }).filter((val,index)=>{
                if(index == this.state.PatentApp_Dom_data.sub_stages.value-1){
                  return val.ProjectTemplateId
                }
              })
            }
      
          var self = this
          var myObject = {
            patentId:this.state.commonId,
            "stages": Stages[0].ProjectTemplateId,
        }
      
        this.state.PatentApp_Dom_data.sub_stages.value && Object.assign(myObject, {"Substages":sub_stages[0].ProjectTemplateId})
        this.state.PatentApp_Dom_data.date.value && Object.assign(myObject, { "date":this.state.PatentApp_Dom_data.date.value?moment(this.state.PatentApp_Dom_data.date.value).format('YYYY-MM-DD'):""})
        this.state.PatentApp_Dom_data.hearing_date.value && Object.assign(myObject, {"hearingdate":this.state.PatentApp_Dom_data.hearing_date.value? moment(this.state.PatentApp_Dom_data.hearing_date.value).format('YYYY-MM-DD'):""})
      
          axios({
            method: 'put',
            url: apiurl + "/updatepatentdomesticstages",
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

  checkValidation = () => {
    var mainvalue = {};
    var PatentApp_Dom_data = this.state.PatentApp_Dom_data;
    var targetkeys = Object.keys(PatentApp_Dom_data);
    for (var i in targetkeys) {
      var errorcheck = ValidationLibrary.checkValidation(
        PatentApp_Dom_data[targetkeys[i]].value,
        PatentApp_Dom_data[targetkeys[i]].validation
      );
      PatentApp_Dom_data[targetkeys[i]].error = !errorcheck.state;
      PatentApp_Dom_data[targetkeys[i]].errmsg = errorcheck.msg;
      mainvalue[targetkeys[i]] = PatentApp_Dom_data[targetkeys[i]].value;
    }
    var filtererr = targetkeys.filter(
      (obj) => PatentApp_Dom_data[obj].error == true
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
    }

    this.setState({
      // mainvalue,
      PatentApp_Dom_data,
    });
  };


  changeDynamic = (data, key) => {
    console.log("key", key);
    console.log("data", data);

    const params = new URLSearchParams(window.location.search)
    const status = params.get("status")

    if(key==="stages" && status){

      var Stages = this.props.interStages.filter((data,index)=>{
        return(data.Type === "IndiaFiling" && data.Template === "Patent" && data.Process === "Application")
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
        this.state.PatentApp_Dom_data.date.value = moment(moment(this.state.TrademarkItems[this.state.TrademarkItems.length-1].HearingDate, "YYYY-MM-DD").add( datevalue ? datevalue.TDays : 0, 'days'))
    }

    var PatentApp_Dom_data = this.state.PatentApp_Dom_data;
    var targetkeys = Object.keys(PatentApp_Dom_data);
    var errorcheck = ValidationLibrary.checkValidation(
      data,
      PatentApp_Dom_data[key].validation
    );
    PatentApp_Dom_data[key].value = data;
    PatentApp_Dom_data[key].error = !errorcheck.state;
    PatentApp_Dom_data[key].errmsg = errorcheck.msg;
    this.setState({ PatentApp_Dom_data });
    var filtererr = targetkeys.filter(
      (obj) =>
        PatentApp_Dom_data[obj].error == true ||
        PatentApp_Dom_data[obj].error == null
    );
    if (filtererr.length > 0) {
      this.setState({ error: true, errordummy: false });
    } else {
      this.setState({ error: false });
    }
  };

  // cancelClick=()=>{
  //   this.state.PatentApp_Dom_data.ClientRef.value=""
  //   this.state.PatentApp_Dom_data.File_cover.value=""
  //   this.state.PatentApp_Dom_data.Status.value=""
  //   this.state.PatentApp_Dom_data.app_date.value=""
  //   this.state.PatentApp_Dom_data.application_num.value=""
  //   this.state.PatentApp_Dom_data.application_type.value=""
  //   this.state.PatentApp_Dom_data.associate.value=""
  //   this.state.PatentApp_Dom_data.comments.value=""
  //   this.state.PatentApp_Dom_data.country.value=""
  //   this.state.PatentApp_Dom_data.date.value=""
  //   this.state.PatentApp_Dom_data.deadline.value=""
  //   this.state.PatentApp_Dom_data.further.value=""
  //   this.state.PatentApp_Dom_data.our_reference.value=""
  //   this.state.PatentApp_Dom_data.stages.value=""
  //   this.state.PatentApp_Dom_data.sub_stages.value=""
  //   this.setState({})
  // }

  update=()=>{


    var country = this.state.PatentApp_Dom_data.country.value


    if(!Number(this.state.PatentApp_Dom_data.country.value)){
     var country = this.props.designCountry.find((val) => {
        if(country==val.CounName){
          return val.CounId 
        }
       }
       )
    }

    
    var ClientRef = this.state.PatentApp_Dom_data.ClientRef.value

    if(!Number(this.state.PatentApp_Dom_data.ClientRef.value)){
     var ClientRef = this.props.interReference.find((val) => {
        if(ClientRef==val.EmpFirstName){
          return val.EmpId 
        }
       }
       )
    }

    var our_reference = this.state.PatentApp_Dom_data.our_reference.value

    if(!Number(this.state.PatentApp_Dom_data.our_reference.value)){
     var our_reference = this.props.interReference.find((val) => {
        if(our_reference==val.EmpFirstName){
          return val.EmpId 
        }
       }
       )
    }

    var associate = this.state.PatentApp_Dom_data.associate.value


    if(!Number(this.state.PatentApp_Dom_data.associate.value)){
     var associate = this.props.designAssociate.find((val) => {
        if(associate==val.AssociateName){
          return val.AssociateId 
        }
       }
       )
    }

    var self = this;

      let PatentDomData = {
        country:!Number(this.state.PatentApp_Dom_data.country.value)?country && country.CounId:country,
        filecover:this.state.PatentApp_Dom_data.File_cover.value,
        clientref:!Number(this.state.PatentApp_Dom_data.ClientRef.value)?ClientRef && ClientRef.EmpId:ClientRef,
        OurRef:!Number(this.state.PatentApp_Dom_data.our_reference.value)?our_reference && our_reference.EmpId:our_reference,
        assosciate:!Number(this.state.PatentApp_Dom_data.associate.value)?associate && associate.AssociateId:associate,
        ApplicationNo:this.state.PatentApp_Dom_data.application_num.value,
        Appdate: moment(this.state.PatentApp_Dom_data.app_date.value).format('YYYY-MM-DD'),
        status:this.state.PatentApp_Dom_data.Status.value,
        deadline:this.state.PatentApp_Dom_data.deadline.value?moment(this.state.PatentApp_Dom_data.deadline.value).format('YYYY-MM-DD'):null,
        comment:this.state.PatentApp_Dom_data.comments.value,
        furtheraction:this.state.PatentApp_Dom_data.further.value ? moment(this.state.PatentApp_Dom_data.further.value).format('YYYY-MM-DD') : null,
        patentId:this.state.commonId
      };

      axios({
        method: "put",
        url: apiurl + "/updatepatentdomestic",
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
      return(data.Type === "IndiaFiling" && data.Template === "Patent" && data.Process === "Application")
    }).filter((val,index)=>{
      if(index == this.state.PatentApp_Dom_data.stages.value-1){
        return val.ProjectTemplateId
      }
    })


    var sub_stages = this.props.designSubStages.filter((data,index)=>{
      return(data.Type === "IndiaFiling" && data.Template === "Patent" && data.Process === "Application")
    }).filter((val,index)=>{
      if(index == this.state.PatentApp_Dom_data.sub_stages.value-1){
        return val.ProjectTemplateId
      }
    })

    var calcaulateTDays = this.state.projectList.filter((data,index)=>{
      return(data.Type === "IndiaFiling" && data.Template === "Patent" && data.Process === "Application")
    })

    var self = this;

      let PatentDomData = {
        projectname:this.state.PatentApp_Dom_data.projectname.value,
        country:this.state.PatentApp_Dom_data.country.value,
        filecover:this.state.PatentApp_Dom_data.File_cover.value,
        clientref:this.state.PatentApp_Dom_data.ClientRef.value,
        OurRef:this.state.PatentApp_Dom_data.our_reference.value,
        assosciate:this.state.PatentApp_Dom_data.associate.value,
        ApplicationNo:this.state.PatentApp_Dom_data.application_num.value,
        Appdate: moment(this.state.PatentApp_Dom_data.app_date.value).format('YYYY-MM-DD'),
        status:this.state.PatentApp_Dom_data.Status.value,
        deadline:this.state.PatentApp_Dom_data.deadline.value?moment(this.state.PatentApp_Dom_data.deadline.value).format('YYYY-MM-DD'):null,
        comment:this.state.PatentApp_Dom_data.comments.value,
        furtheraction:this.state.PatentApp_Dom_data.further.value ? moment(this.state.PatentApp_Dom_data.further.value).format('YYYY-MM-DD') : null,
        Stages:Stages[0] && Stages[0].ProjectTemplateId,
        Substages:sub_stages[0] && sub_stages[0].ProjectTemplateId,
        date: this.state.PatentApp_Dom_data.date.value ? moment(this.state.PatentApp_Dom_data.date.value).format('YYYY-MM-DD') : null,
        hearingdate:this.state.PatentApp_Dom_data.hearing_date.value ? moment(this.state.PatentApp_Dom_data.hearing_date.value).format('YYYY-MM-DD') : null,
        date:this.state.PatentApp_Dom_data.app_date.value ? moment(moment(this.state.PatentApp_Dom_data.app_date.value, "YYYY-MM-DD").add(calcaulateTDays[0].TDays ? calcaulateTDays[0].TDays : 0, 'days')).format('YYYY-MM-DD'): ""
      };

      axios({
        method: "post",
        url: apiurl + "/addpatentdomestic",
        data: PatentDomData,
      })
        .then(function (response) {
          console.log(response.data.data, "responseresponse");
          notification.warning({
            message: `Domestic Patent Application data submitted successfully`,
            duration: 3.5,
            placement: "topRight",
            className: "notification_dayreport",
          });
          // self.state.PatentApp_Dom_data.further.value = "";
          // self.state.PatentApp_Dom_data.our_reference.value = "";
          // self.state.PatentApp_Dom_data.stages.value = "";
          // self.state.PatentApp_Dom_data.sub_stages.value = "";
          // self.state.PatentApp_Dom_data.ClientRef.value = "";
          // self.state.PatentApp_Dom_data.File_cover.value = "";
          // self.state.PatentApp_Dom_data.Status.value = "";
          // self.state.PatentApp_Dom_data.app_date.value = "";
          // self.state.PatentApp_Dom_data.application_num.value = "";
          // self.state.PatentApp_Dom_data.application_type.value = "";
          // self.state.PatentApp_Dom_data.associate.value = "";
          // self.state.PatentApp_Dom_data.class.value = "";
          // self.state.PatentApp_Dom_data.comments.value = "";
          // self.state.PatentApp_Dom_data.country.value = "";
          // self.state.PatentApp_Dom_data.date.value = "";
          // self.state.PatentApp_Dom_data.deadline.value = "";
          // self.props.showclose && self.props.showclose()
          self.setState({afterInsert:true,commonId:response.data.data});
        })
        .catch(function (error) {
          console.log(error, "error");
        });
  }

  render() {
    console.log(this.props.interReference,"interReference")
    console.log(this.state, "state");

    const params = new URLSearchParams(window.location.search)
    const status = params.get("status")

    var stageArr = []
    var stageArrId = []

    this.props.designStages && this.props.designStages.map((data)=>{
      if(data.Template==='Patent' && data.Process ==='Application'&&data.Type==="IndiaFiling"){
        stageArr.push(data.Stage)
        stageArrId.push(data.ProjectTemplateId)
    }})

    var subStageArr = []
    var subStageArrId = []

    this.props.designSubStages && this.props.designSubStages.map((data)=>{
      if(data.Template==='Patent' && data.Process ==='Application'&&data.Type==="IndiaFiling"){
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
                value={this.state.PatentApp_Dom_data.projectname.value}
                error={this.state.PatentApp_Dom_data.projectname.error}
                errmsg={this.state.PatentApp_Dom_data.projectname.errmsg}
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
                  value={this.state.PatentApp_Dom_data.country.value}
                  error={this.state.PatentApp_Dom_data.country.error}
                  errmsg={this.state.PatentApp_Dom_data.country.errmsg}
                  className="w-100"
                ></Dropdownantd>
              </Grid>
              <Grid item md={3} sm={5}>
                <Inputantd
                  label={"File cover"}
                  className="w-100"
                  changeData={(data) => this.changeDynamic(data, "File_cover")}
                  value={this.state.PatentApp_Dom_data.File_cover.value}
                  error={this.state.PatentApp_Dom_data.File_cover.error}
                  errmsg={this.state.PatentApp_Dom_data.File_cover.errmsg}
                />
              </Grid>
              <Grid item md={3} sm={5}>
                <Dropdownantd
                  label={"Client Reference"}
                  option={
                    this.props.designReference &&
                    this.props.designReference.map((val) => val.EmpFirstName)
                  }
                  className="w-100"
                  changeData={(data) => this.changeDynamic(data, "ClientRef")}
                  value={this.state.PatentApp_Dom_data.ClientRef.value}
                  error={this.state.PatentApp_Dom_data.ClientRef.error}
                  errmsg={this.state.PatentApp_Dom_data.ClientRef.errmsg}
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
                  value={this.state.PatentApp_Dom_data.our_reference.value}
                  error={this.state.PatentApp_Dom_data.our_reference.error}
                  errmsg={this.state.PatentApp_Dom_data.our_reference.errmsg}
                ></Dropdownantd>
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
                  value={this.state.PatentApp_Dom_data.associate.value}
                  error={this.state.PatentApp_Dom_data.associate.error}
                  errmsg={this.state.PatentApp_Dom_data.associate.errmsg}
                />
              </Grid>
              <Grid item md={3} sm={5}>
                <Inputantd
                  label={"Application Number"}
                  className="w-100"
                  option={
                    this.props.domesticAppNum &&
                    this.props.domesticAppNum.map((val) => val.ApplicationNo)
                  }
                  changeData={(data) =>
                    this.changeDynamic(data, "application_num")
                  }
                  value={this.state.PatentApp_Dom_data.application_num.value}
                  error={this.state.PatentApp_Dom_data.application_num.error}
                  errmsg={this.state.PatentApp_Dom_data.application_num.errmsg}
                />
              </Grid>

              <Grid item md={3} sm={5}>
                <Calenderbox
                  label={"Application Date"}
                  className="w-100"
                  changeData={(data) => this.changeDynamic(data, "app_date")}
                  value={this.state.PatentApp_Dom_data.app_date.value}
                  error={this.state.PatentApp_Dom_data.app_date.error}
                  errmsg={this.state.PatentApp_Dom_data.app_date.errmsg}
                />
              </Grid>
              <Grid item md={3} sm={5}>
                <Inputantd
                  label={"Status"}
                  className="w-100"
                  changeData={(data) => this.changeDynamic(data, "Status")}
                  value={this.state.PatentApp_Dom_data.Status.value}
                  error={this.state.PatentApp_Dom_data.Status.error}
                  errmsg={this.state.PatentApp_Dom_data.Status.errmsg}
                />
              </Grid>

              <Grid item md={3} sm={5}>
                <Calenderbox
                  label={"Deadline"}
                  className="w-100"
                  className="w-100"
                  changeData={(data) => this.changeDynamic(data, "deadline")}
                  value={this.state.PatentApp_Dom_data.deadline.value}
                  error={this.state.PatentApp_Dom_data.deadline.error}
                  errmsg={this.state.PatentApp_Dom_data.deadline.errmsg}
                />
              </Grid>

              <Grid item md={3} sm={5}>
                <Inputantd
                  label={"Comments"}
                  className="w-100"
                  changeData={(data) => this.changeDynamic(data, "comments")}
                  value={this.state.PatentApp_Dom_data.comments.value}
                  error={this.state.PatentApp_Dom_data.comments.error}
                  errmsg={this.state.PatentApp_Dom_data.comments.errmsg}
                />
              </Grid>

              <Grid item md={3} sm={5}>
                <Calenderbox
                  label={"Further Action"}
                  className="w-100"
                  changeData={(data) => this.changeDynamic(data, "further")}
                  value={this.state.PatentApp_Dom_data.further.value}
                  error={this.state.PatentApp_Dom_data.further.error}
                  errmsg={this.state.PatentApp_Dom_data.further.errmsg}
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
                    className="w-100"
                    disableto={this.state.TrademarkItems && this.state.TrademarkItems.length}
                    changeData={(data) => this.changeDynamic(data, "stages")}
                    value={this.state.PatentApp_Dom_data.stages.value}
                    error={this.state.PatentApp_Dom_data.stages.error}
                    errmsg={this.state.PatentApp_Dom_data.stages.errmsg}
                    className="w-75"
                  ></Dropdownantd>
                </Grid>
                <Grid item md={3} sm={5}>
                  <Dropdownantd
                    label={"Sub Stages"}
                    option={
                      subStageArr
                    }
                    className="w-100"
                    changeData={(data) =>
                      this.changeDynamic(data, "sub_stages")
                    }
                    value={this.state.PatentApp_Dom_data.sub_stages.value}
                    error={this.state.PatentApp_Dom_data.sub_stages.error}
                    errmsg={this.state.PatentApp_Dom_data.sub_stages.errmsg}
                    className="w-75"
                  ></Dropdownantd>
                </Grid>
                <Grid item md={3} sm={5}>
                  <Calenderbox
                    label={"Statutory Deadline"}
                    className="w-75"
                    changeData={(data) => this.changeDynamic(data, "date")}
                    // value={this.state.PatentApp_Dom_data.date.value}
                    // error={this.state.PatentApp_Dom_data.date.error}
                    // errmsg={this.state.PatentApp_Dom_data.date.errmsg}
                    disabled={true}
                    value={status==="editable" ? this.state.PatentApp_Dom_data.date.value:this.state.PatentApp_Dom_data.app_date.value}
                  ></Calenderbox>
                </Grid>
                <Grid item md={3} sm={5} className="">
                  <div className="d-flex">
                    <Calenderbox label={"Filing Date"} className="w-100"
                      changeData={(data) => this.changeDynamic(data, 'hearing_date')}
                      value={this.state.PatentApp_Dom_data.hearing_date.value}
                      error={this.state.PatentApp_Dom_data.hearing_date.error}
                      errmsg={this.state.PatentApp_Dom_data.hearing_date.errmsg}
                    ></Calenderbox>
                    <AddCircleOutline onClick={this.checkValidation} className="Interfil_addicon" />
                  </div>
                </Grid>
              </Grid>
            </div>

                <PatentList TrdoId={this.state.commonId} endpoint={"viewpatentdomesticitems"} trademark={"patentAppDom"} />

          </div>
        </>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    PatentApp_Dom_data: state.resumeReducer.PatentApp_Dom_data,
    designStatus: state.tradeapp.getTradestatus,
    designAssociate: state.tradeapp.getTradeassociate,
    designReference: state.tradeapp.getTradeOurReference,
    designCountry: state.tradeapp.getTradecountry,
    designStages: state.tradeapp.getTradestages,
    designSubStages: state.tradeapp.getTradeSubstages,
    domesticAppNum: state.patentDom.getapplicationNum,
    ProjectName:state.tradeapp.getprojectName,
    interReference:state.tradeapp.getTradeOurReference,
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
  getApplicationNum,
  getProjectName,
})(DomesticPatentApplication);

// export default DomesticPatentApplication;
