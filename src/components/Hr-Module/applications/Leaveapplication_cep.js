import React from "react";
import Card from 'react-bootstrap/Card';
import { DatePicker, Upload, Button, Icon, message } from 'antd';
//import Button from 'react-bootstrap/Button';
import Grid from "@material-ui/core/Grid";
import "./Application.css";

import Inputantd from '../../../formcomponent/inputantd';
import Dropdownantd from '../../../formcomponent/dropdownantd';
import Calenderbox from '../../../formcomponent/calenderbox';
import Textareaantd from '../../../formcomponent/textareaantd';
import Inputnumberantd from '../../../formcomponent/inputnumberantd';
import ValidationLibrary from "../../../validationlibrary/validation.js"
import { addCepLeave, addSubject } from "./applyLeaveAction";
import { getProfessionalCourse, getEmployees } from '../../../fixers/fixersAction';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { UploadOutlined } from '@ant-design/icons';

import dateFormat from 'dateformat';
import DatePickerMui from "../../../formcomponent/DatePickerMUI";

import { connect } from 'react-redux';
import ExamSchedule from "./examschedule_cep.js";
import Axios from "axios";
import { apiurl } from "../../../App";


class Leaveapplication_cep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      examScheduleUploadName:null,
      examScheduleUploadControl:true,
      uploadFileData: [],
      isEnabled: false,
      contents: [],
      subject: ["Digital Principle", "Dsp", "Ai", "Computer Programming"],
      errordummy: true,
      leavecepdata:
      {
        'No_of_avail_leave':
        {
          'value': '',
          validation: [{ 'name': 'required' }, { "name": 'alphaNumaricOnly' }],
          error: null,
          errmsg: null
        },
        'professional_course':
        {
          'value': '',
          // validation: [{ 'name': 'required' }, { name: '' }], 
          error: null,
          errmsg: null
        },
        'subject_name':
        {
          'value': '',
          validation: [{ 'name': '' }],
          error: null,
          errmsg: null
        },
        'NoOfotherdays':
        {
          'value': '',
          validation: [{ 'name': 'required' }, { "name": 'allowNumaricOnly' },{"name":"custommaxLength","params":"2"}],
          error: null,
          errmsg: null
        },
        'NoOfexamdays':
        {
          'value': '',
          validation: [{ 'name': 'required' }, { "name": 'allowNumaricOnly' },{"name":"custommaxLength","params":"2"}],
          error: null,
          errmsg: null
        },

        'totaldaysofleave':
        {
          'value': '',
          validation: [{ "name": 'allowNumaricOnly' },{"name":"custommaxLength","params":"2"}],
          error: null,
          errmsg: null
        },
        'address': {
          'value': '',
          validation: [{ 'name': 'required' }],
          error: null,
          errmsg: null
        },
        'No_of_avail_leave': {
          'value': '',
          validation: [{ 'name': 'required' }, { "name": 'alphaNumaricOnly' }],
          error: null,
          errmsg: null
        },
        'remarks': {
          'value': '',
          validation: [{ 'name': 'required' }],
          error: null,
          errmsg: null
        },
        'add_calender': {
          validation: [{ 'name': '' }],
          error: null,
          errmsg: null
        },
        'ref_date': {
          validation: [{ 'name': '' }],
          error: null,
          errmsg: null
        },
        'enter_ref': {
          validation: [{ 'name': '' }],
          error: null,
          errmsg: null
        }
      },
    };
  }

  componentWillMount() {
    // this.getTotalLeaves()
    this.props.dispatch(getProfessionalCourse())
    this.props.dispatch(getEmployees())
  }

  componentDidMount(){
    this.getTotalLeaves()
  }

  getTotalLeaves = () => {
    Axios({
      method: 'Post',
      url: apiurl + '/totalleaves',
      data: {
        empId: 1
      }
    }).then((response) => {
      this.state.leavecepdata.No_of_avail_leave.value = response.data.data[0].TotalLeaves
      this.state.leavecepdata.No_of_avail_leave.error = false
      this.state.leavecepdata.No_of_avail_leave.errmsg = ''
      this.setState({})
    })
  }

  checkValidation = () => {
    var mainvalue = {}
    var leavecepdata = this.state.leavecepdata;
    var dutykeys = Object.keys(leavecepdata);
    console.log(dutykeys, "dutykeys");
    for (var i in dutykeys) {
      var errorcheck = ValidationLibrary.checkValidation(leavecepdata[dutykeys[i]].value, leavecepdata[dutykeys[i]].validation);
      console.log(errorcheck, "errorcheck");
      leavecepdata[dutykeys[i]].error = !errorcheck.state;
      leavecepdata[dutykeys[i]].errmsg = errorcheck.msg;
      mainvalue[dutykeys[i]] = leavecepdata[dutykeys[i]].value
    }
    var filtererr = dutykeys.filter((obj) =>
      leavecepdata[obj].error == true);
    console.log(filtererr.length)
    if (filtererr.length > 0) {
      this.setState({ error: true })
    } else {
      this.setState({ error: false })

    }
    this.setState({
      mainvalue,
      leavecepdata
    })
    if (filtererr.length === 0) {
      // alert("error 0")
      var cepLeave = {
        empId:1,
        leaveId: 3,
        leaveavailed: this.state.leavecepdata.No_of_avail_leave.value,
        courseId: this.state.leavecepdata.professional_course.value,
        NoOfexamdays: this.state.leavecepdata.NoOfexamdays.value,
        refdate: this.state.leavecepdata.ref_date.value,
        reference: this.state.leavecepdata.enter_ref.value,
        address: this.state.leavecepdata.address.value,
        NoOfOtherdays: this.state.leavecepdata.NoOfotherdays.value,
        totaldaysofleave: this.state.leavecepdata.totaldaysofleave.value,
        Examschedule: this.state.examScheduleUploadName,
        remarks: this.state.leavecepdata.remarks.value,
        subject: this.state.contents
      }

      this.props.dispatch(addCepLeave(cepLeave, () => this.resetFormData()))
    }
  }



  changeDynamic = (data, key) => {
    console.log("key", key);
    console.log("data", data);
    var leavecepdata = this.state.leavecepdata;
    var dutykeys = Object.keys(leavecepdata);

    var errorcheck = ValidationLibrary.checkValidation(data, leavecepdata[key].validation);
    leavecepdata[key].value = data;
    leavecepdata[key].error = !errorcheck.state;
    leavecepdata[key].errmsg = errorcheck.msg;
    this.setState({ leavecepdata });
    var filtererr = dutykeys.filter((obj) =>
      leavecepdata[obj].error == true || leavecepdata[obj].error == null);
    if (filtererr.length > 0) {
      this.setState({
        error: true,
        errordummy: false
      })
    } else {
      this.setState({ error: false })
    }
  }

  ipabdefclick = () => {
    var isEnabled = this.state.leavecepdata.subject_name.value.toString().length > 0 && this.state.leavecepdata.add_calender.value != "" ? true : false
    var subname = this.state.leavecepdata.subject_name.value;
    var examdate = dateFormat(this.state.leavecepdata.add_calender.value,'yyyy-mm-dd');
    var data = {
      subname,
      examdate
    }
    if (isEnabled === true) {
      this.state.contents.push(data)
    }
    this.setState({})
    this.state.leavecepdata.add_calender.value = "";
    var subject = this.state.leavecepdata.subject_name.value = "";

  }

  listDateDelete = (val) => {
    this.state.contents.splice(this.state.contents.indexOf(val), 1);
    this.setState({})

  }

  resetFormData = () => {
    var leaveCepDataKeys = Object.keys(this.state.leavecepdata)
    for (var i in leaveCepDataKeys) {
      this.state.leavecepdata[leaveCepDataKeys[i]].value = ''
    }
    this.setState({ contents: [], examScheduleUploadName:null, examScheduleUploadControl:true,examScheduleUpload:null})
  }


  handleChange = (info, uploadName) => {
    console.log(info,'sdfjdfsjklkl')
    

    if(info.status !== 'error' && info.status !== "uploading"){

      let fileList = [...info.fileList];
  
      fileList = fileList.slice(-1);
  
      fileList = fileList.map(file => {
        if (file.response) {
          file.url = file.response.url;
        }
        return file;
      });
      this.setState({ examScheduleUpload: fileList });
      if(this.state.examScheduleUpload !== undefined && this.state.examScheduleUploadControl !== false){
        this.setState({examScheduleUploadControl:false})
        this.uploadExamScheduleUploadApi(this.state.examScheduleUpload)
      }
  }
  };

  uploadExamScheduleUploadApi = (examScheduleUpload) => {
    var formData = new FormData();
    examScheduleUpload && formData.append("UploadFile", this.state.examScheduleUpload && this.state.examScheduleUpload[0] ?this.state.examScheduleUpload[0].originFileObj:"");
      Axios({
        method:'POST',
        url: apiurl+'/uploadExamschedule',
        data:formData
      }).then((response)=>{
        this.setState({examScheduleUploadName:response.data.data})
      })
  }

  render() {
    console.log(this.state,'xjdeudjdk')
    const { empList } = this.props;
    return (
      <div className="card top_move">
        <div className="card-body">
          <Grid container spacing={6} className="text-left mt-2 mb-2">
            <Grid item md={4} sm={6} className="w-100">
              <h5>Days Already Availed: {this.state.leavecepdata.No_of_avail_leave.value}</h5>
              {/* <Inputantd
                className={"w-100"}
                label="No.of days"
                span="(Leave already availed this month)"
                // changeData={(data) => this.changeDynamic(data, 'No_of_avail_leave')}
                value={this.state.leavecepdata.No_of_avail_leave.value}
                error={this.state.leavecepdata.No_of_avail_leave.error}
                errmsg={this.state.leavecepdata.No_of_avail_leave.errmsg}
              /> */}
            </Grid>
            <Grid item md={4} sm={6} className="w-100">
              <Dropdownantd
                className={"w-100 text-truncate mt-4"}
                label="Professional course"
                option={this.props.course && this.props.course.map(val => val.CourseName)}
                changeData={(data) => this.changeDynamic(data, 'professional_course')}
                value={this.state.leavecepdata.professional_course.value}
                error={this.state.leavecepdata.professional_course.error}
                errmsg={this.state.leavecepdata.professional_course.errmsg}
                required
              />

            </Grid>

            <Grid item md={2} sm={6} className="w-100">
              <Dropdownantd
                className={"w-100 mt-4"}
                label="Subject Name"
                option={["Human Rights", "Environmental Law"]}
                changeData={(data) => this.changeDynamic(data, 'subject_name')}
                value={this.state.leavecepdata.subject_name.value}
                error={this.state.leavecepdata.subject_name.error}
                errmsg={this.state.leavecepdata.subject_name.errmsg}
                convertString
              />
              {
                this.state.contents.length > 0 &&
                <Grid item md={12} sm={5}>
                  <div className="row card cep_rectcard">
                    <div className="cep_rectcardbody">
                      {
                        this.state.contents.map((val, index) => {
                          return (
                            <div className="check">
                              <div className="col-md-6 pr-0">
                                <p className="pr-2 mb-0 text-truncate">{val.subname}</p>
                              </div>
                              <div className="col-md-4 pr-0">
                                {dateFormat(val.examdate, "dd-mm-yy")}
                              </div>
                              <div className="col-md-2 pr-0">
                                <DeleteIcon className="ipab_rectdel" onClick={() => this.listDateDelete(val)} />
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                </Grid>
              }
            </Grid>
            <Grid item md={2} sm={6} className="w-100 ">
              <div className="d-flex">
                <div className="">
                  <Calenderbox
                    className={"w-100 position_icon calen_adjust mt-4"}
                    label="Choose date"
                    format={"DD-MM-YY"}
                    changeData={(data) => this.changeDynamic(data, 'add_calender')}
                    value={this.state.leavecepdata.add_calender.value}
                    error={this.state.leavecepdata.add_calender.error}
                    errmsg={this.state.leavecepdata.add_calender.errmsg}
                    required
                  />
                </div>
                <div className="svg_adjust">
                  <AddCircleOutlineIcon className="leave_add_icon mt-4" onClick={this.ipabdefclick} />
                </div>
              </div>

            </Grid>
            {/* <Grid item md={12} sm={6} /> */}
            <Grid item md={4} sm={12} className="w-100 card_date">
              <div className="hint_font">(Managing partner's prior permission)</div>

              <Card className="leavecard">

                <Card.Body className="leave_cardbody">
                  <div className="flex labelhgt">
                    <label className="calenderantdstyle mr-2">
                      Enter Date
                        <DatePickerMui
                        changeData={(data) => this.changeDynamic(data, 'ref_date')}
                        value={this.state.leavecepdata.ref_date.value}
                        error={this.state.leavecepdata.ref_date.error}
                        errmsg={this.state.leavecepdata.ref_date.errmsg}
                        halfPicker
                      />
                    </label>
                    <label className="calenderantdstyle">
                      <Dropdownantd
                        label="Enter Ref"
                        className="leavecep_dropdown"
                        option={empList.map(val => val.EmpFirstName)}
                        changeData={(data) => this.changeDynamic(data, 'enter_ref')}
                        value={this.state.leavecepdata.enter_ref.value}
                        error={this.state.leavecepdata.enter_ref.error}
                        errmsg={this.state.leavecepdata.enter_ref.errmsg}
                        convertString
                        halfPicker
                      />
                    </label>
                  </div>
                </Card.Body>
              </Card>
            </Grid>

            <Grid item md={4} sm={6} className="w-100">

              <Textareaantd className={"w-100"} label="Address & Phone No"
                span="( During absence )"
                changeData={(data) => this.changeDynamic(data, 'address')}
                value={this.state.leavecepdata.address.value}
                error={this.state.leavecepdata.address.error}
                errmsg={this.state.leavecepdata.address.errmsg}
              />

            </Grid>

            <Grid item md={4} sm={6} className="w-100">
              <Inputantd
                className={"w-100 mt-4"}
                label="No.of other days"
                changeData={(data) => this.changeDynamic(data, 'NoOfotherdays')}
                value={this.state.leavecepdata.NoOfotherdays.value}
                error={this.state.leavecepdata.NoOfotherdays.error}
                errmsg={this.state.leavecepdata.NoOfotherdays.errmsg}
              />

            </Grid>
            <Grid item md={4} sm={6} className="w-100">
              <Inputantd
                className={"w-100 mt-4"}
                label="Total days of leave"
                changeData={(data) => this.changeDynamic(data, 'totaldaysofleave')}
                value={this.state.leavecepdata.totaldaysofleave.value}
                error={this.state.leavecepdata.totaldaysofleave.error}
                errmsg={this.state.leavecepdata.totaldaysofleave.errmsg}
              />
            </Grid>

            <Grid item md={4} sm={6} className="w-100">
              <Inputantd
                className={"w-100"}
                label="No.of exam days"
                span="(Other than arrears)"
                changeData={(data) => this.changeDynamic(data, 'NoOfexamdays')}
                value={this.state.leavecepdata.NoOfexamdays.value}
                error={this.state.leavecepdata.NoOfexamdays.error}
                errmsg={this.state.leavecepdata.NoOfexamdays.errmsg}
              />

            </Grid>

            <Grid item md={4} sm={6} className="w-100">
              <p>Exam schedule(Pdf/Image fie)</p>
              <Upload
                action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                onChange={(info) => this.handleChange(info, "examScheduleUpload")}
                fileList={this.state.examScheduleUpload}
                accept={'application/pdf, image/*'}
                >
                <Button>
                  <UploadOutlined />Click to upload
                        </Button>
              </Upload>
              {/* <ExamSchedule
                className={"w-100 mt-5"}
                changeData={(data) => this.changeDynamic(data, 'imageArray')}
                value={this.state.leavecepdata.imageArray.value}
                error={this.state.leavecepdata.imageArray.error}
                errmsg={this.state.leavecepdata.imageArray.errmsg}
                
              /> */}


            </Grid>

            <Grid item md={4} sm={6}>
              <Textareaantd
                label="Remarks"
                className="w-100"
                changeData={(data) => this.changeDynamic(data, 'remarks')}
                value={this.state.leavecepdata.remarks.value}
                error={this.state.leavecepdata.remarks.error}
                errmsg={this.state.leavecepdata.remarks.errmsg}
              />
            </Grid>


          </Grid>
          <Grid container
            direction="row"
            justify="center"
            alignItems="center"
            className=""
            spacing={3}>
            <Grid item >
              <Button className="btnmargin btnwidth btnclr" onClick={() => this.checkValidation()}>Save</Button>

            </Grid>
            <Grid item >
              <Button className="btnwidth btnclr_outline" onClick={()=>this.resetFormData()}>Cancel</Button>
            </Grid>

          </Grid>
        </div>

      </div>

    )
  }

}
// alert("success")

const mapStateToProps = (state) => ({
  course: state.fixers.professionalCourse,
  empList:  state.fixers.employees
})
// alert("success")

export default connect(mapStateToProps)(Leaveapplication_cep);