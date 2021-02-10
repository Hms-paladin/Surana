import React from "react";
import Grid from '@material-ui/core/Grid';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Calenderbox from '../../../formcomponent/calenderbox';
import "./Application.css";
import Axios from 'axios';
import Dropdownantd from '../../../formcomponent/dropdownantd';
import Textareaantd from '../../../formcomponent/textareaantd';
import Inputnumberantd from '../../../formcomponent/inputnumberantd';
import ValidationLibrary from "../../../validationlibrary/validation.js"
import { applyLeave } from "./applyLeaveAction";
import Inputantd from "../../../formcomponent/inputantd";
import DatePickerMui from "../../../formcomponent/DatePickerMUI";
import { apiurl } from "../../../App";

class Leaveapplication extends React.Component {
  state = {
    data: [],
    changeData: [],
    PName: '',
    Pleaverequested: '',
    Paddress: '',
    Pstartdate: '',
    PendDate: '',
    Preason: '',
    Pcontact: '',
    errordummy: true,
    leaveApplication:
    {
      'contact':
      {
        'value': '',
        validation: [{ 'name': 'required' }, { name: "mobile_india" }],
        error: null,
        errmsg: null
      },
      'leaverequested':
      {
        'value': '',
        validation: [{ 'name': 'required' }, { name: 'allowNumaricOnly' }, { "name": "custommaxLength", "params": "2" }],
        error: null,
        errmsg: null
      },
      'leaveavailed':
      {
        'value': '',
        validation: [{ 'name': 'required' }, { 'name': 'alphaNumaricOnly' }],
        error: null,
        errmsg: null
      },
      'address':
      {
        'value': '',
        validation: [{ 'name': 'required' }],
        error: null,
        errmsg: null
      },
      'startdate':
      {
        'value': '',
        validation: [{ 'name': 'required' }],
        error: null,
        errmsg: null
      },
      'endDate':
      {
        'value': '',
        validation: [{ 'name': 'required' }],
        error: null,
        errmsg: null
      },
      'reason':
      {
        'value': '',
        validation: [{ 'name': 'required' }, { 'name': 'alphabetwithspace' }],
        error: null,
        errmsg: null
      },
    }
  }

  getTotalLeaves = () => {
    Axios({
      method: 'POST',
      url: apiurl + '/totalleaves',
      data: {
        empId: 1
      }
    }).then((response) => {
      console.log(response.data.data, "sadjfaskldfjasl")
      this.state.leaveApplication.leaveavailed.value = response.data.data[0].TotalLeaves
      this.setState({})
    }).catch((error) => {
      console.log(error)
    })
  }

  componentDidMount() {
    this.getTotalLeaves()
  }

  changeDynamic = (data, key) => {
    console.log("key", key);
    console.log("data", data);
    var leaveApplication = this.state.leaveApplication;
    var leaveApplicationkeys = Object.keys(leaveApplication);

    var errorcheck = ValidationLibrary.checkValidation(data, leaveApplication[key].validation);
    leaveApplication[key].value = data;
    leaveApplication[key].error = !errorcheck.state;
    leaveApplication[key].errmsg = errorcheck.msg;
    this.setState({ leaveApplication });
    var filtererr = leaveApplicationkeys.filter((obj) =>
      leaveApplication[obj].error == true || leaveApplication[obj].error == null);
    if (filtererr.length > 0) {
      this.setState({
        error: true,
        errordummy: false
      })
    } else {
      this.setState({ error: false })
    }
  }


  checkValidation = () => {
    var mainvalue = {}
    var leaveApplication = this.state.leaveApplication;
    var leaveApplicationkeys = Object.keys(leaveApplication);
    console.log(leaveApplicationkeys, "leaveApplicationkeys");
    for (var i in leaveApplicationkeys) {
      var errorcheck = ValidationLibrary.checkValidation(leaveApplication[leaveApplicationkeys[i]].value, leaveApplication[leaveApplicationkeys[i]].validation);
      console.log(errorcheck, "errorcheck");
      leaveApplication[leaveApplicationkeys[i]].error = !errorcheck.state;
      leaveApplication[leaveApplicationkeys[i]].errmsg = errorcheck.msg;
      mainvalue[leaveApplicationkeys[i]] = leaveApplication[leaveApplicationkeys[i]].value
    }
    var filtererr = leaveApplicationkeys.filter((obj) =>
      leaveApplication[obj].error == true);
    console.log(filtererr.length)
    if (filtererr.length > 0) {
      this.setState({ error: true })
    } else {
      this.setState({ error: false })

    }
    this.setState({
      mainvalue,
      leaveApplication
    })

    if (filtererr.length === 0) {
      this.leaveApplicationApi();

      var leaveApplicatondatas = {
        empId: 2,
        leaveId: 2,
        leaveavailed: this.state.leaveApplication.leaveavailed.value,
        leaverequested: this.state.leaveApplication.leaverequested.value,
        address: this.state.leaveApplication.address.value,
        startdate: this.state.leaveApplication.startdate.value,
        endDate: this.state.leaveApplication.endDate.value,
        reason: this.state.leaveApplication.reason.value,
        contact: this.state.leaveApplication.contact.value
      }
      // this.setState({
      //   leaveApplicatondatas,
      // })

    }

  }


