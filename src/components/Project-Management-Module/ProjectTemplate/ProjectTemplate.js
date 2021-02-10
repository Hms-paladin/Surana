import React from "react";
import "./ProjectTemplate.css";
import Inputantd from "../../../formcomponent/inputantd";
import Grid from "@material-ui/core/Grid";
import Dropdownantd from "../../../formcomponent/dropdownantd";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import ValidationLibrary from "../../../validationlibrary/validation";
import Button from "react-bootstrap/Button";
import { apiurl } from "../../../App";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { Table } from "antd";
import { notification, Upload, message } from 'antd';
import ProjectList from './ProjectList';
import { UploadOutlined } from '@ant-design/icons';
import { SkipPreviousOutlined } from "@material-ui/icons";

const axios = require("axios");

var fileListData = [];
var PoaListData = [];
var OrderListData = [];

// const props = {
//   name: 'file',
//   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
//   headers: {
//     authorization: 'authorization-text',
//   },
//   onChange(info) {
//     if (info.file.status !== 'uploading') {
//       console.log(info.file, info.fileList);
//     }
//     if (info.file.status === 'done') {
//       console.log("asdfjkasdfjsd", info.fileList)
//       message.success(`${info.file.name} file uploaded successfully`);
//       fileListData = info.fileList;
//       PoaListData = info.fileList;
//       OrderListData = info.fileList
//       console.log(fileListData, "fileee")
//       console.log(fileListData[0].originFileObj, "file")
//     } else if (info.file.status === 'error') {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   },
//   progress: {
//     strokeColor: {
//       '0%': '#108ee9',
//       '100%': '#87d068',
//     },
//     strokeWidth: 3,
//     format: percent => `${parseFloat(percent.toFixed(2))}%`,
//   },
// };

var whichindex = null;
const columns = [
  {
    title: "Stage",
    dataIndex: "stage",
  },
  {
    title: "Sub Stage",
    dataIndex: "substage",
  },
  {
    title: "T + Days",
    dataIndex: "days",
  },
  {
    title: "Remind before Days",
    dataIndex: "reminddays",
  },
  {
    title: "Link to Previous",
    dataIndex: "previous",
  },
  {
    title: "Documents Required",
    dataIndex: "documents",
  },
];
const data = [
  {
    key: "1",
    stage: "Trade Mark Application",
    substage: 32,
    days: "-",
    reminddays: "-",
    previous: "-",
    documents: "Personal Information",
  },
  {
    key: "2",
    stage: "ER Received",
    substage: 42,
    days: "15",
    reminddays: "2",
    previous: "Trade mark journal Application",
    documents: "Trade mark journal Application",
  },
  {
    key: "3",
    stage: "ER Reply",
    substage: 32,
    days: "15",
    reminddays: "7",
    previous: "ER Record",
    documents: "-",
  },
  {
    key: "3",
    stage: "ER Reply",
    substage: "Formaility Check Fail Yes",
    address: "7",
    reminddays: "8",
    previous: "ER Received",
    documents: "Post Registration Timelines",
  },
];
class ProjectTemplate extends React.Component {
  state = {
    tags: [],
    whichindex: null,
    inputVisible: false,
    inputValue: "",
    errordummy: true,
    processarr:[],
    typearr:[],
    listofprevious: "",
    listofpreviousAll:[],
    fileListData:[],
    tableData:[],
    doc_required: [
      {
        documentsrequired: "",
      }],
    Project_template_data: {
      Project_label_stage: {
        value: "",
        validation: [],
        error: null,
        errmsg: null,
      },
      link_project: {
        value: "",
        validation: [],
        error: null,
        errmsg: null,
      },
      template: {
        value: "",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
      },
      process: {
        value: "",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
      },
      type: {
        value: "",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
      },
      stage: {
        value: "",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
      },
      sub_stage: {
        value: "",
        validation: [],
        error: null,
        errmsg: null,
      },
      t_days: {
        value: "",
        validation: [{name:"allowNumaricOnly"}],
        error: null,
        errmsg: null,
      },
      remindB_days: {
        value: "",
        validation: [{name:"allowNumaricOnly"}],
        error: null,
        errmsg: null,
      },

    },
  };

