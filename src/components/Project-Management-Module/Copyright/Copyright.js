import React from 'react'
import "./copyright.css";
import Inputantd from '../../../formcomponent/inputantd';
import Dropdownantd from '../../../formcomponent/dropdownantd';
import Calenderbox from '../../../formcomponent/calenderbox';
import Grid from '@material-ui/core/Grid';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import { IoMdInformationCircle } from "react-icons/io";
// import Button from 'react-bootstrap/Button';
import { Popover,} from 'antd';
import {Upload,Icon,message,Button} from 'antd';
import { Tooltip,} from 'antd';
import { Table } from 'antd';
import ValidationLibrary from "../../../validationlibrary/validation";
import { getClient } from '../../../fixers/fixersAction';
import { getStagesList , getSubstagesList , getProjectList} from './CopyrightAction/CopyrightAction';
import {
  getOurReference,
  getTypeWork
} from "../TradeMark/ApplicationTradeMark/TradeAppAction/TradeAppAction";
import { connect } from "react-redux";
import CopyrightList from './CopyrightList';
import { UploadOutlined } from '@ant-design/icons';
import { apiurl } from "../../../App";
import moment from 'moment';
import {notification} from 'antd';
import DesignAppList from "../Design/DesignApplication/DesignAppList.js";


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

class Copyright extends React.Component{
    state = {        
        tags: [],
        inputVisible: false,
        inputValue: '',
        errordummy:true,
    Copyright_data:
    {
    'Copyright_Clientname':
    {'value':'',
    validation:[{'name':'required'}],
    error:null,
    errmsg:null
    }, 
    'title':
    {'value':'',
    validation:[],
    error:null,
    errmsg:null
    },
    'type_of_work':
    {'value':'',
    validation:[{'name':'required'}],
    error:null,
    errmsg:null
    },
    'stages':
    {'value':'',
    validation:[{'name':'required'}],
    error:null,
    errmsg:null
    },
    'subStages':
    {'value':'',
    validation:[],
    error:null,
    errmsg:null
    },
    'date':
    {'value':'',
    validation:[],
    error:null,
    errmsg:null
    },
    hearing_date: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },   
    },
    }

    async componentDidMount() {
      await this.props.getClient();
      await this.props.getStagesList();
      await this.props.getSubstagesList();
      await this.props.getProjectList();
      await this.props.getOurReference();
      await this.props.getTypeWork();

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
          response.data.data[15].Copyrightdetails.filter((data, index) => {

            if (data.id == userid) {

              self.state.Copyright_data.Copyright_Clientname.value = data.client_id === "null" ? "" : data.client_id
              self.state.Copyright_data.title.value = data.title === "null" ? "" : data.title
              self.state.Copyright_data.type_of_work.value = data.type_of_work === "null" ? "" : data.type_of_work

              self.setState({commonId:data.id,fileListimg:data.image_path === null ? "" :[
                {
                  uid: '-1',
                  name: data.image_path?data.image_path.slice(48):"",
                  status: 'done',
                  url: data.image_path?data.image_path:"",
                },
              ],})
            }

          })
        })
    }

    }


    checkValidation = () => {
      var mainvalue = {};
      var Copyright_data = this.state.Copyright_data;
      var targetkeys = Object.keys(Copyright_data);
      console.log(targetkeys, "targetkeys");
      for (var i in targetkeys) {
        var errorcheck = ValidationLibrary.checkValidation(
          Copyright_data[targetkeys[i]].value,
          Copyright_data[targetkeys[i]].validation
        );
        console.log(errorcheck, "errorcheck");
        Copyright_data[targetkeys[i]].error = !errorcheck.state;
        Copyright_data[targetkeys[i]].errmsg = errorcheck.msg;
        mainvalue[targetkeys[i]] = Copyright_data[targetkeys[i]].value;
      }
      var filtererr = targetkeys.filter(
        (obj) => Copyright_data[obj].error == true
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
  //   mainvalue,
    Copyright_data
  })   
}
changeDynamic = (data, key) => {
  console.log("key", key);
  console.log("data", data);
  var Copyright_data = this.state.Copyright_data;
  var targetkeys = Object.keys(Copyright_data);
  var errorcheck = ValidationLibrary.checkValidation(
    data,
    Copyright_data[key].validation
  );
  Copyright_data[key].value = data;
  Copyright_data[key].error = !errorcheck.state;
  Copyright_data[key].errmsg = errorcheck.msg;
  this.setState({ Copyright_data });
  var filtererr = targetkeys.filter(
    (obj) =>
      Copyright_data[obj].error == true ||
      Copyright_data[obj].error == null
  );
  if (filtererr.length > 0) {
    this.setState({ error: true, errordummy: false });
  } else {
    this.setState({ error: false });
  }
};

