import React from "react"
import { Modal, Button } from 'antd';
import "./viewmodel.css";
import { Tag } from 'antd';
class Modalreact extends React.Component {
  state = { visible: this.props.modalopen };


  showModal = () => {
    this.props.onclickok && this.props.onclickok()
    console.log("empty")
  };


  handleCancel = e => {
    this.props.onclickok && this.props.onclickok()
  };
  render() {
    console.log(this.props.employeedata, "employeedata")
    return (
      <div>

        <Modal
          title="Candidate View"
          visible={this.state.visible}
          onOk={this.props.onclickok}
          onCancel={this.handleCancel}
          className={this.props.modelclassName}

        >
          <div className={"textcontainermodel"}>
            <div className="card card-full-height">
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
                              <div><label className="details_reply">{this.props.employeedata.FirstName}</label></div>
                            </div>

                            <div className="col-md-6">
                              <div><label><span className="details-tag">Lastname</span></label></div>
                            </div>
                            <div className="col-md-6">
                              <div><label className="details_reply">{this.props.employeedata.LastName}</label></div>
                            </div>

                            <div className="col-md-6">
                              <div><label><span className="details-tag">Gender</span></label></div>
                            </div>
                            <div className="col-md-6">
                              <div><label className="details_reply">{this.props.employeedata.Gender === "1" ? "Male" : "Female"}</label></div>
                            </div>

                            <div className="col-md-6">
                              <div><label><span className="details-tag">DOB</span></label></div>
                            </div>
                            <div className="col-md-6">
                              <div><label className="details_reply">{this.props.employeedata.DoB}</label></div>
                            </div>
                            <div className="col-md-6">
                              <div><label><span className="details-tag">Current Address</span></label></div>
                            </div>
                            <div className="col-md-6">
                              <div><label className="details_reply">{this.props.employeedata.CurrentAddress}</label></div>
                            </div>

                            <div className="col-md-6">
                              <div><label><span className="details-tag">Permanent Address</span></label></div>
                            </div>
                            <div className="col-md-6">
                              <div><label className="details_reply">{this.props.employeedata.PermanentAddress}</label></div>
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
                              <div><label className="details_reply">{this.props.employeedata.FatherName}</label></div>
                            </div>

                            <div className="col-md-6">
                              <div><label><span className="details-tag">Phone Number</span></label></div>
                            </div>
                            <div className="col-md-6">
                              <div><label className="details_reply">{this.props.employeedata.PhoneNumber}</label></div>
                            </div>

                            <div className="col-md-6">
                              <div><label><span className="details-tag">Email ID</span></label></div>
                            </div>
                            <div className="col-md-6">
                              <div><label className="details_reply">{this.props.employeedata.EmailId}</label></div>
                            </div>

                            <div className="col-md-6">
                              <div><label ><span className="details-tag">Location</span></label></div>
                            </div>
                            <div className="col-md-6">
                              <div><label className="details_reply">{this.props.employeedata.Location}</label></div>
                            </div>

                            <div className="col-md-6">
                              <div><label><span className="details-tag">Referred By</span></label></div>
                            </div>
                            <div className="col-md-6">
                              <div><label className="details_reply">{this.props.employeedata.ReferredBy}</label></div>
                            </div>

                            <div className="col-md-6">
                              <div><label><span className="details-tag">Linkedin</span></label></div>
                            </div>
                            <div className="col-md-6">
                              <div><label className="details_reply">{this.props.employeedata.LinkedIn}</label></div>
                            </div>

                            <div className="col-md-6">
                              <div><label><span className="details-tag">Twitter</span></label></div>
                            </div>
                            <div className="col-md-6">
                              <div><label className="details_reply">{this.props.employeedata.Twitter}</label></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-2 col-md-4">
                    <div className="summary_profilePic"><img className="resume-img-responsive" src={this.props.employeedata.Image} alt="image" /></div>
                  </div>

                </div> {/* Row End Profile */}


                <>
                  {
                    this.props.employeedata.Education && this.props.employeedata.Education.length > 0 &&


                    <div className="row">
                      {/* Row Start Education */}
                      <div className="col-md-12 summary_heading"><h5 className="form-subheading mb-2">Education</h5></div>
                      {
                        this.props.employeedata.Education && this.props.employeedata.Education.map((valEducation, index) => {
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
                  }
                </>
                {/* Row End Education  */}


                {
                  this.props.employeedata.Experience.length > 0 &&

                  <div className="row">
                    {/* Row Start Experience */}

                    <div className="col-md-12 summary_heading"><h5 className="form-subheading">Experience</h5></div>
                    {
                      this.props.employeedata.Experience && this.props.employeedata.Experience.map(valExp =>
                        <>
                          <div className="col-md-12 summary_subheading"><h6 className="form-subheading mb-1">{valExp.Organisation}</h6></div>
                          <div className="col-md-4">
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
                                <div><label className="details_reply">{valExp.DesigName}</label></div>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-4">
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
                      )}


                  </div>
                  /* Row End Experience */
                }

                {/* Row License*/}
                {
                  this.props.employeedata.license.length > 0 &&
                  <div className="row">  {/* Row Start Experience */}

                    <div className="col-md-12 summary_heading"><h5 className="form-subheading">License</h5></div>
                    {
                      this.props.employeedata.license && this.props.employeedata.license.map((valLicense, index) => {
                        return (
                          <>
                            <div className="col-md-12 summary_subheading experienceEditBtn">
                              <h6 className="form-subheading mb-1">{valLicense.LiceName}</h6>
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
                  this.props.employeedata.Skill.length > 0 &&
                  <div className="row">
                    <div className="col-md-12 summary_heading"><h5 className="form-subheading mb-2">Skills</h5></div>
                    {
                      this.props.employeedata.Skill && this.props.employeedata.Skill.map(valSkill =>
                        <div className="col-md-4">
                          <div className="mt-2 d-flex">
                            <Tag className="Summary_skills">{valSkill.Skillname}</Tag>
                          </div>
                        </div>
                      )
                    }
                  </div>

                }


              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Modalreact;