  LinkToPrevious=()=>{
    var self = this;
    axios({
      method: "get",
      url: apiurl + "/linktoprevious",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        console.log(response, "responseadd");
        let i = 0;
        var previousarr = [];
        var previousId = [];
        for (i; i < response.data.data.length; i++) {
          
          previousarr.push(response.data.data[i].Stage);
          previousId.push(response.data.data[i].ProjectTemplateId)
        }
        self.setState({ listofprevious: previousarr,previousId:previousId,listofpreviousAll:response.data.data });
      })
      .catch(function (error) {
        console.log(error, "error");
      });
  }

  componentDidMount() {
    this.LinkToPrevious()
    var self = this;
      axios({
        method: "get",
        url: apiurl + "/templatelist",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          let i = 0;
          var templatearr = [];
          var templateId = []
          for (i; i < response.data.data.length; i++) {
            templatearr.push(response.data.data[i].Template);
            templateId.push(response.data.data[i].PtId)
          }
          self.setState({ template: templatearr,templateId:templateId});
        })
        var self = this;
        axios({
          method: "get",
          url: apiurl + "/processlist",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then(function (response) {
            let j = 0;
            var processarr = [];
            console.log(response,"processlist")
            for (j; j < response.data.data.length; j++) {
              processarr.push(response.data.data[j].Process);
            }
            self.setState({ processarr: processarr});
          })
          var self = this;
          axios({
            method: "get",
            url: apiurl + "/typelist",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          })
            .then(function (response) {
            console.log(response,"typelist")
              let k = 0;
              var typearr = [];
              for (k; k < response.data.data.length; k++) {
                typearr.push(response.data.data[k].Type);
              }
              self.setState({ typearr: typearr});
            })        
  }


  check = () => {
    // var projectData = {
    //   "template": this.state.Project_template_data.template.value,
    //   "process": this.state.Project_template_data.process.value,
    //   "type": this.state.Project_template_data.type.value,
    //   "Stage": this.state.Project_template_data.stage.value,
    //   "Substage": this.state.Project_template_data.sub_stage.value,
    //   "tdays": this.state.Project_template_data.t_days.value,
    //   "Rbdays": this.state.Project_template_data.remindB_days.value,
    //   "Linktoprevious": this.state.Project_template_data.link_project.value,
    //   "project": this.state.doc_required
    // };



    var formData = new FormData();

    for (let i = 0; i < this.state.fileListData.length; i++) {
      formData.append('file', this.state.fileListData[i])
    }

    formData.set("template",this.state.Project_template_data.template.value);
    formData.set("process", this.state.Project_template_data.process.value);
    formData.set("type", this.state.Project_template_data.type.value);
    formData.set("Stage", this.state.Project_template_data.stage.value);
    formData.set("Substage", this.state.Project_template_data.sub_stage.value);
    formData.set("tdays", this.state.Project_template_data.t_days.value);
    formData.set("Rbdays", this.state.Project_template_data.remindB_days.value);
    formData.set("Linktoprevious", this.state.Project_template_data.link_project.value 
    // ? this.state.previousId[this.state.Project_template_data.link_project.value-1]:""
    );


    axios({
      method: 'POST',
      url: apiurl + '/addProjectTemplateone',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      data: formData
    }).then((response) => {
      this.setState({
        callgetmethod: true
      })
      this.cancelClick()
        this.LinkToPrevious()
      notification.warning({
        message: `Added successfully`,
        placement: "topRight",
      });
    }).catch((error) => {
      alert(JSON.stringify(error))
    })


    // console.log("sdfsdlfjsdfdsf", projectData)
  }


  callroot = () => {

    // this.state.doc_required.map((val) => {
    //   if (val.documentsrequired === '') {
    //     this.setState({ allerror: true, })
    //   } else {
    //     this.setState({ allerror: false })
    //   }

    // })


    var Project_template_data = this.state.Project_template_data;
    var targetkeys = Object.keys(Project_template_data);
    console.log(targetkeys);
    for (var i in targetkeys) {
      var errorcheck = ValidationLibrary.checkValidation(Project_template_data[targetkeys[i]].value, Project_template_data[targetkeys[i]].validation);
      console.log(errorcheck);
      Project_template_data[targetkeys[i]].error = !errorcheck.state;
      Project_template_data[targetkeys[i]].errmsg = errorcheck.msg;
    }
    var filtererr = targetkeys.filter((obj) =>
      Project_template_data[obj].error == true);
    console.log(filtererr.length)
    if (filtererr.length > 0) {
      this.setState({ error: true })
    } else {
      this.setState({ error: false })
      {!this.state.btnchange
        ?
      this.check()
      :
      this.updatetemplate()
      }
    }
    if (filtererr.length === 0 && !this.state.amterror) {
      this.setState(
        {
          Project_template_data,
        },

      );

    }
  }

  changeDynamic = (data, key) => {
    console.log("key", key);
    console.log("data", data);
    var Project_template_data = this.state.Project_template_data;
    var targetkeys = Object.keys(Project_template_data);
    var errorcheck = ValidationLibrary.checkValidation(
      data,
      Project_template_data[key].validation
    );
    Project_template_data[key].value = data;
    Project_template_data[key].error = !errorcheck.state;
    Project_template_data[key].errmsg = errorcheck.msg;
    this.setState({ Project_template_data ,currentState:this.state});
    if(key==="template"){
    this.state.Project_template_data.process.value = ""
    this.state.Project_template_data.type.value = ""
    this.state.Project_template_data.process.validation = [{ name: "required" }]
    this.state.Project_template_data.type.validation = [{ name: "required" }]
    }
    if(key==='process'){
      // alert("Je")
      this.state.Project_template_data.type.value = ""
      this.state.Project_template_data.type.error=null
      this.state.Project_template_data.type.errmsg=null
    }
    if(data==="Copyright"){
      this.state.Project_template_data.process.validation = []
      this.state.Project_template_data.type.validation = []
      }
    var filtererr = targetkeys.filter(
      (obj) =>
        Project_template_data[obj].error == true ||
        Project_template_data[obj].error == null
    );
    if (filtererr.length > 0) {
      this.setState({ error: true, errordummy: false });
    } else {
      this.setState({ error: false });
    }
  };
  addItems = () => {
    this.setState(
      {
        doc_required: [
          ...this.state.doc_required,
          { documentsrequired: "" }
        ]
      },
      () => console.log("sdfdsfljdsf", this.state.doc_required)
    );

  };
  removeItems = (index) => {
    let list = this.state.doc_required;
    list.splice(index, 1)
    this.setState({ list });
  }
  handleChange = (e, key, num) => {
    e.preventDefault();
    let Document = this.state.doc_required;
    let getDocument = Document[num];
    if (key === "opp_name") {
      getDocument.name = e.target.value
      console.log("empty", getDocument.name)
      getDocument.name !== "" && this.setState({ allerror: false });
    }
    this.setState({ doc_required: Document })
  };

  cancelClick = () => {
    this.state.Project_template_data.Project_label_stage.value = ""
    this.state.Project_template_data.link_project.value = ""
    // this.state.Project_template_data.process.value = ""
    this.state.Project_template_data.remindB_days.value = ""
    this.state.Project_template_data.stage.value = ""
    this.state.Project_template_data.sub_stage.value = ""
    this.state.Project_template_data.t_days.value = ""
    // this.state.Project_template_data.template.value = ""
    // this.state.Project_template_data.type.value = ""
    this.state.doc_required = ""
    // fileListData = []
    this.setState({btnchange:false,fileListData:[]})
  }

  DropdownChange=(data,key)=>{
    this.setState({
        [key]:data
    })
}

updatetemplate=()=>{

  axios({
    method: 'put',
    url: apiurl + '/updateprojectTemplate',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    data: {
      "Stage": this.state.Project_template_data.stage.value,
      "Substage": this.state.Project_template_data.sub_stage.value,
      "tdays": this.state.Project_template_data.t_days.value,
      "Rbdays": this.state.Project_template_data.remindB_days.value,
      "Linktoprevious": this.state.Project_template_data.link_project.value ,
      // ? this.state.previousId[this.state.Project_template_data.link_project.value-1]:"",
      projectTemplateId:this.state.projectTemplateId
    }
  }).then((response) => {
    this.setState({
      callgetmethod: true,
      btnchange:false
    })
    this.cancelClick()
    notification.warning({
      message: `Updated successfully`,
      placement: "topRight",
    });
  }).catch((error) => {
    alert(JSON.stringify(error))
  })

}

editcall=(data)=>{
  console.log(data,"editdata")
  this.state.Project_template_data.link_project.value = data.LinkToPrevious
  this.state.Project_template_data.remindB_days.value = data.RBDays
  this.state.Project_template_data.stage.value = data.Stage
  this.state.Project_template_data.sub_stage.value = data.Substage
  this.state.Project_template_data.t_days.value = data.TDays
  // this.state.doc_required.documentsrequired = ""
  // fileListData = []
  this.setState({btnchange:true,projectTemplateId:data.ProjectTemplateId})
}

handleChange = (info) => {
  let fileList = [...info.fileList];

  // fileList = fileList.slice(-1);

  fileList = fileList.map(file => {
    if (file.response) {
      file.url = file.response.url;
    }
    return file;
  });

  this.setState({ fileListData:fileList });
};

  render() {
    console.log(this.state.Project_template_data,"adfjlasdjf")
    var linkToPreviousDrop = []
    this.state.listofpreviousAll.map((data)=>{
      if(data.Template===this.state.Project_template_data.template.value && data.Process ===this.state.Project_template_data.process.value &&data.Type===this.state.Project_template_data.type.value){
        linkToPreviousDrop.push(data.Stage)
    }})
    return (
      <React.Fragment>
        <>
          {/* Head Edit start */}
          <div className="heading_edit">
            <h5>IP Stage Template</h5>
          </div>
          {/* Head Edit end */}
          <div className="card card-min-height card_responsive mt-1">
            <div className="card card-body">
              {/* Grid contents start */}
              <Grid container spacing={1}>
                <Grid item md={12} sm={12}>
                  <Grid container spacing={1}>
                    <Grid item md={3} sm={5}>
                    <Dropdownantd className="w-100"
                      label={"Template"}
                        changeData={(data) => this.changeDynamic(data, 'template')}
                        value={this.state.Project_template_data.template.value}
                        error={this.state.Project_template_data.template.error}
                        errmsg={
                          this.state.Project_template_data.template.errmsg
                        }
                        option={this.state.template}
                        convertString={true}
                        />

                    </Grid>
                    <Grid item md={3} sm={5}>

                      <Dropdownantd className="w-100"
                      label={"Process"}
                        changeData={(data) => this.changeDynamic(data, 'process')}
                        value={this.state.Project_template_data.process.value}
                        error={this.state.Project_template_data.process.error}
                        errmsg={
                          this.state.Project_template_data.process.errmsg
                        }
                        option={this.state.processarr.filter((data)=>{
                          if(this.state.Project_template_data.template.value==="Trademark" || this.state.Project_template_data.template.value==="Patent"){
                            return data === "Application" || data === "Opposition"
                          }
                          if(this.state.Project_template_data.template.value==="Design"){
                            return data === "Application" || data === "Cancellation" || data === "Rectification"
                          }

                        })}
                        convertString={true}
                        />
                    </Grid>
                    <Grid item md={3} sm={5}>

                      <Dropdownantd className="w-100"
                      label={"Type"}
                        changeData={(data) => this.changeDynamic(data, 'type')}
                        value={this.state.Project_template_data.type.value}
                        error={this.state.Project_template_data.type.error}
                        errmsg={
                          this.state.Project_template_data.type.errmsg
                        }
                        option={
                          this.state.typearr.filter((data)=>{
                            if(this.state.Project_template_data.template.value==="Trademark" && this.state.Project_template_data.process.value==="Application"){
                              return data === "IndiaFiling" || data === "International"
                            }
                            if(this.state.Project_template_data.template.value==="Trademark" && this.state.Project_template_data.process.value==="Opposition" || this.state.Project_template_data.template.value==="Design" && this.state.Project_template_data.process.value==="Cancellation" || this.state.Project_template_data.template.value==="Design" && this.state.Project_template_data.process.value==="Rectification"){
                              return data === "Filed" || data === "Defended"
                            }

                            if(this.state.Project_template_data.template.value==="Design" && this.state.Project_template_data.process.value==="Application"){
                              return data === "IndiaFiling" || data === "Foreign"
                            }

                            if(this.state.Project_template_data.template.value==="Patent" && this.state.Project_template_data.process.value==="Application"){
                              return data === "IndiaFiling" || data === "Foreign" || data === "PCT"
                            }

                            if(this.state.Project_template_data.template.value==="Patent" && this.state.Project_template_data.process.value==="Opposition"){
                              return data === "Filed" || data === "Defended"
                            }
  
                          })
                          // this.state.Project_template_data.process.value === "Application" ? ["International Filing", "India Filing"] : ["Filed", "Defended"]
                        } 
                        convertString={true}
                        />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={1}
                className="grid_tab_responsive_project mt-1"
              >
                <Grid item md={2} sm={5}>
                  <Inputantd
                    label={"Stage"}
                    changeData={(data) =>
                      this.changeDynamic(data, "stage")
                    }
                    value={
                      this.state.Project_template_data.stage.value
                    }
                    error={
                      this.state.Project_template_data.stage.error
                    }
                    errmsg={
                      this.state.Project_template_data.stage
                        .errmsg
                    }
                  ></Inputantd>
                </Grid>
                <Grid item md={2} sm={5}>
                  <Inputantd
                    label={"Sub Stage"}
                    changeData={(data) =>
                      this.changeDynamic(data, "sub_stage")
                    }
                    value={this.state.Project_template_data.sub_stage.value}
                    error={this.state.Project_template_data.sub_stage.error}
                    errmsg={
                      this.state.Project_template_data.sub_stage.errmsg
                    }
                  ></Inputantd>
                </Grid>
                <Grid item md={1} sm={5}>
                  <Inputantd label={"T + Days"} changeData={(data) =>
                    this.changeDynamic(data, "t_days")
                  }
                    value={this.state.Project_template_data.t_days.value}
                    error={this.state.Project_template_data.t_days.error}
                    errmsg={
                      this.state.Project_template_data.t_days.errmsg
                    }></Inputantd>
                </Grid>
                <Grid item md={2} sm={5} className={"remainbefore_nowrap"}>
                  <Inputantd
                    label={"Remind before days"}
                    changeData={(data) =>
                      this.changeDynamic(data, "remindB_days")
                    }
                    value={this.state.Project_template_data.remindB_days.value}
                    error={this.state.Project_template_data.remindB_days.error}
                    errmsg={
                      this.state.Project_template_data.remindB_days.errmsg
                    }

                  ></Inputantd>
                </Grid>
                <Grid item md={2} sm={5}>
                  <Dropdownantd
                    label={"Link to Previous"}
                    className="w-100"
                    option={linkToPreviousDrop}
                    changeData={(data) =>
                      this.changeDynamic(data, "link_project")
                    }
                    value={this.state.Project_template_data.link_project.value}
                    error={this.state.Project_template_data.link_project.error}
                    errmsg={
                      this.state.Project_template_data.link_project.errmsg
                    }
                    convertString={true}
                  ></Dropdownantd>
                </Grid>
                {/* <Grid item md={7} sm={5}>

                </Grid> */}
                <Grid item md={3} sm={5} className="documentrequired_align">

                  <Upload 
                  action= 'https://www.mocky.io/v2/5cc8019d300000980a055e76'
                  onChange= {(info)=>this.handleChange(info) } 
                  fileList={this.state.fileListData}>
                    <div className="d-flex">
                      <Inputantd placeholder="Documents Required" label="Documents Required" />
                      <Button>
                        <UploadOutlined />
                  </Button>
                    </div>
                  </Upload>
                </Grid>

                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  className="projecttemp_btnalign"
                  spacing={3}
                >
                  <Grid item >
                    <Button className="btnwidth btnclr_outline" onClick={this.cancelClick}>clear</Button>
                  </Grid>
                  <Grid item>
                    <Button className="btnwidth btnclr" onClick={() => this.callroot()}>
                      {!this.state.btnchange?"Save":"Update"}
                    </Button>
                  </Grid>
                </Grid>

              </Grid>

              <div>
                <ProjectList callgetmethod={this.state.callgetmethod} editcall={(data)=>this.editcall(data)} currentState={this.state.currentState} LinkToPreviouscall={()=>this.LinkToPrevious()}/>
              </div>
            </div>
          </div >
        </>
      </React.Fragment >
    );
  }
}
export default ProjectTemplate;
