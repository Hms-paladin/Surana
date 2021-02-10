import React from 'react'
import "./TradeMarkOpposition.css";
import Inputantd from '../../../../formcomponent/inputantd';
import Dropdownantd from '../../../../formcomponent/dropdownantd';
import Grid from '@material-ui/core/Grid';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import { IoMdInformationCircle } from "react-icons/io";
// import Button from 'react-bootstrap/Button';
import { Popover,} from 'antd';
import {Upload,Icon,message,Button} from 'antd';
import { Tooltip,} from 'antd';  
import { Table } from 'antd';
import Calenderbox from '../../../../formcomponent/calenderbox';
import ValidationLibrary from "../.. /../../../../validationlibrary/validation";
import { getStatuslist, getClassList, getStagelist, getSubStagelist, getProjectName } from "./Action/TMOppositionAction";
import { connect } from "react-redux";
import DayreportDropDown from '../../../../formcomponent/dayreportDropDown';
import { getEmployees, getClient} from '../../../../fixers/fixersAction';
import { UploadOutlined } from '@ant-design/icons';
import { apiurl } from "../../../../App";
import moment from 'moment';
import {notification} from 'antd';
import FiledOppositionList from './FiledOppositionList';
import InternationalList from "../ApplicationTradeMark/InternationalList.js"


const axios = require('axios');
var fileListData=[];

const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      console.log("asdfjkasdfjsd",info.fileList)
      message.success(`${info.file.name} file uploaded successfully`);
      fileListData=info.fileList;
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  progress: {
    strokeColor: {
      '0%': '#108ee9',
      '100%': '#87d068',
    },
    strokeWidth: 3,
    format: percent => `${parseFloat(percent.toFixed(2))}%`,
  },
};
const text = <span>+ 4Days</span>;
const columns = [
    {
      title: 'Stages',
      dataIndex: 'stage',
    },
    {
      title: 'Sub Stages',
      dataIndex: 'substage',
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },
    {
        title: 'Actual Date',
        dataIndex: 'actualdate',
      },
  ];
  const data = [
    {
      key: '1',
      stage: 'ER Received',
      substage: '-',
      date: '14 July 2020',
      actualdate:'14 July 2020',
    },
    {
      key: '2',
      stage: 'ER Reply',
      substage: 'Formality Check Fail Yes',
      date: '18 July 2020',
      actualdate:'18 July 2020',
    },

  ];

  const content = (
    <div>
      <p className="popover_content_edit">+ 4Days</p>
    </div>
  );
class FiledOpposition extends React.Component{
    state = {        
        tags: [],
        inputVisible: false,
        inputValue: '',
        errordummy:true,
    TradeOpp_Filed_data:{
      projectname:{
        value: "",
        validation: [],
        error: null,
        errmsg: null,
      },
    'Status':{
        'value':'',
        validation:[{'name':'required'}],
        error:null,
        errmsg:null
    },
    'Client':{
        'value':'',
        validation:[],
        error:null,
        errmsg:null
    },
    'Class':{
        'value':'',
        validation:[],
        error:null,
        errmsg:null
    },
    'our_reference':{
        'value':'',
        validation:[],
        error:null,
        errmsg:null
    },
    'Stages':{
        'value':'',
        validation:[{'name':'required'}],
        error:null,
        errmsg:null
    },
    'sub_stages':{
        'value':'',
        validation:[],
        error:null,
        errmsg:null
    },
    'mark':{
        'value':'',
        validation:[],
        error:null,
        errmsg:null
    },
    'app_no':{
        'value':'',
        validation:[],
        error:null,
        errmsg:null
    },
    application_date: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    'tmj_no':{
        'value':'',
        validation:[],
        error:null,
        errmsg:null
    },
    'tnj_date':{
      'value':'',
      validation:[],
      error:null,
      errmsg:null
  },
    'opp_no':{
        'value':'',
        validation:[],
        error:null,
        errmsg:null
    },
    'application':{
        'value':'',
        validation:[],
        error:null,
        errmsg:null
    },
    'applicant_agent':{
        'value':'',
        validation:[],
        error:null,
        errmsg:null
    },
    'opponent':{
        'value':'',
        validation:[],
        error:null,
        errmsg:null
    },
    'opponent_agent':{
        'value':'',
        validation:[],
        error:null,
        errmsg:null
    },
    'status_two':{
      'value':'',
      validation:[],
      error:null,
      errmsg:null
    },
    'deadline':{
      'value':'',
      validation:[],
      error:null,
      errmsg:null
    },
    'hearing_notice':{
      'value':'',
      validation:[],
      error:null,
      errmsg:null
    },
    'further_action':{
      'value':'',
      validation:[],
      error:null,
      errmsg:null
    },
    'order':{
      'value':'',
      validation:[],
      error:null,
      errmsg:null
    },
    'hearing_date':{
      'value':'',
      validation:[{ name: "required" }],
      error:null,
      errmsg:null
    },
    'goods_service':{
      'value':'',
      validation:[],
      error:null,
      errmsg:null
    },
    'date':{
        'value':'',
        validation:[],
        error:null,
        errmsg:null
    },    
    }
}