// cancel=()=>{
//   this.state.Copyright_data.Copyright_Clientname.value=""
//   this.state.Copyright_data.date.value=""
//   this.state.Copyright_data.stages.value=""
//   this.state.Copyright_data.subStages.value=""
//   this.state.Copyright_data.title.value=""
//   this.state.Copyright_data.type_of_work.value=""
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

insert=()=>{

  var Stages = this.props.Stages.filter((data,index)=>{
    return(data.Template === "Copyright")
  }).filter((val,index)=>{
    if(index == this.state.Copyright_data.stages.value-1){
      return val.ProjectTemplateId
    }
  })

  var sub_stages = this.props.Substages.filter((data,index)=>{
    return(data.Template === "Copyright")
  }).filter((val,index)=>{
    if(index == this.state.Copyright_data.subStages.value-1){
      return val.ProjectTemplateId
    }
  })

  var self = this;

      var formData=new FormData();
      this.state.Copyright_data.Copyright_Clientname.value && formData.set("client_id",this.state.Copyright_data.Copyright_Clientname.value);
        formData.set ("Stages",Stages[0] && Stages[0].ProjectTemplateId);
        sub_stages[0] && sub_stages[0].ProjectTemplateId && formData.set("Substages",sub_stages[0] && sub_stages[0].ProjectTemplateId);
        this.state.Copyright_data.title.value && formData.set("title",this.state.Copyright_data.title.value);
        this.state.Copyright_data.type_of_work.value && formData.set ("type_of_work",this.state.Copyright_data.type_of_work.value);        
        this.state.Copyright_data.date.value && formData.set("date",this.state.Copyright_data.date.value && moment(this.state.Copyright_data.date.value).format('YYYY-MM-DD'));
        this.state.Copyright_data.hearing_date.value && formData.set("hearingdate",this.state.Copyright_data.hearing_date.value && moment(this.state.Copyright_data.hearing_date.value).format('YYYY-MM-DD'))
        this.state.fileListimg && formData.append('imageArray', this.state.fileListimg?this.state.fileListimg[0].originFileObj:"")

        axios({
      method: "post",
      url: apiurl + "/createCopyright",
      data: formData,
    }) .then(function (response) {
      console.log(response.data.data, "responseresponse");
      notification.warning({
          message: `Copyright Data is submitted successfully`,
          duration: 3.5,
          placement: "topRight",
          className:"notifiction_tradeOPP"
      })
          // self.state.Copyright_data.Copyright_Clientname.value = ""
          // self.state.Copyright_data.date.value = ""
          // self.state.Copyright_data.stages.value = ""
          // self.state.Copyright_data.subStages.value = ""
          // self.state.Copyright_data.title.value = ""
          // self.state.Copyright_data.type_of_work.value = ""
          self.setState({afterInsert:true,commonId:response.data.data});
        })
}

