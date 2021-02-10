import React from "react"
import { Modal, Button } from 'antd';
import "./viewmodel.css"
import { Spin, Space } from 'antd';
import { connect } from 'react-redux';

class Modalreact extends React.Component {
  state = { visible: this.props.modalopen };
//   componentDidMount() {
//     console.log("getEmpDetails", this.props.employeeDetails)
// }

showModal = () => {
  this.props.onclickok&&this.props.onclickok()
  console.log("empty")
};
  handleCancel = e => {
    this.props.onclickok&&this.props.onclickok()
  };

  render() {
    console.log(this.props.employeeOfficial,"employeemaster")
    let {EmpFirstName,EmpLastName,EmpDOB,EmpId,EmpAge,EmailId,EmpGender,
      EmpQualification,EmpSecondaryContact,EmpOfficialMobile,EmpDOJ,EmpBankName,EmpBranchName,EmpAccountNumber,EmpIFSCCode,EmpOfficialEmail,EmpPersEmail}=this.props.employeeOfficial && this.props.employeeOfficial
    console.log(this.props,"bla bla")
    return (
      <div>
        {/* <Button type="primary" onClick={this.showModal}>
          Open Modal
        </Button> */}
        <Modal
          title="Employee Master View"
          visible={this.state.visible}
          onOk={this.props.onclickok}
          onCancel={this.handleCancel}
          className={this.props.modelclassName}
          
        >
          <div className={"textcontainermodel"}>
          <div className="card card_edit_empdetails mt-3">
                        {/* <div className="card card-body"> */}
                            {
                                this.props.employeeOfficial != null ?
                                    // {/* Top Head Edit Start */ }

                                    // {/* Top Head Edit End */}
                                    //  {/* First Card */}
                                    <div className="overall_par">
                                        < div className="head_edit">
                                            <h5>Employee Name : {EmpFirstName} {EmpLastName}</h5>
                                            <h5>Employee Id : {EmpId}</h5>

                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 Responsive_Tab ">
                                                <div className="card p-3 outside_cardshadow">
                                                    <div className="personal_detail_par">
                                                        <h4 className="personal_textedit">Personal Details</h4>
                                                    </div>
                                                    <div className="row container-fluid">
                                                        <div className="col-sm-6 col-md-6 first_row_edit">
                                                            <span>DOB</span>
                                                        </div>
                                                        <div className="col-sm-6 col-md-6 first_row_edit">
                                                            {EmpDOB}
                                                        </div>
                                                        <div className="col-sm-6 col-md-6 first_row_edit">
                                                            <span>Age</span>
                                                        </div>
                                                        <div className="col-sm-6 col-md-6 first_row_edit">
                                                            {EmpAge}
                                                        </div>
                                                        <div className="col-sm-6 col-md-6 first_row_edit">
                                                            <span>Gender</span>
                                                        </div>
                                                        <div className="col-sm-6 col-md-6 first_row_edit">
                                                            {EmpGender}
                                                        </div>
                                                        <div className="col-sm-6 col-md-6 first_row_edit">
                                                            <span>Highest Qualification</span>
                                                        </div>
                                                        <div className="col-sm-6 col-md-6 first_row_edit">
                                                            {EmpQualification}
                                                        </div>
                                                        <div className="col-sm-6 col-md-6 first_row_edit">
                                                            <span>Email</span>
                                                        </div>
                                                        <div className="col-sm-6 col-md-6 first_row_edit">
                                                            {EmpPersEmail}
                                                        </div>
                                                        <div className="col-sm-6 col-md-6 first_row_edit">
                                                            <span>Mobile Number</span>
                                                        </div>
                                                        <div className="col-sm-6 col-md-6 first_row_edit">
                                                            {EmpOfficialMobile}
                                                        </div> 
                                                        <div className="col-sm-6 col-md-6 first_row_edit">
                                                            <span>Secondary Contact</span>
                                                        </div>
                                                        <div className="col-sm-6 col-md-6 first_row_edit">
                                                            {EmpSecondaryContact}
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            {/* First card End */}

                                            {/* second card Start */}

                                             <div className="col-md-6 Responsive_Tab">
                                                <div className="card p-3 outside_cardshadow">
                                                    <div className="personal_detail_par">
                                                        <h4 className="personal_textedit">Official Details</h4>
                                                    </div>
                                                    <div className="row container-fluid">
                                                        <div className="col-sm-6 col-md-6 first_row_edit">
                                                            <span>DOJ</span>
                                                        </div>
                                                        <div className="col-sm-6 col-md-6 first_row_edit">
                                                            {EmpDOJ}
                                                        </div>
                                                        <div className="col-sm-6 col-md-6 first_row_edit">
                                                            <span>Bank Name/Branch</span>
                                                        </div>
                                                        <div className="col-sm-6 col-md-6 first_row_edit">
                                                            {`${EmpBankName} / ${EmpBranchName}`}
                                                        </div>
                                                        <div className="col-sm-6 col-md-6 first_row_edit">
                                                            <span>Account Number</span>
                                                        </div>
                                                        <div className="col-sm-6 col-md-6 first_row_edit">
                                                            {EmpAccountNumber}
                                                        </div>
                                                        <div className="col-sm-6 col-md-6 first_row_edit">
                                                            <span>IFSC Code</span>
                                                        </div>
                                                        <div className="col-sm-6 col-md-6 first_row_edit">
                                                            {EmpIFSCCode != "undefined" ? EmpIFSCCode : "-"}
                                                        </div>
                                                        <div className="col-sm-6 col-md-6 first_row_edit">
                                                            <span>Email</span>
                                                        </div>
                                                        <div className="col-sm-6 col-md-6 first_row_edit">
                                                            {EmpOfficialEmail}
                                                        </div>
                                                        <div className="col-sm-6 col-md-6 first_row_edit">
                                                            <span>Mobile Number</span>
                                                        </div>
                                                        <div className="col-sm-6 col-md-6 first_row_edit">
                                                            {EmpOfficialMobile}
                                                        </div>
                                                        <div className="col-sm-6 col-md-6 first_row_edit">
                                                            <span>Secondary Contact</span>
                                                        </div>
                                                        <div className="col-sm-6 col-md-6 first_row_edit">
                                                            {EmpSecondaryContact}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> 
                                            {/* second card End */}
                                        </div> 
                                    </div>
                                    :
                                    <Spin className="spinner-center" size="large" />

                            }



                        {/* </div> */}
                    </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Modalreact;