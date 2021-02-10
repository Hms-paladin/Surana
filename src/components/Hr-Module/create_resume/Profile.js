import React from "react";
import Grid from '@material-ui/core/Grid';
import Avatar from './Photouploader'
import Button from 'react-bootstrap/Button'
import Inputantd from '../../../formcomponent/inputantd';
import Dropdownantd from '../../../formcomponent/dropdownantd';
import Textareaantd from '../../../formcomponent/textareaantd';
import "./Createresume.css";
import ValidationLibrary from "../../../validationlibrary/validation.js";
import { apiurl } from "../../../App";
import DatePickerMui from "../../../formcomponent/DatePickerMUI";
import { resumeTab, addProfile, updateProfile } from "./action/CreateResumeAction";
import { connect } from 'react-redux';
import { message } from 'antd';
import Inputnumber from "../../../formcomponent/inputnumberantd";
import { buttonDisableAction, getReferredBy } from "../../../fixers/fixersAction";


const axios = require('axios');

class Profile extends React.Component {
  state = {
    imageData:[],
    changeval: true,
    profiledata:
    {
      'candtypeId':
      {
        'value': '',
        validation: [{ name: "required" }],
        error: null,
        errmsg: null
      },
      'firstname':
      {
        'value': '',
        validation: [{ name: 'alphabetsOnly' }, { name: "required" }],
        error: "",
        errmsg: null
      },
      'lastname':
      {
        'value': '',
        validation: [{ name: 'alphabetsOnly' }, { name: "required" }],
        error: "",
        errmsg: null
      },
      'fathername':
      {
        'value': '',
        validation: [{ name: 'alphabetsOnly' }, { name: "required" }],
        error: "",
        errmsg: null
      },
      'phoneNo':
      {
        'value': '',
        validation: [{ name: "mobile" }, { name: "required" }],
        error: null,
        errmsg: null
      },
      'gender':
      {
        'value': '',
        validation: [{ name: "required" }],
        error: "",
        errmsg: null
      },
      'referredby':
      {
        'value': '',
        validation: [],
        error: null,
        errmsg: null
      },
      'currentaddress':
      {
        'value': '',
        validation: [{ name: "required" }],
        error: null,
        errmsg: null
      },
      'location':
      {
        'value': '',
        validation: [{ name: 'alphabetsOnly' }],
        error: null,
        errmsg: null
      },
      'dob':
      {
        'value': '',
        validation: [],
        error: null,
        errmsg: null
      },
      'emailId':
      {
        'value': '',
        validation: [{ name: 'email' },{ name: "required" }],
        error: null,
        errmsg: null
      },


      'profession':
      {
        'value': '',
        validation: [{ name: '' }],
        error: null,
        errmsg: null
      },
      'permanentaddress':
      {
        'value': '',
        validation: [{ name: "" },{ name: "required" }],
        error: null,
        errmsg: null
      },
      'linkedin':
      {
        'value': '',
        validation: [{ name: "" }],
        error: null,
        errmsg: null
      },
      'twitter':
      {
        'value': '',
        validation: [{ name: "" }],
        error: null,
        errmsg: null
      },

      'profile_pic': {
        'value': '',
        validation: [],
        error: null,
        errmsg: null
      }
    }
  };

  componentDidMount(){
      if (this.props.resumeEditData !== null && this.props.resumeEditData[0].CandtypeId !== 3) {
        this.props.choosenCandidateType(this.props.resumeEditData[0].CandtypeId)
      }
    this.props.dispatch(getReferredBy())
  }

