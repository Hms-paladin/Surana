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
          title="Expense View"
          visible={this.state.visible}
          onOk={this.props.onclickok}
          onCancel={this.handleCancel}
          className={this.props.modelclassName}

        >
          <div className={"textcontainermodel"}>
            <p>{this.props.viewdata}</p>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Modalreact;








{/* // import React from 'react';
// // import profile_image from '../../../images/Manivannan.jpg';
// import { Tag } from 'antd';
// import { getResumeDetails } from '../CreateResumeAction'
// import ValidationLibrary from '../../../../validationlibrary/validation'
// import { connect } from 'react-redux';
// import { Modal, Button } from 'antd';
// import "./viewmodel.css"

// class Modalreact extends React.Component { */}
//   state = {
//     showResume: false,
//     errordummy: true,
//      visible: this.props.modalopen ,
//     summarydata:
//     {
//       'description':
//       {
//         'value': '',
//         validation: [{ 'name': 'required' }, { name: 'address' }],
//         error: null,
//         errmsg: null
//       },
//     },
//   };



//   showModal = () => {
//     this.props.onclickok&&this.props.onclickok()
//   };


//   handleCancel = e => {
//     this.props.onclickok&&this.props.onclickok()
//   };
//   componentWillMount() {
//     this.props.dispatch(getResumeDetails(this.props.resumeId));
//   }
//   checkValidation = () => {
//     var summarydata = this.state.summarydata;
//     var targetkeys = Object.keys(summarydata);
//     console.log(targetkeys);
//     for (var i in targetkeys) {
//       var errorcheck = ValidationLibrary.checkValidation(summarydata[targetkeys[i]].value, summarydata[targetkeys[i]].validation);
//       console.log(errorcheck);
//       summarydata[targetkeys[i]].error = !errorcheck.state;
//       summarydata[targetkeys[i]].errmsg = errorcheck.msg;
//     }
//     var filtererr = targetkeys.filter((obj) =>
//       summarydata[obj].error == true);
//     console.log(filtererr.length)
//     if (filtererr.length > 0) {
//       this.setState({ error: true })
//     } else {
//       this.setState({ error: false })
//       this.setState({ showResume: true })
//     }
//     this.setState({ summarydata })
//     this.setState({})
//   }
//   changeDynamic = (data, key) => {
//     console.log("key", key);
//     console.log("data", data);
//     var summarydata = this.state.summarydata;
//     var targetkeys = Object.keys(summarydata);

//     var errorcheck = ValidationLibrary.checkValidation(data, summarydata[key].validation);
//     summarydata[key].value = data;
//     summarydata[key].error = !errorcheck.state;
//     summarydata[key].errmsg = errorcheck.msg;
//     this.setState({ summarydata });
//     var filtererr = targetkeys.filter((obj) =>
//       summarydata[obj].error == true || summarydata[obj].error == null);
//     if (filtererr.length > 0) {
//       this.setState({
//         error: true,
//         errordummy: false
//       })
//     } else {
//       this.setState({ error: false })
//     }
//   }

//   showResume = () => {
//     this.setState({ showResume: true })
//   }


//   gotoProfile = () => {
//     this.prop.propFunc(2)
//   }

//   render() {
//     const { resume } = this.props;
//     return (
//       resume && resume.map((val) => {
//         console.log("sdfksdjfkldsjfldksfkds",val)
//         return (
//           <React.Fragment>
//             <div>
//             <Modal
//           title="VIEW"
//           visible={this.state.visible}
//           onOk={this.props.onclickok}
//           onCancel={this.handleCancel}
//           className={this.props.modelclassName}

//         >
//             <div className={"textcontainermodel"}>
//        <p>{this.props.viewdata.id}</p>
//            </div>
//             <div className="top_move card card-min-height top_move">
//               <div className="card-body">
//                 <div className="row">{/* Row Start Profile */}
//                   <div className="col-md-12 summary_heading"><h5 className="form-subheading">Personal Info</h5></div>
//                   <div className="col-lg-10 col-md-8">
//                     <div className="row">
//                       <div className="col-lg-6 col-md-12 col-sm-12">
//                         <div className="details">
//                           <div className="row">

