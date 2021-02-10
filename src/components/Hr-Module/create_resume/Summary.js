import React from 'react';
import { message, Tag, notification } from 'antd';
import Grid from '@material-ui/core/Grid'
import Button from 'react-bootstrap/Button';
import { getResumeDetails, clearStore } from './action/CreateResumeAction';
import ValidationLibrary from "../../../validationlibrary/validation.js"
import { connect } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/BorderColor';
import IconButton from '@material-ui/core/IconButton';
import './Createresume.css';
import { buttonDisableAction } from '../../../fixers/fixersAction';

class Summary extends React.Component {
  state = {
    showResume: false,
    errordummy: true,
    summarydata:
    {
      'description':
      {
        'value': '',
        validation: [{ 'name': 'required' }, { name: 'address' }],
        error: null,
        errmsg: null
      },
    },
  };
  componentWillMount() {
    // this.props.dispatch(getResumeDetails(this.props.resumeId));
    // this.props.dispatch(getResumeDetails(291));
  }
  checkValidation = () => {
    var summarydata = this.state.summarydata;
    var targetkeys = Object.keys(summarydata);
    console.log(targetkeys);
    for (var i in targetkeys) {
      var errorcheck = ValidationLibrary.checkValidation(summarydata[targetkeys[i]].value, summarydata[targetkeys[i]].validation);
      console.log(errorcheck);
      summarydata[targetkeys[i]].error = !errorcheck.state;
      summarydata[targetkeys[i]].errmsg = errorcheck.msg;
    }
    var filtererr = targetkeys.filter((obj) =>
      summarydata[obj].error == true);
    console.log(filtererr.length)
    if (filtererr.length > 0) {
      this.setState({ error: true })
    } else {
      this.setState({ error: false })
      this.setState({ showResume: true })
    }
    this.setState({ summarydata })
    this.setState({})
  }
  changeDynamic = (data, key) => {
    console.log("key", key);
    console.log("data", data);
    var summarydata = this.state.summarydata;
    var targetkeys = Object.keys(summarydata);

    var errorcheck = ValidationLibrary.checkValidation(data, summarydata[key].validation);
    summarydata[key].value = data;
    summarydata[key].error = !errorcheck.state;
    summarydata[key].errmsg = errorcheck.msg;
    this.setState({ summarydata });
    var filtererr = targetkeys.filter((obj) =>
      summarydata[obj].error == true || summarydata[obj].error == null);
    if (filtererr.length > 0) {
      this.setState({
        error: true,
        errordummy: false
      })
    } else {
      this.setState({ error: false })
    }
  }

  showResume = () => {
    this.setState({ showResume: true })
  }


  gotoProfile = () => {
    this.prop.propFunc(2)
  }

  summarySave = (tab, index, edit) => {
    this.props.dispatch(buttonDisableAction(false));
    this.props.dispatch(clearStore());
    this.props.propFunc(0);
    this.handleRowClick(tab, index, edit)
    notification.success({
      message: "Resume Submitted Successfully",
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });

    // message
    //   .loading('Action in progress..', 2)
    //   .then(() => message.success('Resume Submitted Successfully', 2)).then(() => {
    //     this.props.dispatch(clearStore());
    //     this.props.propFunc(0);
    //     this.handleRowClick(tab, index, edit)
    //   })
  }

