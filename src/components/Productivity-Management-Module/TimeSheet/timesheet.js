import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Input, Modal } from "antd";
import { Grid, TextField } from "@material-ui/core";
// import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import StopIcon from '@material-ui/icons/Stop';
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Fab from "@material-ui/core/Fab";
import Timesheetmodel from "./timesheetmodel";
import { connect } from "react-redux";
import "./timesheet.css";
import { Select } from "antd";
import AccessModal from "./AccessModal";
import HearingModal from "./HearingModal";
import StatusModal from "./StatusModal";
import OPEmodal from "./OPEmodal";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import DateRangeIcon from "@material-ui/icons/DateRange";
import PlayArrowOutlinedIcon from "@material-ui/icons/PlayArrowOutlined";
import { IoMdMore } from "react-icons/io";
import Edit from "../../../images/edit.svg";
import Pin from "../../../images/pin.png";
import Pinfilled from "../../../images/pinfill.png";
import Dropdownantd from "../../../formcomponent/dropdownantd";
import Inputantd from "../../../formcomponent/inputantd";
import ValidationLibrary from "../../../validationlibrary/validation";
import {
  gettimesheetprojects,
  gettimesheetactivity,
} from "../Action/TimesheetAction";
import { apiurl } from "../../../App";
import axios from "axios";
import Calenderbox from "../../../formcomponent/calenderbox";
import DatePickerMui from "../../../formcomponent/DatePickerMUI";
import { DatePicker } from "antd";
import dateformat from 'dateformat';
import moment from 'moment';

const { Option } = Select;

class Timesheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeSheetData: [],
      startDate: new Date(),
      startDate_Time: '',
      endDate_Time: '',
      hours: 0,
      seconds: 0,
      minutes: 0,
      settimeon: false,
      changebtn: true,
      open: false,
      Hearing: false,
      AccessModal: false,
      StatusModal: false,
      tag: false,
      pin: false,
      second: false,
      third: false,
      // backdrop:true,
      type: "",
      title: "",
      visible: false,
      OPEmodal: false,
      hearingvisible: false,
      yesterday:false,

      Hear_project: "",
      Hear_client: "",
      empId: 1,
      timesheetdata: {
        project: {
          value: "",
          validation: [{ name: "required" }],
          error: null,
          errmsg: null,
        },
        activity: {
          value: "",
          validation: [{ name: "required" }],
          error: null,
          errmsg: null,
        },
        workedon: {
          value: "",
          validation: [{ name: "required" }, { name: "" }],
          error: null,
          errmsg: null,
        },

      },
    };
  }
  handleChange(date) {
    this.setState({
      startDate: date,
    });
  }

  onFormSubmit(e) {
    e.preventDefault();
    console.log(this.state.startDate);
  }

  async componentDidMount() {
    await this.props.gettimesheetprojects();
    await this.props.gettimesheetactivity();
  }

  callanotherfun = () => {
    if (this.state.seconds < 59) {
      this.setState({ seconds: this.state.seconds + 1 });
    } else if (this.state.minutes < 59) {
      this.setState({
        seconds: 0,
        minutes: this.state.minutes + 1,
      });
    } else
      this.setState({
        seconds: 0,
        minutes: 0,
        hours: this.state.hours + 1,
      });
  };
  callroutine = () => {
    this.setState({
      startDate_Time: new Date(),
      settimeon: true,
      changebtn: false,
    });
  };
  callstop = () => {
    // console.log(dateformat(this.state.startDate_Time, "mediumTime"))
    // var startTime = moment(dateformat(this.state.startDate_Time, "mediumTime"), "HH:mm:ss a");
    // var endTime = moment(dateformat(new Date(), "mediumTime"), "HH:mm:ss a");
    // var duration = moment.duration(endTime.diff(startTime));
    // var hours = parseInt(duration.asHours());
    // var minutes = parseInt(duration.asMinutes()) - hours * 60;
    var check = moment.utc(moment(new Date(), "DD/MM/YYYY HH:mm:ss").diff(moment(this.state.startDate_Time, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss")

    console.log(check)
    this.state.timeSheetData.unshift({
      workedOn: this.state.timesheetdata.workedon.value,
      project: this.state.timesheetdata.project.value,
      activity: this.state.timesheetdata.activity.value,
      startDate_Time: this.state.startDate_Time,
      endDate_Time: new Date(),
      startTime: dateformat(this.state.startDate_Time, "shortTime"),
      endTime: dateformat(new Date(), "shortTime"),
      check: check
    })
    this.setState({
      settimeon: false,
      changebtn: true,
      hours: 0,
      seconds: 0,
      minutes: 0,
    });
    this.state.timesheetdata.workedon.value = ''
    this.state.timesheetdata.project.value = ''
    this.state.timesheetdata.activity.value = ''
  };
  manualtime = () => {
    this.setState({
      open: true,
    });
  };
  modelcl = () => {
    this.setState({
      open: false,
    });
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
      hearingvisible: false
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
      hearingvisible: false,
    });
  };
  onClickTag = (e) => {
    this.setState({ tag: !this.state.tag });
  }
  onClickPin = (e) => {
    this.setState({ pin: !this.state.pin });
  };
  PinClick = (e) => {
    this.setState({ second: !this.state.second });
  };
  LastPin = (e) => {
    this.setState({ third: !this.state.third });
  };

  // viewContentHearing = () => {
  //     this.props.dispatch(modalAction({ edit: true }));
  //     this.setState({ Hearing: true })
  // }
  // viewContentAccess = () => {
  //     this.props.dispatch(modalAction({ edit: true }));
  //     this.setState({ AccessModal: true })
  // }
  // viewContentStatus = () => {
  //     this.props.dispatch(modalAction({ edit: true }));
  //     this.setState({ StatusModal: true })
  // }
  // toggle = () => {
  //     this.setState({

  //     })
  // }
  handleClickOpen = (s) => {
    console.log("type", s);
    this.setState({
      type: s,
    });
    this.setState({
      AccessModal: true,
      StatusModal: true,
      visible: true,
      OPEmodal: true,
    });
  };

  hearingModalOpen = (n) => {
    console.log("type", n);
    this.setState({
      type: n,
    });
    if (n === "hearing_modal") {
      console.log(this.state.timesheetdata.project, "pro");
      this.props.TimesheetProject.map((val) => {
        console.log(val,"value")
        if (
          (this.state.timesheetdata.project.value)=== 
          (val.ProjectId + "-" + val.ProjectName + "-" + val.ClientName)
        )
         {
          this.setState({
            Hear_project: val.ProjectName,
            Hear_client: val.ClientName,
          });
        }
      });
    }
    this.setState({
      hearingvisible: true,
    });
  };

  checkValidation = () => {
    this.setState({ changeval: false });
    var timesheetdata = this.state.timesheetdata;
    var targetkeys = Object.keys(timesheetdata);
    console.log(targetkeys);
    for (var i in targetkeys) {
      var errorcheck = ValidationLibrary.checkValidation(
        timesheetdata[targetkeys[i]].value,
        timesheetdata[targetkeys[i]].validation
      );
      console.log(errorcheck);
      timesheetdata[targetkeys[i]].error = !errorcheck.state;
      timesheetdata[targetkeys[i]].errmsg = errorcheck.msg;
    }
    var filtererr = targetkeys.filter(
      (obj) => timesheetdata[obj].error == true
    );
    console.log(filtererr.length);
    if (filtererr.length > 0) {
      this.setState({ error: true });
    } else {
      this.setState({ error: false });
      var self = this;
      console.log("fsdfjhdsfjhdsf", this.state.timesheetdata.workedon.value);

      var TimesheetData = {
        // tsdate: new Date().toLocaleString(),
        empId: this.state.empId,
        details: this.state.timesheetdata.workedon.value,
        projectId: this.state.timesheetdata.project.value,
        activityId: this.state.timesheetdata.activity.value,
      };
      axios({
        method: "post",
        url: apiurl + "/insertTimesheet",
        data: TimesheetData,
      })
        .then(function (response) {
          console.log(response.data.data, "responseresponse");

          // self.state.timesheetdata.amount.value=""
          // self.props.showclose && self.props.showclose()
          self.setState({});
        })
        .catch(function (error) {
          console.log(error, "error");
        });
    }
    this.setState({ timesheetdata });
  };
  changeDynamic = (data, key) => {
    console.log("key", key);
    console.log("data", data);
    var timesheetdata = this.state.timesheetdata;
    var targetkeys = Object.keys(timesheetdata);
    var errorcheck = ValidationLibrary.checkValidation(
      data,
      timesheetdata[key].validation
    );
    timesheetdata[key].value = data;
    timesheetdata[key].error = !errorcheck.state;
    timesheetdata[key].errmsg = errorcheck.msg;
    this.setState({ timesheetdata });
    var filtererr = targetkeys.filter(
      (obj) =>
        timesheetdata[obj].error == true || timesheetdata[obj].error == null
    );
    console.log((timesheetdata[key].value = data), "key");
    if (filtererr.length > 0) {
      this.setState({
        error: true,
        errordummy: false,
      });
    } else {
      this.setState({ error: false });
    }
  };

  //getting the manualEntryDatat from timesheetmodal.js
  getManualEntryData = (data) => {
    // alert(JSON.stringify(data))
  }

  

  render() {
    const classes = this.props;
    {
      this.state.settimeon &&
        setTimeout(() => {
          this.callanotherfun();
        }, 1000);
    }
    const { modal, dispatch } = this.props;
    console.log(this.props.TimesheetProject, "syed");
    console.log(new Date().toLocaleString(), "date");
    console.log(this.state, "state");
    // console.log(this.props.TimesheetProject.map((val)=>val.ProjectId),"state")

    return (
      <div className="Timesheet_Main top_move-time">
        <div>
          <div className="card timesheet_assign">
            <div className="background_clr">
              <label className="time_sheet-label">Time Sheet</label>
              <Button
                variant="danger"
                style={{ float: "right" }}
                onClick={() => this.handleClickOpen("assign_access")}
              >
                Assign Access
              </Button>
            </div>
            <div className="assign-top_drop">
            <Dropdownantd className="assign_drop"/>
            </div>
          </div>
        </div>

        <div>
          <Card className="timesheet_card">
            <Card.Body>
              <Card.Text>
                <Grid container spacing={3} className="timesheet_gridwidth">
                  <Grid item md={2} sm={5}>
                    <Inputantd
                      placeholder={"What have you worked on?"}
                      className="timesheetinput_main"
                      changeData={(data) =>
                        this.changeDynamic(data, "workedon")
                      }
                      value={this.state.timesheetdata.workedon.value}
                      error={this.state.timesheetdata.workedon.error}
                      errmsg={this.state.timesheetdata.workedon.errmsg}
                    />
                  </Grid>
                  {/* <Grid item md={1}>
                    </Grid> */}
                  {/* <Grid item md={4} sm={8} className="timesheet_gridalign"> */}
                  {/* <div className="flex mt-2 timesh_br"> */}
                  <Grid item md={7} sm={6}>
                    <Grid container>
                      <Grid md={4} sm={2} className="w-100">
                        <Dropdownantd
                          placeholder={"Project"}
                          className=" w-100"
                          option={
                            this.props.TimesheetProject &&
                            this.props.TimesheetProject.map((val) => {
                              return (
                                val.ProjectId +
                                "-" +
                                val.ProjectName +
                                "-" +
                                val.ClientName
                              );
                            })
                          }
                          changeData={(data) =>
                            this.changeDynamic(data, "project")
                          }
                          value={this.state.timesheetdata.project.value}
                          error={this.state.timesheetdata.project.error}
                          errmsg={this.state.timesheetdata.project.errmsg}
                          convertString
                        ></Dropdownantd>
                      </Grid>
                      <Grid md={3} sm={2} className="w-100 ml-1">
                        <Dropdownantd
                          placeholder={"Activity"}
                          className=" w-100"
                          option={
                            this.props.TimesheetActivity &&
                            this.props.TimesheetActivity.map(
                              (val) => val.ActivityName
                            )
                          }
                          changeData={(data) =>
                            this.changeDynamic(data, "activity")
                          }
                          value={this.state.timesheetdata.activity.value}
                          error={this.state.timesheetdata.activity.error}
                          errmsg={this.state.timesheetdata.activity.errmsg}
                          convertString
                        ></Dropdownantd>
                      </Grid>
                      <Grid item md={4} sm={7}>
                        <div className="timesheet_btnmain">
                          <Button
                            className="ope_btn-OPE"
                            onClick={() => this.handleClickOpen("OPE_modal")}
                          >
                            OPE
                          </Button>
                          <Button
                            onClick={() =>
                              this.hearingModalOpen("hearing_modal")
                            }
                            className="ope_btn-hearing"
                          >
                            Hearing
                          </Button>
                          <Button
                            onClick={() => this.handleClickOpen("status_modal")}
                            className="ope_btn-success"
                          >
                            Status
                          </Button>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>

                  {/* </div> */}
                  {/* </Grid> */}
                  <Grid item md={3} sm={7}>
                    <Grid container spacing={3} className="timesheet_clkalign">
                      <Grid item md={3} sm={3} className="">
                        <div className="mt-2 flex tmiesh_jus_spabt">

                          <div className="timesh_br_left" />
                          {/* {this.state.tag ? "timesh_font_br"( */}
                          <div className="mt-2 tag_size">
                            <LocalOfferIcon className={this.state.tag ? "tagTrue" : "tagFalse"} onClick={this.onClickTag} color="disabled" />
                          </div>
                          {/* <LocalOfferIcon  className="timesh_font_br mt-1" /> */}

                          <div className="timesh_br_right" />

                        </div>
                      </Grid>
                      <Grid md={7} sm={6}>
                        <div className="flex timesh_jus_spaar">
                          <div className="flex secs_left">
                            <p className="timesh_num_ft ">
                              {this.state.hours < 10 && "0"}
                              {this.state.hours}:
                              {this.state.minutes < 10 && "0"}
                              {this.state.minutes}:
                              {this.state.seconds < 10 && "0"}
                              {this.state.seconds}
                            </p>
                            {this.state.changebtn ? (
                              <Button
                                className="ml-2 mt-3 playbtn"
                                onClick={this.callroutine}
                              >
                                <PlayArrowIcon />
                              </Button>
                            ) : (
                                <Button
                                  className="ml-2 mt-3 pausebtn"
                                  onClick={this.callstop}
                                >
                                  <StopIcon />
                                </Button>
                              )}
                          </div>
                          <div>
                            <AccessTimeIcon
                              className="timesh_clock_align"
                              color="primary"
                              onClick={this.manualtime}
                            />
                            {/* </Fab> */}
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Card.Text>
            </Card.Body>
          </Card>
          
          <div className="scroll_entry">

          <Grid container className="timesheet_headingbg">
            <Grid item md={6} sm={6}>
              <h5 className="timesheet_headingdata">Today</h5>
            </Grid>
            <Grid item md={6} sm={6}>
              <img src={Edit} className="timesheet_editimg" />
            </Grid>
          </Grid>
          <div className="timesheet_tablescroll">
            {/* <Grid container className="timesheet_headingbg">
                        <Grid item md={6} sm={6}>
                            <h5 className="timesheet_headingdata">Today</h5>
                        </Grid>
                        <Grid item md={6} sm={6}>
                            <img src={Edit} className="timesheet_editimg" />
                        </Grid>
                </Grid> */}
            <Table aria-label="simple table">
              <TableBody>
                {
                  this.state.timeSheetData.map((val) => {
                    return (
                      <TableRow>
                        <TableCell align="center" className="timesheet_tabledata_one">
                          {this.state.pin == false ? (
                            <span>
                              <img
                                src={Pin}
                                className="timesheet_pinIcon"
                                onClick={this.onClickPin}
                              />
                            </span>
                          ) : (
                              <span>
                                <img src={Pinfilled} className="timesheet_pinIcon" onClick={this.onClickPin} />
                              </span>
                            )}
                          {val.workedOn} {this.state.tag == false ? (
                            <LocalOfferIcon onClick={this.onClickTag} color="disabled" className="timesh_font_entry mt-1" />
                          ) : (
                              <LocalOfferIcon className="tagTrue mt-1" />
                            )}
                        </TableCell>
                        <TableCell align="center" className="timesheet_tabledata_two">
                          <span>
                            <FiberManualRecordIcon className="timesheet_linkIcon" />
                          </span>
                          {val.project.split("-")[1]}
                        </TableCell>
                        <TableCell
                          align="center"
                          className="timesheet_tabledata_three"
                        >
                          {val.activity}
                        </TableCell>
                        <TableCell align="center">
                          <Button className="timesheet_tabledata_btn-change">
                            Completed
                  </Button>
                        </TableCell>
                        <TableCell align="center" className="timesheet_gridmain">
                          <Grid Container className="timesheet_gridcontainer">
                            <Grid item md={12} sm={12}>
                              <Grid container spacing={1}>
                                <Grid
                                  item
                                  md={5}
                                  sm={6}
                                  className="timesheet_griddata"
                                >
                                  <div>
                                    {
                                      `${val.startTime} - ${val.endTime}`
                                    }
                                  </div>
                                </Grid>
                                <Grid
                                  item
                                  md={2}
                                  sm={2}
                                  className="timesheet_griddata"
                                >
                                  <div className="timetable_picker">
                                    <DatePicker
                                      className="date_timetable"
                                      value={null}
                                      placeholder={null}
                                    />
                                  </div>
                                </Grid>
                                <Grid
                                  item
                                  md={3}
                                  sm={2}
                                  className="timesheet_griddata"
                                >
                                  <div>
                                    {
                                      val.check
                                    }
                                  </div>
                                </Grid>
                                <Grid item md={1} sm={1}>
                                  <div>
                                    <PlayArrowOutlinedIcon className="timesheet_griddataplayaicons" />
                                  </div>
                                </Grid>
                                <Grid item md={1} sm={1}>
                                  <div>
                                    <IoMdMore className="timesheet_griddatamoreicons" />
                                  </div>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </TableCell>
                      </TableRow>
                    )
                  })
                }
                <TableRow>
                  <TableCell align="center" className="timesheet_tabledata_one">
                    {this.state.second == false ? (
                      <span>
                        <img
                          src={Pin}
                          className="timesheet_pinIcon"
                          onClick={this.PinClick}
                        />
                      </span>
                    ) : (
                        <span>
                          <img src={Pinfilled} className="timesheet_pinIcon" onClick={this.PinClick} />
                        </span>
                      )}
                    Advice Clients Concurrency
                  </TableCell>
                  <TableCell align="center" className="timesheet_tabledata_two">
                    <span>
                      <FiberManualRecordIcon className="timesheet_linkIcon" />
                    </span>
                    Wipro Limited
                  </TableCell>
                  <TableCell
                    align="center"
                    className="timesheet_tabledata_three"
                  >
                    {" "}
                    Value
                  </TableCell>
                  <TableCell
                    align="center"
                    className="timesheet_tabledata_four"
                  >
                    <Button className="timesheet_tabledata_btn-change">
                      Meeting
                    </Button>
                  </TableCell>
                  <TableCell align="center" className="timesheet_gridmain">
                    <Grid Container className="timesheet_gridcontainer">
                      <Grid item md={12} sm={12}>
                        <Grid container spacing={1}>
                          <Grid
                            item
                            md={5}
                            sm={6}
                            className="timesheet_griddata"
                          >
                            <div className="mt-3">12:30pm - 3:30pm</div>
                          </Grid>
                          <Grid
                            item
                            md={2}
                            sm={2}
                            className="timesheet_griddata"
                          >
                            <div className="timetable_picker">
                              <DatePicker
                                className="date_timetable"
                                value={null}
                                placeholder={null}
                              />
                            </div>
                          </Grid>
                          <Grid
                            item
                            md={3}
                            sm={2}
                            className="timesheet_griddata"
                          >
                            <div>3:00</div>
                          </Grid>
                          <Grid item md={1} sm={1}>
                            <div>
                              <PlayArrowOutlinedIcon className="timesheet_griddataplayaicons" />
                            </div>
                          </Grid>
                          <Grid item md={1} sm={1}>
                            <div>
                              <IoMdMore className="timesheet_griddatamoreicons" />
                            </div>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" className="timesheet_tabledata_one">
                    {this.state.third == false ? (
                      <span>
                        <img
                          src={Pin}
                          className="timesheet_pinIcon"
                          onClick={this.LastPin}
                        />
                      </span>
                    ) : (
                        <span>
                          <img src={Pinfilled} className="timesheet_pinIcon" onClick={this.LastPin} />
                        </span>
                      )}
                    Claim Liability
                  </TableCell>
                  <TableCell align="center" className="timesheet_tabledata_two">
                    <span>
                      <FiberManualRecordIcon className="timesheet_linkIcon" />
                    </span>
                    L&T Constructions
                  </TableCell>
                  <TableCell
                    align="center"
                    className="timesheet_tabledata_three"
                  >
                    General
                  </TableCell>
                  <TableCell align="center">
                    <Button className="timesheet_tabledata_btn-change">
                      Requirements
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Grid Container className="timesheet_gridcontainer">
                      <Grid item md={12} sm={12}>
                        <Grid container spacing={1}>
                          <Grid
                            item
                            md={5}
                            sm={6}
                            className="timesheet_griddata"
                          >
                            <div>1:30pm - 4:00pm</div>
                          </Grid>
                          <Grid
                            item
                            md={2}
                            sm={2}
                            className="timesheet_griddata"
                          >
                            <div className="timetable_picker">
                              <DatePicker
                                className="date_timetable"
                                 placeholder={null}
                                value={null}
                              />
                            </div>
                          </Grid>
                          <Grid
                            item
                            md={3}
                            sm={2}
                            className="timesheet_griddata"
                          >
                            <div>2:30</div>
                          </Grid>
                          <Grid item md={1} sm={1}>
                            <div>
                              <PlayArrowOutlinedIcon className="timesheet_griddataplayaicons" />
                            </div>
                          </Grid>
                          <Grid item md={1} sm={1}>
                            <div>
                              <IoMdMore className="timesheet_griddatamoreicons" />
                            </div>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>


          <Grid container className="timesheet_headingbg">
            <Grid item md={6} sm={6}>
              <h5 className="timesheet_headingdata">Yesterday</h5>
            </Grid>
            <Grid item md={6} sm={6}>
              <img src={Edit} className="timesheet_editimg" />
            </Grid>
          </Grid>
          <Table aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell align="center" className="timesheet_tabledata_one">
                  {this.state.yesterday == false ? (
                    <span>
                      <img
                        src={Pin}
                        className="timesheet_pinIcon"
                        onClick={this.yesterdayPin}
                      />
                    </span>
                  ) : (
                      <span>
                        <img src={Pinfilled} className="timesheet_pinIcon" onClick={this.yesterdayPin} />
                      </span>
                    )}
                  Advice Clients Concurrency
                  </TableCell>
                <TableCell align="center" className="timesheet_tabledata_two">
                  <span>
                    <FiberManualRecordIcon className="timesheet_linkIcon" />
                  </span>
                  Wipro Limited
                  </TableCell>
                <TableCell
                  align="center"
                  className="timesheet_tabledata_three"
                >
                  {" "}
                  Value
                  </TableCell>
                <TableCell
                  align="center"
                  className="timesheet_tabledata_four"
                >
                  <Button className="timesheet_tabledata_btn-change">
                    Meeting
                    </Button>
                </TableCell>
                <TableCell align="center" className="timesheet_gridmain">
                  <Grid Container className="timesheet_gridcontainer">
                    <Grid item md={12} sm={12}>
                      <Grid container spacing={1}>
                        <Grid
                          item
                          md={5}
                          sm={6}
                          className="timesheet_griddata"
                        >
                          <div className="mt-3">12:30pm - 3:30pm</div>
                        </Grid>
                        <Grid
                          item
                          md={2}
                          sm={2}
                          className="timesheet_griddata"
                        >
                          <div className="timetable_picker">
                            <DateRangeIcon
                              className="date_timetable"
                              placeholder={null}
                            />
                          </div>
                        </Grid>
                        <Grid
                          item
                          md={3}
                          sm={2}
                          className="timesheet_griddata"
                        >
                          <div>3:00</div>
                        </Grid>
                        <Grid item md={1} sm={1}>
                          <div>
                            <PlayArrowOutlinedIcon className="timesheet_griddataplayaicons" />
                          </div>
                        </Grid>
                        <Grid item md={1} sm={1}>
                          <div>
                            <IoMdMore className="timesheet_griddatamoreicons" />
                          </div>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          </div>
          <Timesheetmodel
            openmodel={this.state.open}
            modelcl={() => this.modelcl()}
            getManualEntryData={(data)=>this.getManualEntryData(data)}
          />
          {/* {
                    this.state.AccessModal &&
                    <AccessViewContent name={"edit"} modalFooter btnName="Ok" toggle  isOpen={modal.edit} dispatch={dispatch} title={"Assign Access"} backdrop={this.handleBackDrop} modalClassName={"modal-md"} className={"mt-4"} toggle={this.toggle} modalHeader />
                }
                {
                    this.state.Hearing &&
                    <HearingViewContent name={"edit"} modalFooter btnName="Ok" toggle isOpen={modal.edit} dispatch={dispatch} title={"Add Hearing Details"} backdrop={this.state.backdrop} modalClassName={"modal-md"} className={"mt-4"} modalHeader />
                }
                {
                    this.state.StatusModal=="Sa" &&
                    <StatusViewContent name={"edit"} modalFooter btnName="Ok" toggle isOpen={modal.edit} dispatch={dispatch} title={"Status"} backdrop={this.state.backdrop} modalClassName={"modal-md"} className={"mt-4"} modalHeader />
                } */}
          {/* <modalWrapper */}
          {/* isOpen={modal.edit} name={"edit"} title={this.state.title} modalFooter btnName="Ok" toggle dispatch={dispatch} closemodal={this.closemodal} backdrop modalClassName={"modal-md"} className={"mt-4"} modalHeader> */}
          <Modal
            visible={this.state.visible}
            // onClick={this.projectDropdown}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={null}
          >
            {(this.state.type === "assign_access" && (
              <AccessModal className="specific_modal" />
            )) ||
              (this.state.type === "status_modal" && <StatusModal />) ||
              (this.state.type === "OPE_modal" && <OPEmodal />)}
          </Modal>

          {/* hearing_modal */}
          <Modal
            visible={this.state.hearingvisible}
            onClick={this.projectDropdown}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={null}
            className="hearingModal"
          >
            {
              (this.state.type === "hearing_modal" && (
                <HearingModal
                  hearingClient={this.state.Hear_client}
                  hearingProject={this.state.Hear_project}
                  closeModal={this.handleCancel}
                />
              ))
            }
          </Modal>
          {/* hearing_modal */}

        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log("state in ope", state);

  return {
    //   opemodaldata: state.resumeReducer.opemodaldata,
    modal: state.modal,
    TimesheetProject: state.timesheet.timesheet_projects,
    TimesheetActivity: state.timesheet.timesheet_activity,
  };
};

export default connect(mapStateToProps, {
  gettimesheetprojects,
  gettimesheetactivity,
})(Timesheet);
