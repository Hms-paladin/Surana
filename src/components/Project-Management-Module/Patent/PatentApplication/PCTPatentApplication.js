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
import DesignAppList from './DesignAppList'
import Calenderbox from "../../../../formcomponent/calenderbox";
import {
  getStatus,
  getAssociate,
  getOurReference,
  getCountry,
  getStages,
  getSubstages,
  getProjectName
} from "../../TradeMark/ApplicationTradeMark/TradeAppAction/TradeAppAction";
import { connect } from "react-redux";
import { apiurl } from "../../../../App";
// import Calenderbox from "../../../../formcomponent/Calenderbox";
import moment from 'moment';
import PatentList from "./DesignAppList";
import { UploadOutlined } from '@ant-design/icons';


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
class PCTPatentApplication extends React.Component {
  state = {
    tags: [],
    inputVisible: false,
    inputValue: '',
    errordummy: true,
    PatentApp_PCT_data: {
      'ClientRef': {
        value: null,
        validation: [],
        error: null,
        errmsg: null,
      },
      projectname:{
        value: "",
        validation: [],
        error: null,
        errmsg: null,
      },
      'our_reference': {
        value: null,
        validation: [],
        error: null,
        errmsg: null,
      },
      'associate': {
        value: null,
        validation: [],
        error: null,
        errmsg: null,
      },
      'further_action': {
        value: null,
        validation: [],
        error: null,
        errmsg: null,
      },
      'comments': {
        value: null,
        validation: [],
        error: null,
        errmsg: null,
      },      
      'application_num': {
        value: null,
        validation: [],
        error: null,
        errmsg: null,
      },
      'country': {
        value: "",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
      },
      'further': {
        value: null,
        validation: [],
        error: null,
        errmsg: null,
      },      
      'applicant': {
        value: null,
        validation: [],
        error: null,
        errmsg: null,
      },
      'stages': {
        value: "",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
      },
      'sub_stages': {
        value: null,
        validation: [],
        error: null,
        errmsg: null,
      },
      'Status': {
        value: null,
        validation: [],
        error: null,
        errmsg: null,
      },
      'File_cover': {
        value: null,
        validation: [],
        error: null,
        errmsg: null,
      },
      'app_date': {
        value: "",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
      },
      'date': {
        value: null,
        validation: [],
        error: null,
        errmsg: null,
      },
      'Prio_application_num': {
        value: null,
        validation: [],
        error: null,
        errmsg: null,
      },
      'Prio_country': {
        value: null,
        validation: [],
        error: null,
        errmsg: null,
      },
      'Prio_App_date': {
        value: null,
        validation: [],
        error: null,
        errmsg: null,
      },
      'deadline': {
        value: null,
        validation: [],
        error: null,
        errmsg: null,
      },
      'assignment_deed': {
        value: null,
        validation: [],
        error: null,
        errmsg: null,
      },
      'power_attorney': {
        value: null,
        validation: [],
        error: null,
        errmsg: null,
      },
      'renewal': {
        value: null,
        validation: [],
        error: null,
        errmsg: null,
      },
      'due_date': {
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
              if(value.Type === "PCT" && value.Template === "Patent" && value.Process === "Application"){
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
            response.data.data[12].PatentappPct.filter((data, index) => {
  
  
              if (data.PapctId == userid) {
      self.state.PatentApp_PCT_data.projectname.value = data.ProjectName === "null" ? "" : data.ProjectName
      self.state.PatentApp_PCT_data.stages.value=projectList[data.Patentpct.length] && projectList[data.Patentpct.length].Stage
      self.state.PatentApp_PCT_data.sub_stages.value=projectList[data.Patentpct.length] && projectList[data.Patentpct.length].Substage
      self.state.PatentApp_PCT_data.date.value=moment(moment(data.Patentpct[data.Patentpct.length-1].HearingDate, "YYYY-MM-DD").add(projectList[data.Patentpct.length] && projectList[data.Patentpct.length].TDays ? projectList[data.Patentpct.length].TDays : 0, 'days'))

      self.state.PatentApp_PCT_data.country.value = data.Country === "null" ? "" : data.Country 
      self.state.PatentApp_PCT_data.File_cover.value = data.FileCover === "null" ? "" : data.FileCover
      self.state.PatentApp_PCT_data.ClientRef.value = data.ClientRef === "null" ? "" : data.ClientRef
      self.state.PatentApp_PCT_data.our_reference.value = data.OurReference === "null" ? "" : data.OurReference
      self.state.PatentApp_PCT_data.associate.value= data.Assosciate === "null" ? "" : data.Assosciate
      self.state.PatentApp_PCT_data.application_num.value = data.AppNo === "null" ? "" : data.AppNo
      self.state.PatentApp_PCT_data.applicant.value = data.Applicant === "null" ? "" : data.Applicant
      self.state.PatentApp_PCT_data.app_date.value = data.Appdate === "null" ? "" : moment(data.Appdate)
      self.state.PatentApp_PCT_data.comments.value= data.Comment === "null" ? "" : data.Comment
      self.state.PatentApp_PCT_data.further_action.value = data.FurtherAction === "null" ? "" : moment(data.FurtherAction)
      self.state.PatentApp_PCT_data.further.value = data.RplytoFurtheraction === "null" ? "" : moment(data.RplytoFurtheraction)
      self.state.PatentApp_PCT_data.Prio_country.value = data.Prioritycountry === "null" ? "" : data.Prioritycountry
      self.state.PatentApp_PCT_data.Prio_application_num.value = data.Priorityappno === "null" ? "" : data.Priorityappno
      self.state.PatentApp_PCT_data.Prio_App_date.value = data.Priorityappdate === "null" ? "" : moment(data.Priorityappdate)
      self.state.PatentApp_PCT_data.deadline.value = data.Deadline === "null" ? "" : moment(data.Deadline)
      self.state.PatentApp_PCT_data.renewal.value = data.Renewal === "null" ? "" : moment(data.Renewal)
      self.state.PatentApp_PCT_data.due_date.value = data.Duedate === "null" ? "" : moment(data.Duedate)
      self.state.PatentApp_PCT_data.assignment_deed.value = data.Assignmentdeed === "null" ? "" : data.Assignmentdeed
      self.state.PatentApp_PCT_data.Status.value = data.Status === "null" ? "" : data.Status

      
  
                self.setState({TrademarkItems:data.Patentpct,commonId:data.PapctId,fileListimg:data.Powerofattorney === null ? "" :[
                  {
                    uid: '-1',
                    name: data.Powerofattorney?data.Powerofattorney.slice(35):"",
                    status: 'done',
                    url: data.Powerofattorney?data.Powerofattorney:"",
                  },
                ],
              })
              }
  
            })
          })
      }
    })
  
  }

  update=()=>{
    var formData = new FormData();


    var country = this.state.PatentApp_PCT_data.country.value


    if(!Number(this.state.PatentApp_PCT_data.country.value)){
     var country = this.props.designCountry.find((val) => {
        if(country==val.CounName){
          return val.CounId 
        }
       }
       )
    }

    var ClientRef = this.state.PatentApp_PCT_data.ClientRef.value

    if(!Number(this.state.PatentApp_PCT_data.ClientRef.value)){
     var ClientRef = this.props.designReference.find((val) => {
        if(ClientRef==val.EmpFirstName){
          return val.EmpId 
        }
       }
       )
    }

    var our_reference = this.state.PatentApp_PCT_data.our_reference.value
  
    if(!Number(this.state.PatentApp_PCT_data.our_reference.value)){
     var our_reference = this.props.designReference.find((val) => {
        if(our_reference==val.EmpFirstName){
          return val.EmpId 
        }
       }
       )
    }
  
    
    var applicant = this.state.PatentApp_PCT_data.applicant.value
  
  
    if(!Number(this.state.PatentApp_PCT_data.applicant.value)){
     var applicant = this.props.designReference.find((val) => {
        if(applicant==val.EmpFirstName){
          return val.EmpId 
        }
       }
       )
    }

    var pricountry = this.state.PatentApp_PCT_data.country.value


    if(!Number(this.state.PatentApp_PCT_data.country.value)){
     var pricountry = this.props.designCountry.find((val) => {
        if(pricountry==val.CounName){
          return val.CounId 
        }
       }
       )
    }
  

  
    var associate = this.state.PatentApp_PCT_data.associate.value
  
  
    if(!Number(this.state.PatentApp_PCT_data.associate.value)){
     var associate = this.props.designAssociate.find((val) => {
        if(associate==val.AssociateName){
          return val.AssociateId 
        }
       }
       )
    }


    this.state.PatentApp_PCT_data.projectname.value && formData.set("projectname", this.state.PatentApp_PCT_data.projectname.value);
    this.state.PatentApp_PCT_data.country.value && formData.set("country", !Number(this.state.PatentApp_PCT_data.country.value)?country && country.CounId:country);
    this.state.PatentApp_PCT_data.File_cover.value && formData.set("filecover", this.state.PatentApp_PCT_data.File_cover.value);
    this.state.PatentApp_PCT_data.ClientRef.value && formData.set("Clientref", !Number(this.state.PatentApp_PCT_data.ClientRef.value)?ClientRef && ClientRef.EmpId:ClientRef);
    this.state.PatentApp_PCT_data.our_reference.value && formData.set("OurReference", !Number(this.state.PatentApp_PCT_data.our_reference.value)?our_reference && our_reference.EmpId:our_reference);
    this.state.PatentApp_PCT_data.associate.value && formData.set("Assosciate", !Number(this.state.PatentApp_PCT_data.associate.value)?associate && associate.AssociateId:associate);
    this.state.PatentApp_PCT_data.application_num.value && formData.set("Appno", this.state.PatentApp_PCT_data.application_num.value);
    this.state.PatentApp_PCT_data.applicant.value && formData.set("Applicant", !Number(this.state.PatentApp_PCT_data.applicant.value)?applicant && applicant.EmpId:applicant);
    this.state.PatentApp_PCT_data.app_date.value && formData.set("Appdate", this.state.PatentApp_PCT_data.app_date.value ? moment(this.state.PatentApp_PCT_data.app_date.value).format('YYYY-MM-DD'):"");
    this.state.PatentApp_PCT_data.Status.value && formData.set("Status", this.state.PatentApp_PCT_data.Status.value);
    this.state.PatentApp_PCT_data.comments.value && formData.set("comment", this.state.PatentApp_PCT_data.comments.value);
    this.state.PatentApp_PCT_data.further_action.value && formData.set("Furtheraction", this.state.PatentApp_PCT_data.further_action.value ? moment(this.state.PatentApp_PCT_data.further_action.value).format('YYYY-MM-DD'):"");
    this.state.PatentApp_PCT_data.further.value && formData.set("Rplytofurtheraction", this.state.PatentApp_PCT_data.further.value ? moment(this.state.PatentApp_PCT_data.further.value).format('YYYY-MM-DD'):"");
    this.state.PatentApp_PCT_data.Prio_country.value && formData.set("Prioritycountry", !Number(this.state.PatentApp_PCT_data.Prio_country.value)?pricountry.CounId:pricountry);
    this.state.PatentApp_PCT_data.Prio_application_num.value && formData.set("Priorityappno", this.state.PatentApp_PCT_data.Prio_application_num.value);
    this.state.PatentApp_PCT_data.deadline.value && formData.set("deadline", this.state.PatentApp_PCT_data.deadline.value ? moment(this.state.PatentApp_PCT_data.deadline.value).format('YYYY-MM-DD'):"");
    this.state.fileListimg && formData.append("imageArray", this.state.fileListimg?this.state.fileListimg[0].originFileObj:"");
    this.state.PatentApp_PCT_data.renewal.value && formData.set("renewal", this.state.PatentApp_PCT_data.renewal.value ? moment(this.state.PatentApp_PCT_data.renewal.value).format('YYYY-MM-DD'):"");
    this.state.PatentApp_PCT_data.due_date.value && formData.set("Duedate", this.state.PatentApp_PCT_data.due_date.value ? moment(this.state.PatentApp_PCT_data.due_date.value).format('YYYY-MM-DD'):"");
    formData.set("papctId", this.state.commonId);



      axios({
        method: 'put',
        url: apiurl + "/updatepatentpct",
        data:formData
      })
        .then(function (response) {
          notification.warning({
            message: `Patent PCT Application data submitted successfully`,
            duration: 3.5,
            placement: "topRight",
            className: "notification_dayreport",
          });
          })
    
  }

  checkValidation = () => {
    var mainvalue = {};
    var PatentApp_PCT_data = this.state.PatentApp_PCT_data;
    var targetkeys = Object.keys(PatentApp_PCT_data);
    console.log(targetkeys, "targetkeys");
    for (var i in targetkeys) {
      var errorcheck = ValidationLibrary.checkValidation(
        PatentApp_PCT_data[targetkeys[i]].value,
        PatentApp_PCT_data[targetkeys[i]].validation
      );
      console.log(errorcheck, "errorcheck");
      PatentApp_PCT_data[targetkeys[i]].error = !errorcheck.state;
      PatentApp_PCT_data[targetkeys[i]].errmsg = errorcheck.msg;
      mainvalue[targetkeys[i]] = PatentApp_PCT_data[targetkeys[i]].value;
      console.log(PatentApp_PCT_data[targetkeys[i]].error,"error")
    }
    var filtererr = targetkeys.filter(
      (obj) => PatentApp_PCT_data[obj].error == true
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

    this.setState({
      // mainvalue,
      PatentApp_PCT_data,
    });
  };
}