updateSubstage=()=>{

  var Stages = this.props.Stages.filter((data,index)=>{
    return(data.Template === "Copyright")
  }).filter((val,index)=>{
    if(index == this.state.Copyright_data.stages.value-1){
      return val.ProjectTemplateId
    }
  })

  var sub_stages = this.props.Substages.filter((data,index)=>{
    return(data.Template === "Copyright")
  }).filter((val,index)=>{
    if(index == this.state.Copyright_data.subStages.value-1){
      return val.ProjectTemplateId
    }
  })

var self = this

var myObject = {
  copyId:this.state.commonId,
  "stages": Stages[0].ProjectTemplateId,
}

this.state.Copyright_data.subStages.value && Object.assign(myObject, {"Substages":sub_stages[0] && sub_stages[0].ProjectTemplateId})
this.state.Copyright_data.date.value && Object.assign(myObject, { "date":this.state.Copyright_data.date.value?moment(this.state.Copyright_data.date.value).format('YYYY-MM-DD'):""})
this.state.Copyright_data.hearing_date.value && Object.assign(myObject, {"hearingdate":this.state.Copyright_data.hearing_date.value? moment(this.state.Copyright_data.hearing_date.value).format('YYYY-MM-DD'):""})

axios({
  method: 'put',
  url: apiurl + "/updatecopyrightItems",
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
    })

}