    async componentDidMount() {
        await this.props.getStatuslist();
        await this.props.getClassList();
        await this.props.getEmployees();
        await this.props.getClient();
        await this.props.getStagelist();
        await this.props.getSubStagelist();
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
                  if(value.Type === "Filed" && value.Template === "Trademark"){
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
            response.data.data[2].Trademarkoppfiled.filter((data, index) => {
  
  
              if (data.TropId == userid) {
              console.log(data.TropId, "viewtrademark2")
              self.state.TradeOpp_Filed_data.projectname.value = data.ProjectName === "null" ? "" : data.ProjectName
              self.state.TradeOpp_Filed_data.Stages.value=projectList[data.trademarkfileditems.length] && projectList[data.trademarkfileditems.length].Stage
              self.state.TradeOpp_Filed_data.sub_stages.value=projectList[data.trademarkfileditems.length] && projectList[data.trademarkfileditems.length].Substage
              self.state.TradeOpp_Filed_data.date.value=moment(moment(data.trademarkfileditems[data.trademarkfileditems.length-1].HearingDate, "YYYY-MM-DD").add(projectList[data.trademarkfileditems.length] && projectList[data.trademarkfileditems.length].TDays ? projectList[data.trademarkfileditems.length].TDays : 0, 'days'))
  
              self.state.TradeOpp_Filed_data.Status.value = data.Status === "null" ? "" : data.Status 
              self.state.TradeOpp_Filed_data.Client.value = data.ClientName === "null" ? "" : data.ClientName
              self.state.TradeOpp_Filed_data.our_reference.value = data.OurReference === "null" ? "" : data.OurReference
              self.state.TradeOpp_Filed_data.mark.value = data.Mark === "null" ? "" : data.Mark
              self.state.TradeOpp_Filed_data.Class.value= data.classname === "null" ? "" : data.classname
              self.state.TradeOpp_Filed_data.app_no.value = data.ApplicationNo === "null" ? "" : data.ApplicationNo
              self.state.TradeOpp_Filed_data.application_date.value= data.Appdate === "null" ? "" : moment(data.Appdate)
              self.state.TradeOpp_Filed_data.tmj_no.value = data.TMJNo === "null" ? "" : data.TMJNo
              self.state.TradeOpp_Filed_data.tnj_date.value = data.TMJDate === "null" ? "" : data.TMJDate && moment(data.TMJDate)
              self.state.TradeOpp_Filed_data.opp_no.value= data.OppNo === "null" ? "" : data.OppNo
              self.state.TradeOpp_Filed_data.application.value = data.Applicant === "null" ? "" : data.Applicant
              self.state.TradeOpp_Filed_data.applicant_agent.value = data.AppAgent === "null" ? "" : data.AppAgent
              self.state.TradeOpp_Filed_data.status_two.value = data.StatusId === "null" ? "" : data.StatusId
              self.state.TradeOpp_Filed_data.deadline.value = data.Deadline === "null" ? "" : data.Deadline && moment(data.Deadline)
              self.state.TradeOpp_Filed_data.hearing_notice.value = data.HearingNotice === "null" ? "" : data.HearingNotice && moment(data.HearingNotice)
              self.state.TradeOpp_Filed_data.further_action.value = data.Furtheraction === "null" ? "" : data.Furtheraction && moment(data.Furtheraction)
              // self.state.TradeOpp_Filed_data.order.value =  data.Order === "null" ? "" : data.Order
  
                self.setState({TrademarkItems:data.trademarkfileditems,TrdoId:data.TropId,fileListimg:data.Image === null ? "" :[
                  {
                    uid: '-1',
                    name: data.Image?data.Image.slice(35):"",
                    status: 'done',
                    url: data.Image?data.Image:"",
                  },
                ],
                fileListorder:data.Orderone === null ? "" :[
                  {
                    uid: '-2',
                    name: data.Orderone?data.Orderone.slice(35):"",
                    status: 'done',
                    url: data.Orderone?data.Orderone:"",
                  },
                ]
              })
              }
  
            })
          })
      }
    })}

       checkValidation = () => {
        var mainvalue = {};
        var TradeOpp_Filed_data = this.state.TradeOpp_Filed_data;
        var targetkeys = Object.keys(TradeOpp_Filed_data);
        console.log(targetkeys, "targetkeys");
        for (var i in targetkeys) {
          var errorcheck = ValidationLibrary.checkValidation(
            TradeOpp_Filed_data[targetkeys[i]].value,
            TradeOpp_Filed_data[targetkeys[i]].validation
          );
          console.log(errorcheck, "errorcheck");
          TradeOpp_Filed_data[targetkeys[i]].error = !errorcheck.state;
          TradeOpp_Filed_data[targetkeys[i]].errmsg = errorcheck.msg;
          mainvalue[targetkeys[i]] = TradeOpp_Filed_data[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter(
          (obj) => TradeOpp_Filed_data[obj].error == true
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
    //   mainvalue,
      TradeOpp_Filed_data
    })   
}

updateSubstage=()=>{

  // var Stages = this.props.GetStageList.filter((data,index)=>{
  //   return(data.Type === "Filed" && data.Template === "Trademark")
  // }).filter((val,index)=>{
  //   if(index == this.state.TradeOpp_Filed_data.Stages.value-1){
  //     return val.ProjectTemplateId
  //   }
  // })

  // var sub_stages = this.props.GetsubStageList.filter((data,index)=>{
  //   return(data.Type === "Filed" && data.Template === "Trademark")
  // }).filter((val,index)=>{
  //   if(index == this.state.TradeOpp_Filed_data.sub_stages.value-1){
  //     return val.ProjectTemplateId
  //   }
  // })

  if(typeof this.state.TradeOpp_Filed_data.Stages.value === 'string'){
    var Stages = this.props.GetStageList.filter((data,index)=>{
      return(data.Type === "Filed" && data.Template === "Trademark")
    }).filter((val,index)=>{
      if(val.Stage === this.state.TradeOpp_Filed_data.Stages.value){
        return val.ProjectTemplateId
      }
    })
  }else{
    var Stages = this.props.GetStageList.filter((data,index)=>{
      return(data.Type === "Filed" && data.Template === "Trademark")
    }).filter((val,index)=>{
      if(index == this.state.TradeOpp_Filed_data.Stages.value-1){
        return val.ProjectTemplateId
      }
    })

  }


  if(typeof this.state.TradeOpp_Filed_data.sub_stages.value === 'string'){
    var sub_stages = this.props.GetsubStageList.filter((data,index)=>{
      return(data.Type === "Filed" && data.Template === "Trademark")
    }).filter((val,index)=>{
      if(val.Substage == this.state.TradeOpp_Filed_data.sub_stages.value){
        return val.ProjectTemplateId
      }
    })
  }else{
    var sub_stages = this.props.GetsubStageList.filter((data,index)=>{
      return(data.Type === "Filed" && data.Template === "Trademark")
    }).filter((val,index)=>{
      if(index == this.state.TradeOpp_Filed_data.sub_stages.value-1){
        return val.ProjectTemplateId
      }
    })
  }

var self = this

var myObject = {
  tropId:this.state.TrdoId,
  "stages": Stages[0].ProjectTemplateId,
}

this.state.TradeOpp_Filed_data.sub_stages.value && sub_stages && Object.assign(myObject, {"Substages":sub_stages[0].ProjectTemplateId})
this.state.TradeOpp_Filed_data.date.value && Object.assign(myObject, { "date":this.state.TradeOpp_Filed_data.date.value?moment(this.state.TradeOpp_Filed_data.date.value).format('YYYY-MM-DD'):""})
this.state.TradeOpp_Filed_data.hearing_date.value && Object.assign(myObject, {"hearingdate":this.state.TradeOpp_Filed_data.hearing_date.value? moment(this.state.TradeOpp_Filed_data.hearing_date.value).format('YYYY-MM-DD'):""})

axios({
  method: 'put',
  url: apiurl + "/updateoppItems",
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

  if(key==="Stages" && status){

  var Stages = this.props.GetStageList.filter((data,index)=>{
    return(data.Type === "Filed" && data.Template === "Trademark")
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
    this.state.TradeOpp_Filed_data.date.value = moment(moment(this.state.TrademarkItems[this.state.TrademarkItems.length-1].HearingDate, "YYYY-MM-DD").add( datevalue ? datevalue.TDays : 0, 'days'))
}

  var TradeOpp_Filed_data = this.state.TradeOpp_Filed_data;
  var targetkeys = Object.keys(TradeOpp_Filed_data);
  var errorcheck = ValidationLibrary.checkValidation(
    data,
    TradeOpp_Filed_data[key].validation
  );
  TradeOpp_Filed_data[key].value = data;
  TradeOpp_Filed_data[key].error = !errorcheck.state;
  TradeOpp_Filed_data[key].errmsg = errorcheck.msg;
  this.setState({ TradeOpp_Filed_data });
  var filtererr = targetkeys.filter(
    (obj) =>
      TradeOpp_Filed_data[obj].error == true ||
      TradeOpp_Filed_data[obj].error == null
  );
  if (filtererr.length > 0) {
    this.setState({ error: true, errordummy: false });
  } else {
    this.setState({ error: false });
  }
};



insert=()=>{

  var Stages = this.props.GetStageList.filter((data,index)=>{
    return(data.Type === "Filed" && data.Template === "Trademark")
  }).filter((val,index)=>{
    if(index == this.state.TradeOpp_Filed_data.Stages.value-1){
      return val.ProjectTemplateId
    }
  })

  var sub_stages = this.props.GetsubStageList.filter((data,index)=>{
    return(data.Type === "Filed" && data.Template === "Trademark")
  }).filter((val,index)=>{
    if(index == this.state.TradeOpp_Filed_data.sub_stages.value-1){
      return val.ProjectTemplateId
    }
  })
  
  var self = this;

        var formData=new FormData();
        this.state.TradeOpp_Filed_data.projectname.value && formData.set("projectname", this.state.TradeOpp_Filed_data.projectname.value);
        this.state.TradeOpp_Filed_data.Status.value && formData.set("statusId",this.state.TradeOpp_Filed_data.Status.value);
        this.state.TradeOpp_Filed_data.Client.value && formData.set ("client",this.state.TradeOpp_Filed_data.Client.value);
        this.state.TradeOpp_Filed_data.our_reference.value && formData.set("ourReference",this.state.TradeOpp_Filed_data.our_reference.value);
        this.state.TradeOpp_Filed_data.mark.value && formData.set("mark",this.state.TradeOpp_Filed_data.mark.value);
        this.state.TradeOpp_Filed_data.Class.value && formData.set ("class",this.state.TradeOpp_Filed_data.Class.value);
        this.state.TradeOpp_Filed_data.app_no.value && formData.set( "ApplicationNo",this.state.TradeOpp_Filed_data.app_no.value);
        this.state.TradeOpp_Filed_data.application_date.value && formData.set("Appdate",moment(this.state.TradeOpp_Filed_data.application_date.value).format('YYYY-MM-DD'));
        this.state.TradeOpp_Filed_data.tmj_no.value && formData.set("tmJNo",this.state.TradeOpp_Filed_data.tmj_no.value);
        this.state.TradeOpp_Filed_data.tnj_date.value && formData.set("tmJdate",moment(this.state.TradeOpp_Filed_data.tnj_date.value).format('YYYY-MM-DD'));
        this.state.TradeOpp_Filed_data.opp_no.value && formData.set("OppNo",this.state.TradeOpp_Filed_data.opp_no.value);
        this.state.TradeOpp_Filed_data.application.value && formData.set("applicant",this.state.TradeOpp_Filed_data.application.value);
        this.state.TradeOpp_Filed_data.applicant_agent.value && formData.set("appagent",this.state.TradeOpp_Filed_data.applicant_agent.value);
        this.state.TradeOpp_Filed_data.status_two.value && formData.set("status",this.state.TradeOpp_Filed_data.status_two.value)
        this.state.TradeOpp_Filed_data.deadline.value && formData.set("deadline",moment(this.state.TradeOpp_Filed_data.deadline.value).format('YYYY-MM-DD'))
        this.state.TradeOpp_Filed_data.hearing_notice.value && formData.set("hearingnotice",moment(this.state.TradeOpp_Filed_data.hearing_notice.value).format('YYYY-MM-DD'))
        this.state.TradeOpp_Filed_data.hearing_date.value && formData.set("hearingdate",moment(this.state.TradeOpp_Filed_data.hearing_date.value).format('YYYY-MM-DD'))
        this.state.TradeOpp_Filed_data.further_action.value && formData.set("furtheraction",moment(this.state.TradeOpp_Filed_data.further_action.value).format('YYYY-MM-DD'))
        this.state.TradeOpp_Filed_data.Stages.value && formData.set("Stages",Stages[0].ProjectTemplateId);
        this.state.TradeOpp_Filed_data.sub_stages.value && formData.set("SubStages",sub_stages[0].ProjectTemplateId);
        formData.set("date",moment(this.state.TradeOpp_Filed_data.application_date.value).format('YYYY-MM-DD'));
        this.state.fileListimg && formData.append('imageArray', this.state.fileListimg?this.state.fileListimg[0].originFileObj:"")
        this.state.fileListorder && formData.set("order",this.state.fileListorder?this.state.fileListorder[0].originFileObj:"");          

          axios({
        method: "post",
        url: apiurl + "/addtrademarkopposite",
        data: formData,
      }) .then(function (response) {
        console.log(response.data.data, "responseresponse");
        notification.warning({
            message: `Trademark Opposition Filed is submitted successfully`,
            duration: 3.5,
            placement: "topRight",
            className:"notifiction_tradeOPP"
        })
            // self.state.TradeOpp_Filed_data.Status.value = ""
            // self.state.TradeOpp_Filed_data.Client.value = ""
            // self.state.TradeOpp_Filed_data.our_reference.value = ""
            // self.state.TradeOpp_Filed_data.mark.value = ""
            // self.state.TradeOpp_Filed_data.Class.value = ""
            // self.state.TradeOpp_Filed_data.app_no.value = ""
            // self.state.TradeOpp_Filed_data.tmj_no.value = ""
            // self.state.TradeOpp_Filed_data.opp_no.value = ""
            // self.state.TradeOpp_Filed_data.application.value = ""
            // self.state.TradeOpp_Filed_data.applicant_agent.value = ""
            // self.state.TradeOpp_Filed_data.opponent.value = ""
            // self.state.TradeOpp_Filed_data.opponent_agent.value = ""
            self.state.TradeOpp_Filed_data.Stages.value = ""
            self.state.TradeOpp_Filed_data.sub_stages.value = ""
            self.state.TradeOpp_Filed_data.date.value = ""
            self.setState({afterInsert:true,TrdoId:response.data.data});
          })
}

update=()=>{

  var statusId = this.state.TradeOpp_Filed_data.Status.value


  if(!Number(this.state.TradeOpp_Filed_data.Status.value)){
   var statusId = this.props.GetStatusList.find((val) => {
  console.log(val,"statusIdss")

      if(statusId==val.Status){
        return val.StatusId 
      }
      else{
        return 1
      }
     }
     )
  }
  
  console.log(statusId,"statusId")
  console.log(this.state.TradeOpp_Filed_data.Status.value,"statusId")


  var clientId = this.state.TradeOpp_Filed_data.Client.value

  if(!Number(this.state.TradeOpp_Filed_data.Client.value)){
   var clientId = this.props.clientList.find((val) => {
      if(clientId==val.ClientName){
        return val.ClientId 
      }
     }
     )
  }

  var our_reference = this.state.TradeOpp_Filed_data.our_reference.value

  if(!Number(this.state.TradeOpp_Filed_data.our_reference.value)){
   var our_reference = this.props.employeeList.find((val) => {
      if(our_reference==val.EmpFirstName){
        return val.EmpId 
      }
     }
     )
  }

  var classDrop = this.state.TradeOpp_Filed_data.Class.value

  if(!Number(this.state.TradeOpp_Filed_data.Class.value)){
   var classDrop = this.props.GetClassList.find((val) => {
      if(classDrop==val.classname){
        return val.classId 
      }
     }
     )
  }


  var formData=new FormData();

  this.state.TradeOpp_Filed_data.Status.value && formData.set("statusId",!Number(this.state.TradeOpp_Filed_data.Status.value)?statusId && statusId.StatusId:statusId);
  this.state.TradeOpp_Filed_data.Client.value && formData.set ("client",!Number(this.state.TradeOpp_Filed_data.Client.value)?clientId.ClientId:clientId);
  this.state.TradeOpp_Filed_data.our_reference.value && formData.set("ourReference",!Number(this.state.TradeOpp_Filed_data.our_reference.value)?our_reference.EmpId:our_reference);
  this.state.TradeOpp_Filed_data.mark.value && formData.set("mark",this.state.TradeOpp_Filed_data.mark.value);
  this.state.TradeOpp_Filed_data.Class.value && formData.set ("class",!Number(this.state.TradeOpp_Filed_data.Class.value)?classDrop.classId:classDrop);
  this.state.TradeOpp_Filed_data.app_no.value && formData.set( "ApplicationNo",this.state.TradeOpp_Filed_data.app_no.value);
  this.state.TradeOpp_Filed_data.application_date.value && formData.set("Appdate",moment(this.state.TradeOpp_Filed_data.application_date.value).format('YYYY-MM-DD'));
  this.state.TradeOpp_Filed_data.tmj_no.value && formData.set("tmJNo",this.state.TradeOpp_Filed_data.tmj_no.value);
  this.state.TradeOpp_Filed_data.tnj_date.value && formData.set("tmJdate",moment(this.state.TradeOpp_Filed_data.tnj_date.value).format('YYYY-MM-DD'));
  this.state.TradeOpp_Filed_data.opp_no.value && formData.set("OppNo",this.state.TradeOpp_Filed_data.opp_no.value);
  this.state.TradeOpp_Filed_data.application.value && formData.set("applicant",this.state.TradeOpp_Filed_data.application.value);
  this.state.TradeOpp_Filed_data.applicant_agent.value && formData.set("appagent",this.state.TradeOpp_Filed_data.applicant_agent.value);
  this.state.TradeOpp_Filed_data.status_two.value && formData.set("status",this.state.TradeOpp_Filed_data.status_two.value)
  this.state.TradeOpp_Filed_data.deadline.value && formData.set("deadline",moment(this.state.TradeOpp_Filed_data.deadline.value).format('YYYY-MM-DD'))
  this.state.TradeOpp_Filed_data.hearing_notice.value && formData.set("hearingnotice",moment(this.state.TradeOpp_Filed_data.hearing_notice.value).format('YYYY-MM-DD'))
  // this.state.TradeOpp_Filed_data.hearing_date.value && formData.set("hearingdate",moment(this.state.TradeOpp_Filed_data.hearing_date.value).format('YYYY-MM-DD'))
  this.state.TradeOpp_Filed_data.further_action.value && formData.set("furtheraction",moment(this.state.TradeOpp_Filed_data.further_action.value).format('YYYY-MM-DD'))
  // this.state.TradeOpp_Filed_data.Stages.value && formData.set("Stages",this.state.TradeOpp_Filed_data.Stages.value);
  // this.state.TradeOpp_Filed_data.sub_stages.value && formData.set("SubStages",this.state.TradeOpp_Filed_data.sub_stages.value);
  // this.state.TradeOpp_Filed_data.date.value && formData.set("Date",moment(this.state.TradeOpp_Filed_data.date.value).format('YYYY-MM-DD'));

  this.state.fileListimg && formData.append('imageArray',this.state.fileListimg && this.state.fileListimg[0] ?this.state.fileListimg[0].originFileObj:"")
  this.state.fileListorder && formData.set("order",this.state.fileListorder && this.state.fileListorder[0] ?this.state.fileListorder[0].originFileObj:"");          

  formData.set("tropId", this.state.TrdoId);




  axios({
    method: 'put',
    url: apiurl + "/updatetrademarkopposite",
    data:formData
  })
    .then(function (response) {
      notification.warning({
        message: `Trademark Opposition Filed has updated successfully`,
        duration: 3.5,
        placement: "topRight",
        className: "notification_dayreport",
      });
      })
}

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


    render(){
        console.log(this.state.TradeOpp_Filed_data.date.value,"date")

        const params = new URLSearchParams(window.location.search)
        const status = params.get("status")

        var stageArr = []
        var stageArrId = []
      
        // this.props.GetStageList &&
        // this.props.GetStageList.map((val) => {if(val.Type==="Filed"){
        //   stageArr.push(val.Stage) 
        //   stageArrId.push(val.ProjectTemplateId)
        // }})
        this.props.GetStageList && this.props.GetStageList.map((data)=>{
          if(data.Template==='Trademark' && data.Process ==='Opposition'&&data.Type==="Filed"){
            stageArr.push(data.Stage)
            stageArrId.push(data.ProjectTemplateId)
        }})
      
        var subStageArr = []
        var subStageArrId = []
        // this.props.GetsubStageList &&
        // this.props.GetsubStageList.map((val)=>{if(val.Type==="Filed" && val.Substage){
        //   subStageArr.push(val.Substage)
        //   subStageArrId.push(val.ProjectTemplateId)
        // }})
        this.props.GetsubStageList && this.props.GetsubStageList.map((data)=>{
          if(data.Template==='Trademark' && data.Process ==='Opposition'&&data.Type==="Filed"){
            data.Substage !== '' && subStageArr.push(data.Substage)
            data.Substage !== '' && subStageArrId.push(data.ProjectTemplateId)
        }})


        return(
            <React.Fragment>
               <> 
    <div className="InterFilingOPP_main">

    {/* Grid content Start */} 
           

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
                  value={this.state.TradeOpp_Filed_data.projectname.value}
                  error={this.state.TradeOpp_Filed_data.projectname.error}
                  errmsg={this.state.TradeOpp_Filed_data.projectname.errmsg}
                />

                </Grid>
                <Grid item md={3} sm={5}>                    
                    <DayreportDropDown label="Status" className="w-75"
                          option={this.props.GetStatusList &&
                          this.props.GetStatusList.map((val) => {return({name:val.Status,id:val.StatusId})})}
                          changeData={(data) =>
                            this.changeDynamic(data, "Status")
                          }
                          value={
                            this.state.TradeOpp_Filed_data.Status.value
                          }
                          error={
                            this.state.TradeOpp_Filed_data.Status.error
                          }
                          errmsg={
                            this.state.TradeOpp_Filed_data.Status.errmsg
                          }/>
                </Grid>
                <Grid item md={3} sm={5}>
                    <DayreportDropDown label={"Client"} className="w-75"
                    option={this.props.clientList &&
                        this.props.clientList.map((val) => {return({name:val.ClientName,id:val.ClientId})})}
                    changeData={(data) =>
                            this.changeDynamic(data, "Client")
                          }
                          value={
                            this.state.TradeOpp_Filed_data.Client.value
                          }
                          error={
                            this.state.TradeOpp_Filed_data.Client.error
                          }
                          errmsg={
                            this.state.TradeOpp_Filed_data.Client.errmsg
                          }/>
                </Grid>
                <Grid item md={3} sm={5}>
                    <DayreportDropDown label={"Our Reference"} className="w-75"
                    option={this.props.employeeList &&
                        this.props.employeeList.map((val) => {return({name:val.EmpFirstName,id:val.EmpId})})}
                        changeData={(data) =>
                          this.changeDynamic(data, "our_reference")
                        }
                        value={
                          this.state.TradeOpp_Filed_data.our_reference.value
                        }
                        error={
                          this.state.TradeOpp_Filed_data.our_reference.error
                        }
                        errmsg={
                          this.state.TradeOpp_Filed_data.our_reference.errmsg
                        }/>
                </Grid>
                <Grid item md={3} sm={5}>
                    <Inputantd label={"Mark"} className="w-75"
                    changeData={(data) =>
                          this.changeDynamic(data, "mark")
                        }
                        value={
                          this.state.TradeOpp_Filed_data.mark.value
                        }
                        error={
                          this.state.TradeOpp_Filed_data.mark.error
                        }
                        errmsg={
                          this.state.TradeOpp_Filed_data.mark.errmsg
                        }/>
                </Grid>

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

                {/* <Grid item md={3} sm={5} className="interfil_update mt-3 ">
                        <div className="flex">
                        <label  className="mr-1">Upload</label>

                        </div>
                    <Upload {...props}>
                        <Button
                            
                        >
                            <UploadOutlined />Click to upload
                        </Button>
                        </Upload>
                </Grid> */}
                <Grid item md={3} sm={5}>
                    <DayreportDropDown label="Class" className="w-75"
                          option={this.props.GetClassList &&
                          this.props.GetClassList.map((val) => {return({name:val.classname,id:val.classId})})}
                          changeData={(data) =>
                            this.changeDynamic(data, "Class")
                          }
                          value={
                            this.state.TradeOpp_Filed_data.Class.value
                          }
                          error={
                            this.state.TradeOpp_Filed_data.Class.error
                          }
                          errmsg={
                            this.state.TradeOpp_Filed_data.Class.errmsg
                          }/>
                </Grid>
                
                <Grid item md={3} sm={5}>
                    <Inputantd label={"Application Number"} className="w-75"
                    changeData={(data) =>
                      this.changeDynamic(data, "app_no")
                    }
                    value={
                      this.state.TradeOpp_Filed_data.app_no.value
                    }
                    error={
                      this.state.TradeOpp_Filed_data.app_no.error
                    }
                    errmsg={
                      this.state.TradeOpp_Filed_data.app_no.errmsg
                    }/>
                </Grid>  
                <Grid item md={3} sm={5}>
                <Calenderbox label={"Application Date"} className="w-75"
                        changeData={(data) => this.changeDynamic(data, 'application_date')}
                        value={this.state.TradeOpp_Filed_data.application_date.value}
                        error={this.state.TradeOpp_Filed_data.application_date.error}
                        errmsg={this.state.TradeOpp_Filed_data.application_date.errmsg} />
                </Grid>              
                <Grid item md={3} sm={5}>
                    <Inputantd label={"TMJ Number"} className="w-75"
                    changeData={(data) =>
                      this.changeDynamic(data, "tmj_no")
                    }
                    value={
                      this.state.TradeOpp_Filed_data.tmj_no.value
                    }
                    error={
                      this.state.TradeOpp_Filed_data.tmj_no.error
                    }
                    errmsg={
                      this.state.TradeOpp_Filed_data.tmj_no.errmsg
                    }/>
                </Grid>
                <Grid item md={3} sm={5}>
                    <Calenderbox label={"TNJ Date"} className="w-75"
                    changeData={(data) =>
                      this.changeDynamic(data, "tnj_date")
                    }
                    value={
                      this.state.TradeOpp_Filed_data.tnj_date.value
                    }
                    error={
                      this.state.TradeOpp_Filed_data.tnj_date.error
                    }
                    errmsg={
                      this.state.TradeOpp_Filed_data.tnj_date.errmsg
                    }/>
                </Grid>

                <Grid item md={3} sm={5}>
                    <Inputantd label={"Opposition Number"} className="w-75"
                    changeData={(data) =>
                      this.changeDynamic(data, "opp_no")
                    }
                    value={
                      this.state.TradeOpp_Filed_data.opp_no.value
                    }
                    error={
                      this.state.TradeOpp_Filed_data.opp_no.error
                    }
                    errmsg={
                      this.state.TradeOpp_Filed_data.opp_no.errmsg
                    }/>
                </Grid>
                <Grid item md={3} sm={5}>
                    <Inputantd label={"Applicant"} className="w-75"
                    changeData={(data) =>
                      this.changeDynamic(data, "application")
                    }
                    value={
                      this.state.TradeOpp_Filed_data.application.value
                    }
                    error={
                      this.state.TradeOpp_Filed_data.application.error
                    }
                    errmsg={
                      this.state.TradeOpp_Filed_data.application.errmsg
                    }/>
                </Grid>
                <Grid item md={3} sm={5}>
                    <Inputantd label={"Applicant agent"} className="w-75"
                    changeData={(data) =>
                      this.changeDynamic(data, "applicant_agent")
                    }
                    value={
                      this.state.TradeOpp_Filed_data.applicant_agent.value
                    }
                    error={
                      this.state.TradeOpp_Filed_data.applicant_agent.error
                    }
                    errmsg={
                      this.state.TradeOpp_Filed_data.applicant_agent.errmsg
                    }/>
                </Grid>
                <Grid item md={3} sm={5}>
                    <Inputantd label={"Internal Status"} className="w-75"
                    changeData={(data) =>
                      this.changeDynamic(data, "status_two")
                    }
                    value={
                      this.state.TradeOpp_Filed_data.status_two.value
                    }
                    error={
                      this.state.TradeOpp_Filed_data.status_two.error
                    }
                    errmsg={
                      this.state.TradeOpp_Filed_data.status_two.errmsg
                    }/>
                </Grid>
                <Grid item md={3} sm={5}>
                    <Calenderbox label={"Deadline"} className="w-75"
                    changeData={(data) =>
                      this.changeDynamic(data, "deadline")
                    }
                    value={
                      this.state.TradeOpp_Filed_data.deadline.value
                    }
                    error={
                      this.state.TradeOpp_Filed_data.deadline.error
                    }
                    errmsg={
                      this.state.TradeOpp_Filed_data.deadline.errmsg
                    }/>
                </Grid>
                <Grid item md={3} sm={5}>
                    <Calenderbox label={"Hearing Notice"} className="w-75"
                    changeData={(data) =>
                      this.changeDynamic(data, "hearing_notice")
                    }
                    value={
                      this.state.TradeOpp_Filed_data.hearing_notice.value
                    }
                    error={
                      this.state.TradeOpp_Filed_data.hearing_notice.error
                    }
                    errmsg={
                      this.state.TradeOpp_Filed_data.hearing_notice.errmsg
                    }/>
                </Grid>                
                <Grid item md={3} sm={5}>
                    <Calenderbox label={"Further Action"} className="w-75"
                    changeData={(data) =>
                      this.changeDynamic(data, "further_action")
                    }
                    value={
                      this.state.TradeOpp_Filed_data.further_action.value
                    }
                    error={
                      this.state.TradeOpp_Filed_data.further_action.error
                    }
                    errmsg={
                      this.state.TradeOpp_Filed_data.further_action.errmsg
                    }/>
                </Grid>

                <Grid item md={3} sm={5} className="interfil_update" >
                <div className="flex">
                  <label className="mr-1 mt-1">Order</label>

                </div>
                <Upload 
                  action= 'https://www.mocky.io/v2/5cc8019d300000980a055e76'
                  onChange= {(info)=>this.handleChange(info,"fileListorder") } 
                  fileList={this.state.fileListorder}>
                  <Button>
                    <UploadOutlined />Click to upload
                        </Button>
                </Upload>
              </Grid>

                {/* <Grid item md={3} sm={5}>
                    <Inputantd label={"Order"} className="w-75"
                    changeData={(data) =>
                      this.changeDynamic(data, "order")
                    }
                    value={
                      this.state.TradeOpp_Filed_data.order.value
                    }
                    error={
                      this.state.TradeOpp_Filed_data.order.error
                    }
                    errmsg={
                      this.state.TradeOpp_Filed_data.order.errmsg
                    }/>
                </Grid> */}
                {/* <Grid item md={3} sm={5}>
                    <Inputantd label={"Opponent"} className="w-75"
                    changeData={(data)=>this.changeDynamic(data,'opponent')} 
                    value={this.state.TradeOpp_Filed_data.opponent.value} 
                    error={this.state.TradeOpp_Filed_data.opponent.error} 
                    errmsg={this.state.TradeOpp_Filed_data.opponent.errmsg}/>
                </Grid>
                <Grid item md={3} sm={5}>
                    <Inputantd label={"Opponent agent"} className="w-75"
                    changeData={(data)=>this.changeDynamic(data,'opponent_agent')} 
                    value={this.state.TradeOpp_Filed_data.opponent_agent.value} 
                    error={this.state.TradeOpp_Filed_data.opponent_agent.error} 
                    errmsg={this.state.TradeOpp_Filed_data.opponent_agent.errmsg}/>
                </Grid> */}

              {status==="editable"&&
                  <>
                  <Grid item md={6} sm={5}>
                  </Grid>
                  <Grid item >
                    <Button className="btnwidth btnclr filed_topalign"  onClick={()=>this.update()}>Update</Button>
                  </Grid>
                  </>
              }
        </Grid>

    
        </div>

        <div className="border_edit"/>
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

                                    changeData={(data) =>
                                    this.changeDynamic(data, "Stages")
                                    }
                                    value={
                                    this.state.TradeOpp_Filed_data.Stages.value
                                    }
                                    error={
                                    this.state.TradeOpp_Filed_data.Stages.error
                                    }
                                    errmsg={
                                    this.state.TradeOpp_Filed_data.Stages.errmsg
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
                                    changeData={(data) =>
                                    this.changeDynamic(data, "sub_stages")
                                    }
                                    value={
                                    this.state.TradeOpp_Filed_data.sub_stages.value
                                    }
                                    error={
                                    this.state.TradeOpp_Filed_data.sub_stages.error
                                    }
                                    errmsg={
                                    this.state.TradeOpp_Filed_data.sub_stages.errmsg
                                    }
                                    className="w-75"
                                ></Dropdownantd>
                        </Grid>
                        <Grid item md={3} sm={5}>
                            <Calenderbox label={"Statutory Deadline"} className="w-75"
                            disabled={true}
                            changeData={(data)=>this.changeDynamic(data,'date')} 
                            value={status==="editable" ? this.state.TradeOpp_Filed_data.date.value:this.state.TradeOpp_Filed_data.application_date.value} 
                            error={this.state.TradeOpp_Filed_data.date.error} 
                            errmsg={this.state.TradeOpp_Filed_data.date.errmsg}/>
                        </Grid>
                        <Grid item md={3} sm={5}>
                          <div className="hearing_parent">
                            <Calenderbox label={"Filing Date"} className="w-75"
                            changeData={(data)=>this.changeDynamic(data,'hearing_date')} 
                            value={this.state.TradeOpp_Filed_data.hearing_date.value} 
                            error={this.state.TradeOpp_Filed_data.hearing_date.error} 
                            errmsg={this.state.TradeOpp_Filed_data.hearing_date.errmsg}/>
                            <AddCircleOutline className="hearing_add" onClick={this.checkValidation}/>
                          </div>
                        </Grid>

                    </Grid>
            </div>

                <div className="table_info_par">

                    <div>
                        <InternationalList  callSubStage={this.state.callSubStage} TrdoId={this.state.TrdoId} endpoint={"viewtrademarkoppItems"} trademark={"filed"} />
                    </div>

                    </div>
        </>
        </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    console.log("state in trademark opposition", state);
  
    return {
      GetStatusList:state.trademarkopp.getStatusList,
      GetClassList:state.trademarkopp.getClassList,
      GetStageList:state.trademarkopp.getstageList,
      GetsubStageList:state.trademarkopp.getsubStageList,
      employeeList:state.fixers.employees,
      clientList:state.fixers.clients,
      ProjectName:state.tradeapp.getprojectName
    };
  };
  export default connect(mapStateToProps, {
    getStatuslist,getClassList,getClient,getEmployees,getStagelist,getSubStagelist,getProjectName
  })(FiledOpposition);