//                             <div className="col-md-6">
//                               <div><label><span className="details-tag">Name</span></label></div>
//                             </div>
//                             <div className="col-md-6">
//                               <div><label className="details_reply">{val.FirstName}</label></div>
//                             </div>

//                             <div className="col-md-6">
//                               <div><label><span className="details-tag">Lastname</span></label></div>
//                             </div>
//                             <div className="col-md-6">
//                               <div><label className="details_reply">{val.LastName}</label></div>
//                             </div>

//                             <div className="col-md-6">
//                               <div><label><span className="details-tag">Gender</span></label></div>
//                             </div>
//                             <div className="col-md-6">
//                               <div><label className="details_reply">{val.Gender}</label></div>
//                             </div>

//                             <div className="col-md-6">
//                               <div><label><span className="details-tag">DOB</span></label></div>
//                             </div>
//                             <div className="col-md-6">
//                               <div><label className="details_reply">{val.DoB}</label></div>
//                             </div>

//                             {/* <div className="col-md-6">
//                               <div><label><span className="details-tag">Age</span></label></div>
//                             </div>
//                             <div className="col-md-6">
//                               <div><label className="details_reply">--</label></div>
//                             </div> */}

//                             <div className="col-md-6">
//                               <div><label><span className="details-tag">Current Address</span></label></div>
//                             </div>
//                             <div className="col-md-6">
//                               <div><label className="details_reply">{val.CurrentAddress}</label></div>
//                             </div>

//                             <div className="col-md-6">
//                               <div><label><span className="details-tag">Permanent Address</span></label></div>
//                             </div>
//                             <div className="col-md-6">
//                               <div><label className="details_reply">{val.PermanentAddress}</label></div>
//                             </div>

//                           </div>
//                         </div>
//                       </div>


//                       <div className="col-lg-6 col-md-12 col-sm-12">
//                         <div className="details">
//                           <div className="row">

//                             <div className="col-md-6">
//                               <div><label><span className="details-tag">Father's Name</span></label></div>
//                             </div>
//                             <div className="col-md-6">
//                               <div><label className="details_reply">{val.FatherName}</label></div>
//                             </div>

//                             <div className="col-md-6">
//                               <div><label><span className="details-tag">Phone Number</span></label></div>
//                             </div>
//                             <div className="col-md-6">
//                               <div><label className="details_reply">{val.PhoneNumber}</label></div>
//                             </div>

//                             <div className="col-md-6">
//                               <div><label><span className="details-tag">Email ID</span></label></div>
//                             </div>
//                             <div className="col-md-6">
//                               <div><label className="details_reply">{val.EmailId}</label></div>
//                             </div>

//                             <div className="col-md-6">
//                               <div><label ><span className="details-tag">Location</span></label></div>
//                             </div>
//                             <div className="col-md-6">
//                               <div><label className="details_reply">{val.Location}</label></div>
//                             </div>

//                             <div className="col-md-6">
//                               <div><label><span className="details-tag">Referred By</span></label></div>
//                             </div>
//                             <div className="col-md-6">
//                               <div><label className="details_reply">{val.ReferredBy}</label></div>
//                             </div>

//                             <div className="col-md-6">
//                               <div><label><span className="details-tag">Linkedin</span></label></div>
//                             </div>
//                             <div className="col-md-6">
//                               <div><label className="details_reply">{val.LinkedIn}</label></div>
//                             </div>

//                             <div className="col-md-6">
//                               <div><label><span className="details-tag">Twitter</span></label></div>
//                             </div>
//                             <div className="col-md-6">
//                               <div><label className="details_reply">{val.Twitter}</label></div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="col-lg-2 col-md-4">
//                     <div className="summary_profilePic"><img className="resume-img-responsive" src={val.Image} alt="image" /></div>
//                   </div>

//                 </div> {/* Row End Profile */}

//                 <div className="row">  {/* Row Start Experience */}

//                   <div className="col-md-12 summary_heading"><h5 className="form-subheading">Experience</h5></div>
//                   {
//                     val.Experience && val.Experience.map(valExp =>
//                       <>
//                         <div className="col-md-12 summary_subheading"><h6 className="form-subheading mb-1">{valExp.Organisation}</h6></div>
//                         <div className="col-md-6">
//                           <div className="row">

