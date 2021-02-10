import React from "react";
import "./TrademarkApplication.css";
import Inputantd from "../../../../formcomponent/inputantd";
import Dropdownantd from "../../../../formcomponent/dropdownantd";
import Grid from "@material-ui/core/Grid";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import { IoMdInformationCircle } from "react-icons/io";
import { Popover } from "antd";
import { Tooltip } from "antd";
import { Table } from "antd";
import Calenderbox from "../../../../formcomponent/calenderbox";
import ValidationLibrary from "../.. /../../../../validationlibrary/validation";
import { getStatus,getAssociate,getClass,getOurReference,getCountry,getAllotment,getStages,getSubstages,getClientName, getProjectName } from "./TradeAppAction/TradeAppAction";
import { connect } from "react-redux";
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, Icon, message,notification } from 'antd';
import { apiurl } from "../../../../App";
import moment from 'moment'
import InternationalList from './InternationalList'

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
      console.log(fileListData[0].originFileObj,"file")
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
    substage: "Formality Check Fail Yes",
    date: "18 July 2020",
    actualdate: "18 July 2020",
  },
];

const content = (
  <div>
    <p className="popover_content_edit">+ 4Days</p>
  </div>
);
class InternationalFiling extends React.Component {
  state = {
    tags: [],
    inputVisible: false,
    inputValue: "",
    errordummy: true,
    TradeApp_Inter_data: {
      projectname:{
        value: "",
        validation: [],
        error: null,
        errmsg: null,
      },
      status: {
        value: "",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
      },
      ass_ref: {
        value: "",
        validation: [],
        error: null,
        errmsg: null,
      },
      class: {
        value: "",
        validation: [],
        error: null,
        errmsg: null,
      },
      our_reference: {
        value: "",
        validation: [],
        error: null,
        errmsg: null,
      },
      trade_client: {
        value: "",
        validation: [],
        error: null,
        errmsg: null,
      },
      mark: {
        value: "",
        validation: [],
        error: null,
        errmsg: null,
      },
      associate: {
        value: "",
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
      application_num: {
        value: "",
        validation: [],
        error: null,
        errmsg: null,
      },
      country: {
        value: "",
        validation: [],
        error: null,
        errmsg: null,
      },
      priority: {
        value: "",
        validation: [],
        error: null,
        errmsg: null,
      },
      user_claim: {
        value: "",
        validation: [],
        error: null,
        errmsg: null,
      },
      allotment: {
        value: "",
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
        value: "",
        validation: [],
        error: null,
        errmsg: null,
      },
      goods_services: {
        value: "",
        validation: [],
        error: null,
        errmsg: null,
      },
      date: {
        value: "",
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

  checkValidation = () => {
    var mainvalue = {};
    var TradeApp_Inter_data = this.state.TradeApp_Inter_data;
    var targetkeys = Object.keys(TradeApp_Inter_data);
    console.log(targetkeys, "targetkeys");
    for (var i in targetkeys) {
      var errorcheck = ValidationLibrary.checkValidation(
        TradeApp_Inter_data[targetkeys[i]].value,
        TradeApp_Inter_data[targetkeys[i]].validation
      );
      console.log(errorcheck, "errorcheck");
      TradeApp_Inter_data[targetkeys[i]].error = !errorcheck.state;
      TradeApp_Inter_data[targetkeys[i]].errmsg = errorcheck.msg;
      mainvalue[targetkeys[i]] = TradeApp_Inter_data[targetkeys[i]].value;
    }
    var filtererr = targetkeys.filter(
      (obj) => TradeApp_Inter_data[obj].error == true
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
      TradeApp_Inter_data,
    });
  };

    updateSubstage=()=>{

      // var Stages = this.props.interStages.filter((data,index)=>{
      //   return(data.Type === "International" && data.Template === "Trademark")
      // }).filter((val,index)=>{
      //   if(index == this.state.TradeApp_Inter_data.stages.value-1){
      //     return val.ProjectTemplateId
      //   }
      // })
  
      // var sub_stages = this.props.interSubStages.filter((data,index)=>{
      //   return(data.Type === "International" && data.Template === "Trademark")
      // }).filter((val,index)=>{
      //   if(index == this.state.TradeApp_Inter_data.sub_stages.value-1){
      //     return val.ProjectTemplateId
      //   }
      // })

      if(typeof this.state.TradeApp_Inter_data.stages.value === 'string'){
        var Stages = this.props.interStages.filter((data,index)=>{
          return(data.Type === "International" && data.Template === "Trademark")
        }).filter((val,index)=>{
          if(val.Stage === this.state.TradeApp_Inter_data.stages.value){
            return val.ProjectTemplateId
          }
        })
      }else{
        var Stages = this.props.interStages.filter((data,index)=>{
          return(data.Type === "International" && data.Template === "Trademark")
        }).filter((val,index)=>{
          if(index == this.state.TradeApp_Inter_data.stages.value-1){
            return val.ProjectTemplateId
          }
        })
  
      }
  
  
      if(typeof this.state.TradeApp_Inter_data.sub_stages.value === 'string'){
        var sub_stages = this.props.interSubStages.filter((data,index)=>{
          return(data.Type === "International" && data.Template === "Trademark")
        }).filter((val,index)=>{
          if(val.Substage == this.state.TradeApp_Inter_data.sub_stages.value){
            return val.ProjectTemplateId
          }
        })
      }else{
        var sub_stages = this.props.interSubStages.filter((data,index)=>{
          return(data.Type === "International" && data.Template === "Trademark")
        }).filter((val,index)=>{
          if(index == this.state.TradeApp_Inter_data.sub_stages.value-1){
            return val.ProjectTemplateId
          }
        })
      }

    var self = this

    var myObject = {
      trId:this.state.TrdoId,
      "stages": Stages[0].ProjectTemplateId,
  }

  this.state.TradeApp_Inter_data.sub_stages.value && Object.assign(myObject, {"Substages":sub_stages[0].ProjectTemplateId})
  this.state.TradeApp_Inter_data.date.value && Object.assign(myObject, { "date":this.state.TradeApp_Inter_data.date.value?moment(this.state.TradeApp_Inter_data.date.value).format('YYYY-MM-DD'):""})
  this.state.TradeApp_Inter_data.hearing_date.value && Object.assign(myObject, {"hearingdate":this.state.TradeApp_Inter_data.hearing_date.value? moment(this.state.TradeApp_Inter_data.hearing_date.value).format('YYYY-MM-DD'):""})

    axios({
      method: 'put',
      url: apiurl + "/updateappItems",
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

  insert=()=>{

    var Stages = this.props.interStages.filter((data,index)=>{
      return(data.Type === "International" && data.Template === "Trademark")
    }).filter((val,index)=>{
      if(index == this.state.TradeApp_Inter_data.stages.value-1){
        return val.ProjectTemplateId
      }
    })

    var sub_stages = this.props.interSubStages.filter((data,index)=>{
      return(data.Type === "International" && data.Template === "Trademark")
    }).filter((val,index)=>{
      if(index == this.state.TradeApp_Inter_data.sub_stages.value-1){
        return val.ProjectTemplateId
      }
    })

    var calcaulateTDays = this.state.projectList.filter((data,index)=>{
      return(data.Type === "International" && data.Template === "Trademark")
    })

    var self = this;
        var formData=new FormData();
        this.state.TradeApp_Inter_data.projectname.value && formData.set("projectname", this.state.TradeApp_Inter_data.projectname.value);
        this.state.TradeApp_Inter_data.status.value && formData.set("status",this.state.TradeApp_Inter_data.status.value);
        this.state.TradeApp_Inter_data.ass_ref.value && formData.set ("assref",this.state.TradeApp_Inter_data.ass_ref.value);
        this.state.TradeApp_Inter_data.our_reference.value && formData.set("ourReference",this.state.TradeApp_Inter_data.our_reference.value);
        this.state.TradeApp_Inter_data.class.value && formData.set("class",this.state.TradeApp_Inter_data.class.value);
        this.state.TradeApp_Inter_data.trade_client.value && formData.set ("client",this.state.TradeApp_Inter_data.trade_client.value);
        this.state.TradeApp_Inter_data.mark.value && formData.set( "mark",this.state.TradeApp_Inter_data.mark.value);
        this.state.TradeApp_Inter_data.associate.value && formData.set("associateId",this.state.TradeApp_Inter_data.associate.value);
        this.state.TradeApp_Inter_data.application_date.value && formData.set("Appdate",moment(this.state.TradeApp_Inter_data.application_date.value).format('YYYY-MM-DD'));
        this.state.TradeApp_Inter_data.country.value && formData.set("country",this.state.TradeApp_Inter_data.country.value);
        this.state.TradeApp_Inter_data.priority.value && formData.set("priorityDetails",this.state.TradeApp_Inter_data.priority.value);
        this.state.TradeApp_Inter_data.application_num.value && formData.set("AppNo",this.state.TradeApp_Inter_data.application_num.value);
        this.state.TradeApp_Inter_data.user_claim.value && formData.set("userclaim",this.state.TradeApp_Inter_data.user_claim.value);
        this.state.TradeApp_Inter_data.allotment.value && formData.set("allotment",this.state.TradeApp_Inter_data.allotment.value);
        this.state.TradeApp_Inter_data.goods_services.value && formData.set("Goodsandservicedescription",this.state.TradeApp_Inter_data.goods_services.value);
        this.state.TradeApp_Inter_data.stages.value && formData.set("Stages",Stages[0].ProjectTemplateId);
        this.state.TradeApp_Inter_data.sub_stages.value && formData.set("SubStages",sub_stages[0].ProjectTemplateId);
        // this.state.TradeApp_Inter_data.date.value && formData.set("Date",moment(this.state.TradeApp_Inter_data.date.value).format('YYYY-MM-DD'));
        formData.set("date",this.state.TradeApp_Inter_data.application_date.value ? moment(moment(this.state.TradeApp_Inter_data.application_date.value, "YYYY-MM-DD").add(calcaulateTDays[0].TDays ? calcaulateTDays[0].TDays : 0, 'days')).format('YYYY-MM-DD'): "");
        this.state.fileListimg && formData.append('imageArray',this.state.fileListimg?this.state.fileListimg[0].originFileObj:"")
        this.state.TradeApp_Inter_data.hearing_date.value && formData.set("hearingdate",moment(this.state.TradeApp_Inter_data.hearing_date.value).format('YYYY-MM-DD'))
          axios({
        method: "post",
        url: apiurl + "/addtrademark",
        data: formData,
      }) .then(function (response) {
        console.log(response.data.data, "responseresponse");
        notification.warning({
          message: `Trademark International Filing Application has submitted successfully`,
          duration: 3.5,
          placement: "topRight",
          className: "notification_dayreport",
        });
            // self.state.TradeApp_Inter_data.stages.value = ""
            // self.state.TradeApp_Inter_data.status.value = ""
            // self.state.TradeApp_Inter_data.sub_stages.value = ""
            // self.state.TradeApp_Inter_data.trade_client.value = ""
            // self.state.TradeApp_Inter_data.user_claim.value = ""
            // self.state.TradeApp_Inter_data.allotment.value = ""
            // self.state.TradeApp_Inter_data.application_num.value = ""
            // self.state.TradeApp_Inter_data.ass_ref.value = ""
            // self.state.TradeApp_Inter_data.associate.value = ""
            // self.state.TradeApp_Inter_data.class.value = ""
            // self.state.TradeApp_Inter_data.country.value = ""
            // self.state.TradeApp_Inter_data.date.value = ""
            // self.state.TradeApp_Inter_data.mark.value = ""
            // self.state.TradeApp_Inter_data.our_reference.value = ""
            // self.state.TradeApp_Inter_data.priority.value = ""
            // self.state.TradeApp_Inter_data.goods_services.value=""
            // self.state.TradeApp_Inter_data.application_date.value=""
            self.setState({afterInsert:true,TrdoId:response.data.data});
          })
  
  }


  Cancel=()=>{
    this.state.TradeApp_Inter_data.application_num.value=""
    this.state.TradeApp_Inter_data.ass_ref.value=""
    this.state.TradeApp_Inter_data.associate.value=""
    this.state.TradeApp_Inter_data.class.value=""
    this.state.TradeApp_Inter_data.country.value=""
    this.state.TradeApp_Inter_data.date.value=""
    this.state.TradeApp_Inter_data.mark.value=""
    this.state.TradeApp_Inter_data.our_reference.value=""
    this.state.TradeApp_Inter_data.priority.value=""
    this.state.TradeApp_Inter_data.stages.value=""
    this.state.TradeApp_Inter_data.status.value=""
    this.state.TradeApp_Inter_data.sub_stages.value=""
    this.state.TradeApp_Inter_data.trade_client.value=""
    this.state.TradeApp_Inter_data.user_claim.value=""
    this.state.TradeApp_Inter_data.user_claim.value=""
    this.state.TradeApp_Inter_data.goods_services.value=""
    this.state.TradeApp_Inter_data.application_date.value=""
    this.setState({})
  }
    
  changeDynamic = (data, key) => {
    console.log("key", key);
    console.log("data", data);

    const params = new URLSearchParams(window.location.search)
    const status = params.get("status")

    if(key==="stages" && status){

      var Stages = this.props.interStages.filter((data,index)=>{
        return(data.Template==='Trademark' && data.Process ==='Application' && data.Type==="International")
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
        this.state.TradeApp_Inter_data.date.value = moment(moment(this.state.TrademarkItems[this.state.TrademarkItems.length-1].HearingDate, "YYYY-MM-DD").add( datevalue ? datevalue.TDays : 0, 'days'))
    }

    var TradeApp_Inter_data = this.state.TradeApp_Inter_data;
    var targetkeys = Object.keys(TradeApp_Inter_data);
    var errorcheck = ValidationLibrary.checkValidation(
      data,
      TradeApp_Inter_data[key].validation
    );
    TradeApp_Inter_data[key].value = data;
    TradeApp_Inter_data[key].error = !errorcheck.state;
    TradeApp_Inter_data[key].errmsg = errorcheck.msg;
    this.setState({ TradeApp_Inter_data });
    var filtererr = targetkeys.filter(
      (obj) =>
        TradeApp_Inter_data[obj].error == true ||
        TradeApp_Inter_data[obj].error == null
    );
    if (filtererr.length > 0) {
      this.setState({ error: true, errordummy: false });
    } else {
      this.setState({ error: false });
    }
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
                  if(value.Template==='Trademark' && value.Process ==='Application'&&value.Type==="International"){
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
                response.data.data[1].International.filter((data, index) => {
      
      
                  if (data.TrId == userid) {
                  self.state.TradeApp_Inter_data.projectname.value = data.ProjectName === "null" ? "" : data.ProjectName
                  self.state.TradeApp_Inter_data.stages.value=projectList[data.trn_trademarkoppitems.length] && projectList[data.trn_trademarkoppitems.length].Stage
                  self.state.TradeApp_Inter_data.sub_stages.value=projectList[data.trn_trademarkoppitems.length] && projectList[data.trn_trademarkoppitems.length].Substage
                  self.state.TradeApp_Inter_data.date.value=moment(moment(data.trn_trademarkoppitems[data.trn_trademarkoppitems.length-1].HearingDate, "YYYY-MM-DD").add(projectList[data.trn_trademarkoppitems.length] && projectList[data.trn_trademarkoppitems.length].TDays ? projectList[data.trn_trademarkoppitems.length].TDays : 0, 'days'))
      
                  self.state.TradeApp_Inter_data.status.value = data.Status === "null" ? "" : data.Status 
                  self.state.TradeApp_Inter_data.ass_ref.value = data.Assref === "null" ? "" : data.Assref
                  self.state.TradeApp_Inter_data.our_reference.value = data.OurReference === "null" ? "" : data.OurReference
                  self.state.TradeApp_Inter_data.class.value = data.classname === "null" ? "" : data.classname
                  self.state.TradeApp_Inter_data.goods_services.value= data.Goodsandservicedescription === "null" ? "" : data.Goodsandservicedescription
                  self.state.TradeApp_Inter_data.trade_client.value = data.ClientName === "null" ? "" : data.ClientName
                  self.state.TradeApp_Inter_data.mark.value = data.Mark === "null" ? "" : data.Mark
                  self.state.TradeApp_Inter_data.associate.value = data.Associate === "null" ? "" : data.Associate
                  self.state.TradeApp_Inter_data.application_date.value= data.Appdate === "null" ? "" : moment(data.Appdate)
                  self.state.TradeApp_Inter_data.application_num.value = data.Appno === "null" ? "" : data.Appno
                  self.state.TradeApp_Inter_data.country.value = data.Country === "null" ? "" : data.Country
                  self.state.TradeApp_Inter_data.priority.value = data.PriorityDetails === "null" ? "" : data.PriorityDetails
                  self.state.TradeApp_Inter_data.user_claim.value = data.UserClaim === "null" ? "" : data.UserClaim
                  self.state.TradeApp_Inter_data.allotment.value = data.AllotmentId === "null" ? "" : data.AllotmentId
      
                    self.setState({TrademarkItems:data.trn_trademarkoppitems,TrdoId:data.TrId,fileListimg:data.File === null ? "" :[
                      {
                        uid: '-1',
                        name: data.File?data.File.slice(35):"",
                        status: 'done',
                        url: data.File?data.File:"",
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

    var status = this.state.TradeApp_Inter_data.status.value


    if(!Number(this.state.TradeApp_Inter_data.status.value)){
     var status = this.props.interStatus.find((val) => {
        if(status==val.Status){
          return val.StatusId 
        }
       }
       )
    }

    var ass_reference = this.state.TradeApp_Inter_data.ass_ref.value

    if(!Number(this.state.TradeApp_Inter_data.ass_ref.value)){
     var ass_reference = this.props.interReference.find((val) => {
        if(ass_reference==val.EmpFirstName){
          return val.EmpId 
        }
       }
       )
    }


    var our_reference = this.state.TradeApp_Inter_data.our_reference.value

    if(!Number(this.state.TradeApp_Inter_data.our_reference.value)){
     var our_reference = this.props.interReference.find((val) => {
        if(our_reference==val.EmpFirstName){
          return val.EmpId 
        }
       }
       )
    }

    var classDrop = this.state.TradeApp_Inter_data.class.value

    if(!Number(this.state.TradeApp_Inter_data.class.value)){
     var classDrop = this.props.interClass.find((val) => {
        if(classDrop==val.classname){
          return val.classId 
        }
       }
       )
    }

    var clientId = this.state.TradeApp_Inter_data.trade_client.value

    if(!Number(this.state.TradeApp_Inter_data.trade_client.value)){
     var clientId = this.props.indiaClientName.find((val) => {
        if(clientId==val.ClientName){
          return val.ClientId 
        }
       }
       )
    }

    var associate = this.state.TradeApp_Inter_data.associate.value


    if(!Number(this.state.TradeApp_Inter_data.associate.value)){
     var associate = this.props.interReference.find((val) => {
        if(associate==val.EmpFirstName){
          return val.EmpId 
        }
       }
       )
    }
    
    var country = this.state.TradeApp_Inter_data.country.value


    if(!Number(this.state.TradeApp_Inter_data.country.value)){
     var country = this.props.interCountry.find((val) => {
        if(country==val.CounName){
          return val.CounId 
        }
       }
       )
    }

    // var allotment = this.state.TradeApp_Inter_data.allotment.value


    // if(!Number(this.state.TradeApp_Inter_data.allotment.value)){
    //  var allotment = this.props.interAllotement.find((val) => {
    //     if(allotment==val.Allotment){
    //       return val.AllotmentId 
    //     }
    //    }
    //    )
    // }

    // await this.props.getStatus();
    // await this.props.getAssociate();
    // await this.props.getClass();
    // await this.props.getOurReference();
    // await this.props.getCountry();
    // await this.props.getAllotment();
    // await this.props.getStages();
    // await this.props.getSubstages();

    console.log(status,"statusstatus")


    var formData=new FormData();
    this.state.TradeApp_Inter_data.status.value && formData.set("status",!Number(this.state.TradeApp_Inter_data.status.value)?status && status.StatusId:status);
    this.state.TradeApp_Inter_data.ass_ref.value && formData.set ("assref",!Number(this.state.TradeApp_Inter_data.ass_ref.value)?ass_reference.EmpId:ass_reference);
    this.state.TradeApp_Inter_data.our_reference.value && formData.set("ourReference",!Number(this.state.TradeApp_Inter_data.our_reference.value)?our_reference.EmpId:our_reference);
    this.state.TradeApp_Inter_data.class.value && formData.set("class",!Number(this.state.TradeApp_Inter_data.class.value)?classDrop.classId:classDrop);
    this.state.TradeApp_Inter_data.trade_client.value && formData.set ("client",!Number(this.state.TradeApp_Inter_data.trade_client.value)?clientId.ClientId:clientId);
    this.state.TradeApp_Inter_data.mark.value && formData.set( "mark",this.state.TradeApp_Inter_data.mark.value);
    this.state.TradeApp_Inter_data.associate.value && formData.set("associateId",!Number(this.state.TradeApp_Inter_data.associate.value)?associate.EmpId:associate);
    this.state.TradeApp_Inter_data.application_date.value && formData.set("Appdate",moment(this.state.TradeApp_Inter_data.application_date.value).format('YYYY-MM-DD'));
    this.state.TradeApp_Inter_data.country.value && formData.set("country",!Number(this.state.TradeApp_Inter_data.country.value)?country.CounId:country);
    this.state.TradeApp_Inter_data.priority.value && formData.set("priorityDetails",this.state.TradeApp_Inter_data.priority.value);
    this.state.TradeApp_Inter_data.application_num.value && formData.set("AppNo",this.state.TradeApp_Inter_data.application_num.value);
    this.state.TradeApp_Inter_data.user_claim.value && formData.set("userclaim",this.state.TradeApp_Inter_data.user_claim.value);
    this.state.TradeApp_Inter_data.allotment.value && formData.set("allotment",this.state.TradeApp_Inter_data.allotment.value);
    this.state.TradeApp_Inter_data.goods_services.value && formData.set("Goodsandservicedescription",this.state.TradeApp_Inter_data.goods_services.value);
    // this.state.TradeApp_Inter_data.stages.value && formData.set("Stages",this.state.TradeApp_Inter_data.stages.value);
    // this.state.TradeApp_Inter_data.sub_stages.value && formData.set("SubStages",this.state.TradeApp_Inter_data.sub_stages.value);
    // this.state.TradeApp_Inter_data.date.value && formData.set("Date",moment(this.state.TradeApp_Inter_data.date.value).format('YYYY-MM-DD'));
    this.state.fileListimg[0] && formData.append('imageArray',this.state.fileListimg && this.state.fileListimg[0] ?this.state.fileListimg[0].originFileObj:"")
    // this.state.TradeApp_Inter_data.hearing_date.value && formData.set("hearingdate",moment(this.state.TradeApp_Inter_data.hearing_date.value).format('YYYY-MM-DD'))
    formData.set("trId", this.state.TrdoId);


    axios({
      method: 'put',
      url: apiurl + "/updatetrademark",
      data:formData
    })
      .then(function (response) {
        notification.warning({
          message: `Trademark International Filing Application has updated successfully`,
          duration: 3.5,
          placement: "topRight",
          className: "notification_dayreport",
        });
        })
  }

  // usertabledata=(data)=>{
  //   console.log(data[data.length-1].stages,"usertabledatadata")
  //   if(data && this.state.ipdatatrue){
  //  this.state.TradeApp_Inter_data.IpIndiaStatus.value=data[data.length-1].stages
  //  this.setState({ipdatatrue:false})
  //   }
    
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
    const params = new URLSearchParams(window.location.search)
    const status = params.get("status")

    var stageArr = []
    var stageArrId = []

    this.props.interStages && this.props.interStages.map((data)=>{
      if(data.Template==='Trademark' && data.Process ==='Application'&&data.Type==="International"){
        stageArr.push(data.Stage)
        stageArrId.push(data.ProjectTemplateId)
    }})

    var subStageArr = []
    var subStageArrId = []

    this.props.interSubStages && this.props.interSubStages.map((data)=>{
      if(data.Template==='Trademark' && data.Process ==='Application'&&data.Type==="International"){
        data.Substage !== '' && subStageArr.push(data.Substage)
        data.Substage !== '' && subStageArrId.push(data.ProjectTemplateId)
    }})
    

    return (
      <React.Fragment>
        <>
          {/* Grid content Start */}
          <div className="InterFiling_main">
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
                value={this.state.TradeApp_Inter_data.projectname.value}
                error={this.state.TradeApp_Inter_data.projectname.error}
                errmsg={this.state.TradeApp_Inter_data.projectname.errmsg}
              />

              </Grid>
              <Grid item md={3} sm={5}>
                <Dropdownantd
                  label={"Status"}
                  className="w-75"
                  option={
                    this.props.interStatus &&
                    this.props.interStatus.map((val) => val.Status)
                  }
                  changeData={(data) =>
                    this.changeDynamic(data, "status")
                  }
                  value={
                    this.state.TradeApp_Inter_data.status.value
                  }
                  error={
                    this.state.TradeApp_Inter_data.status.error
                  }
                  errmsg={
                    this.state.TradeApp_Inter_data.status.errmsg
                  }
                />
              </Grid>
              <Grid item md={3} sm={5}>
                <Dropdownantd
                  label={"Associate Reference"}  
                  option={
                    this.props.interReference &&
                    this.props.interReference.map((val) => val.EmpFirstName)
                  }                
                  changeData={(data) =>
                    this.changeDynamic(data, "ass_ref")
                  }
                  value={
                    this.state.TradeApp_Inter_data.ass_ref.value
                  }
                  error={
                    this.state.TradeApp_Inter_data.ass_ref.error
                  }
                  errmsg={
                    this.state.TradeApp_Inter_data.ass_ref.errmsg
                  }
                  className="w-75"
                />
              </Grid>
              <Grid item md={3} sm={5}>
                <Dropdownantd
                  label={"Our Reference"}
                  option={
                    this.props.interReference &&
                    this.props.interReference.map((val) => val.EmpFirstName)
                  }
                  changeData={(data) =>
                    this.changeDynamic(data, "our_reference")
                  }
                  value={
                    this.state.TradeApp_Inter_data.our_reference.value
                  }
                  error={
                    this.state.TradeApp_Inter_data.our_reference.error
                  }
                  errmsg={
                    this.state.TradeApp_Inter_data.our_reference.errmsg
                  }
                  className="w-75"
                ></Dropdownantd>
              </Grid>
              <Grid item md={3} sm={5}>
                <Dropdownantd
                  label={"Class"}
                  option={
                    this.props.interClass &&
                    this.props.interClass.map((val) => val.classname)
                  }
                  changeData={(data) =>
                    this.changeDynamic(data, "class")
                  }
                  value={
                    this.state.TradeApp_Inter_data.class.value
                  }
                  error={
                    this.state.TradeApp_Inter_data.class.error
                  }
                  errmsg={
                    this.state.TradeApp_Inter_data.class.errmsg
                  }
                  className="w-75"
                ></Dropdownantd>
              </Grid>
              <Grid item md={3} sm={5} className="mt-3">
                <Inputantd label={"Goods and Service Description"} className="w-75"
                 changeData={(data) => this.changeDynamic(data, 'goods_services')}
                 value={this.state.TradeApp_Inter_data.goods_services.value}
                 error={this.state.TradeApp_Inter_data.goods_services.error}
                 errmsg={this.state.TradeApp_Inter_data.goods_services.errmsg} />
              </Grid>

              <Grid item md={3} sm={5} className="mt-3">
                <Dropdownantd
                  label={"Client"}
                  option={
                    this.props.indiaClientName &&
                    this.props.indiaClientName.map((val) => val.ClientName)
                  }
                  changeData={(data) =>
                    this.changeDynamic(data, "trade_client")
                  }
                  value={
                    this.state.TradeApp_Inter_data.trade_client.value
                  }
                  error={
                    this.state.TradeApp_Inter_data.trade_client.error
                  }
                  errmsg={
                    this.state.TradeApp_Inter_data.trade_client.errmsg
                  }
                  className="w-75"
                />
              </Grid>
              <Grid item md={3} sm={5} className="mt-3">
                <Inputantd label={"Mark"} className="w-75"
                   changeData={(data) => this.changeDynamic(data, 'mark')}
                   value={this.state.TradeApp_Inter_data.mark.value}
                   error={this.state.TradeApp_Inter_data.mark.error}
                   errmsg={this.state.TradeApp_Inter_data.mark.errmsg}
                ></Inputantd>
              </Grid>

              {/* <Grid item md={3} sm={5} className="interfil_update mt-3 ">
                        <div className="flex">
                        <label  className="mr-1">Upload</label>

                        </div>
                    <Upload {...props}>
                        <Button>
                            <UploadOutlined />Click to upload
                        </Button>
                        </Upload>
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
                <Dropdownantd label={"Associate"} className="w-75"
                        option={
                          this.props.interReference &&
                          this.props.interReference.map((val) => val.EmpFirstName)
                        }
                        changeData={(data) => this.changeDynamic(data, 'associate')}
                        value={this.state.TradeApp_Inter_data.associate.value}
                        error={this.state.TradeApp_Inter_data.associate.error}
                        errmsg={this.state.TradeApp_Inter_data.associate.errmsg} />
              </Grid>
              <Grid item md={3} sm={5}>
                <Calenderbox label={"Application Date"} className="w-75"
                        changeData={(data) => this.changeDynamic(data, 'application_date')}
                        value={this.state.TradeApp_Inter_data.application_date.value}
                        error={this.state.TradeApp_Inter_data.application_date.error}
                        errmsg={this.state.TradeApp_Inter_data.application_date.errmsg} />
              </Grid>
              <Grid item md={3} sm={5}>
                <Inputantd label={"Application Number"} className="w-75"
                        changeData={(data) => this.changeDynamic(data, 'application_num')}
                        value={this.state.TradeApp_Inter_data.application_num.value}
                        error={this.state.TradeApp_Inter_data.application_num.error}
                        errmsg={this.state.TradeApp_Inter_data.application_num.errmsg} />
              </Grid>
              <Grid item md={3} sm={5}>
                <Dropdownantd
                  label={"Country"}
                  option={
                    this.props.interCountry &&
                    this.props.interCountry.map((val) => val.CounName)
                  }
                  changeData={(data) =>
                    this.changeDynamic(data, "country")
                  }
                  value={
                    this.state.TradeApp_Inter_data.country.value
                  }
                  error={
                    this.state.TradeApp_Inter_data.country.error
                  }
                  errmsg={
                    this.state.TradeApp_Inter_data.country.errmsg
                  }
                  className="w-75"
                ></Dropdownantd>
              </Grid>
              <Grid item md={3} sm={5}>
                <Inputantd label={"Priority Details"} className="w-75"
                 changeData={(data) => this.changeDynamic(data, 'priority')}
                 value={this.state.TradeApp_Inter_data.priority.value}
                 error={this.state.TradeApp_Inter_data.priority.error}
                 errmsg={this.state.TradeApp_Inter_data.priority.errmsg} />
              </Grid>
              <Grid item md={3} sm={5}>
                <Inputantd label={"User Claim"} className="w-75"
                 changeData={(data) => this.changeDynamic(data, 'user_claim')}
                 value={this.state.TradeApp_Inter_data.user_claim.value}
                 error={this.state.TradeApp_Inter_data.user_claim.error}
                 errmsg={this.state.TradeApp_Inter_data.user_claim.errmsg} />
              </Grid>
              <Grid item md={3} sm={5}>
                <Inputantd
                  label={"Allotment"}
                  changeData={(data) =>
                    this.changeDynamic(data, "allotment")
                  }
                  value={
                    this.state.TradeApp_Inter_data.allotment.value
                  }
                  error={
                    this.state.TradeApp_Inter_data.allotment.error
                  }
                  errmsg={
                    this.state.TradeApp_Inter_data.allotment.errmsg
                  }
                  className="w-75"
                ></Inputantd>
              </Grid>
              {status==="editable"&&
                  <>
                  <Grid item md={9} sm={5}>
                  </Grid>
                  <Grid item >
                    <Button className="btnwidth btnclr internationalfilling_topalign"  onClick={()=>this.update()}>Update</Button>
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
                    changeData={(data) =>
                      this.changeDynamic(data, "stages")
                    }
                    disableto={this.state.TrademarkItems && this.state.TrademarkItems.length}
                    value={
                      this.state.TradeApp_Inter_data.stages.value
                    }
                    error={
                      this.state.TradeApp_Inter_data.stages.error
                    }
                    errmsg={
                      this.state.TradeApp_Inter_data.stages.errmsg
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
                      this.state.TradeApp_Inter_data.sub_stages.value
                    }
                    error={
                      this.state.TradeApp_Inter_data.sub_stages.error
                    }
                    errmsg={
                      this.state.TradeApp_Inter_data.sub_stages.errmsg
                    }
                    className="w-75"
                  ></Dropdownantd>
                </Grid>
                <Grid item md={3} sm={5}>
                  <Calenderbox label={"Statutory Deadline"} className="w-75"
                    changeData={(data) => this.changeDynamic(data, 'date')}
                    disabled={true}
                    value={status==="editable" ? this.state.TradeApp_Inter_data.date.value:this.state.TradeApp_Inter_data.application_date.value}
                  ></Calenderbox>
                </Grid>
                <Grid item md={3} sm={5}>
                <div className="d-flex">
                    <Calenderbox label={"Filing Date"} className="w-100"
                      changeData={(data) => this.changeDynamic(data, 'hearing_date')}
                      value={this.state.TradeApp_Inter_data.hearing_date.value}
                      error={this.state.TradeApp_Inter_data.hearing_date.error}
                      errmsg={this.state.TradeApp_Inter_data.hearing_date.errmsg}
                    ></Calenderbox>
                  <span className="circle_icon_edit">
                    <AddCircleOutline  onClick={this.checkValidation} className="Interfil_addicon" />
                  </span>
                  </div>
                </Grid>
              </Grid>
            </div>
            <InternationalList callSubStage={this.state.callSubStage} TrdoId={this.state.TrdoId} endpoint={"viewpreviousappItems"} trademark={"international"} />
          </div>
        </>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  console.log("stateeee", state);

  return {
    TradeApp_Inter_data: state.resumeReducer.TradeApp_Inter_data,
    interStatus: state.tradeapp.getTradestatus,
    interAssociate: state.tradeapp.getTradeassociate,
    interClass:state.tradeapp.getTradeclass,
    interReference:state.tradeapp.getTradeOurReference,
    interCountry:state.tradeapp.getTradecountry,
    interAllotement:state.tradeapp.getTradeallotment,
    interStages:state.tradeapp.getTradestages,
    interSubStages:state.tradeapp.getTradeSubstages,
    indiaClientName: state.tradeapp.getTradeClientname,
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
})(InternationalFiling);