  leaveApplicationApi = () => {
    var leaveApplicationApi = {};
    leaveApplicationApi.empId = 1;
    leaveApplicationApi.leaveId = 2;
    var leaveApplicationKeys = Object.keys(this.state.leaveApplication)
    var leaveApplicationData = Object.values(this.state.leaveApplication);
    console.log(leaveApplicationApi, "leaveApplicationData");
    for (var i in leaveApplicationKeys) {
      leaveApplicationApi[leaveApplicationKeys[i]] = this.state.leaveApplication[leaveApplicationKeys[i]].value
    }
    console.log(leaveApplicationApi, "leaveApplicationApi")
    this.props.dispatch(applyLeave(leaveApplicationApi, () => this.resetFormData()))
  }
  resetFormData = () => {
    var leaveApplicationKeys = Object.keys(this.state.leaveApplication)
    for (var i in leaveApplicationKeys) {
      this.state.leaveApplication[leaveApplicationKeys[i]].value = ''
    }
    this.setState({})
  }
  render() {
    // const {empId} = this.props;
    return (
      <div className="card leaveapp_main top_move">
        <div className="card-body">
          <Grid container spacing={6} className="mt-2">

            <Grid item md={4} sm={6} className="w-100">

              <h5>Leave Already Availed: {this.state.leaveApplication.leaveavailed.value}</h5>
              {/* <Inputantd label="No.of Days"
                span="(Availed Month)"
                className="w-100"
                value={this.state.leaveApplication.leaveavailed.value}
                error={this.state.leaveApplication.leaveavailed.error}
                errmsg={this.state.leaveApplication.leaveavailed.errmsg}
                required
              /> */}
            </Grid>
            <Grid item md={4} sm={6} className="w-100">
              <Inputantd
                // label="Leave requested for"
                label='(No.of days leave requested for)'
                // span="(No.of days leave requested for)"
                className="w-100"
                changeData={(data) => this.changeDynamic(data, 'leaverequested')}
                value={this.state.leaveApplication.leaverequested.value}
                error={this.state.leaveApplication.leaverequested.error}
                errmsg={this.state.leaveApplication.leaverequested.errmsg}
                required
              />

            </Grid>

            <Grid item md={4} sm={12} className="w-100 card_date">
              <Card className="leavecard">

                <Card.Body className="leave_cardbody">
                  <div className="flex labelhgt">
                    <label className="calenderantdstyle mr-2">
                      Start Date
                        <DatePickerMui
                        changeData={(data) => this.changeDynamic(data, 'startdate')}
                        value={this.state.leaveApplication.startdate.value}
                        error={this.state.leaveApplication.startdate.error}
                        errmsg={this.state.leaveApplication.startdate.errmsg}
                        halfPicker
                        disablePast
                      />
                    </label>
                    <label className="calenderantdstyle">
                      End Date
                        <DatePickerMui
                        changeData={(data) => this.changeDynamic(data, 'endDate')}
                        value={this.state.leaveApplication.endDate.value}
                        error={this.state.leaveApplication.endDate.error}
                        errmsg={this.state.leaveApplication.endDate.errmsg}
                        // format={"DD-MM-YYYY"}
                        halfPicker
                        minDate={this.state.leaveApplication.startdate.value}
                      />
                    </label>
                  </div>
                </Card.Body>
              </Card>
            </Grid>

            <Grid item md={4} sm={6} className="w-100">

              <Textareaantd className={"w-100"}
                label="Address" span={"( During absence )"}
                changeData={(data) => this.changeDynamic(data, 'address')}
                value={this.state.leaveApplication.address.value}
                error={this.state.leaveApplication.address.error}
                errmsg={this.state.leaveApplication.address.errmsg}
                required
              ></Textareaantd>
              {/* <span className="hint_font"></span> */}


            </Grid>

            <Grid item md={4} sm={6} className="w-100">
              <Textareaantd className={"w-100 mt-4"}

                changeData={(data) => this.changeDynamic(data, 'reason')}
                value={this.state.leaveApplication.reason.value}
                error={this.state.leaveApplication.reason.error}
                errmsg={this.state.leaveApplication.reason.errmsg}
                required
                label="Reason for leave" />
            </Grid>
            <Grid item md={4} sm={6} className="w-100">

              <Inputantd label="Emergency Contact Number"
                className="w-100 mt-4"
                // option={empId&&empId.map(val => [val.DeptName])}
                changeData={(data) => this.changeDynamic(data, 'contact')}
                value={this.state.leaveApplication.contact.value}
                error={this.state.leaveApplication.contact.error}
                errmsg={this.state.leaveApplication.contact.errmsg}
                required
              >
              </Inputantd>

            </Grid>
          </Grid>
          <Grid container
            direction="row"
            justify="center"
            alignItems="center"
            className="gridbtnalign"
            spacing={3}>
            <Grid item >
              <Button className="btnmargin btnwidth btnclr" onClick={() => this.checkValidation()}>Save</Button>
            </Grid>
            <Grid item >
              <Button className="btnwidth btnclr_outline" onClick={() => this.resetFormData()}>Cancel</Button>
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}


export default Leaveapplication;