  componentWillMount() {
    // alert('willMount')
    console.log(this.props.resumeEditData,"sdfasdfasdfxnxnxn")
    setTimeout(() => {
      if (this.props.resumeTab != null) {
        this.setState({ profiledata: this.props.resumeTab })
        // this.state.profiledata.profile_pic.value=this.props.resumeTab.Image
      }
     }, 50)
     

     if(this.props.edit === true && this.props.resumeEditData !== null && this.props.resumeEditData.length > 0){
      //  this.state.imageUrl=this.props.resumeEditData[0].resume[0].Image
      //  this.state.profiledata.profile_pic.value = this.props.resumeEditData[0].resume[0].Image

      //  this.state.imageUrl=this.props.resumeEditData[0].Image
      //  this.state.profiledata.profile_pic.value = this.props.resumeEditData[0].Image
        this.state.profiledata.candtypeId.value=this.props.resumeEditData[0].CandtypeId
        this.state.profiledata.firstname.value=this.props.resumeEditData[0].FirstName
        this.state.profiledata.lastname.value=this.props.resumeEditData[0].LastName
        this.state.profiledata.gender.value=this.props.resumeEditData[0].Gender === "1" ? 1 : 2
        this.state.profiledata.dob.value=this.props.resumeEditData[0].DoB
        this.state.profiledata.fathername.value=this.props.resumeEditData[0].FatherName
        this.state.profiledata.phoneNo.value=this.props.resumeEditData[0].PhoneNumber
        this.state.profiledata.emailId.value=this.props.resumeEditData[0].EmailId
        this.state.profiledata.location.value=this.props.resumeEditData[0].Location
        this.state.profiledata.linkedin.value=this.props.resumeEditData[0].LinkedIn
        this.state.profiledata.twitter.value=this.props.resumeEditData[0].Twitter
        this.state.profiledata.referredby.value=this.props.resumeEditData[0].ReferredBy
        // this.state.profiledata.referredby.value=1
        this.state.profiledata.currentaddress.value=this.props.resumeEditData[0].CurrentAddress
        this.state.profiledata.permanentaddress.value=this.props.resumeEditData[0].PermanentAddress
     }
     if(this.props.resumeEditData !==null){
      this.state.imageUrl=this.props.resumeEditData[0]&&this.props.resumeEditData[0].Image
      this.state.profiledata.profile_pic.value = this.props.resumeEditData[0]&&this.props.resumeEditData[0].Image
      this.setState({})
     }
     
    
    this.setState({})
  }