updateSubstage=()=>{

  // var Stages = this.props.interStages.filter((data,index)=>{
  //   return(data.Type === "International" && data.Template === "Trademark")
  // }).filter((val,index)=>{
  //   if(index == this.state.PatentApp_PCT_data.stages.value-1){
  //     return val.ProjectTemplateId
  //   }
  // })

  // var sub_stages = this.props.interSubStages.filter((data,index)=>{
  //   return(data.Type === "International" && data.Template === "Trademark")
  // }).filter((val,index)=>{
  //   if(index == this.state.PatentApp_PCT_data.sub_stages.value-1){
  //     return val.ProjectTemplateId
  //   }
  // })

  if(typeof this.state.PatentApp_PCT_data.stages.value === 'string'){
    var Stages = this.props.designStages.filter((data,index)=>{
      return(data.Type === "PCT" && data.Template === "Patent" && data.Process === "Application")
    }).filter((val,index)=>{
      if(val.Stage === this.state.PatentApp_PCT_data.stages.value){
        return val.ProjectTemplateId
      }
    })
  }else{
    var Stages = this.props.designStages.filter((data,index)=>{
      return(data.Type === "PCT" && data.Template === "Patent" && data.Process === "Application")
    }).filter((val,index)=>{
      if(index == this.state.PatentApp_PCT_data.stages.value-1){
        return val.ProjectTemplateId
      }
    })

  }


  if(typeof this.state.PatentApp_PCT_data.sub_stages.value === 'string'){
    var sub_stages = this.props.designSubStages.filter((data,index)=>{
      return(data.Type === "PCT" && data.Template === "Patent" && data.Process === "Application")
    }).filter((val,index)=>{
      if(val.Substage == this.state.PatentApp_PCT_data.sub_stages.value){
        return val.ProjectTemplateId
      }
    })
  }else{
    var sub_stages = this.props.designSubStages.filter((data,index)=>{
      return(data.Type === "PCT" && data.Template === "Patent" && data.Process === "Application")
    }).filter((val,index)=>{
      if(index == this.state.PatentApp_PCT_data.sub_stages.value-1){
        return val.ProjectTemplateId
      }
    })
  }

var self = this

var myObject = {
  papctId:this.state.commonId,
  "stages": Stages[0].ProjectTemplateId,
}

this.state.PatentApp_PCT_data.sub_stages.value && Object.assign(myObject, {"Substages":sub_stages[0].ProjectTemplateId})
this.state.PatentApp_PCT_data.date.value && Object.assign(myObject, { "date":this.state.PatentApp_PCT_data.date.value?moment(this.state.PatentApp_PCT_data.date.value).format('YYYY-MM-DD'):""})
this.state.PatentApp_PCT_data.hearing_date.value && Object.assign(myObject, {"hearingdate":this.state.PatentApp_PCT_data.hearing_date.value? moment(this.state.PatentApp_PCT_data.hearing_date.value).format('YYYY-MM-DD'):""})

axios({
  method: 'put',
  url: apiurl + "/updatepatentpctstages",
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


  insert =()=>{


    var Stages = this.props.designStages.filter((data,index)=>{
      return(data.Type === "PCT" && data.Template === "Patent" && data.Process === "Application")
    }).filter((val,index)=>{
      if(index == this.state.PatentApp_PCT_data.stages.value-1){
        return val.ProjectTemplateId
      }
    })


    var sub_stages = this.props.designSubStages.filter((data,index)=>{
      return(data.Type === "PCT" && data.Template === "Patent" && data.Process === "Application")
    }).filter((val,index)=>{
      if(index == this.state.PatentApp_PCT_data.sub_stages.value-1){
        return val.ProjectTemplateId
      }
    })

    var calcaulateTDays = this.state.projectList.filter((data,index)=>{
      return(data.Type === "PCT" && data.Template === "Patent" && data.Process === "Application")
    })

    var self = this;

    var formData = new FormData();
    this.state.PatentApp_PCT_data.projectname.value && formData.set("projectname", this.state.PatentApp_PCT_data.projectname.value);
    this.state.PatentApp_PCT_data.country.value && formData.set("country", this.state.PatentApp_PCT_data.country.value);
    this.state.PatentApp_PCT_data.File_cover.value && formData.set("filecover", this.state.PatentApp_PCT_data.File_cover.value);
    this.state.PatentApp_PCT_data.ClientRef.value && formData.set("Clientref", this.state.PatentApp_PCT_data.ClientRef.value);
    this.state.PatentApp_PCT_data.our_reference.value && formData.set("OurReference", this.state.PatentApp_PCT_data.our_reference.value);
    this.state.PatentApp_PCT_data.associate.value && formData.set("Assosciate", this.state.PatentApp_PCT_data.associate.value);
    this.state.PatentApp_PCT_data.application_num.value && formData.set("Appno", this.state.PatentApp_PCT_data.application_num.value);
    this.state.PatentApp_PCT_data.applicant.value && formData.set("Applicant", this.state.PatentApp_PCT_data.applicant.value);
    this.state.PatentApp_PCT_data.app_date.value && formData.set("Appdate", this.state.PatentApp_PCT_data.app_date.value ? moment(this.state.PatentApp_PCT_data.app_date.value).format('YYYY-MM-DD'):"");
    this.state.PatentApp_PCT_data.Status.value && formData.set("Status", this.state.PatentApp_PCT_data.Status.value);
    this.state.PatentApp_PCT_data.comments.value && formData.set("comment", this.state.PatentApp_PCT_data.comments.value);
    this.state.PatentApp_PCT_data.further_action.value && formData.set("Furtheraction", this.state.PatentApp_PCT_data.further_action.value ? moment(this.state.PatentApp_PCT_data.further_action.value).format('YYYY-MM-DD'):"");
    this.state.PatentApp_PCT_data.further.value && formData.set("Rplytofurtheraction", this.state.PatentApp_PCT_data.further.value ? moment(this.state.PatentApp_PCT_data.further.value).format('YYYY-MM-DD'):"");
    this.state.PatentApp_PCT_data.Prio_country.value && formData.set("Prioritycountry", this.state.PatentApp_PCT_data.Prio_country.value);
    this.state.PatentApp_PCT_data.Prio_application_num.value && formData.set("Priorityappno", this.state.PatentApp_PCT_data.Prio_application_num.value);
    this.state.PatentApp_PCT_data.deadline.value && formData.set("deadline", this.state.PatentApp_PCT_data.deadline.value ? moment(this.state.PatentApp_PCT_data.deadline.value).format('YYYY-MM-DD'):"");
    this.state.fileListimg && formData.append("imageArray", this.state.fileListimg?this.state.fileListimg[0].originFileObj:"");
    this.state.PatentApp_PCT_data.renewal.value && formData.set("renewal", this.state.PatentApp_PCT_data.renewal.value ? moment(this.state.PatentApp_PCT_data.renewal.value).format('YYYY-MM-DD'):"");
    this.state.PatentApp_PCT_data.due_date.value && formData.set("Duedate", this.state.PatentApp_PCT_data.due_date.value ? moment(this.state.PatentApp_PCT_data.due_date.value).format('YYYY-MM-DD'):"");

    formData.set("Stages", Stages[0] && Stages[0].ProjectTemplateId);
    this.state.PatentApp_PCT_data.sub_stages.value && formData.set("Substages", sub_stages[0] && sub_stages[0].ProjectTemplateId
    );

    this.state.PatentApp_PCT_data.app_date.value && formData.set("date", this.state.PatentApp_PCT_data.app_date.value ? moment(this.state.PatentApp_PCT_data.app_date.value).format('YYYY-MM-DD'):"");

    // formData.set("date",this.state.PatentApp_PCT_data.app_date.value ? moment(moment(this.state.PatentApp_PCT_data.app_date.value, "YYYY-MM-DD").add(calcaulateTDays[0].TDays ? calcaulateTDays[0].TDays : 0, 'days')).format('YYYY-MM-DD'): "");
    this.state.PatentApp_PCT_data.hearing_date.value && formData.set("hearingdate",this.state.PatentApp_PCT_data.hearing_date.value? moment(this.state.PatentApp_PCT_data.hearing_date.value).format('YYYY-MM-DD'):"");

    

      // let PCTPatentData = {
      //   country:this.state.PatentApp_PCT_data.country.value,
      //   filecover:this.state.PatentApp_PCT_data.File_cover.value,
      //   OurReference:this.state.PatentApp_PCT_data.our_reference.value,
      //   Clientref:this.state.PatentApp_PCT_data.ClientRef.value,
      //   Assosciate:this.state.PatentApp_PCT_data.associate.value,
      //   Appno:this.state.PatentApp_PCT_data.application_num.value,
      //   Applicant:this.state.PatentApp_PCT_data.applicant.value,
      //   Appdate:moment(this.state.PatentApp_PCT_data.app_date.value).format('YYYY-MM-DD'),
      //   Status:this.state.PatentApp_PCT_data.Status.value,
      //   Furtheraction:this.state.PatentApp_PCT_data.further_action.value,
      //   Rplytofurtheraction:this.state.PatentApp_PCT_data.further.value,
      //   Prioritycountry:this.state.PatentApp_PCT_data.Prio_country.value,
      //   Priorityappno:this.state.PatentApp_PCT_data.Prio_application_num.value,
      //   Priorityappdate:moment(this.state.PatentApp_PCT_data.Prio_App_date.value).format('YYYY-MM-DD'),
      //   deadline:moment(this.state.PatentApp_PCT_data.deadline.value).format('YYYY-MM-DD'),
      //   assignmentdeed:this.state.PatentApp_PCT_data.assignment_deed.value,
      //   powerofattorney:this.state.PatentApp_PCT_data.power_attorney.value,
      //   renewal:moment(this.state.PatentApp_PCT_data.renewal.value).format('YYYY-MM-DD'),
      //   Duedate:moment(this.state.PatentApp_PCT_data.due_date.value).format('YYYY-MM-DD'),
      //   Comment:this.state.PatentApp_PCT_data.comments.value,
      //   Stages:this.state.PatentApp_PCT_data.stages.value,
      //   Substages:this.state.PatentApp_PCT_data.sub_stages.value,

      //   date: convertedDate,
      // };

      axios({
        method: "post",
        url: apiurl + "/addpatentpct",
        data: formData,
      })
        .then(function (response) {
          console.log(response.data.data, "responseresponse");
          notification.warning({
            message: `Patent PCT Application data submitted successfully`,
            duration: 3.5,
            placement: "topRight",
            className: "notification_dayreport",
          });
          // self.state.PatentApp_PCT_data.client_name.value = "";
          // self.state.PatentApp_PCT_data.case_no.value = "";
          // self.state.PatentApp_PCT_data.court_no.value = "";
          // self.state.PatentApp_PCT_data.assingned_to.value = "";
          // self.state.DraName = "";

          // self.state.opemodaldata.amount.value=""
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
    var PatentApp_PCT_data = this.state.PatentApp_PCT_data;
    var targetkeys = Object.keys(PatentApp_PCT_data);
    var errorcheck = ValidationLibrary.checkValidation(
      data,
      PatentApp_PCT_data[key].validation
    );
    PatentApp_PCT_data[key].value = data;
    PatentApp_PCT_data[key].error = !errorcheck.state;
    PatentApp_PCT_data[key].errmsg = errorcheck.msg;
    this.setState({ PatentApp_PCT_data });
    var filtererr = targetkeys.filter(
      (obj) =>
        PatentApp_PCT_data[obj].error == true ||
        PatentApp_PCT_data[obj].error == null
    );
    if (filtererr.length > 0) {
      this.setState({ error: true, errordummy: false });
    } else {
      this.setState({ error: false });
    }
  };

  // cancelClick=()=>{
  //   this.state.PatentApp_PCT_data.ClientRef.value=""
  //   this.state.PatentApp_PCT_data.File_cover.value=""
  //   this.state.PatentApp_PCT_data.Prio_App_date.value=""
  //   this.state.PatentApp_PCT_data.Prio_application_num.value=""
  //   this.state.PatentApp_PCT_data.Prio_country.value=""
  //   this.state.PatentApp_PCT_data.Status.value=""
  //   this.state.PatentApp_PCT_data.app_date.value=""
  //   this.state.PatentApp_PCT_data.applicant.value=""
  //   this.state.PatentApp_PCT_data.application_num.value=""
  //   this.state.PatentApp_PCT_data.assignment_deed.value=""
  //   this.state.PatentApp_PCT_data.associate.value=""
  //   this.state.PatentApp_PCT_data.comments.value=""
  //   this.state.PatentApp_PCT_data.country.value=""
  //   this.state.PatentApp_PCT_data.date2.value=""
  //   this.state.PatentApp_PCT_data.deadline.value=""
  //   this.state.PatentApp_PCT_data.due_date.value=""
  //   this.state.PatentApp_PCT_data.further.value=""
  //   this.state.PatentApp_PCT_data.further_action.value=""
  //   this.state.PatentApp_PCT_data.our_reference.value=""
  //   this.state.PatentApp_PCT_data.power_attorney.value=""
  //   this.state.PatentApp_PCT_data.renewal.value=""
  //   this.state.PatentApp_PCT_data.stages.value=""
  //   this.state.PatentApp_PCT_data.sub_stages.value=""
  //   this.setState({})
  // }

  handleChange = (info,uploadName) => {
    let fileList = [...info.fileList];

    fileList = fileList.slice(-1);

    fileList = fileList.map(file => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });

    this.setState({ [uploadName]:fileList });
  };

  render() {
    console.log(this.state, "state");
    const params = new URLSearchParams(window.location.search)
    const status = params.get("status")

    var stageArr = []
    this.props.designStages && this.props.designStages.map((data)=>{
      if(data.Type === "PCT" && data.Template === "Patent" && data.Process === "Application"){
        stageArr.push(data.Stage)
    }})

    var subStageArr = []
    this.props.designSubStages && this.props.designSubStages.map((data)=>{
      if(data.Type === "PCT" && data.Template === "Patent" && data.Process === "Application"){
        data.Substage !== '' && subStageArr.push(data.Substage)
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
              value={this.state.PatentApp_PCT_data.projectname.value}
              error={this.state.PatentApp_PCT_data.projectname.error}
              errmsg={this.state.PatentApp_PCT_data.projectname.errmsg}
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
                  changeData={(data) => this.changeDynamic(data, 'country')}
                  value={this.state.PatentApp_PCT_data.country.value}
                  error={this.state.PatentApp_PCT_data.country.error}
                  errmsg={this.state.PatentApp_PCT_data.country.errmsg}
                  
                ></Dropdownantd>
              </Grid>
              <Grid item md={3} sm={5}>
                <Inputantd
                  label={"File cover"}
                  className="w-100"
                  changeData={(data) => this.changeDynamic(data, 'File_cover')}
                  value={this.state.PatentApp_PCT_data.File_cover.value}
                  error={this.state.PatentApp_PCT_data.File_cover.error}
                  errmsg={this.state.PatentApp_PCT_data.File_cover.errmsg}
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
                  changeData={(data)=>this.changeDynamic(data,'ClientRef')} 
                  value={this.state.PatentApp_PCT_data.ClientRef.value} 
                  error={this.state.PatentApp_PCT_data.ClientRef.error} 
                  errmsg={this.state.PatentApp_PCT_data.ClientRef.errmsg}
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
                    this.changeDynamic(data, 'our_reference')
                  }
                  value={this.state.PatentApp_PCT_data.our_reference.value}
                  error={this.state.PatentApp_PCT_data.our_reference.error}
                  errmsg={this.state.PatentApp_PCT_data.our_reference.errmsg}
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
                  changeData={(data) => this.changeDynamic(data, 'associate')}
                  value={this.state.PatentApp_PCT_data.associate.value}
                  error={this.state.PatentApp_PCT_data.associate.error}
                  errmsg={this.state.PatentApp_PCT_data.associate.errmsg}
                />
              </Grid>
              <Grid item md={3} sm={5}>
                <Inputantd
                  label={"Application Number"}
                  className="w-100"
                  changeData={(data) =>
                    this.changeDynamic(data, 'application_num')
                  }
                  value={this.state.PatentApp_PCT_data.application_num.value}
                  error={this.state.PatentApp_PCT_data.application_num.error}
                  errmsg={this.state.PatentApp_PCT_data.application_num.errmsg}
                />
              </Grid>
              <Grid item md={3} sm={5}>
                <Dropdownantd
                  label={"Applicant"}
                  option={
                    this.props.designReference &&
                    this.props.designReference.map((val) => val.EmpFirstName)
                  }
                  className="w-100"
                  changeData={(data) => this.changeDynamic(data, 'applicant')}
                  value={this.state.PatentApp_PCT_data.applicant.value}
                  error={this.state.PatentApp_PCT_data.applicant.error}
                  errmsg={this.state.PatentApp_PCT_data.applicant.errmsg}
                  className="w-100"
                ></Dropdownantd>
              </Grid>
              
              <Grid item md={3} sm={5}>
                <Calenderbox
                  label={"Application Date"}
                  className="w-100"
                  changeData={(data) => this.changeDynamic(data, 'app_date')}
                  value={this.state.PatentApp_PCT_data.app_date.value}
                  error={this.state.PatentApp_PCT_data.app_date.error}
                  errmsg={this.state.PatentApp_PCT_data.app_date.errmsg}
                />
              </Grid>
              <Grid item md={3} sm={5}>
                <Inputantd
                  label={"Status"}
                  className="w-100"
                  changeData={(data) => this.changeDynamic(data, 'Status')}
                  value={this.state.PatentApp_PCT_data.Status.value}
                  error={this.state.PatentApp_PCT_data.Status.error}
                  errmsg={this.state.PatentApp_PCT_data.Status.errmsg}
                />
              </Grid>
             
              <Grid item md={3} sm={5}>
                <Inputantd
                  label={"Comments"}
                  className="w-100"
                  changeData={(data) => this.changeDynamic(data, 'comments')}
                  value={this.state.PatentApp_PCT_data.comments.value}
                  error={this.state.PatentApp_PCT_data.comments.error}
                  errmsg={this.state.PatentApp_PCT_data.comments.errmsg}
                />
              </Grid>
             
             

              
              <Grid item md={3} sm={5}>
                <Calenderbox
                  label={"Further Action"}
                  className="w-100"
                  changeData={(data) => this.changeDynamic(data, 'further_action')}
                  value={this.state.PatentApp_PCT_data.further_action.value}
                  error={this.state.PatentApp_PCT_data.further_action.error}
                  errmsg={this.state.PatentApp_PCT_data.further_action.errmsg}
                />
              </Grid>
              <Grid item md={3} sm={5}>
                <Calenderbox
                  label={"Reply to Further Action"}
                  
                  className="w-100"
                  changeData={(data) =>
                    this.changeDynamic(data, 'further')
                  }
                  value={this.state.PatentApp_PCT_data.further.value}
                  error={this.state.PatentApp_PCT_data.further.error}
                  errmsg={this.state.PatentApp_PCT_data.further.errmsg}
                />
              </Grid>
              
              <Grid item md={3} sm={5}>
                <Dropdownantd
                  label={"Priority Country"}
                  option={
                    this.props.designCountry &&
                    this.props.designCountry.map((val) => val.CounName)
                  }
                  className="w-100"
                  changeData={(data) =>
                    this.changeDynamic(data, 'Prio_country')
                  }
                  value={this.state.PatentApp_PCT_data.Prio_country.value}
                  error={this.state.PatentApp_PCT_data.Prio_country.error}
                  errmsg={this.state.PatentApp_PCT_data.Prio_country.errmsg}
                />
              </Grid>
              <Grid item md={3} sm={5}>
                <Inputantd
                  label={"Priority Application Number"}
                  
                  className="w-100"
                  changeData={(data) =>
                    this.changeDynamic(data, 'Prio_application_num')
                  }
                  value={this.state.PatentApp_PCT_data.Prio_application_num.value}
                  error={this.state.PatentApp_PCT_data.Prio_application_num.error}
                  errmsg={this.state.PatentApp_PCT_data.Prio_application_num.errmsg}
                />
              </Grid>
              <Grid item md={3} sm={5}>
                <Calenderbox
                  label={"Priority Application Date"}
                  
                  className="w-100"
                  changeData={(data) =>
                    this.changeDynamic(data, 'Prio_App_date')
                  }
                  value={this.state.PatentApp_PCT_data.Prio_App_date.value}
                  error={this.state.PatentApp_PCT_data.Prio_App_date.error}
                  errmsg={this.state.PatentApp_PCT_data.Prio_App_date.errmsg}
                />
              </Grid>
            
              <Grid item md={3} sm={5}>
                <Calenderbox
                  label={"Deadline"}
                  
                  className="w-100"
                  changeData={(data) =>
                    this.changeDynamic(data, 'deadline')
                  }
                  value={this.state.PatentApp_PCT_data.deadline.value}
                  error={this.state.PatentApp_PCT_data.deadline.error}
                  errmsg={this.state.PatentApp_PCT_data.deadline.errmsg}
                />
              </Grid>
              <Grid item md={3} sm={5}>
                <Inputantd
                  label={"Assignment Deed"}
                  
                  className="w-100"
                  changeData={(data) =>
                    this.changeDynamic(data, 'assignment_deed')
                  }
                  value={this.state.PatentApp_PCT_data.assignment_deed.value}
                  error={this.state.PatentApp_PCT_data.assignment_deed.error}
                  errmsg={this.state.PatentApp_PCT_data.assignment_deed.errmsg}
                />
              </Grid>
              {/* <Grid item md={3} sm={5}>
                <Inputantd
                  label={"Power of Attorney"}
                  
                  className="w-100"
                  changeData={(data) =>
                    this.changeDynamic(data, 'power_attorney')
                  }
                  value={this.state.PatentApp_PCT_data.power_attorney.value}
                  error={this.state.PatentApp_PCT_data.power_attorney.error}
                  errmsg={this.state.PatentApp_PCT_data.power_attorney.errmsg}
                />
              </Grid> */}
              <Grid item md={3} sm={5} className="interfil_update">
                <div className="flex">
                  <label className="mr-1">Upload Image</label>

                </div>
                <Upload 
                action= 'https://www.mocky.io/v2/5cc8019d300000980a055e76'
                onChange= {(info)=>this.handleChange(info,"fileListimg") } 
                fileList={this.state.fileListimg}
                >
                  <Button>
                    <UploadOutlined />Click to upload
                        </Button>
                </Upload>
              </Grid>
              <Grid item md={3} sm={5}>
                <Calenderbox
                  label={"Renewal"}
                  
                  className="w-100"
                  changeData={(data) =>
                    this.changeDynamic(data, 'renewal')
                  }
                  value={this.state.PatentApp_PCT_data.renewal.value}
                  error={this.state.PatentApp_PCT_data.renewal.error}
                  errmsg={this.state.PatentApp_PCT_data.renewal.errmsg}
                />
              </Grid>
              <Grid item md={3} sm={5}>
                <Calenderbox
                  label={"Due Date"}
                  
                  className="w-100"
                  changeData={(data) =>
                    this.changeDynamic(data, 'due_date')
                  }
                  value={this.state.PatentApp_PCT_data.due_date.value}
                  error={this.state.PatentApp_PCT_data.due_date.error}
                  errmsg={this.state.PatentApp_PCT_data.due_date.errmsg}
                />
              </Grid>
              {status==="editable"&&
                  <>
                  <Grid item md={6} sm={5}>
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
                    changeData={(data) => this.changeDynamic(data, 'stages')}
                    value={this.state.PatentApp_PCT_data.stages.value}
                    error={this.state.PatentApp_PCT_data.stages.error}
                    errmsg={this.state.PatentApp_PCT_data.stages.errmsg}
                    className="w-100"
                  ></Dropdownantd>
                </Grid>
                <Grid item md={3} sm={5}>
                  <Dropdownantd
                    label={"Sub Stages"}
                    option={
                      subStageArr
                    }
                    changeData={(data) => this.changeDynamic(data, 'sub_stages')}
                    value={this.state.PatentApp_PCT_data.sub_stages.value}
                    error={this.state.PatentApp_PCT_data.sub_stages.error}
                    errmsg={this.state.PatentApp_PCT_data.sub_stages.errmsg}
                    className="w-100"
                  ></Dropdownantd>
                </Grid>
                <Grid item md={3} sm={5}>
                  <Calenderbox
                    label={"Statutory Deadline"}
                    className="w-100"
                    changeData={(data) => this.changeDynamic(data, 'date')}
                    disabled={true}
                    value={status==="editable" ? this.state.PatentApp_PCT_data.date.value:this.state.PatentApp_PCT_data.app_date.value}
                  ></Calenderbox>
                </Grid>
                <Grid item md={3} sm={5} className="">
                  <div className="d-flex">
                    <Calenderbox label={"Filing Date"} className="w-100"
                      changeData={(data) => this.changeDynamic(data, 'hearing_date')}
                      value={this.state.PatentApp_PCT_data.hearing_date.value}
                      error={this.state.PatentApp_PCT_data.hearing_date.error}
                      errmsg={this.state.PatentApp_PCT_data.hearing_date.errmsg}
                    ></Calenderbox>
                    <AddCircleOutline onClick={this.checkValidation} className="Interfil_addicon" />
                  </div>
                </Grid>
              </Grid>
            </div>
            <PatentList TrdoId={this.state.commonId} endpoint={"viewpatentpctitems"} trademark={"patentAppPCT"} />
          </div>
        </>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {

  return {
    PatentApp_PCT_data: state.resumeReducer.PatentApp_PCT_data,
    designStatus: state.tradeapp.getTradestatus,
    designAssociate: state.tradeapp.getTradeassociate,
    designReference: state.tradeapp.getTradeOurReference,
    designCountry: state.tradeapp.getTradecountry,
    designStages: state.tradeapp.getTradestages,
    designSubStages: state.tradeapp.getTradeSubstages,
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
  getProjectName
})(PCTPatentApplication);
