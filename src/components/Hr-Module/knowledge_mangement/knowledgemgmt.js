import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Button, Upload, Icon, message,notification } from 'antd';
import AddBoxSharpIcon from '@material-ui/icons/AddBoxSharp';
import Textareaantd from '../../../formcomponent/textareaantd'
import EditableTag from './tags';
import Inputantd from '../../../formcomponent/inputantd';
import ValidationLibrary from "../../../validationlibrary/validation.js";
import UploadDocumentFile from "../../../formcomponent/uploaddoc";
import { apiurl } from "../../../App";
import './knowledgemgmt.css';
import { UploadOutlined } from '@ant-design/icons';
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

class knowledgemgmt extends React.Component {

  state = {
    fileList:[],
    browseitem: [],
    errordummy: true,
    fileData:"",
    fileName:"",
    tagvalue: '',
    selectedFile: "",
    knowledgemgmtdata:
    {
      'title':
      {
        'value': '',
        validation: [{ 'name': 'required' }, { name: '' }],
        error: null,
        errmsg: null
      },
      'categories':
      {
        'value': '',
        validation: [{ 'name': 'required' }, { name: '' }],
        error: null,
        errmsg: null
      },
      'upload_document':
      {
        'value': '',
        validation: [{ 'name': 'required' }],
        error: null,
        errmsg: null
      },
      'description':
      {
        'value': '',
        validation: [{ 'name': 'required' }],
        error: null,
        errmsg: null
      },
    },
  };

