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
import { getStatus, getAssociate, getClass, getOurReference, getCountry, getAllotment, getStages, getSubstages, getUserDate, getClientName, getProjectName } from "./TradeAppAction/TradeAppAction";
import { connect } from "react-redux";
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, Icon, message, notification } from 'antd';
import { apiurl } from "../../../../App";
import moment from 'moment'
import InternationalList from './InternationalList'


const axios = require('axios');
var fileListData = [];
var PoaListData = [];
var OrderListData = [];

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
      console.log("asdfjkasdfjsd", info.fileList)
      message.success(`${info.file.name} file uploaded successfully`);
      fileListData = info.fileList;
      PoaListData = info.fileList;
      OrderListData = info.fileList
      console.log(fileListData[0].originFileObj, "file")
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
class IndiaFiling extends React.Component {
  state = {
    tags: [],
    inputVisible: false,
    inputValue: "",
    errordummy: true,
    ipdatatrue:true,
    insertOnlyFalse:true,
    TrademarkItems:[],
    TradeApp_India_data: {
      status: {
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
      class: {
        value: "",
        validation: [],
        error: null,
        errmsg: null,
      },

      App_date: {
        value: "",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
      },
      projectname:{
        value: "",
        validation: [],
        error: null,
        errmsg: null,
      },
      App_num: {
        value: "",
        validation: [],
        error: null,
        errmsg: null,
      },
      user_date: {
        value: "",
        validation: [],
        error: null,
        errmsg: null,
      },

      next_renewal: {
        value: "",
        validation: [],
        error: null,
        errmsg: null,
      },
      comments: {
        value: "",
        validation: [],
        error: null,
        errmsg: null,
      },

      int_status: {
        value: "",
        validation: [],
        error: null,
        errmsg: null,
      },
      IpIndiaStatus: {
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
      hearing_date: {
        value: "",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
      },
      trade_client: {
        value: "",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
      },
      mark: {
        value: "",
        validation: [],
        error: null,
        errmsg: null,
      },

      condition: {
        value: "",
        validation: [],
        error: null,
        errmsg: null,
      },
      tmj_num: {
        value: "",
        validation: [],
        error: null,
        errmsg: null,
      },
      tmj_date: {
        value: "",
        validation: [],
        error: null,
        errmsg: null,
      },
      journal_ex: {
        value: "",
        validation: [],
        error: null,
        errmsg: null,
      },

      certificate_date: {
        value: "",
        validation: [],
        error: null,
        errmsg: null,
      },

      goods: {
        value: "",
        validation: [],
        error: null,
        errmsg: null,
      },
      amandment: {
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
      renew_certificate_date: {
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
      date: {
        value: "",
        validation: [],
        error: null,
        errmsg: null,
      },


    },
  };

  checkValidation = () => {
    var mainvalue = {};
    var TradeApp_India_data = this.state.TradeApp_India_data;
    var targetkeys = Object.keys(TradeApp_India_data);
    console.log(targetkeys, "targetkeys");
    for (var i in targetkeys) {
      var errorcheck = ValidationLibrary.checkValidation(
        TradeApp_India_data[targetkeys[i]].value,
        TradeApp_India_data[targetkeys[i]].validation
      );
      console.log(errorcheck, "errorcheck");
      TradeApp_India_data[targetkeys[i]].error = !errorcheck.state;
      TradeApp_India_data[targetkeys[i]].errmsg = errorcheck.msg;
      mainvalue[targetkeys[i]] = TradeApp_India_data[targetkeys[i]].value;
    }
    var filtererr = targetkeys.filter(
      (obj) => TradeApp_India_data[obj].error == true
    );
    console.log(filtererr.length);
    if (filtererr.length > 0) {
      this.setState({ error: true });
    } else {
      this.setState({ error: false });
      const params = new URLSearchParams(window.location.search)
      const status = params.get("status")
      {status==="editable"|| this.state.afterInsert?
      this.autoTemplateUpdate():
      this.insert()
      }
    }

    this.setState({
      // mainvalue,
      TradeApp_India_data,
    });
  };

  insert=()=>{

    var Stages = this.props.interStages.filter((data,index)=>{
      return(data.Type === "IndiaFiling" && data.Template === "Trademark")
    }).filter((val,index)=>{
      if(index == this.state.TradeApp_India_data.stages.value-1){
        return val.ProjectTemplateId
      }
    })


    var sub_stages = this.props.interSubStages.filter((data,index)=>{
      return(data.Type === "IndiaFiling" && data.Template === "Trademark")
    }).filter((val,index)=>{
      if(index == this.state.TradeApp_India_data.sub_stages.value-1){
        return val.ProjectTemplateId
      }
    })

    var calcaulateTDays = this.state.projectList.filter((data,index)=>{
      return(data.Type === "IndiaFiling" && data.Template === "Trademark")
    })

    console.log(calcaulateTDays,"calcaulateTDays")

    var self = this;
    var formData = new FormData();
    this.state.TradeApp_India_data.projectname.value && formData.set("projectname", this.state.TradeApp_India_data.projectname.value);
    this.state.TradeApp_India_data.status.value && formData.set("status", this.state.TradeApp_India_data.status.value);
    formData.set("clientId", this.state.TradeApp_India_data.trade_client.value);
    this.state.TradeApp_India_data.mark.value && formData.set("mark", this.state.TradeApp_India_data.mark.value);
    this.state.TradeApp_India_data.class.value && formData.set("classId", this.state.TradeApp_India_data.class.value);
    this.state.TradeApp_India_data.App_date.value && formData.set("appdate", this.state.TradeApp_India_data.App_date.value ? moment(this.state.TradeApp_India_data.App_date.value).format('YYYY-MM-DD'): "") ;
    this.state.TradeApp_India_data.App_num.value && formData.set("appno", this.state.TradeApp_India_data.App_num.value);
    this.state.TradeApp_India_data.user_date.value && formData.set("userdate", this.state.TradeApp_India_data.user_date.value);
    this.state.TradeApp_India_data.App_date.value && formData.set("nextrenewal", this.state.TradeApp_India_data.App_date.value?moment(moment(this.state.TradeApp_India_data.App_date.value, "DD-MM-YYYY").add(10, 'year')).format('YYYY-MM-DD'):this.state.TradeApp_India_data.App_date.value);
    this.state.TradeApp_India_data.comments.value && formData.set("comments", this.state.TradeApp_India_data.comments.value);
    this.state.TradeApp_India_data.int_status.value && formData.set("Internalstatus", this.state.TradeApp_India_data.int_status.value);
    this.state.TradeApp_India_data.allotment.value && formData.set("allotment", this.state.TradeApp_India_data.allotment.value);
    this.state.TradeApp_India_data.amandment.value && formData.set("amendment", this.state.TradeApp_India_data.amandment.value);
    this.state.TradeApp_India_data.hearing_date.value && formData.set("hearingdate",this.state.TradeApp_India_data.hearing_date.value? moment(this.state.TradeApp_India_data.hearing_date.value).format('YYYY-MM-DD'):"");
    this.state.TradeApp_India_data.condition.value && formData.set("condition", this.state.TradeApp_India_data.condition.value);
    this.state.TradeApp_India_data.priority.value && formData.set("prioritydetails", this.state.TradeApp_India_data.priority.value);
    this.state.TradeApp_India_data.tmj_num.value && formData.set("tmjno", this.state.TradeApp_India_data.tmj_num.value);
    this.state.TradeApp_India_data.tmj_date.value && formData.set("tmjdate",this.state.TradeApp_India_data.tmj_date.value? moment(this.state.TradeApp_India_data.tmj_date.value).format('YYYY-MM-DD'):"");
    this.state.TradeApp_India_data.journal_ex.value && formData.set("journalextract", this.state.TradeApp_India_data.journal_ex.value);
    this.state.TradeApp_India_data.certificate_date.value && formData.set("certdate",this.state.TradeApp_India_data.certificate_date.value? moment(this.state.TradeApp_India_data.certificate_date.value).format('YYYY-MM-DD'):"");
    this.state.TradeApp_India_data.certificate_date.value && formData.set("rencertdate",this.state.TradeApp_India_data.certificate_date.value?moment(moment(this.state.TradeApp_India_data.certificate_date.value, "DD-MM-YYYY").add(10, 'year')).format('YYYY-MM-DD'):"");
    this.state.TradeApp_India_data.goods.value && formData.set("goodsandservicedescription", this.state.TradeApp_India_data.goods.value);
    formData.set("Stages", Stages[0] && Stages[0].ProjectTemplateId);
    this.state.TradeApp_India_data.sub_stages.value && formData.set("Substages", sub_stages[0] && sub_stages[0].ProjectTemplateId
    // this.state.TradeApp_India_data.sub_stages.value?this.state.TradeApp_India_data.sub_stages.value:"1"
    );
    formData.set("date",this.state.TradeApp_India_data.App_date.value ? moment(moment(this.state.TradeApp_India_data.App_date.value, "YYYY-MM-DD").add(calcaulateTDays[0].TDays ? calcaulateTDays[0].TDays : 0, 'days')).format('YYYY-MM-DD'): "");
    
    // this.state.TradeApp_India_data.date.value?moment(this.state.TradeApp_India_data.date.value).format('YYYY-MM-DD'):""
    this.state.fileListimg && formData.append("image", this.state.fileListimg?this.state.fileListimg[0].originFileObj:"");
    this.state.fileListorder && formData.append("order", this.state.fileListorder?this.state.fileListorder[0].originFileObj:"");
    this.state.fileListpoa && formData.append("poa", this.state.fileListpoa?this.state.fileListpoa[0].originFileObj:"");
    this.state.TradeApp_India_data.IpIndiaStatus.value && formData.set("IpIndiaStatus", this.state.TradeApp_India_data.IpIndiaStatus.value);
    // PoaListData[0].originFileObj

    fetch(`${apiurl}/InsertTrademarkdesign`, {
      method: 'POST',
      body: formData,
    })
      //     axios({
      //   method: "post",
      //   url: apiurl + "/InsertTrademarkdesign",
      //   data: formData,
      // }) 
      .then((response) => response.json()).then((responseJson) => {

        this.setState({insertOnlyFalse:false})

        // alert(JSON.stringify(responseJson))
        console.log(responseJson.data,"responseJson")
        notification.warning({
          message: `Trademark India Filing Application has submitted successfully`,
          duration: 3.5,
          placement: "topRight",
          className: "notification_dayreport",
        });
        // self.state.TradeApp_India_data.App_date.value = ""
        // self.state.TradeApp_India_data.App_num.value = ""
        // self.state.TradeApp_India_data.allotment.value = ""
        // self.state.TradeApp_India_data.amandment.value = ""
        // self.state.TradeApp_India_data.associate.value = ""
        // self.state.TradeApp_India_data.certificate_date.value = ""
        // self.state.TradeApp_India_data.class.value = ""
        // self.state.TradeApp_India_data.comments.value = ""
        // self.state.TradeApp_India_data.condition.value = ""
        self.state.TradeApp_India_data.date.value = ""
        // self.state.TradeApp_India_data.goods.value = ""
        self.state.TradeApp_India_data.hearing_date.value = ""
        // self.state.TradeApp_India_data.int_status.value = ""
        // self.state.TradeApp_India_data.journal_ex.value = ""
        // self.state.TradeApp_India_data.mark.value = ""
        // self.state.TradeApp_India_data.next_renewal.value = ""
        // self.state.TradeApp_India_data.priority.value = ""
        // self.state.TradeApp_India_data.renew_certificate_date.value = ""
        self.state.TradeApp_India_data.stages.value = ""
        // self.state.TradeApp_India_data.status.value = ""
        self.state.TradeApp_India_data.sub_stages.value = ""
        // self.state.TradeApp_India_data.tmj_date.value = ""
        // self.state.TradeApp_India_data.tmj_num.value = "" 
        // self.state.TradeApp_India_data.trade_client.value = ""
        // self.state.TradeApp_India_data.IpIndiaStatus.value = ""

        // self.state.TradeApp_India_data.user_date.value = ""
        // self.setState({fileListimg:"",fileListorder:"",fileListpoa:""})
        self.setState({afterInsert:true,TrdoId:responseJson.data,rowStages:{Appdate:self.state.TradeApp_India_data.App_date.value}})
      })
  }


  Cancel = () => {
    this.state.TradeApp_India_data.application_num.value = ""
    this.state.TradeApp_India_data.associate.value = ""
    this.state.TradeApp_India_data.associate_num.value = ""
    this.state.TradeApp_India_data.class.value = ""
    this.state.TradeApp_India_data.country.value = ""
    this.state.TradeApp_India_data.date.value = ""
    this.state.TradeApp_India_data.mark.value = ""
    this.state.TradeApp_India_data.our_reference.value = ""
    this.state.TradeApp_India_data.priority.value = ""
    this.state.TradeApp_India_data.stages.value = ""
    this.state.TradeApp_India_data.status.value = ""
    this.state.TradeApp_India_data.sub_stages.value = ""
    this.state.TradeApp_India_data.trade_client.value = ""
    this.state.TradeApp_India_data.user_claim.value = ""
    this.state.TradeApp_India_data.user_claim.value = ""

  }

  changeDynamic = (data, key) => {
    console.log("key", key);
    console.log("data", data);
    // var self = this
    console.log( this.state.projectList,"projectList")
    const params = new URLSearchParams(window.location.search)
    const status = params.get("status")


    if(key==="stages" && status){

      var Stages = this.props.interStages.filter((data,index)=>{
        return(data.Type === "IndiaFiling" && data.Template === "Trademark")
      }).filter((val,index)=>{
        if(index == data-1){
          return val.ProjectTemplateId
        }
      })

    console.log("datevalue", Stages);



      var datevalue = this.state.projectList.find((value,index)=>{
        if(Stages[0].ProjectTemplateId == value.ProjectTemplateId){
          return value.TDays
        }
      })
    console.log("datevalues", datevalue && datevalue.TDays);
    console.log("TrademarkItems", this.state.TrademarkItems);


      // this.state.TrademarkItems.map((stg,index)=>{
      //   if(stg.Stage === data){
        this.state.TradeApp_India_data.date.value = moment(moment(this.state.TrademarkItems[this.state.TrademarkItems.length-1].HearingDate, "YYYY-MM-DD").add( datevalue ? datevalue.TDays : 0, 'days'))
      //   }
      // })
    }



    var TradeApp_India_data = this.state.TradeApp_India_data;
    var targetkeys = Object.keys(TradeApp_India_data);
    var errorcheck = ValidationLibrary.checkValidation(
      data,
      TradeApp_India_data[key].validation
    );
    TradeApp_India_data[key].value = data;
    TradeApp_India_data[key].error = !errorcheck.state;
    TradeApp_India_data[key].errmsg = errorcheck.msg;
    this.setState({ TradeApp_India_data });
    var filtererr = targetkeys.filter(
      (obj) =>
        TradeApp_India_data[obj].error == true ||
        TradeApp_India_data[obj].error == null
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
    await this.props.getUserDate();
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
            if(value.Template==='Trademark' && value.Process ==='Application'&&value.Type==="IndiaFiling"){
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
        response.data.data[0].domestic.filter((data, index) => {

          if (data.TrdoId == userid) {
            self.state.TradeApp_India_data.projectname.value = data.ProjectName === "null" ? "" : data.ProjectName
            self.state.TradeApp_India_data.stages.value=projectList[data.TrademarkItems.length] && projectList[data.TrademarkItems.length].Stage
            self.state.TradeApp_India_data.sub_stages.value=projectList[data.TrademarkItems.length] && projectList[data.TrademarkItems.length].Substage
            self.state.TradeApp_India_data.date.value=moment(moment(data.TrademarkItems[data.TrademarkItems.length-1].HearingDate, "YYYY-MM-DD").add(projectList[data.TrademarkItems.length] && projectList[data.TrademarkItems.length].TDays ? projectList[data.TrademarkItems.length].TDays : 0, 'days'))
            self.state.TradeApp_India_data.status.value = data.Status === "null" ? "" : data.Status
            self.state.TradeApp_India_data.trade_client.value = data.ClientName
            self.state.TradeApp_India_data.mark.value = data.Mark === "null" ? "" : data.Mark
            self.state.TradeApp_India_data.App_num.value = data.AppNo === "null" ? "" : data.AppNo
            self.state.TradeApp_India_data.App_date.value = data.Appdate === null ? "" : moment(data.Appdate)
            self.state.TradeApp_India_data.class.value = data.classname === "null" ? "" : data.classname
            self.state.TradeApp_India_data.goods.value = data.GoodsandServiceDescription === "null" ? "" : data.GoodsandServiceDescription
            self.state.TradeApp_India_data.user_date.value = data.Userdate === "null" ? "" : data.Userdate
            self.state.TradeApp_India_data.IpIndiaStatus.value = data.Stage === "null" ? "" : data.Stage
            self.state.TradeApp_India_data.next_renewal.value = data.NextRenewal === "null" ? "" : moment(data.NextRenewal)
            self.state.TradeApp_India_data.comments.value = data.Comments === "null" ? "" : data.Comments
            self.state.TradeApp_India_data.int_status.value = data.Internalstatus === "null" ? "" : data.Internalstatus
            self.state.TradeApp_India_data.allotment.value = data.Allotment === "null" ? "" : data.Allotment
            self.state.TradeApp_India_data.amandment.value = data.Amendment === "null" ? "" : data.Amendment
            self.state.TradeApp_India_data.condition.value = data.Condition === "null" ? "" : data.Condition
            self.state.TradeApp_India_data.priority.value = data.Prioritydetails === "null" ? "" : data.Prioritydetails
            self.state.TradeApp_India_data.tmj_num.value = data.TMJNo === "null" ? "" : data.TMJNo
            self.state.TradeApp_India_data.tmj_date.value = data.TMJdate === null ? "" : moment(data.TMJdate)
            self.state.TradeApp_India_data.journal_ex.value = data.JournalExtract === "null" ? "" : data.JournalExtract
            self.state.TradeApp_India_data.certificate_date.value = data.Certdate === null ? "" : moment(data.Certdate)
            self.state.TradeApp_India_data.renew_certificate_date.value = data.Certdate === null ? "" : moment(data.Certdate).add(10, 'year')
            self.setState({rowStages:{TrademarkItems:data.TrademarkItems,Appdate:data.Appdate},TrademarkItems:data.TrademarkItems,TrdoId:data.TrdoId,fileListimg:data.Image === null ? "" :[
              {
                uid: '-1',
                name: data.Image?data.Image.slice(35):"",
                status: 'done',
                url: data.Image?data.Image:"",
              },
            ],
            fileListorder:data.orderurl === null ? "" :[
              {
                uid: '-2',
                name: data.orderurl?data.orderurl.slice(35):"",
                status: 'done',
                url: data.orderurl?data.orderurl:"",
              },
            ],
            fileListpoa:data.POA === null ? "" :[
              {
                uid: '-3',
                name: data.POA?data.POA.slice(35):"",
                status: 'done',
                url: data.POA?data.POA:"",
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

    var status = this.state.TradeApp_India_data.status.value

    if(!Number(this.state.TradeApp_India_data.status.value)){
     var status = this.props.interStatus.find((val) => {
        if(status==val.Status){
          return val.StatusId 
        }
       }
       )
    }

    var clientId = this.state.TradeApp_India_data.trade_client.value

    if(!Number(this.state.TradeApp_India_data.trade_client.value)){
     var clientId = this.props.indiaClientName.find((val) => {
        if(clientId==val.ClientName){
          return val.ClientId 
        }
       }
       )
    }


    var userdate = this.state.TradeApp_India_data.user_date.value

    if(!Number(this.state.TradeApp_India_data.user_date.value)){
     var userdate = this.props.indiaUserDate.find((val) => {
        if(userdate==val.Userdate){
          return val.UdateId 
        }
       }
       )
    }

    var classId = this.state.TradeApp_India_data.class.value

    if(!Number(this.state.TradeApp_India_data.class.value)){
     var classId = this.props.interClass.find((val) => {
        if(classId==val.classname){
          return val.classId 
        }
       }
       )
    }

    this.state.TradeApp_India_data.status.value && formData.set("status", !Number(this.state.TradeApp_India_data.status.value)?status.StatusId:status);
    this.state.TradeApp_India_data.trade_client.value && formData.set("clientId", !Number(this.state.TradeApp_India_data.trade_client.value)?clientId.ClientId:clientId);
    this.state.TradeApp_India_data.mark.value && formData.set("mark", this.state.TradeApp_India_data.mark.value);
    this.state.TradeApp_India_data.class.value && formData.set("classId", !Number(this.state.TradeApp_India_data.class.value)?classId.classId:classId);
    this.state.TradeApp_India_data.App_date.value && formData.set("appdate", this.state.TradeApp_India_data.App_date.value ? moment(this.state.TradeApp_India_data.App_date.value).format('YYYY-MM-DD'): "") ;
    this.state.TradeApp_India_data.App_num.value && formData.set("appno", this.state.TradeApp_India_data.App_num.value);
    this.state.TradeApp_India_data.user_date.value && formData.set("userdate",!Number(this.state.TradeApp_India_data.user_date.value)?userdate.UdateId:userdate);
    this.state.TradeApp_India_data.App_date.value && formData.set("nextrenewal", this.state.TradeApp_India_data.App_date.value?moment(moment(this.state.TradeApp_India_data.App_date.value, "DD-MM-YYYY").add(10, 'year')).format('YYYY-MM-DD'):this.state.TradeApp_India_data.App_date.value);
    this.state.TradeApp_India_data.comments.value && formData.set("comments", this.state.TradeApp_India_data.comments.value);
    this.state.TradeApp_India_data.int_status.value && formData.set("Internalstatus", this.state.TradeApp_India_data.int_status.value);
    this.state.TradeApp_India_data.allotment.value && formData.set("allotment", this.state.TradeApp_India_data.allotment.value);
    this.state.TradeApp_India_data.amandment.value && formData.set("amendment", this.state.TradeApp_India_data.amandment.value);
    this.state.TradeApp_India_data.condition.value && formData.set("condition", this.state.TradeApp_India_data.condition.value);
    this.state.TradeApp_India_data.priority.value && formData.set("prioritydetails", this.state.TradeApp_India_data.priority.value);
    this.state.TradeApp_India_data.tmj_num.value && formData.set("tmjno", this.state.TradeApp_India_data.tmj_num.value);
    this.state.TradeApp_India_data.tmj_date.value && formData.set("tmjdate",this.state.TradeApp_India_data.tmj_date.value? moment(this.state.TradeApp_India_data.tmj_date.value).format('YYYY-MM-DD'):"");
    this.state.TradeApp_India_data.journal_ex.value && formData.set("journalextract", this.state.TradeApp_India_data.journal_ex.value);
    this.state.TradeApp_India_data.certificate_date.value && formData.set("certdate",this.state.TradeApp_India_data.certificate_date.value? moment(this.state.TradeApp_India_data.certificate_date.value).format('YYYY-MM-DD'):"");
    this.state.TradeApp_India_data.certificate_date.value && formData.set("rencertdate",this.state.TradeApp_India_data.certificate_date.value?moment(moment(this.state.TradeApp_India_data.certificate_date.value, "DD-MM-YYYY").add(10, 'year')).format('YYYY-MM-DD'):"");
    this.state.TradeApp_India_data.goods.value && formData.set("goodsandservicedescription", this.state.TradeApp_India_data.goods.value);
    this.state.fileListimg && formData.append("image", this.state.fileListimg && this.state.fileListimg[0] ?this.state.fileListimg[0].originFileObj:"");
    this.state.fileListorder && formData.append("order", this.state.fileListorder && this.state.fileListorder[0] ?this.state.fileListorder[0].originFileObj:"");
    this.state.fileListpoa && formData.append("poa", this.state.fileListpoa && this.state.fileListpoa[0]?this.state.fileListpoa[0].originFileObj:"");
    formData.set("hearingdate", "2020-05-10");
    // this.state.TradeApp_India_data.IpIndiaStatus.value && formData.set("IpIndiaStatus", this.state.TradeApp_India_data.IpIndiaStatus.value);
    formData.set("trdoId", this.state.TrdoId);


      axios({
        method: 'put',
        url: apiurl + "/updatetrademarkIndia",
        data:formData
      })
        .then(function (response) {
          notification.warning({
            message: `Trademark India Filing Application has updated successfully`,
            duration: 3.5,
            placement: "topRight",
            className: "notification_dayreport",
          });
          })
    
  }

  autoTemplateUpdate=()=>{

    if(typeof this.state.TradeApp_India_data.stages.value === 'string'){
      var Stages = this.props.interStages.filter((data,index)=>{
        return(data.Type === "IndiaFiling" && data.Template === "Trademark")
      }).filter((val,index)=>{
        if(val.Stage === this.state.TradeApp_India_data.stages.value){
          return val.ProjectTemplateId
        }
      })
    }else{
      var Stages = this.props.interStages.filter((data,index)=>{
        return(data.Type === "IndiaFiling" && data.Template === "Trademark")
      }).filter((val,index)=>{
        if(index == this.state.TradeApp_India_data.stages.value-1){
          return val.ProjectTemplateId
        }
      })

    }


    if(typeof this.state.TradeApp_India_data.sub_stages.value === 'string'){
      var sub_stages = this.props.interSubStages.filter((data,index)=>{
        return(data.Type === "IndiaFiling" && data.Template === "Trademark")
      }).filter((val,index)=>{
        if(val.Substage == this.state.TradeApp_India_data.sub_stages.value){
          return val.ProjectTemplateId
        }
      })
    }else{
      var sub_stages = this.props.interSubStages.filter((data,index)=>{
        return(data.Type === "IndiaFiling" && data.Template === "Trademark")
      }).filter((val,index)=>{
        if(index == this.state.TradeApp_India_data.sub_stages.value-1){
          return val.ProjectTemplateId
        }
      })
    }
    

    var addValue={
      trdoId:this.state.TrdoId,
      projectTemplateId:this.state.ProjectTemplateId,
      stages:Stages[0] ? Stages[0].ProjectTemplateId : this.state.TradeApp_India_data.stages.value,
      Substages:sub_stages[0] ? sub_stages[0].ProjectTemplateId : this.state.TradeApp_India_data.sub_stages.value,
      date: moment(this.state.TradeApp_India_data.date.value).format('YYYY-MM-DD'),
      hearingdate:moment(this.state.TradeApp_India_data.hearing_date.value).format('YYYY-MM-DD')
    }

    var self = this

    axios({
      method: 'put',
      url: apiurl + "/updateItems",
      data:addValue
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





  // updateSubstage=()=>{

  //   var Stages = this.props.interStages.filter((data,index)=>{
  //     return(data.Type === "IndiaFiling" && data.Template === "Trademark")
  //   }).filter((val,index)=>{
  //     if(index == this.state.TradeApp_India_data.stages.value-1){
  //       return val.ProjectTemplateId
  //     }
  //   })

  //   var sub_stages = this.props.interSubStages.filter((data,index)=>{
  //     return(data.Type === "IndiaFiling" && data.Template === "Trademark")
  //   }).filter((val,index)=>{
  //     if(index == this.state.TradeApp_India_data.sub_stages.value-1){
  //       return val.ProjectTemplateId
  //     }
  //   })

  //   var self = this

  //   var myObject = {
  //     trdoId:this.state.TrdoId,
  //     "stages": Stages[0] && Stages[0].ProjectTemplateId,
  // }

  // this.state.TradeApp_India_data.sub_stages.value && Object.assign(myObject, {"Substages":sub_stages[0] && sub_stages[0].ProjectTemplateId})
  // this.state.TradeApp_India_data.date.value && Object.assign(myObject, { "date":this.state.TradeApp_India_data.date.value?moment(this.state.TradeApp_India_data.date.value).format('YYYY-MM-DD'):""})
  // this.state.TradeApp_India_data.hearing_date.value && Object.assign(myObject, {"hearingdate":this.state.TradeApp_India_data.hearing_date.value? moment(this.state.TradeApp_India_data.hearing_date.value).format('YYYY-MM-DD'):""})

  //   axios({
  //     method: 'put',
  //     url: apiurl + "/updateItems",
  //     data:
  //       myObject
      
  //   })
  //     .then(function (response) {
  //       notification.warning({
  //         message: `Stages updated successfully`,
  //         duration: 3.5,
  //         placement: "topRight",
  //         className: "notification_dayreport",
  //       });
  //       self.setState({callSubStage:true})
  //       })

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

  usertabledata=(data)=>{
    console.log(data[data.length-1].stages,"usertabledatadata")
    if(data && this.state.ipdatatrue){
   this.state.TradeApp_India_data.IpIndiaStatus.value=data[data.length-1].stages
   this.setState({ipdatatrue:false})
    }
    
  }


  render() {
    console.log(this.props.ProjectName,"interStatus")
    const params = new URLSearchParams(window.location.search)
    const status = params.get("status")

    var stageArr = []
    this.props.interStages && this.props.interStages.map((data)=>{
      if(data.Template==='Trademark' && data.Process ==='Application'&&data.Type==="IndiaFiling"){
        stageArr.push(data.Stage)
    }})

    var subStageArr = []
    this.props.interSubStages && this.props.interSubStages.map((data)=>{
      if(data.Template==='Trademark' && data.Process ==='Application'&&data.Type==="IndiaFiling"){
        data.Substage !== '' && subStageArr.push(data.Substage)
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
                value={this.state.TradeApp_India_data.projectname.value}
                error={this.state.TradeApp_India_data.projectname.error}
                errmsg={this.state.TradeApp_India_data.projectname.errmsg}
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
                    this.state.TradeApp_India_data.status.value
                  }
                  error={
                    this.state.TradeApp_India_data.status.error
                  }
                  errmsg={
                    this.state.TradeApp_India_data.status.errmsg
                  }
                />
              </Grid>
              <Grid item md={3} sm={5} className="">
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
                    this.state.TradeApp_India_data.trade_client.value
                  }
                  error={
                    this.state.TradeApp_India_data.trade_client.error
                  }
                  errmsg={
                    this.state.TradeApp_India_data.trade_client.errmsg
                  }
                  className="w-75"
                />
              </Grid>
              <Grid item md={3} sm={5} className="">
                <Inputantd label={"Mark"} className="w-75"
                  changeData={(data) => this.changeDynamic(data, 'mark')}
                  value={this.state.TradeApp_India_data.mark.value}
                  error={this.state.TradeApp_India_data.mark.error}
                  errmsg={this.state.TradeApp_India_data.mark.errmsg}
                ></Inputantd>
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

              <Grid item md={3} sm={5} className="mt-3">
                <Inputantd label={"Application Number"} className="w-75"
                  changeData={(data) => this.changeDynamic(data, 'App_num')}
                  value={this.state.TradeApp_India_data.App_num.value}
                  error={this.state.TradeApp_India_data.App_num.error}
                  errmsg={this.state.TradeApp_India_data.App_num.errmsg}
                ></Inputantd>
              </Grid>
              <Grid item md={3} sm={5} className="mt-3">
                <Calenderbox label={"Application Date"} className="w-75"
                  changeData={(data) => this.changeDynamic(data, 'App_date')}
                  value={this.state.TradeApp_India_data.App_date.value}
                  error={this.state.TradeApp_India_data.App_date.error}
                  errmsg={this.state.TradeApp_India_data.App_date.errmsg}
                ></Calenderbox>
              </Grid>
              <Grid item md={3} sm={5} className="mt-3">
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
                    this.state.TradeApp_India_data.class.value
                  }
                  error={
                    this.state.TradeApp_India_data.class.error
                  }
                  errmsg={
                    this.state.TradeApp_India_data.class.errmsg
                  }
                  className="w-75"
                ></Dropdownantd>
              </Grid>
              <Grid item md={3} sm={5}>
                <Inputantd label={"Goods and Service Description"} className="w-75"
                  changeData={(data) => this.changeDynamic(data, 'goods')}
                  value={this.state.TradeApp_India_data.goods.value}
                  error={this.state.TradeApp_India_data.goods.error}
                  errmsg={this.state.TradeApp_India_data.goods.errmsg} />
              </Grid>

              <Grid item md={3} sm={5} className="mt-3">
                <Dropdownantd label={"User Details"} className="w-75"
                  option={
                    this.props.indiaUserDate &&
                    this.props.indiaUserDate.map((val) => val.Userdate)
                  }
                  changeData={(data) => this.changeDynamic(data, 'user_date')}
                  value={this.state.TradeApp_India_data.user_date.value}
                  error={this.state.TradeApp_India_data.user_date.error}
                  errmsg={this.state.TradeApp_India_data.user_date.errmsg}
                ></Dropdownantd>
              </Grid>

              <Grid item md={3} sm={5} className="mt-3">
                <Calenderbox label={"Next Renewal"} className="w-75"
                  changeData={(data) => this.changeDynamic(data, 'next_renewal')}
                  value={this.state.TradeApp_India_data.App_date.value?moment(this.state.TradeApp_India_data.App_date.value, "DD-MM-YYYY").add(10, 'year'):this.state.TradeApp_India_data.App_date.value}
                  disabled={true}
                  error={this.state.TradeApp_India_data.next_renewal.error}
                  errmsg={this.state.TradeApp_India_data.next_renewal.errmsg}
                ></Calenderbox>
              </Grid>
              <Grid item md={3} sm={5} className="mt-3">
                <Inputantd label={"Comments"} className="w-75"
                  changeData={(data) => this.changeDynamic(data, 'comments')}
                  value={this.state.TradeApp_India_data.comments.value}
                  error={this.state.TradeApp_India_data.comments.error}
                  errmsg={this.state.TradeApp_India_data.comments.errmsg}
                ></Inputantd>
              </Grid>
              <Grid item md={3} sm={5} className="mt-3">
                <Inputantd label={"Internal Status"} className="w-75"
                  changeData={(data) => this.changeDynamic(data, 'int_status')}
                  value={this.state.TradeApp_India_data.int_status.value}
                  error={this.state.TradeApp_India_data.int_status.error}
                  errmsg={this.state.TradeApp_India_data.int_status.errmsg}
                ></Inputantd>
              </Grid>
              <Grid item md={3} sm={5} className="mt-3">
                <Inputantd label={"Allotment"} className="w-75"
                  changeData={(data) => this.changeDynamic(data, 'allotment')}
                  value={this.state.TradeApp_India_data.allotment.value}
                  error={this.state.TradeApp_India_data.allotment.error}
                  errmsg={this.state.TradeApp_India_data.allotment.errmsg}
                ></Inputantd>
              </Grid>
               
              <Grid item md={3} sm={5} className="mt-3">
                <Inputantd label={"IpIndiaStatus"} className="w-75"
                  // changeData={(data) => this.changeDynamic(data, 'IpIndiaStatus')}
                  value={this.state.TradeApp_India_data.IpIndiaStatus.value}
                  error={this.state.TradeApp_India_data.IpIndiaStatus.error}
                  errmsg={this.state.TradeApp_India_data.IpIndiaStatus.errmsg}
                ></Inputantd>
              </Grid>
              <Grid item md={3} sm={5} className="interfil_update top-up mt-3" >
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
              <Grid item md={3} sm={5} className="mt-3">
                <Inputantd label={"Amendment"} className="w-75"
                  changeData={(data) => this.changeDynamic(data, 'amandment')}
                  value={this.state.TradeApp_India_data.amandment.value}
                  error={this.state.TradeApp_India_data.amandment.error}
                  errmsg={this.state.TradeApp_India_data.amandment.errmsg}
                ></Inputantd>
              </Grid>

              <Grid item md={3} sm={5} className="mt-3">
                <Inputantd label={"Condition"} className="w-75"
                  changeData={(data) => this.changeDynamic(data, 'condition')}
                  value={this.state.TradeApp_India_data.condition.value}
                  error={this.state.TradeApp_India_data.condition.error}
                  errmsg={this.state.TradeApp_India_data.condition.errmsg}
                ></Inputantd>
              </Grid>
              <Grid item md={3} sm={5} className="mt-3">
                <Inputantd label={"Priority Details"} className="w-75"
                  changeData={(data) => this.changeDynamic(data, 'priority')}
                  value={this.state.TradeApp_India_data.priority.value}
                  error={this.state.TradeApp_India_data.priority.error}
                  errmsg={this.state.TradeApp_India_data.priority.errmsg} />
              </Grid>
              <Grid item md={3} sm={5} className="mt-3">
                <Inputantd label={"TMJ Number"} className="w-75"
                  changeData={(data) => this.changeDynamic(data, 'tmj_num')}
                  value={this.state.TradeApp_India_data.tmj_num.value}
                  error={this.state.TradeApp_India_data.tmj_num.error}
                  errmsg={this.state.TradeApp_India_data.tmj_num.errmsg} />
              </Grid>
              <Grid item md={3} sm={5} className="mt-3">
                <Calenderbox label={"TMJ Date"} className="w-75"
                  changeData={(data) => this.changeDynamic(data, 'tmj_date')}
                  value={this.state.TradeApp_India_data.tmj_date.value}
                  error={this.state.TradeApp_India_data.tmj_date.error}
                  errmsg={this.state.TradeApp_India_data.tmj_date.errmsg} />
              </Grid>
              <Grid item md={3} sm={5} className="mt-3">
                <Inputantd label={"Journal Extract"} className="w-75"
                  changeData={(data) => this.changeDynamic(data, 'journal_ex')}
                  value={this.state.TradeApp_India_data.journal_ex.value}
                  error={this.state.TradeApp_India_data.journal_ex.error}
                  errmsg={this.state.TradeApp_India_data.journal_ex.errmsg} />
              </Grid>
              <Grid item md={3} sm={5} className="interfil_update top-up">
                <div className="flex">
                  <label className="mr-1 mt-1">POA</label>

                </div>
                <Upload                  
                 action= 'https://www.mocky.io/v2/5cc8019d300000980a055e76'
                 onChange= {(info)=>this.handleChange(info,"fileListpoa") } 
                 fileList={this.state.fileListpoa}>
                  <Button>
                    <UploadOutlined />Click to upload
                        </Button>
                </Upload>
              </Grid>
              <Grid item md={3} sm={5} className="mt-3">
                <Calenderbox label={"Certificate Date"} className="w-75"
                  changeData={(data) => this.changeDynamic(data, 'certificate_date')}
                  value={this.state.TradeApp_India_data.certificate_date.value}
                  error={this.state.TradeApp_India_data.certificate_date.error}
                  errmsg={this.state.TradeApp_India_data.certificate_date.errmsg} />
              </Grid>
              <Grid item md={3} sm={5} className="mt-3">
                <Calenderbox label={"Renewal Certificate Date"} className="w-75"
                  // changeData={(data) => this.changeDynamic(data, 'renew_certificate_date')}
                  disabled={true}
                  value={this.state.TradeApp_India_data.certificate_date.value?moment(this.state.TradeApp_India_data.certificate_date.value, "DD-MM-YYYY").add(10, 'year'):this.state.TradeApp_India_data.certificate_date.value}
                  error={this.state.TradeApp_India_data.renew_certificate_date.error}
                  errmsg={this.state.TradeApp_India_data.renew_certificate_date.errmsg} />
              </Grid>

                  {status==="editable"&&
                  <>
                  <Grid item md={9} sm={5}>
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
                      // this.props.interStages &&
                      // this.props.interStages.map((val) => val.Stage)
                      stageArr
                    }
                    disableto={this.state.TrademarkItems && this.state.TrademarkItems.length}
                    changeData={(data) =>
                      this.changeDynamic(data, "stages")
                    }
                    // disabled={status==="editable" ? true : false}
                    value={
                      this.state.TradeApp_India_data.stages.value
                    }
                    error={
                      this.state.TradeApp_India_data.stages.error
                    }
                    errmsg={
                      this.state.TradeApp_India_data.stages.errmsg
                    }
                    className="w-75"
                  ></Dropdownantd>
                </Grid>
                <Grid item md={3} sm={5}>
                  <Dropdownantd
                    label={"Sub Stages"}
                    option={
                      // this.props.interSubStages &&
                      // this.props.interSubStages.filter((val) => {if(val.Substage!==""){
                      //   return val.Substage
                      // }}).map((data)=>data.Substage)
                      subStageArr
                    }
                    changeData={(data) =>
                      this.changeDynamic(data, "sub_stages")
                    }
                    value={
                      this.state.TradeApp_India_data.sub_stages.value
                    }
                    error={
                      this.state.TradeApp_India_data.sub_stages.error
                    }
                    errmsg={
                      this.state.TradeApp_India_data.sub_stages.errmsg
                    }
                    className="w-75"
                  ></Dropdownantd>
                </Grid>
                <Grid item md={3} sm={5}>
                  <Calenderbox label={"Statutory Deadline"} className="w-75"
                    // changeData={(data) => this.changeDynamic(data, 'date')}
                    disabled={true}
                    value={status==="editable" ? this.state.TradeApp_India_data.date.value:this.state.TradeApp_India_data.App_date.value}
                    // error={this.state.TradeApp_India_data.date.error}
                    // errmsg={this.state.TradeApp_India_data.date.errmsg}
                    ></Calenderbox>
                </Grid>
                <Grid item md={3} sm={5} className="">
                  <div className="d-flex">
                    <Calenderbox label={"Filing Date"} className="w-100"
                      changeData={(data) => this.changeDynamic(data, 'hearing_date')}
                      value={this.state.TradeApp_India_data.hearing_date.value}
                      error={this.state.TradeApp_India_data.hearing_date.error}
                      errmsg={this.state.TradeApp_India_data.hearing_date.errmsg}
                    ></Calenderbox>
                    <AddCircleOutline onClick={this.checkValidation} className="Interfil_addicon" />
                  </div>
                </Grid>

              </Grid>
            </div>

            <InternationalList callSubStage={this.state.callSubStage} TrdoId={this.state.TrdoId} usertabledata={(data)=>this.usertabledata(data)} endpoint={"viewpreviousDesignItems"} trademark={"indiaFilling"} rowStages={this.state.rowStages} insertOnlyFalse={this.state.insertOnlyFalse} autoTemplateUpdate={(data,actualDate,completionDate)=>this.autoTemplateUpdate(data,actualDate,completionDate)} />
          </div>
        </>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  console.log("stateeee", state);

  return {
    TradeApp_India_data: state.resumeReducer.TradeApp_India_data,
    interStatus: state.tradeapp.getTradestatus,
    interAssociate: state.tradeapp.getTradeassociate,
    interClass: state.tradeapp.getTradeclass,
    interCountry: state.tradeapp.getTradecountry,
    interAllotement: state.tradeapp.getTradeallotment,
    interStages: state.tradeapp.getTradestages,
    interSubStages: state.tradeapp.getTradeSubstages,
    indiaUserDate: state.tradeapp.getTradeUserdate,
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
  getUserDate,
  getClientName,
  getProjectName
})(IndiaFiling);