update=()=>{

  var clientId = this.state.Copyright_data.Copyright_Clientname.value

  if(!Number(this.state.Copyright_data.Copyright_Clientname.value)){
   var clientId = this.props.Clients.find((val) => {
      if(clientId==val.ClientName){
        return val.ClientId 
      }
     }
     )
  }

  var type_of_work = this.state.Copyright_data.type_of_work.value

  if(!Number(this.state.Copyright_data.type_of_work.value)){
   var type_of_work = this.props.typeWork.find((val) => {
      if(type_of_work==val.Typeofwork){
        return val.TwId
      }
     }
     )
  }

  var self = this;

      var formData=new FormData();
      this.state.Copyright_data.Copyright_Clientname.value && formData.set("client_id",!Number(this.state.Copyright_data.Copyright_Clientname.value)?clientId.ClientId:clientId);
        this.state.Copyright_data.title.value && formData.set("title",this.state.Copyright_data.title.value);
        this.state.Copyright_data.type_of_work.value && formData.set ("type_of_work",!Number(this.state.Copyright_data.type_of_work.value)?type_of_work.TwId:type_of_work);        
        this.state.fileListimg && this.state.fileListimg[0].originFileObj && formData.append('imageArray', this.state.fileListimg?this.state.fileListimg[0].originFileObj:"")
        formData.append('copyId', this.state.commonId)

        axios({
      method: "put",
      url: apiurl + "/updateCopyright",
      data: formData,
    }) .then(function (response) {
      console.log(response.data.data, "responseresponse");
      notification.warning({
          message: `Copyright Updated successfully`,
          duration: 3.5,
          placement: "topRight",
          className:"notifiction_tradeOPP"
      })
        })
}

    render(){
      const params = new URLSearchParams(window.location.search)
      const status = params.get("status")
  
      var stageArr = []
      var stageArrId = []
  
      this.props.Stages &&
      this.props.Stages.map((val) => {if(val.Template === "Copyright"){
        stageArr.push(val.Stage) 
        stageArrId.push(val.ProjectTemplateId)
      }})
  
      var subStageArr = []
      var subStageArrId = []
  
      this.props.Substages &&
      this.props.Substages.map((val)=>{if(val.Template === "Copyright" && val.Substage){
        subStageArr.push(val.Substage)
        subStageArrId.push(val.ProjectTemplateId)
      }})


        return(
            <React.Fragment>
               <> 
    {/* Head Edit start */}
    <div className="card Copyright_main">
        <div className="card card-body">
            <div className="interfil_shade">
            <Grid container spacing={1}>
                <Grid item md={6} sm={5}>   
                    <div className="head_text_edit">
                        <h5>Copy Right</h5>                        
                    </div>
                </Grid>
                {/* <Grid item md={6} sm={6} className="interfil_dropdown">
                    <Button className="copyright_btn">Add</Button>
                </Grid> */}
            </Grid>
            </div>
    {/* Head Edit end */}

    {/* Grid content Start */} 
           

        <Grid container spacing={2} className="mt-3">
                <Grid item md={3} sm={5}>
                    <Dropdownantd label={"Client Name"} className="w-100"
                    option={                  
                      this.props.Clients &&
                      this.props.Clients.map((val) => val.ClientName)}
                    changeData={(data)=>this.changeDynamic(data,'Copyright_Clientname')} 
                    value={this.state.Copyright_data.Copyright_Clientname.value} 
                    error={this.state.Copyright_data.Copyright_Clientname.error} 
                    errmsg={this.state.Copyright_data.Copyright_Clientname.errmsg}/>
                </Grid>
                <Grid item md={6} sm={5}>
                    <Inputantd label={"Title"} className="w-100"
                    changeData={(data)=>this.changeDynamic(data,'title')} 
                    value={this.state.Copyright_data.title.value} 
                    error={this.state.Copyright_data.title.error} 
                    errmsg={this.state.Copyright_data.title.errmsg}/>
                </Grid>
                <Grid item md={3} sm={5}>
                    <Dropdownantd label={"Type of Work"} className="w-100"
                    option={this.props.typeWork && this.props.typeWork.map((val)=>val.Typeofwork)}
                    changeData={(data)=>this.changeDynamic(data,'type_of_work')} 
                    value={this.state.Copyright_data.type_of_work.value} 
                    error={this.state.Copyright_data.type_of_work.error} 
                    errmsg={this.state.Copyright_data.type_of_work.errmsg}></Dropdownantd>
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
              {status==="editable"&&
                  <Grid item md={9} sm={5} >
                    <Button className="btnwidth btnclr indiafilling_topalign"  onClick={()=>this.update()}>Update</Button>
                  </Grid>
  }
        </Grid>

        <div className="border_edit"/>
        <h5>Current Stage</h5>
            <div className="circle_icon_par">
                    <Grid container spacing={2}>
                        <Grid item md={3} sm={5}>
                            <Dropdownantd label={"Stages"} className="w-75"
                            option={stageArr}
                            changeData={(data)=>this.changeDynamic(data,'stages')} 
                            value={this.state.Copyright_data.stages.value} 
                            error={this.state.Copyright_data.stages.error} 
                            errmsg={this.state.Copyright_data.stages.errmsg}></Dropdownantd>
                        </Grid>
                        <Grid item md={3} sm={5}>
                            <Dropdownantd label={"Sub Stages"} className="w-75"
                            option={subStageArr}
                            changeData={(data)=>this.changeDynamic(data,'subStages')} 
                            value={this.state.Copyright_data.subStages.value} 
                            error={this.state.Copyright_data.subStages.error} 
                            errmsg={this.state.Copyright_data.subStages.errmsg}></Dropdownantd>
                        </Grid>
                        <Grid item md={3} sm={5}>
                            <Calenderbox label={"Date"} className="w-75"
                            changeData={(data)=>this.changeDynamic(data,'date')} 
                            value={this.state.Copyright_data.date.value} 
                            error={this.state.Copyright_data.date.error} 
                            errmsg={this.state.Copyright_data.date.errmsg}></Calenderbox>
                        </Grid>
                        <Grid item md={3} sm={5}>
              <div className="d-flex">
            <Calenderbox label={"Date of Hearing"} className="w-100"
               changeData={(data) => this.changeDynamic(data, 'hearing_date')}
               value={this.state.Copyright_data.hearing_date.value}
               error={this.state.Copyright_data.hearing_date.error}
               errmsg={this.state.Copyright_data.hearing_date.errmsg} />
            <span className="circle_icon_edit">
                    <AddCircleOutline  onClick={this.checkValidation} className="Interfil_addicon" />
                  </span>
                  </div>
          </Grid>
                    </Grid>
            </div>
        </div>
    </div>
    <DesignAppList callSubStage={this.state.callSubStage} commonId={this.state.commonId} endpoint={"viewcopyrightitems"} trademark={"copyright"}/>
        
        </>
        </React.Fragment>
        )
    }
}
// export default Copyright;
const mapStateToProps = (state) => {
  console.log("stateeee", state);
  return {
    Clients:state.fixers.clients,
    Stages:state.copyright.getstages,
    Substages:state.copyright.getsubstages,
    project:state.copyright.getProject,
    designReference: state.tradeapp.getTradeOurReference,
    typeWork:state.tradeapp.getTypeWork
  };
};
export default connect(mapStateToProps, {
  getClient,
  getStagesList,
  getSubstagesList,
  getProjectList,
  getOurReference,
  getTypeWork
})(Copyright);