  componentWillReceiveProps(){
    this.setState({})
  }
  // Image Changing
  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }
  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true, });
      return;
    }
    if (info.file.type === "image/jpeg"  && info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          imageData: info,
          loading: false,
        }),

      );
    }
    if(info.file.type !== "image/jpeg"){
      this.setState({ loading: false });
      message.error('This file format is not acceptable')
    }
    this.setState({})
    this.state.profiledata.profile_pic.value = this.state.imageUrl;
  };

  changeDynamic = (data, key) => {
    if (key === 'candtypeId') {
      this.props.choosenCandidateType(data)
    }
    if (key === 'profile_pic') {
      this.handleChange(data)

    }
    console.log("key", key);
    console.log("data", data);
    var profiledata = this.state.profiledata;
    var targetkeys = Object.keys(profiledata);

    var errorcheck = ValidationLibrary.checkValidation(data, profiledata[key].validation);
    profiledata[key].value = data;
    profiledata[key].error = !errorcheck.state;
    profiledata[key].errmsg = errorcheck.msg;

    this.setState({ profiledata });

    var filtererr = targetkeys.filter((obj) =>
      profiledata[obj].error == true || profiledata[obj].error == null);
    if (filtererr.length > 0) {
      this.props.changesetdata(data, key, true, profiledata[key].errmsg)
      this.setState({ error: true })
    } else {
      this.setState({ error: false })
    }
    if (profiledata[key].error === false) {
      this.props.changesetdata(data, key, false, profiledata[key].errmsg)
    }


  }

  callroot = (edit) => {
    var profiledata = this.state.profiledata;
    var targetkeys = Object.keys(profiledata);
    console.log(targetkeys);
    for (var i in targetkeys) {
      var errorcheck = ValidationLibrary.checkValidation(profiledata[targetkeys[i]].value, profiledata[targetkeys[i]].validation);
      console.log(errorcheck, "errorcheck");
      profiledata[targetkeys[i]].error = !errorcheck.state;
      profiledata[targetkeys[i]].errmsg = errorcheck.msg;
    }
    var filtererr = targetkeys.filter((obj) =>
      profiledata[obj].error == true);
    console.log(filtererr.length)
    if (filtererr.length > 0) {
      this.setState({ error: true })
    } else {
      this.setState({ error: false })

    }
    this.setState({ profiledata })

    let changenext = []
    let j = 0
    for (j = 0; j < targetkeys.length; j++) {
      changenext.push(this.state.profiledata[targetkeys[j]].error)
    }

    let nextvalue = changenext.every((val) => val === false)

    if (filtererr.length === 0) {
      this.profileApi(edit);
      this.setState({ changeval: false })
    }
  }


  profileApi = (edit) => {

    let formData = new FormData();
    console.log(this.state.imageData,"imageDatavalues")
    
      for (var i in this.state.imageData) {
        formData.append('imageArray', this.state.imageData[i].originFileObj)
      }

    var apiDataKeys = ['candtypeId', 'firstname', 'lastname', 'fathername', 'phoneNo', 'gender', 'referredby', 'currentaddress', 'location', 'dob', 'emailId', 'permanentaddress', 'linkedin', 'twitter'];
    for (var i in apiDataKeys) {
      formData.set(apiDataKeys[i], this.state.profiledata[apiDataKeys[i]].value)
    }

    if(this.props.edit === true){
      formData.set("resId",this.props.resumeEditData[0].ResId)
      this.props.dispatch(buttonDisableAction(true))
      this.props.dispatch(updateProfile(formData,this.props.propFunc));
    }else{
      this.props.dispatch(buttonDisableAction(true))
      if(this.props.resumeTab === null){
        this.props.dispatch(addProfile(formData,this.props.propFunc));
      }else{
        formData.set("resId",this.props.resumeId)
        formData.append('imageArray', this.props.resumeEditData[0].Image)
        this.props.dispatch(updateProfile(formData,this.props.propFunc,1));
      }
    }
    this.props.dispatch(resumeTab(this.state.profiledata));
  }

  // componentWillUnmount(){
  //   alert(2)
  // }

  render() {
    console.log(this.state,"sjflasfjlsdjf")
    const { candidateType,referredByMaster } = this.props;
    return (
      <div className="top_move resume padml card card-min-height ">
        <div className="card-body">
          <div className="row">
            <div className="col-md-12 p-0">
              <div className="row">{/*Sub Row 1 Start*/}
                <div className="col-md-10 p-0">
                  <div className="row">{/*Sub Row 2 Start*/}
                    <div className="col-md-4 mb-2">
                      <Dropdownantd label={"Candidate Type"} className={"w-100"}
                        option={candidateType && candidateType.map(val => val.CandType)}
                        changeData={(data) => this.changeDynamic(data, 'candtypeId')}
                        value={this.state.profiledata.candtypeId.value}
                        error={this.state.profiledata.candtypeId.error}
                        errmsg={this.state.profiledata.candtypeId.errmsg}
                        showSearch
                      />
                    </div>
                    <div className="col-md-4 mb-2">
                      <Inputantd label={"First Name"} className={"w-100"}
                        changeData={(data) => this.changeDynamic(data, 'firstname')}
                        value={this.state.profiledata.firstname.value}
                        error={this.state.profiledata.firstname.error}
                        errmsg={this.state.profiledata.firstname.errmsg}
                        required
                      />
                    </div>
                    <div className="col-md-4 mb-2">
                      <Inputantd label={"Last Name"} className={"w-100"}
                        changeData={(data) => this.changeDynamic(data, 'lastname')}
                        value={this.state.profiledata.lastname.value}
                        error={this.state.profiledata.lastname.error}
                        errmsg={this.state.profiledata.lastname.errmsg}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <Dropdownantd label={"Gender"} className={"w-100"}
                        option={["Male", "Female"]}
                        changeData={(data) => this.changeDynamic(data, 'gender')}
                        value={this.state.profiledata.gender.value}
                        error={this.state.profiledata.gender.error}
                        errmsg={this.state.profiledata.gender.errmsg}
                      />
                    </div>
                    <div className="col-md-4">
                      <DatePickerMui label="Date of Birth" className={"w-75"}
                        changeData={(data) => this.changeDynamic(data, 'dob')}
                        value={this.state.profiledata.dob.value}
                        error={this.state.profiledata.dob.error}
                        errmsg={this.state.profiledata.dob.errmsg}
                        disableFuture
                        blockDate={new Date()}
                      />
                    </div>
                    <div className="col-md-4">
                      <Inputantd label={"Father/Husband/Guardian Name"} className={"w-100"}
                        changeData={(data) => this.changeDynamic(data, 'fathername')}
                        value={this.state.profiledata.fathername.value}
                        error={this.state.profiledata.fathername.error}
                        errmsg={this.state.profiledata.fathername.errmsg}
                        required
                      />
                    </div>
                  </div>{/*Sub Row 2 End*/}
                </div>{/* Column End */}
          
                <div className="col-md-2 mt-4">
                  <div className="d-flex justify-content-center">
                    <div className="avater">
                      <Avatar
                        value={this.state.profiledata.profile_pic.value}
                        error={this.state.profiledata.profile_pic.error}
                        errmsg={this.state.profiledata.profile_pic.errmsg}
                        changeData={(data) => this.changeDynamic(data, 'profile_pic')}
                        imageUrl={this.state.imageUrl}
                        loading={this.state.loading}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>{/*Sub Row End"*/}
            </div>
                <div className="col-md-4">
                  <Inputantd
                    label={"Phone No"}
                    className={"w-100"}
                    changeData={(data) => this.changeDynamic(data, 'phoneNo')}
                    value={this.state.profiledata.phoneNo.value}
                    error={this.state.profiledata.phoneNo.error}
                    errmsg={this.state.profiledata.phoneNo.errmsg}
                  />
                </div>
                <div className="col-md-4">
                    <Inputantd label={"Email Id"} className={"w-100"}
                      changeData={(data) => this.changeDynamic(data, 'emailId')}
                      value={this.state.profiledata.emailId.value}
                      error={this.state.profiledata.emailId.error}
                      errmsg={this.state.profiledata.emailId.errmsg}
                    />
                </div>
                <div className="col-md-4">
                  <Inputantd label={"Location"} className={"w-100"}
                    changeData={(data) => this.changeDynamic(data, 'location')}
                    value={this.state.profiledata.location.value}
                    error={this.state.profiledata.location.error}
                    errmsg={this.state.profiledata.location.errmsg}
                  />
                </div>
                <div className="col-md-4">
                  <Inputantd label={"LinkedIn"} className={"w-100"}
                    changeData={(data) => this.changeDynamic(data, 'linkedin')}
                    value={this.state.profiledata.linkedin.value}
                    error={this.state.profiledata.linkedin.error}
                    errmsg={this.state.profiledata.linkedin.errmsg}

                  />
                </div>
                <div className="col-md-4">
                  <Inputantd label={"Twitter"} className={"w-100"}
                    changeData={(data) => this.changeDynamic(data, 'twitter')}
                    value={this.state.profiledata.twitter.value}
                    error={this.state.profiledata.twitter.error}
                    errmsg={this.state.profiledata.twitter.errmsg}
                  />
                </div>
                <div className="col-md-4">
                    <Dropdownantd label={"Referred By"} className={"w-100"}
                      option={referredByMaster !== null && referredByMaster[0].map(val => val.EmpName)}
                      changeData={(data) => this.changeDynamic(data, 'referredby')}
                      value={this.state.profiledata.referredby.value}
                      error={this.state.profiledata.referredby.error}
                      errmsg={this.state.profiledata.referredby.errmsg}
                      convertString
                    />
                </div>
                <div className="col-md-4 mt-2">
                  <Textareaantd
                      className={"w-100"}
                      label="Current Address"
                      changeData={(data) => this.changeDynamic(data, 'currentaddress')}
                      value={this.state.profiledata.currentaddress.value}
                      error={this.state.profiledata.currentaddress.error}
                      errmsg={this.state.profiledata.currentaddress.errmsg}
                  />
                </div>
                <div className="col-md-4  mt-2">
                  <Textareaantd
                    className={"w-100"}
                    label="Permanent Address"
                    changeData={(data) => this.changeDynamic(data, 'permanentaddress')}
                    value={this.state.profiledata.permanentaddress.value}
                    error={this.state.profiledata.permanentaddress.error}
                    errmsg={this.state.profiledata.permanentaddress.errmsg}
                  />
                </div>
          </div>{/*Row End */}
          <div className="check-css-profile">
              <Button onClick={() => this.callroot(this.props.edit)} className="iconbtnright w-15" disabled={this.props.buttonDisableState} >
                {
                  this.props.edit === true ? "Update" : "Next"
                }
              </Button>
            </div>

        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  referredByMaster:state.fixers.referredBy,
  resumeEditData: state.resumeReducer.resume,
  resumeTab: state.resumeReducer.resumeTab,
  resumeId: state.resumeReducer.resumeId
})


export default connect(mapStateToProps)(Profile);