  handleRowClick = (tab, index, edit) => {
    console.log(tab, index, "sdfasdfasdfasdf");
    this.props.editTabControl(index, edit);
    this.props.propFunc(tab);
  }
  render() {
    const { resume } = this.props;
    return (
      resume && resume.map((val) => {
        console.log("sdfksdjfkldsjfldksfkds", val)
        return (
          <React.Fragment>
            <div className="top_move card card-min-height top_move">
              <div className="card-body">
                <div className="row">{/* Row Start Profile */}
                  <div className="col-md-12 summary_heading"><h5 className="form-subheading">Personal Info</h5></div>
                  <div className="col-lg-10 col-md-8">
                    <div className="row">
                      <div className="col-lg-6 col-md-12 col-sm-12">
                        <div className="details">
                          <div className="row">
                            <div className="col-md-6">
                              <div><label><span className="details-tag">Name</span></label></div>
                            </div>
                            <div className="col-md-6">
                              <div><label className="details_reply">{val.FirstName}</label></div>
                            </div>

                            <div className="col-md-6">
                              <div><label><span className="details-tag">Lastname</span></label></div>
                            </div>
                            <div className="col-md-6">
                              <div><label className="details_reply">{val.LastName}</label></div>
                            </div>

                            <div className="col-md-6">
                              <div><label><span className="details-tag">Gender</span></label></div>
                            </div>
                            <div className="col-md-6">
                              <div><label className="details_reply">{val.Gender === "1" ? "Male" : "Female"}</label></div>
                            </div>

                            <div className="col-md-6">
                              <div><label><span className="details-tag">DOB</span></label></div>
                            </div>
                            <div className="col-md-6">
                              <div><label className="details_reply">{val.DoB}</label></div>
                            </div>
                            <div className="col-md-6">
                              <div><label><span className="details-tag">Current Address</span></label></div>
                            </div>
                            <div className="col-md-6">
                              <div><label className="details_reply">{val.CurrentAddress}</label></div>
                            </div>

                            <div className="col-md-6">
                              <div><label><span className="details-tag">Permanent Address</span></label></div>
                            </div>
                            <div className="col-md-6">
                              <div><label className="details_reply">{val.PermanentAddress}</label></div>
                            </div>

                          </div>
                        </div>
                      </div>


                      <div className="col-lg-6 col-md-12 col-sm-12">
                        <div className="details">
                          <div className="row">

                            <div className="col-md-6">
                              <div><label><span className="details-tag">Father's Name</span></label></div>
                            </div>
                            <div className="col-md-6">
                              <div><label className="details_reply">{val.FatherName}</label></div>
                            </div>

                            <div className="col-md-6">
                              <div><label><span className="details-tag">Phone Number</span></label></div>
                            </div>
                            <div className="col-md-6">
                              <div><label className="details_reply">{val.PhoneNumber}</label></div>
                            </div>

                            <div className="col-md-6">
                              <div><label><span className="details-tag">Email ID</span></label></div>
                            </div>
                            <div className="col-md-6">
                              <div><label className="details_reply">{val.EmailId}</label></div>
                            </div>

                            <div className="col-md-6">
                              <div><label ><span className="details-tag">Location</span></label></div>
                            </div>
                            <div className="col-md-6">
                              <div><label className="details_reply">{val.Location}</label></div>
                            </div>

                            <div className="col-md-6">
                              <div><label><span className="details-tag">Referred By</span></label></div>
                            </div>
                            <div className="col-md-6">
                              <div><label className="details_reply">{val.ReferredBy}</label></div>
                            </div>

                            <div className="col-md-6">
                              <div><label><span className="details-tag">Linkedin</span></label></div>
                            </div>
                            <div className="col-md-6">
                              <div>
                                <label className="details_reply cursorEdit">
                                  {val.LinkedIn}
                                </label>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div><label><span className="details-tag">Twitter</span></label></div>
                            </div>
                            <div className="col-md-6">
                              <div><label className="details_reply cursorEdit">{val.Twitter}</label></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-2 col-md-4">
                    <div className="summary_profilePic">
                      <img className="resume-img-responsive" src={val.Image} alt="image" />
                      <div className="editbtn">
                        <EditIcon className="cursorEdit" onClick={() => this.handleRowClick(0, 0, true)} />
                      </div>
                    </div>
                  </div>

                </div> {/* Row End Profile */}


                {
                  val.Education.length > 0 &&

                  <div className="row">  {/* Row Start Education */}
                    <div className="col-md-12 summary_heading"><h5 className="form-subheading mb-2">Education</h5></div>
                    {
                      val.Education && val.Education.map((valEducation, index) => {
                        return (
                          <>
                            {/* <div className="col-md-12 summary_subheading"><h6 className="form-subheading mb-1">{valEducation.InstitutionName}</h6></div> */}
                            <div className="col-md-6">
                              <div className="row">
                                <div className="col-md-6 p-0">
                                  <div><label><span className="details-tag">{index + 1}. Institution Name</span></label></div>
                                </div>
                                <div className="col-md-6">
                                  <div><label className="details_reply">{valEducation.InstitutionName}</label></div>
                                </div>

                                <div className="col-md-6">
                                  <div><label><span className="details-tag">Qualification</span></label></div>
                                </div>
                                <div className="col-md-6">
                                  <div><label className="details_reply">{valEducation.Qualifyname}</label></div>
                                </div>

                                <div className="col-md-6">
                                  <div><label><span className="details-tag">Year of Passing</span></label></div>
                                </div>
                                <div className="col-md-6">
                                  <div><label className="details_reply">{valEducation.Yearofpassing}</label></div>
                                </div>
                              </div>
                            </div>

                            <div className="col-md-6">
                              {
                                index === 0 &&
                                <div className="educationEditBtn">
                                  <EditIcon className="cursorEdit" onClick={() => this.handleRowClick(1, index, true)} />
                                </div>
                              }
                              <div className="row">
                                <div className="col-md-6">
                                  <div><label><span className="details-tag">Percentage/CGPA</span></label></div>
                                </div>
                                <div className="col-md-6">
                                  <div><label className="details_reply">{valEducation.Percentage}</label></div>
                                </div>

                                <div className="col-md-6">
                                  <div><label><span className="details-tag">Certificate No</span></label></div>
                                </div>
                                <div className="col-md-6">
                                  <div><label className="details_reply">{valEducation.CertNo}</label></div>
                                </div>
                              </div>
                            </div>

                          </>
                        )
                      })
                    }

                  </div>
                } {/* Row End Education */}




                {
                  val.Experience.length > 0 &&
                  <div className="row">  {/* Row Start Experience */}

                    <div className="col-md-12 summary_heading"><h5 className="form-subheading">Experience</h5></div>
                    {
                      val.Experience && val.Experience.map((valExp, index) => {
                        return (
                          <>
                            <div className="col-md-12 summary_subheading experienceEditBtn">
                              <h6 className="form-subheading mb-1">{valExp.Organisation}</h6>
                              {
                                index === 0 &&
                                <div className="p-1">
                                  <EditIcon className="cursorEdit" onClick={() => this.handleRowClick(2, index, true)} />
                                </div>
                              }
                            </div>
                            <div className="col-md-6">
                              <div className="row">
                                <div className="col-md-6">
                                  <div><label><span className="details-tag">Company Name</span></label></div>
                                </div>
                                <div className="col-md-6">
                                  <div><label className="details_reply">{valExp.Organisation}</label></div>
                                </div>

                                <div className="col-md-6">
                                  <div><label><span className="details-tag">Department</span></label></div>
                                </div>
                                <div className="col-md-6">
                                  <div><label className="details_reply">{valExp.DeptName}</label></div>
                                </div>

                                <div className="col-md-6">
                                  <div><label><span className="details-tag">Designation</span></label></div>
                                </div>
                                <div className="col-md-6">
                                  <div><label className="details_reply">{valExp.DesigId}</label></div>
                                </div>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="row">

                                <div className="col-md-6">
                                  <div><label><span className="details-tag">Period From</span></label></div>
                                </div>
                                <div className="col-md-6">
                                  <div><label className="details_reply">{valExp.FromDate}</label></div>
                                </div>

                                <div className="col-md-6">
                                  <div><label><span className="details-tag">Period To</span></label></div>
                                </div>
                                <div className="col-md-6">
                                  <div><label className="details_reply">{valExp.ToDate}</label></div>
                                </div>

                                <div className="col-md-6">
                                  <div><label><span className="details-tag">Responsibilities</span></label></div>
                                </div>
                                <div className="col-md-6">
                                  <div><label className="details_reply">{valExp.Responsibilities}</label></div>
                                </div>
                              </div>
                            </div>

                          </>
                        )
                      })
                    }

                  </div> /* Row End Experience */

                }

                {/* Row License*/}
                {
                  val.license.length > 0 &&
                  <div className="row">  {/* Row Start Experience */}

                    <div className="col-md-12 summary_heading"><h5 className="form-subheading">License</h5></div>
                    {
                      val.license && val.license.map((valLicense, index) => {
                        return (
                          <>
                            <div className="col-md-12 summary_subheading experienceEditBtn">
                              <h6 className="form-subheading mb-1">{valLicense.LiceName}</h6>
                              {
                                index === 0 &&
                                <div className="p-1">
                                  <EditIcon className="cursorEdit" onClick={() => this.handleRowClick(4, index, true)} />
                                </div>
                              }
                            </div>
                            <div className="col-md-6">
                              <div className="row">
                                <div className="col-md-6">
                                  <div><label><span className="details-tag">License Name</span></label></div>
                                </div>
                                <div className="col-md-6">
                                  <div><label className="details_reply">{valLicense.LiceName}</label></div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="row">
                                <div className="col-md-6">
                                  <div><label><span className="details-tag">License Number</span></label></div>
                                </div>
                                <div className="col-md-6">
                                  <div><label className="details_reply">{valLicense.LiceNumber}</label></div>
                                </div>
                              </div>
                            </div>
                          </>
                        )
                      })
                    }

                  </div> /* Row End License */

                }


                {
                  val.Skill.length > 0 &&
                  <div className="row">
                    <div className="col-md-12 summary_heading"><h5 className="form-subheading mb-2">Skills</h5></div>
                    <div className="col-md-11 p-0">
                      <div className="row">
                        {
                          val.Skill && val.Skill.map(valSkill =>
                            <div className="col-md-4">
                              <div className="mt-2 d-flex">
                                <Tag className="Summary_skills">{valSkill.Skillname}</Tag>
                              </div>
                            </div>
                          )
                        }
                      </div>
                    </div>
                    <div className="col-md-1">
                      <div className="skillsEditBtn">
                        <EditIcon className="cursorEdit" onClick={() => this.handleRowClick(3, 0, true)} />
                      </div>
                    </div>
                  </div>
                }

              </div>
              <Grid container className="check-css-profile"
                direction="row"
                justify="center"
                alignItems="center"
                className="mt-3"
                spacing={3}>
                <Grid item >
                  <Button className="btnwidth btnclr" onClick={() => this.props.propFunc(4)}>Prev</Button>
                </Grid>
                <Grid item >
                  <Button className="btnwidth btnclr" onClick={() => this.summarySave(0, 0, false)}>Submit</Button>
                </Grid>
              </Grid>
            </div>
          </React.Fragment >
        )
      })
    )
  }
}

const mapStateToProps = (state) => ({
  resume: state.resumeReducer.resume
});

export default connect(mapStateToProps)(Summary);