  generateAlert = (description) => {
    notification.success({
      message: "Success",
      description,
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  prompting = (description) => {
    notification.warning({
      message: "Failed",
      description,
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };


  checkValidation = () => {
    var knowledgemgmtdata = this.state.knowledgemgmtdata;
    var targetkeys = Object.keys(knowledgemgmtdata);
    console.log(targetkeys);
    for (var i in targetkeys) {
      var errorcheck = ValidationLibrary.checkValidation(knowledgemgmtdata[targetkeys[i]].value, knowledgemgmtdata[targetkeys[i]].validation);
      console.log(errorcheck);
      knowledgemgmtdata[targetkeys[i]].error = !errorcheck.state;
      knowledgemgmtdata[targetkeys[i]].errmsg = errorcheck.msg;
    }
    var filtererr = targetkeys.filter((obj) =>
      knowledgemgmtdata[obj].error == true);
    console.log(filtererr.length)
    if (filtererr.length > 0) {
      this.setState({ error: true })

      console.log(this.state.fileData, "tostring")
      var self = this
      var formData = new FormData();
        formData.append('imageArray', this.state.fileData)
      formData.set("knowtitle", this.state.knowledgemgmtdata.title.value);
      formData.set("knowcategory", this.state.knowledgemgmtdata.categories.value)
      formData.set("knowtags", JSON.stringify(this.state.tagvalue))
      formData.set("knowdescription", this.state.knowledgemgmtdata.description.value)

      fetch(`${apiurl}/addknowledgemanagement`, {
        method: 'POST',
        body: formData,
      }).then((response) => response.json()).then((responseJson) => {
        if(responseJson.status == 0){
          this.generateAlert("Record Saved Successfully")
        self.state.knowledgemgmtdata.title.value = ""
        self.state.knowledgemgmtdata.categories.value = ""
        this.state.fileData=""
        this.state.fileName=""
        self.state.knowledgemgmtdata.description.value = ""
        self.setState({ tagnulltrue: true, tagvalue: [], fileName:"" })
        this.setState({fileName:""})
      }})


      // axios({
      //   method: 'post',
      //   url: `${apiurl}/addknowledgemanagement`,
      //   data: {
      //     knowtitle: this.state.knowledgemgmtdata.title.value,
      //     knowcategory: this.state.knowledgemgmtdata.categories.value,
      //     imageArray: this.state.selectedFile,
      //     knowtags: this.state.tagvalue.toString(),
      //     knowdescription: this.state.knowledgemgmtdata.description.value
      //   }

      // })
      // alert("saved successfully")

      //   .then(function (response) {
      //     console.log(response, "knowsuccess");
      //     self.state.knowledgemgmtdata.title.value = ""
      //     self.state.knowledgemgmtdata.categories.value = ""
      //     self.fileInput.value = "";
      //     self.state.knowledgemgmtdata.description.value = ""
      //     self.setState({ tagnulltrue: true, tagvalue: [] })

      //   })
      //   .catch(function (error) {
      //     console.log(error, "knowerror");
      //   });

    } else {
      this.setState({ error: false })

    }
    this.setState({ knowledgemgmtdata })
  }


  changeDynamic = (data, key) => {
    console.log("key", key);

    console.log("data", data);
  
    var knowledgemgmtdata = this.state.knowledgemgmtdata;
    var targetkeys = Object.keys(knowledgemgmtdata);

    var errorcheck = ValidationLibrary.checkValidation(data, knowledgemgmtdata[key].validation);
    knowledgemgmtdata[key].value = data;
    knowledgemgmtdata[key].error = !errorcheck.state;
    knowledgemgmtdata[key].errmsg = errorcheck.msg;
    this.setState({ knowledgemgmtdata });
    var filtererr = targetkeys.filter((obj) =>
      knowledgemgmtdata[obj].error == true || knowledgemgmtdata[obj].error == null);
    if (filtererr.length > 0) {
      this.setState({
        error: true,
        errordummy: false
      })
    } else {
      this.setState({ error: false })
    }
  }

  submitData = (e) => {
    e.preventDefault();
    console.log("eData", e)
  }

  tagvalue = (data) => {
    this.setState({ tagvalue: data })
  }

  onFileChange = e => {

    let files = e.target.files
    let reader = new FileReader()
    reader.readAsDataURL(files[0])

    reader.onload = (e) => {
      console.log(e, "imgurlresult")
      this.setState({ selectedFile: e.target.result });
    }

  };
  uploadFile=(e)=>{
    console.log(e, "clinicclinicclinic");

    if (e.target.files.length !== 0 && e.target.files[0].type == "application/pdf" ) {
      
      console.log(e.target.files[0].name, "clinicclinicclinic");
    this.setState({
        fileData: e.target.files[0],
        fileName:e.target.files[0].name
      });
    }
    else {
      this.prompting("Upload File With .Pdf Format")
    }
  
}
  cancel = () => {
    this.state.knowledgemgmtdata.title.value = ""
    this.state.knowledgemgmtdata.categories.value = ""
    // this.fileListData.value = "";
    this.state.knowledgemgmtdata.description.value = ""
    this.setState({ tagnulltrue: true, tagvalue: [] })
  }

  render() {
    const knowledgemgmt = this.state.browseitem.map((item) => item);
    console.log(this.state, "selectedFile")
    if (this.state.tagnulltrue) {
      this.setState({ tagnulltrue: false })
    }

    return (

      <React.Fragment>
        <div className="card top_move">
          <div className="card-body">

            <Grid container spacing={3} className="mt-3 ">
              {/* <Grid item={1}></Grid> */}
              <Grid item md={3} sm={5} className="w-100">
                <Inputantd label="Title"
                  changeData={(data) => this.changeDynamic(data, 'title')}
                  value={this.state.knowledgemgmtdata.title.value}
                  error={this.state.knowledgemgmtdata.title.error}
                  errmsg={this.state.knowledgemgmtdata.title.errmsg}
                  required />
              </Grid>
              <Grid item md={1}></Grid>
              <Grid item md={3} sm={5} className="w-100">
                <Inputantd label="Category"
                  changeData={(data) => this.changeDynamic(data, 'categories')}
                  value={this.state.knowledgemgmtdata.categories.value}
                  error={this.state.knowledgemgmtdata.categories.error}
                  errmsg={this.state.knowledgemgmtdata.categories.errmsg}
                  required />
              </Grid>
              <Grid item md={1} ></Grid>
              <Grid item md={4} sm={11} className="w-100 uploaddocknowledge">
                <div className="flex">
                  <label className="mr-1">Upload Document</label>
                </div>
             
                  <input
                        type="text"
                        value={this.state.fileName}
                        className="html__input-box"
                        placeholder="My file.pdf"
                        onClick={() =>
                          document.getElementById("getFile").click()
                        }
                      />
                      <div className="upload__container--btn">
                        <Button
                          className="button_browse"
                          onClick={() =>
                            document.getElementById("getFile").click()
                          }
                        >
                          Browse
                        </Button>
                      </div>
                      <input
                        type="file"
                        id="getFile"
                        onChange={this.uploadFile}
                        className="hideFile"
                      />
              </Grid>


            </Grid>
            {/* {knowledgemgmt} */}
            <Grid item xs={6}>
              <EditableTag tagvalue={(data) => this.tagvalue(data)} tagnull={this.state.tagnulltrue && this.state.tagvalue} />
            </Grid>

            <Grid item md={6} sm={12} className="mb-4">
              <Textareaantd
                className={"w-100 description "}
                label="Description"
                changeData={(data) => this.changeDynamic(data, 'description')}
                value={this.state.knowledgemgmtdata.description.value}
                error={this.state.knowledgemgmtdata.description.error}
                errmsg={this.state.knowledgemgmtdata.description.errmsg}
                required
              />

            </Grid>
            {/* <Buttons/> */}
            <Grid container
              direction="row"
              justify="center"
              alignItems="center"
              className="gridbtnalignknowledge"
              spacing={3}>
              <Grid item >
                <Button size="lg" className="btnmargin btnwidth btnclr" onClick={this.checkValidation}> Save</Button>
              </Grid>
              <Grid item >
                <Button size="lg" className="btnwidth btnclr_outline" onClick={this.cancel}>Cancel</Button>
              </Grid>
            </Grid>
          </div>
        </div>
      </React.Fragment>
    )
  }

}
export default knowledgemgmt;
