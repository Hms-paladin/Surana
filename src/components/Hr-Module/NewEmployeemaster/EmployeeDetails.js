import React from 'react';
import { Spin, Space } from 'antd';
import { connect } from 'react-redux';

import "./employeemaster.css";

class EmployeeDetails extends React.Component {

    componentDidMount() {
        console.log("getEmpDetails", this.props.employeeDetails)
    }

    render() {
        // const { personalDetails } = this.props.employeeDetails != null && this.props.employeeDetails[0]
        const { employeeofficial } = this.props.employeeDetails != null && this.props.employeeDetails[0]
        console.log("getEmpDetails", this.props.employeeDetails != null && this.props.employeeDetails[0])

        return (
            <>
                <React.Fragment>
                    <div className="card card_edit_empdetails mt-3">
                        <div className="card card-body">
                            {
                                this.props.employeeDetails != null ?
                                    // {/* Top Head Edit Start */ }

                                    // {/* Top Head Edit End */}
                                    //  {/* First Card */}
                                    <div className="overall_par">
                                        < div className="head_edit">
                                            <h5>Employee Name : {this.props.employeeDetails[0].EmpFirstName} {this.props.employeeDetails[0].EmpLastName}</h5>
                                            <h5>Employee Id : {this.props.employeeDetails[0].EmpId}</h5>

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
                                                            {this.props.employeeDetails[0].DOB}
                                                        </div>
                                                        <div className="col-sm-6 col-md-6 first_row_edit">
                                                            <span>Age</span>
                                                        </div>
                                                        <div className="col-sm-6 col-md-6 first_row_edit">
                                                            {this.props.employeeDetails[0].Age}
                                                        </div>
                                                        <div className="col-sm-6 col-md-6 first_row_edit">
                                                            <span>Gender</span>
                                                        </div>
                                                        <div className="col-sm-6 col-md-6 first_row_edit">
                                                            {this.props.employeeDetails[0].Gender}
                                                        </div>
                                                        <div className="col-sm-6 col-md-6 first_row_edit">
                                                            <span>Highest Qualification</span>
                                                        </div>
                                                        <div className="col-sm-6 col-md-6 first_row_edit">
                                                            {this.props.employeeDetails[0].HighestQualification}
                                                        </div>
                                                        <div className="col-sm-6 col-md-6 first_row_edit">
                                                            <span>Email</span>
                                                        </div>
                                                        <div className="col-sm-6 col-md-6 first_row_edit">
                                                            {this.props.employeeDetails[0].Email}
                                                        </div>
                                                        <div className="col-sm-6 col-md-6 first_row_edit">
                                                            <span>Mobile Number</span>
                                                        </div>
                                                        <div className="col-sm-6 col-md-6 first_row_edit">
                                                            {this.props.employeeDetails[0].MobileNumber}
                                                        </div>
                                                        <div className="col-sm-6 col-md-6 first_row_edit">
                                                            <span>Secondary Contact</span>
                                                        </div>
                                                        <div className="col-sm-6 col-md-6 first_row_edit">
                                                            {this.props.employeeDetails[0].SecondaryContact}
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
                                                            {employeeofficial[0].DOJ}
                                                        </div>
                                                        <div className="col-sm-6 col-md-6 first_row_edit">
                                                            <span>Bank Name/Branch</span>
                                                        </div>
                                                        <div className="col-sm-6 col-md-6 first_row_edit">
                                                            {`${employeeofficial[0].BankName} / ${employeeofficial[0].Branch}`}
                                                        </div>
                                                        <div className="col-sm-6 col-md-6 first_row_edit">
                                                            <span>Account Number</span>
                                                        </div>
                                                        <div className="col-sm-6 col-md-6 first_row_edit">
                                                            {employeeofficial[0].AccountNumber}
                                                        </div>
                                                        <div className="col-sm-6 col-md-6 first_row_edit">
                                                            <span>IFSC Code</span>
                                                        </div>
                                                        <div className="col-sm-6 col-md-6 first_row_edit">
                                                            {employeeofficial[0].IfscCode != "undefined" ? employeeofficial[0].IfscCode : "-"}
                                                        </div>
                                                        <div className="col-sm-6 col-md-6 first_row_edit">
                                                            <span>Email</span>
                                                        </div>
                                                        <div className="col-sm-6 col-md-6 first_row_edit">
                                                            {employeeofficial[0].Email}
                                                        </div>
                                                        <div className="col-sm-6 col-md-6 first_row_edit">
                                                            <span>Mobile Number</span>
                                                        </div>
                                                        <div className="col-sm-6 col-md-6 first_row_edit">
                                                            {employeeofficial[0].MobileNumber}
                                                        </div>
                                                        <div className="col-sm-6 col-md-6 first_row_edit">
                                                            <span>Secondary Contact</span>
                                                        </div>
                                                        <div className="col-sm-6 col-md-6 first_row_edit">
                                                            {employeeofficial[0].SecondaryContact}
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



                        </div>
                    </div>
                </React.Fragment>
            </>

        )
    }
}


const mapStateToProps = (state) => ({
    employeeDetails: state.employeeMasterReducer.employeeDetails
});


export default connect(mapStateToProps)(EmployeeDetails);