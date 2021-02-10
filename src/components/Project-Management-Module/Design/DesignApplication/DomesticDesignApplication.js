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
import DesignAppList from "./DesignAppList";
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
  getClientName,
  getProjectName
} from "../../TradeMark/ApplicationTradeMark/TradeAppAction/TradeAppAction";
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
class DomesticDesignApplication extends React.Component {
  state = {
    tags: [],
    inputVisible: false,
    inputValue: "",
    errordummy: true,
    DesignApp_Dom_data: {
      projectname:{
        value: "",
        validation: [],
        error: null,
        errmsg: null,
      },
      ClientRef: {
        value:null,
        validation: [],
        error: null,
        errmsg: null,
      },
      file_cover: {
        value:null,
        validation: [],
        error: null,
        errmsg: null,
      },

      class: {
        value:null,
        validation: [],
        error: null,
        errmsg: null,
      },
      our_reference: {
        value:"",
        validation: [{name:"required"}],
        error: null,
        errmsg: null,
      },
      associate: {
        value:null,
        validation: [],
        error: null,
        errmsg: null,
      },
      associate_ref: {
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
      application_num: {
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
      country: {
        value:null,
        validation: [],
        error: null,
        errmsg: null,
      },
      priority_country: {
        value:null,
        validation: [],
        error: null,
        errmsg: null,
      },
      applicant: {
        value:null,
        validation: [],
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
      Status: {
        value:null,
        validation: [],
        error: null,
        errmsg: null,
      },
      title: {
        value:null,
        validation: [],
        error: null,
        errmsg: null,
      },
      date1: {
        value:null,
        validation: [],
        error: null,
        errmsg: null,
      },
      date2: {
        value:null,
        validation: [],
        error: null,
        errmsg: null,
      },
      next_renew: {
        value:null,
        validation: [],
        error: null,
        errmsg: null,
      },
      further_action: {
        value:null,
        validation: [],
        error: null,
        errmsg: null,
      },
      replyto_further: {
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
    await this.props.getClass();
    await this.props.getOurReference();
    await this.props.getCountry();
    await this.props.getAllotment();
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
              if(value.Type === "IndiaFiling" && value.Template === "Design" && value.Process === "Application"){
                projectList.push(value)
              } 
            })
  
            this.setState({projectList:projectList})

            const params = new URLSearchParams(window.location.search)
            const status = params.get("status")
            const userid = params.get("id")

  var self = this
axios({
method: 'get',
url: apiurl + "/viewtrademark",
})
.then((response)=> {
  response.data.data[5].DesignappDomestic.map((data, index) => {
    if (data.DesIndId == userid) {
      self.state.DesignApp_Dom_data.projectname.value = data.ProjectName === "null" ? "" : data.ProjectName
    
      self.state.DesignApp_Dom_data.stages.value=projectList[data.Designapp.length] && projectList[data.Designapp.length].Stage
      self.state.DesignApp_Dom_data.sub_stages.value=projectList[data.Designapp.length] && projectList[data.Designapp.length].Substage
      self.state.DesignApp_Dom_data.date2.value=moment(moment(data.Designapp[data.Designapp.length-1].HearingDate, "YYYY-MM-DD").add(projectList[data.Designapp.length] && projectList[data.Designapp.length].TDays ? projectList[data.Designapp.length].TDays : 0, 'days'))

  this.state.DesignApp_Dom_data.file_cover.value=data.FileCover && data.FileCover
  this.state.DesignApp_Dom_data.our_reference.value=data.OurReference && data.OurReference
  this.state.DesignApp_Dom_data.applicant.value=data.Applicant && data.Applicant
  this.state.DesignApp_Dom_data.country.value=data.Country && data.Country
  this.state.DesignApp_Dom_data.title.value=data.Title && data.Title
  this.state.DesignApp_Dom_data.application_num.value=data.AppNo && data.AppNo
  this.state.DesignApp_Dom_data.class.value=data.class && data.class
  this.state.DesignApp_Dom_data.ClientRef.value=data.ClientReference && data.ClientReference
  this.state.DesignApp_Dom_data.comments.value=data.Comments && data.Comments
  this.state.DesignApp_Dom_data.Status.value=data.Status && data.Status
  this.state.DesignApp_Dom_data.associate.value=data.Assosciate && data.Assosciate
  this.state.DesignApp_Dom_data.priority_country.value=data.PriorityCountry && data.PriorityCountry
  this.state.DesignApp_Dom_data.date1.value=data.PriorityDate && moment(data.PriorityDate)
  this.state.DesignApp_Dom_data.further_action.value=data.FurtherAction && moment(data.FurtherAction)
  this.state.DesignApp_Dom_data.replyto_further.value=data.RplyToFurtherAction && moment(data.RplyToFurtherAction)
  this.state.DesignApp_Dom_data.next_renew.value=data.NextRenewal && moment(data.NextRenewal)

  self.setState({TrademarkItems:data.Designapp,commonId:data.DesIndId})
    }
  })
})
      })}

  checkValidation = () => {
    var mainvalue = {};
    var DesignApp_Dom_data = this.state.DesignApp_Dom_data;
    var targetkeys = Object.keys(DesignApp_Dom_data);
    console.log(targetkeys, "targetkeys");
    for (var i in targetkeys) {
      var errorcheck = ValidationLibrary.checkValidation(
        DesignApp_Dom_data[targetkeys[i]].value,
        DesignApp_Dom_data[targetkeys[i]].validation
      );
      console.log(errorcheck, "errorcheck");
      DesignApp_Dom_data[targetkeys[i]].error = !errorcheck.state;
      DesignApp_Dom_data[targetkeys[i]].errmsg = errorcheck.msg;
      mainvalue[targetkeys[i]] = DesignApp_Dom_data[targetkeys[i]].value;
      console.log(DesignApp_Dom_data[targetkeys[i]].error, "error");
    }
    var filtererr = targetkeys.filter(
      (obj) => DesignApp_Dom_data[obj].error == true
    );
    console.log(filtererr.length);
    if (filtererr.length > 0) {
      this.setState({ error: true });
    } else {
      this.setState({ error: false });
      const params = new URLSearchParams(window.location.search)
      const status = params.get("status")
      console.log(status,"status")
      {
        status==="editable"|| this.state.afterInsert?
      this.updateSubstage():
      this.insert()
      }
          }

    this.setState({
      // mainvalue,
      DesignApp_Dom_data,
    });
  };

  updateSubstage=()=>{

    // var Stages = this.props.designStages.filter((data,index)=>{
    //   return( data.Type === "IndiaFiling" && data.Template === "Design" && data.Process === "Application")
    // }).filter((val,index)=>{
    //   if(index == this.state.DesignApp_Dom_data.stages.value-1){
    //     return val.ProjectTemplateId
    //   }
    // })

    // console.log(Stages,"StagesStages")

    // var sub_stages = this.props.designSubStages.filter((data,index)=>{
    //   return( data.Type === "IndiaFiling" && data.Template === "Design" && data.Process === "Application")
    // }).filter((val,index)=>{
    //   if(index == this.state.DesignApp_Dom_data.sub_stages.value-1){
    //     return val.ProjectTemplateId
    //   }
    // })


    if(typeof this.state.DesignApp_Dom_data.stages.value === 'string'){
      var Stages = this.props.designStages.filter((data,index)=>{
        return(data.Type === "IndiaFiling" && data.Template === "Design" && data.Process === "Application")
      }).filter((val,index)=>{
        if(val.Stage === this.state.DesignApp_Dom_data.stages.value){
          return val.ProjectTemplateId
        }
      })
    }else{
      var Stages = this.props.designStages.filter((data,index)=>{
        return(data.Type === "IndiaFiling" && data.Template === "Design" && data.Process === "Application")
      }).filter((val,index)=>{
        if(index == this.state.DesignApp_Dom_data.stages.value-1){
          return val.ProjectTemplateId
        }
      })

    }


    if(typeof this.state.DesignApp_Dom_data.sub_stages.value === 'string'){
      var sub_stages = this.props.designSubStages.filter((data,index)=>{
        return(data.Type === "IndiaFiling" && data.Template === "Design" && data.Process === "Application")
      }).filter((val,index)=>{
        if(val.Substage == this.state.DesignApp_Dom_data.sub_stages.value){
          return val.ProjectTemplateId
        }
      })
    }else{
      var sub_stages = this.props.designSubStages.filter((data,index)=>{
        return(data.Type === "IndiaFiling" && data.Template === "Design" && data.Process === "Application")
      }).filter((val,index)=>{
        if(index == this.state.DesignApp_Dom_data.sub_stages.value-1){
          return val.ProjectTemplateId
        }
      })
    }

  var self = this

  var myObject = {
    desIndId:this.state.commonId,
    "stages": Stages[0].ProjectTemplateId,
}

this.state.DesignApp_Dom_data.sub_stages.value && Object.assign(myObject, {"Substages":sub_stages[0].ProjectTemplateId})
this.state.DesignApp_Dom_data.date2.value && Object.assign(myObject, { "date":this.state.DesignApp_Dom_data.date2.value?moment(this.state.DesignApp_Dom_data.date2.value).format('YYYY-MM-DD'):""})
this.state.DesignApp_Dom_data.hearing_date.value && Object.assign(myObject, {"hearingdate":this.state.DesignApp_Dom_data.hearing_date.value? moment(this.state.DesignApp_Dom_data.hearing_date.value).format('YYYY-MM-DD'):""})

  axios({
    method: 'put',
    url: apiurl + "/updatedesigndomesticstages",
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
        return(data.Type === "IndiaFiling" && data.Template === "Design" && data.Process === "Application")
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
        this.state.DesignApp_Dom_data.date2.value = moment(moment(this.state.TrademarkItems[this.state.TrademarkItems.length-1].HearingDate, "YYYY-MM-DD").add( datevalue ? datevalue.TDays : 0, 'days'))
    }

    var DesignApp_Dom_data = this.state.DesignApp_Dom_data;
    var targetkeys = Object.keys(DesignApp_Dom_data);
    var errorcheck = ValidationLibrary.checkValidation(
      data,
      DesignApp_Dom_data[key].validation
    );
    DesignApp_Dom_data[key].value = data;
    DesignApp_Dom_data[key].error = !errorcheck.state;
    DesignApp_Dom_data[key].errmsg = errorcheck.msg;
    this.setState({ DesignApp_Dom_data });
    var filtererr = targetkeys.filter(
      (obj) =>
        DesignApp_Dom_data[obj].error == true ||
        DesignApp_Dom_data[obj].error == null
    );
    if (filtererr.length > 0) {
      this.setState({ error: true, errordummy: false });
    } else {
      this.setState({ error: false });
    }
  };

  insert=()=>{

    var Stages = this.props.designStages.filter((data,index)=>{
      return( data.Type === "IndiaFiling" && data.Template === "Design" && data.Process === "Application")
    }).filter((val,index)=>{
      if(index == this.state.DesignApp_Dom_data.stages.value-1){
        return val.ProjectTemplateId
      }
    })

    console.log(Stages,"StagesStages")

    var sub_stages = this.props.designSubStages.filter((data,index)=>{
      return( data.Type === "IndiaFiling" && data.Template === "Design" && data.Process === "Application")
    }).filter((val,index)=>{
      if(index == this.state.DesignApp_Dom_data.sub_stages.value-1){
        return val.ProjectTemplateId
      }
    })

    var calcaulateTDays = this.state.projectList.filter((data,index)=>{
      return(data.Type === "IndiaFiling" && data.Template === "Design" && data.Process === "Application")
    })

    var self = this;
var obj = {
  ourReference: this.state.DesignApp_Dom_data.our_reference.value,
  Stages: Stages[0].ProjectTemplateId
}
this.state.DesignApp_Dom_data.projectname.value && Object.assign(obj, {"projectname":this.state.DesignApp_Dom_data.projectname.value})
this.state.DesignApp_Dom_data.file_cover.value && Object.assign(obj, {"filecover":this.state.DesignApp_Dom_data.file_cover.value})
this.state.DesignApp_Dom_data.applicant.value && Object.assign(obj, {"applicant":this.state.DesignApp_Dom_data.applicant.value})
this.state.DesignApp_Dom_data.title.value && Object.assign(obj, {"title":this.state.DesignApp_Dom_data.title.value})
this.state.DesignApp_Dom_data.application_num.value && Object.assign(obj, {"appno":this.state.DesignApp_Dom_data.application_num.value})
this.state.DesignApp_Dom_data.class.value && Object.assign(obj, {"class":this.state.DesignApp_Dom_data.class.value})
this.state.DesignApp_Dom_data.ClientRef.value && Object.assign(obj, {"clientref":this.state.DesignApp_Dom_data.ClientRef.value})
this.state.DesignApp_Dom_data.Status.value && Object.assign(obj, {"status":this.state.DesignApp_Dom_data.Status.value})
this.state.DesignApp_Dom_data.comments.value && Object.assign(obj, {"comments":this.state.DesignApp_Dom_data.comments.value})
this.state.DesignApp_Dom_data.associate.value && Object.assign(obj, {"assosciate":this.state.DesignApp_Dom_data.associate.value})
this.state.DesignApp_Dom_data.country.value && Object.assign(obj, {"country":this.state.DesignApp_Dom_data.country.value})
this.state.DesignApp_Dom_data.priority_country.value && Object.assign(obj, {"prioritycountry":this.state.DesignApp_Dom_data.priority_country.value})
this.state.DesignApp_Dom_data.sub_stages.value && Object.assign(obj, {"Substages":sub_stages[0].ProjectTemplateId})
this.state.DesignApp_Dom_data.date1.value && Object.assign(obj, {"prioritydate":moment(this.state.DesignApp_Dom_data.date1.value).format('YYYY-MM-DD')})
this.state.DesignApp_Dom_data.hearing_date.value && Object.assign(obj, {"hearingdate":moment(this.state.DesignApp_Dom_data.hearing_date.value).format('YYYY-MM-DD')})
this.state.DesignApp_Dom_data.further_action.value && Object.assign(obj, {"furtheraction":moment(this.state.DesignApp_Dom_data.further_action.value).format('YYYY-MM-DD')})
this.state.DesignApp_Dom_data.replyto_further.value && Object.assign(obj, {"rplytofurtheraction":moment(this.state.DesignApp_Dom_data.replyto_further.value).format('YYYY-MM-DD')})
this.state.DesignApp_Dom_data.next_renew.value && Object.assign(obj, {"nextrenewal":moment(this.state.DesignApp_Dom_data.next_renew.value).format('YYYY-MM-DD')})
// this.state.DesignApp_Dom_data.date2.value && Object.assign(obj, {"date":moment(this.state.DesignApp_Dom_data.date2.value).format('YYYY-MM-DD')})
Object.assign(obj,{"date":this.state.DesignApp_Dom_data.application_date.value ? moment(moment(this.state.DesignApp_Dom_data.application_date.value, "YYYY-MM-DD").add(calcaulateTDays[0].TDays ? calcaulateTDays[0].TDays : 0, 'days')).format('YYYY-MM-DD'): ""})
// formData.set("date",this.state.DesignApp_Dom_data.application_date.value ? moment(moment(this.state.DesignApp_Dom_data.application_date.value, "YYYY-MM-DD").add(calcaulateTDays[0].TDays ? calcaulateTDays[0].TDays : 0, 'days')).format('YYYY-MM-DD'): "");

      axios({
        method: "post",
        url: apiurl + "/adddesigndomestic",
        data: obj,
      })
        .then(function (response) {
          console.log(response.data.data, "responseresponse");
          notification.warning({
            message: `Domestic Design Application data submitted successfully`,
            duration: 3.5,
            placement: "topRight",
            className: "notification_dayreport",
          });

          self.setState({afterInsert:true,commonId:response.data.data})
        })
        .catch(function (error) {
          console.log(error, "error");
        });

  }

  update=()=>{

    var our_reference = this.state.DesignApp_Dom_data.our_reference.value

    if(!Number(this.state.DesignApp_Dom_data.our_reference.value)){
     var our_reference = this.props.designReference.find((val) => {
        if(our_reference==val.EmpFirstName){
          return val.EmpId 
        }
       }
       )
    }

    var applicant = this.state.DesignApp_Dom_data.applicant.value

    if(!Number(this.state.DesignApp_Dom_data.applicant.value)){
     var applicant = this.props.designClient.find((val) => {
        if(applicant==val.ClientName){
          return val.ClientId 
        }
       }
       )
    }

    var designCountry = this.state.DesignApp_Dom_data.country.value

    if(!Number(this.state.DesignApp_Dom_data.country.value)){
     var designCountry = this.props.designCountry.find((val) => {
        if(designCountry==val.CounName){
          return val.CounId 
        }
       }
       )
    }

    var classDrop = this.state.DesignApp_Dom_data.class.value

    if(!Number(this.state.DesignApp_Dom_data.class.value)){
     var classDrop = this.props.designClass.find((val) => {
        if(classDrop==val.classname){
          return val.classId 
        }
       }
       )
    }

    var clientRef = this.state.DesignApp_Dom_data.ClientRef.value

    if(!Number(this.state.DesignApp_Dom_data.ClientRef.value)){
     var clientRef = this.props.designReference.find((val) => {
        if(clientRef==val.EmpFirstName){
          return val.EmpId 
        }
       }
       )
    }

    var statusId = this.state.DesignApp_Dom_data.Status.value

    if(!Number(this.state.DesignApp_Dom_data.Status.value)){
     var statusId = this.props.designStatus.find((val) => {
        if(statusId==val.Status){
          return val.StatusId 
        }
       }
       )
    }

    var Associate = this.state.DesignApp_Dom_data.associate.value

    if(!Number(this.state.DesignApp_Dom_data.associate.value)){
     var Associate = this.props.designReference.find((val) => {
        if(Associate==val.EmpFirstName){
          return val.EmpId 
        }
       }
       )
    }

    var priCountry = this.state.DesignApp_Dom_data.priority_country.value

    if(!Number(this.state.DesignApp_Dom_data.priority_country.value)){
     var priCountry = this.props.designCountry.find((val) => {
        if(priCountry==val.CounName){
          return val.CounId 
        }
       }
       )
    }

    var self = this;
var obj = {
  ourReference:!Number(this.state.DesignApp_Dom_data.our_reference.value)?our_reference && our_reference.EmpId:our_reference,
  desIndId:this.state.commonId
}
this.state.DesignApp_Dom_data.file_cover.value && Object.assign(obj, {"filecover":this.state.DesignApp_Dom_data.file_cover.value})
this.state.DesignApp_Dom_data.applicant.value && Object.assign(obj, {"applicant":!Number(this.state.DesignApp_Dom_data.applicant.value)?applicant && applicant.ClientId:applicant})

this.state.DesignApp_Dom_data.title.value && Object.assign(obj, {"title":this.state.DesignApp_Dom_data.title.value})
this.state.DesignApp_Dom_data.application_num.value && Object.assign(obj, {"appno":this.state.DesignApp_Dom_data.application_num.value})
this.state.DesignApp_Dom_data.class.value && Object.assign(obj, {"class":!Number(this.state.DesignApp_Dom_data.class.value)?classDrop && classDrop.classId:classDrop})
this.state.DesignApp_Dom_data.ClientRef.value && Object.assign(obj, {"clientref":!Number(this.state.DesignApp_Dom_data.ClientRef.value)?clientRef && clientRef.EmpId:clientRef})
this.state.DesignApp_Dom_data.Status.value && Object.assign(obj, {"status":!Number(this.state.DesignApp_Dom_data.Status.value)?statusId && statusId.StatusId:statusId})
this.state.DesignApp_Dom_data.comments.value && Object.assign(obj, {"comments":this.state.DesignApp_Dom_data.comments.value})
this.state.DesignApp_Dom_data.associate.value && Object.assign(obj, {"assosciate":!Number(this.state.DesignApp_Dom_data.associate.value)?Associate && Associate.EmpId:Associate})
this.state.DesignApp_Dom_data.country.value && Object.assign(obj, {"country":!Number(this.state.DesignApp_Dom_data.country.value)?designCountry && designCountry.CounId:designCountry})
this.state.DesignApp_Dom_data.priority_country.value && Object.assign(obj, {"prioritycountry":!Number(this.state.DesignApp_Dom_data.priority_country.value)?priCountry && priCountry.CounId:priCountry})
this.state.DesignApp_Dom_data.date1.value && Object.assign(obj, {"prioritydate":moment(this.state.DesignApp_Dom_data.date1.value).format('YYYY-MM-DD')})
this.state.DesignApp_Dom_data.further_action.value && Object.assign(obj, {"furtheraction":moment(this.state.DesignApp_Dom_data.further_action.value).format('YYYY-MM-DD')})
this.state.DesignApp_Dom_data.replyto_further.value && Object.assign(obj, {"rplytofurtheraction":moment(this.state.DesignApp_Dom_data.replyto_further.value).format('YYYY-MM-DD')})
this.state.DesignApp_Dom_data.next_renew.value && Object.assign(obj, {"nextrenewal":moment(this.state.DesignApp_Dom_data.next_renew.value).format('YYYY-MM-DD')})



      // let designData = {
      //   Status: this.state.DesignApp_Dom_data.Status.value,
      //   OurReference: this.state.DesignApp_Dom_data.class.value,
      //   Class: this.state.DesignApp_Dom_data.class.value,
      //   ClientReference: this.state.DesignApp_Dom_data.ClientRef.value,
      //   Comments: this.state.DesignApp_Dom_data.comments.value,
      //   AssosciateRef: this.state.DesignApp_Dom_data.associate_ref.value,
      //   country: this.state.DesignApp_Dom_data.country.value,
      //   PriorityCountry: this.state.DesignApp_Dom_data.priority_country.value,
      //   ApplicationNo: Number(this.state.DesignApp_Dom_data.application_num.value),
      //   Title: this.state.DesignApp_Dom_data.title.value,
      //   applicant: this.state.DesignApp_Dom_data.applicant.value,
      //   Substages: this.state.DesignApp_Dom_data.sub_stages.value,
      //   // Priorityappno: Number(this.state.DesignApp_Dom_data.Prio_application_num.value),
      //   Designdate: this.state.DesignApp_Dom_data.date1.value && moment(this.state.DesignApp_Dom_data.date1.value).format("YYYY-MM-DD"),
      //   date: convertedDate,
      // };
      // console.log(this.state., "report");

      axios({
        method: "put",
        url: apiurl + "/updatedesigndomestic",
        data: obj,
      })
        .then(function (response) {
          console.log(response.data.data, "responseresponse");
          notification.warning({
            message: `Domestic Design Application data updated successfully`,
            duration: 3.5,
            placement: "topRight",
            className: "notification_dayreport",
          });
          // self.state.DesignApp_Dom_data.client_name.value = "";
          // self.state.DesignApp_Dom_data.case_no.value = "";
          // self.state.DesignApp_Dom_data.court_no.value = "";
          // self.state.DesignApp_Dom_data.assingned_to.value = "";
          // self.state.DraName = "";

          // self.state.opemodaldata.amount.value=""
          // self.props.showclose && self.props.showclose()
          self.setState({afterInsert:true,commonId:response.data.data})
        })
        .catch(function (error) {
          console.log(error, "error");
        });

  }

  render() {
    console.log(this.state, "state");

    const params = new URLSearchParams(window.location.search)
    const status = params.get("status")

    var stageArr = []
    var stageArrId = []

    this.props.designStages &&
    this.props.designStages.map((val) => {if(val.Type === "IndiaFiling" && val.Template === "Design" && val.Process === "Application"){
      stageArr.push(val.Stage) 
      stageArrId.push(val.ProjectTemplateId)
    }})

    var subStageArr = []
    var subStageArrId = []

    this.props.designSubStages &&
    this.props.designSubStages.map((val)=>{if(val.Type === "IndiaFiling" && val.Template === "Design" && val.Process === "Application" && val.Substage){
      subStageArr.push(val.Substage)
      subStageArrId.push(val.ProjectTemplateId)
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
                className="w-100"
                option={
                  this.props.ProjectName &&
                  this.props.ProjectName.map((val) => val.ProjectName)
                }
                changeData={(data) =>this.changeDynamic(data, "projectname")}
                disabled={status==="editable" ? true : false}
                value={this.state.DesignApp_Dom_data.projectname.value}
                error={this.state.DesignApp_Dom_data.projectname.error}
                errmsg={this.state.DesignApp_Dom_data.projectname.errmsg}
              />

              </Grid>
              <Grid item md={3} sm={5}>
                <Inputantd
                  label={"File Cover"}
                  className="w-100"
                  changeData={(data) => this.changeDynamic(data, "file_cover")}
                  value={this.state.DesignApp_Dom_data.file_cover.value}
                  error={this.state.DesignApp_Dom_data.file_cover.error}
                  errmsg={this.state.DesignApp_Dom_data.file_cover.errmsg}
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
                  value={this.state.DesignApp_Dom_data.our_reference.value}
                  error={this.state.DesignApp_Dom_data.our_reference.error}
                  errmsg={this.state.DesignApp_Dom_data.our_reference.errmsg}
                ></Dropdownantd>
              </Grid>
              <Grid item md={3} sm={5}>
                <Dropdownantd
                  label={"Applicant"}
                  option={
                    this.props.designClient &&
                    this.props.designClient.map((val) => val.ClientName)
                  }
                  className="w-100"
                  changeData={(data) => this.changeDynamic(data, "applicant")}
                  value={this.state.DesignApp_Dom_data.applicant.value}
                  error={this.state.DesignApp_Dom_data.applicant.error}
                  errmsg={this.state.DesignApp_Dom_data.applicant.errmsg}
                  className="w-100"
                ></Dropdownantd>
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
                  value={this.state.DesignApp_Dom_data.country.value}
                  error={this.state.DesignApp_Dom_data.country.error}
                  errmsg={this.state.DesignApp_Dom_data.country.errmsg}
                  className="w-100"
                ></Dropdownantd>
              </Grid>
              <Grid item md={6} sm={5}>
                <Inputantd
                  label={"Title"}
                  className="w-100"
                  changeData={(data) => this.changeDynamic(data, "title")}
                  value={this.state.DesignApp_Dom_data.title.value}
                  error={this.state.DesignApp_Dom_data.title.error}
                  errmsg={this.state.DesignApp_Dom_data.title.errmsg}
                />
              </Grid>
              <Grid item md={3} sm={5}>
                <Inputantd
                  label={"Application Number"}
                  className="w-100"
                  changeData={(data) =>
                    this.changeDynamic(data, "application_num")
                  }
                  value={this.state.DesignApp_Dom_data.application_num.value}
                  error={this.state.DesignApp_Dom_data.application_num.error}
                  errmsg={this.state.DesignApp_Dom_data.application_num.errmsg}
                />
              </Grid>
              <Grid item md={3} sm={5}>
                <Dropdownantd
                  label={"Class"}
                  className="w-100"
                  option={
                    this.props.designClass &&
                    this.props.designClass.map((val) => val.classname)
                  }
                  className="w-100"
                  changeData={(data) => this.changeDynamic(data, "class")}
                  value={this.state.DesignApp_Dom_data.class.value}
                  error={this.state.DesignApp_Dom_data.class.error}
                  errmsg={this.state.DesignApp_Dom_data.class.errmsg}
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
                  value={this.state.DesignApp_Dom_data.ClientRef.value}
                  error={this.state.DesignApp_Dom_data.ClientRef.error}
                  errmsg={this.state.DesignApp_Dom_data.ClientRef.errmsg}
                />
              </Grid>

              <Grid item md={3} sm={5}>
                <Inputantd
                  label={"Comments"}
                  className="w-100"
                  changeData={(data) => this.changeDynamic(data, "comments")}
                  value={this.state.DesignApp_Dom_data.comments.value}
                  error={this.state.DesignApp_Dom_data.comments.error}
                  errmsg={this.state.DesignApp_Dom_data.comments.errmsg}
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
                  changeData={(data) => this.changeDynamic(data, "Status")}
                  value={this.state.DesignApp_Dom_data.Status.value}
                  error={this.state.DesignApp_Dom_data.Status.error}
                  errmsg={this.state.DesignApp_Dom_data.Status.errmsg}
                />
              </Grid>

              <Grid item md={3} sm={5}>
                <Dropdownantd
                  label={"Associate"}
                  className="w-100"
                  option={
                    this.props.designReference &&
                    this.props.designReference.map((val) => val.EmpFirstName)
                  }
                  className="w-100"
                  changeData={(data) => this.changeDynamic(data, "associate")}
                  value={this.state.DesignApp_Dom_data.associate.value}
                  error={this.state.DesignApp_Dom_data.associate.error}
                  errmsg={this.state.DesignApp_Dom_data.associate.errmsg}
                />
              </Grid>
              <Grid item md={3} sm={5}>
                <Dropdownantd
                  label={"Priority Country"}
                  className="w-100"
                  option={
                    this.props.designCountry &&
                    this.props.designCountry.map((val) => val.CounName)
                  }
                  changeData={(data) =>
                    this.changeDynamic(data, "priority_country")
                  }
                  value={this.state.DesignApp_Dom_data.priority_country.value}
                  error={this.state.DesignApp_Dom_data.priority_country.error}
                  errmsg={this.state.DesignApp_Dom_data.priority_country.errmsg}
                />
              </Grid>
              <Grid item md={3} sm={5}>
                <Calenderbox
                  label={"Priority Date"}
                  className="w-100"
                  changeData={(data) => this.changeDynamic(data, "date1")}
                  value={this.state.DesignApp_Dom_data.date1.value}
                  error={this.state.DesignApp_Dom_data.date1.error}
                  errmsg={this.state.DesignApp_Dom_data.date1.errmsg}
                />
              </Grid>
              <Grid item md={3} sm={5}>
                <Calenderbox
                  label={"Further Action"}
                  className="w-100"
                  changeData={(data) =>
                    this.changeDynamic(data, "further_action")
                  }
                  value={this.state.DesignApp_Dom_data.further_action.value}
                  error={this.state.DesignApp_Dom_data.further_action.error}
                  errmsg={this.state.DesignApp_Dom_data.further_action.errmsg}
                />
              </Grid>
              <Grid item md={3} sm={5}>
                <Calenderbox
                  label={"Reply to Further Action"}
                  className="w-100"
                  changeData={(data) =>
                    this.changeDynamic(data, "replyto_further")
                  }
                  value={this.state.DesignApp_Dom_data.replyto_further.value}
                  error={this.state.DesignApp_Dom_data.replyto_further.error}
                  errmsg={this.state.DesignApp_Dom_data.replyto_further.errmsg}
                />
              </Grid>
              <Grid item md={3} sm={5}>
                <Calenderbox
                  label={"Next Renewal"}
                  className="w-100"
                  changeData={(data) => this.changeDynamic(data, "next_renew")}
                  value={this.state.DesignApp_Dom_data.next_renew.value}
                  error={this.state.DesignApp_Dom_data.next_renew.error}
                  errmsg={this.state.DesignApp_Dom_data.next_renew.errmsg}
                />
              </Grid>
              <Grid item md={3} sm={5}>
                <Calenderbox label={"Application Date"} className="w-75"
                        changeData={(data) => this.changeDynamic(data, 'application_date')}
                        value={this.state.DesignApp_Dom_data.application_date.value}
                        error={this.state.DesignApp_Dom_data.application_date.error}
                        errmsg={this.state.DesignApp_Dom_data.application_date.errmsg} />
              </Grid>
              {status==="editable"&&
                  <>
                  <Grid item md={6} sm={5}>
                  </Grid>
                  <Grid item >
                    <Button className="btnwidth btnclr indiafilling_topalign"  onClick={()=>this.update()}>Update</Button>
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
                    className="w-100"
                    changeData={(data) => this.changeDynamic(data, "stages")}
                    value={this.state.DesignApp_Dom_data.stages.value}
                    error={this.state.DesignApp_Dom_data.stages.error}
                    errmsg={this.state.DesignApp_Dom_data.stages.errmsg}
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
                    value={this.state.DesignApp_Dom_data.sub_stages.value}
                    error={this.state.DesignApp_Dom_data.sub_stages.error}
                    errmsg={this.state.DesignApp_Dom_data.sub_stages.errmsg}
                    className="w-75"
                  ></Dropdownantd>
                </Grid>
                <Grid item md={3} sm={5}>
                  <Calenderbox
                    label={"Statutory Deadline"}
                    className="w-75"
                    changeData={(data) => this.changeDynamic(data, "date2")}
                    disabled={true}
                    value={status==="editable" ? this.state.DesignApp_Dom_data.date2.value:this.state.DesignApp_Dom_data.application_date.value}
                  ></Calenderbox>
                </Grid>
                <Grid item md={3} sm={5}>
                <div className="d-flex">
                <Calenderbox label={"Filing Date"} className="w-100"
                      changeData={(data) => this.changeDynamic(data, 'hearing_date')}
                      value={this.state.DesignApp_Dom_data.hearing_date.value}
                      error={this.state.DesignApp_Dom_data.hearing_date.error}
                      errmsg={this.state.DesignApp_Dom_data.hearing_date.errmsg}
                    ></Calenderbox>
                  <span className="circle_icon_edit">
                    <AddCircleOutline className="Interfil_addicon" onClick={this.checkValidation} />
                  </span>
                  </div>
                </Grid>
              </Grid>
            </div>
            {/* Grid content End */}

            {/* Table content start */}
            <div className="table_info_par">
              <div>
                <DesignAppList commonId={this.state.commonId} endpoint={"viewdesigndomesticitems"} trademark={"DesignIndiaFilling"}/>
              </div>
            </div>
          </div>
        </>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("stateeee", state);

  return {
    DesignApp_Dom_data: state.resumeReducer.DesignApp_Dom_data,
    designStatus: state.tradeapp.getTradestatus,
    designAssociate: state.tradeapp.getTradeassociate,
    designClass: state.tradeapp.getTradeclass,
    designReference: state.tradeapp.getTradeOurReference,
    designCountry: state.tradeapp.getTradecountry,
    designAllotement: state.tradeapp.getTradeallotment,
    designStages: state.tradeapp.getTradestages,
    designSubStages: state.tradeapp.getTradeSubstages,
    designClient:state.tradeapp.getTradeClientname,
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
  getClientName,
  getProjectName
})(DomesticDesignApplication);