//                             <div className="col-md-6">
//                               <div><label><span className="details-tag">Company Name</span></label></div>
//                             </div>
//                             <div className="col-md-6">
//                               <div><label className="details_reply">{valExp.Organisation}</label></div>
//                             </div>

//                             <div className="col-md-6">
//                               <div><label><span className="details-tag">Department</span></label></div>
//                             </div>
//                             <div className="col-md-6">
//                               <div><label className="details_reply">---</label></div>
//                             </div>

//                             <div className="col-md-6">
//                               <div><label><span className="details-tag">Designation</span></label></div>
//                             </div>
//                             <div className="col-md-6">
//                               <div><label className="details_reply">{valExp.Designation}</label></div>
//                             </div>
//                           </div>
//                         </div>

//                         <div className="col-md-6">
//                           <div className="row">

//                             <div className="col-md-6">
//                               <div><label><span className="details-tag">Period From</span></label></div>
//                             </div>
//                             <div className="col-md-6">
//                               <div><label className="details_reply">{valExp.FromDate}</label></div>
//                             </div>

//                             <div className="col-md-6">
//                               <div><label><span className="details-tag">Period To</span></label></div>
//                             </div>
//                             <div className="col-md-6">
//                               <div><label className="details_reply">{valExp.ToDate}</label></div>
//                             </div>

//                             <div className="col-md-6">
//                               <div><label><span className="details-tag">Responsibilities</span></label></div>
//                             </div>
//                             <div className="col-md-6">
//                               <div><label className="details_reply">{valExp.Responsibilities}</label></div>
//                             </div>
//                           </div>
//                         </div>

//                       </>

//                     )
//                   }

//                 </div> {/* Row End Experience */}

//                 <div className="row">  {/* Row Start Education */}
//                   {
//                     val.Education && val.Education.map(valEducation =>
//                       <>
//                         <div className="col-md-12 summary_heading"><h5 className="form-subheading mb-2">Education</h5></div>
//                         <div className="col-md-6">
//                           <div className="row">

//                             <div className="col-md-6">
//                               <div><label><span className="details-tag">Institution Name</span></label></div>
//                             </div>
//                             <div className="col-md-6">
//                               <div><label className="details_reply">{valEducation.InstitutionName}</label></div>
//                             </div>

//                             <div className="col-md-6">
//                               <div><label><span className="details-tag">Qualification</span></label></div>
//                             </div>
//                             <div className="col-md-6">
//                               <div><label className="details_reply">{valEducation.QualifyId}</label></div>
//                             </div>

//                             <div className="col-md-6">
//                               <div><label><span className="details-tag">Year of Passing</span></label></div>
//                             </div>
//                             <div className="col-md-6">
//                               <div><label className="details_reply">{valEducation.Yearofpassing}</label></div>
//                             </div>
//                           </div>
//                         </div>

//                         <div className="col-md-6">
//                           <div className="row">
//                             <div className="col-md-6">
//                               <div><label><span className="details-tag">Percentage</span></label></div>
//                             </div>
//                             <div className="col-md-6">
//                               <div><label className="details_reply">{valEducation.Percentage}</label></div>
//                             </div>

//                             <div className="col-md-6">
//                               <div><label><span className="details-tag">Certificate No</span></label></div>
//                             </div>
//                             <div className="col-md-6">
//                               <div><label className="details_reply">{valEducation.CertNo}</label></div>
//                             </div>
//                           </div>
//                         </div>

//                       </>
//                     )
//                   }
//                 </div>   {/* Row End Education */}

//                 <div className="row">
//                   <div className="col-md-12 summary_heading"><h5 className="form-subheading mb-2">Skills</h5></div>
//                 </div>
//                 <div className="mt-2 d-flex">
//                   {
//                     val.Skill && val.Skill.map(valSkill => 
//                       <Tag className="Summary_skills">{valSkill.Skillname}</Tag>
//                       )
//                   }
//                 </div>


//               </div>
//             </div>
//             </Modal>
//             </div>
//           </React.Fragment>
//         )
//       })
//     )
//   }
// }

// const mapStateToProps = (state) => ({
//   resume: state.resumeReducer.resume
// });

// export default connect(mapStateToProps)(Modalreact);
