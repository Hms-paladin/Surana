import React from 'react';
import { Grid } from '@material-ui/core';
import './employeemaster.css';
import Inputantd from '../../../formcomponent/inputantd';
import Calenderbox from '../../../formcomponent/calenderbox'
import Textareaantd from '../../../formcomponent/textareaantd';
import Dropdownantd from '../../../formcomponent/dropdownantd';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import ValidationLibrary from "../../../validationlibrary/validation";

import { getResumeDetails, getDesignations } from '../create_resume/action/CreateResumeAction';
import { connect } from 'react-redux';

import dateformat from 'dateformat';
import DatePickerMui from '../../../formcomponent/DatePickerMUI';
import { employeeMasterTab } from './employeeMasterAction';
import { getReferredBy } from '../../../fixers/fixersAction';
import { apiurl } from '../../../App';
import Axios from 'axios';

class PersonalDetails extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            resumeIdList: [],
            changeval: true,
            valueCheck: false,
            option: false,
            errordummy: true,
            emp_personalDetails:
            {
                'emppersonal_resumeid':
                {
                    'value': this.props.personalDetails != undefined ? this.props.personalDetails[0].ResId : '',
                    validation: [{ 'name': 'required' }],
                    error: null,
                    errmsg: null
                },
                // 'emppersonal_designationId':{
                //     'value': '',
                //     validation: [{ 'name': 'required' }],
                //     error: null,
                //     errmsg: null
                // }
            },
        };
    }

    componentWillMount() {
        this.props.dispatch(getReferredBy())
    }


    changeDynamic = (data, key) => {
        console.log("key", key);
        console.log("data", data);
        var emp_personalDetails = this.state.emp_personalDetails;
        var targetkeys = Object.keys(emp_personalDetails);

        var errorcheck = ValidationLibrary.checkValidation(data, emp_personalDetails[key].validation);
        emp_personalDetails[key].value = data;
        emp_personalDetails[key].error = !errorcheck.state;
        emp_personalDetails[key].errmsg = errorcheck.msg;
        this.setState({ emp_personalDetails });
        var filtererr = targetkeys.filter((obj) =>
            emp_personalDetails[obj].error == true || emp_personalDetails[obj].error == null);
        if (filtererr.length > 0) {
            this.setState({ error: true })
        } else {
            this.setState({ error: false })
        }

        if (filtererr.length === 0) {
            this.setPersonalDetails();
        }

    }

    callroot = () => {
        var emp_personalDetails = this.state.emp_personalDetails;
        var targetkeys = Object.keys(emp_personalDetails);
        console.log(targetkeys);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(emp_personalDetails[targetkeys[i]].value, emp_personalDetails[targetkeys[i]].validation);
            console.log(errorcheck);
            emp_personalDetails[targetkeys[i]].error = !errorcheck.state;
            emp_personalDetails[targetkeys[i]].errmsg = errorcheck.msg;
        }
        var filtererr = targetkeys.filter((obj) =>
            emp_personalDetails[obj].error == true);
        console.log(filtererr.length)
        if (filtererr.length > 0) {
            this.setState({ error: true })
        } else {
            this.setState({ error: false })

        }
        this.setState({ emp_personalDetails })

        let changenext = []
        let j = 0
        for (j = 0; j < targetkeys.length; j++) {
            changenext.push(this.state.emp_personalDetails[targetkeys[j]].error)
        }

        let nextvalue = changenext.every((val) => val === false)
        // alert(this.state.emp_personalDetails.emppersonal_resumeid.value)
        if (nextvalue === true) {
            this.props.propFunc && this.props.propFunc(1)
            // this.props.dispatch(employeeMasterTab(this.state.emp_personalDetails.emppersonal_resumeid.value))
        }
        if (filtererr.length === 0) {
            this.setState({ changeval: false })
        }
    }



    optionClick = () => {
        this.setState({
            option: true
        })

    }

    setPersonalDetails = () => {
        // getResumeDetails comming from hrmodule create resume action.
        var candidateData=this.state.resumeIdList.find(val => val.value === this.state.emp_personalDetails.emppersonal_resumeid.value)
        this.props.dispatch(getResumeDetails(candidateData.id)); // getting resume personal details based on dropdown value.
    }

    componentWillMount(){
        this.props.dispatch(getDesignations())
    }

    componentDidMount() {
        if (this.props.resumeId != null) {
            this.state.emp_personalDetails.emppersonal_resumeid.value = this.props.resumeId;
            this.setState({})
        }
        this.getResumeIdApi()
    }

    getResumeIdApi = () => {
        Axios({
            method: 'GET',
            url: apiurl + '/getEmployeeResumebyId',
        }).then((response) => {
            var resumeIdList = []
            response.data.data.length > 0 && response.data.data.map((val) => {
                return (
                    resumeIdList.push({
                        id: val.resumeId,
                        value: val.FirstName
                    })
                )
            })
            this.setState({ resumeIdList: resumeIdList })
            console.log(this.state.resumeIdList, "myresponsedata")
        })
    }


    render() {
        console.log(this.state.emp_personalDetails.emppersonal_resumeid.value, "syed");
        const { personalDetails } = this.props;
        var valueCheck = personalDetails !== null ? true : false;
        console.log(personalDetails, "valuecheck")
        return (
            <React.Fragment>
                <div className="card top_move">
                    <div className="card-body">
                        {
                            <>
                                <Grid container>
                                    <div className="empmaster_border pb-2 d-flex" onClick={this.optionClick}>
                                        <Grid item md={3} sm={5}>
                                            <Dropdownantd label="Candidate Name" className="w-100 pr-2"
                                                option={this.state.resumeIdList.map(val => val.value)}
                                                changeData={(data) => this.changeDynamic(data, 'emppersonal_resumeid')}
                                                value={this.state.emp_personalDetails.emppersonal_resumeid.value}
                                                error={this.state.emp_personalDetails.emppersonal_resumeid.error}
                                                errmsg={this.state.emp_personalDetails.emppersonal_resumeid.errmsg}
                                                convertString
                                            />
                                        </Grid>
                                        {/* <Grid item md={3} sm={5}>
                                            <Dropdownantd label="Designation" className="w-100"
                                                option={this.props.designationList && this.props.designationList.map(val => val.DesigName)}
                                                changeData={(data) => this.changeDynamic(data, 'emppersonal_designationId')}
                                                value={this.state.emp_personalDetails.emppersonal_designationId.value}
                                                error={this.state.emp_personalDetails.emppersonal_designationId.error}
                                                errmsg={this.state.emp_personalDetails.emppersonal_designationId.errmsg}
                                                convertString
                                            />
                                        </Grid> */}
                                    </div>
                                </Grid>
                                <Grid container className="mt-3">
                                    <Grid item md={3} sm={5}>
                                        <Inputantd label="First Name" value={valueCheck ? personalDetails[0].FirstName : ""} className="w-100" />
                                    </Grid>
                                    <Grid item md={1} sm={1} />
                                    <Grid item md={3} sm={5}>
                                        <Inputantd label="Last Name" value={valueCheck ? personalDetails[0].LastName : ""} className="w-100" />
                                    </Grid>
                                    <Grid item md={1} sm={1} />
                                    <Grid item md={3} sm={5}>
                                        <Grid container spacing={1}>
                                            <Grid item md={5} sm={5}>
                                                <Calenderbox placeholder={"dd-mm-yyyy"} label="DOB"
                                                    value={valueCheck && moment(personalDetails[0].DoB)}
                                                    halfPicker
                                                />
                                            </Grid>
                                            <Grid item md={2} sm={2}>
                                                <Inputantd label="Age" value={valueCheck ? personalDetails[0].Age : '-'} className="w-100" />
                                            </Grid>
                                            <Grid item md={5} sm={5}>
                                                <Dropdownantd label="Gender" className="w-100" value={valueCheck ? personalDetails[0].Gender === "1" ? "Male" : "Female" : "Male"} option={["Male", "female"]} />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item md={1} sm={1} />
                                    <Grid item md={3} sm={5}>
                                        <Inputantd label="Father/Husband/Guardian Name" value={valueCheck ? personalDetails[0].FatherName : ""} className="w-100" />
                                    </Grid>
                                    <Grid item md={1} sm={1} />
                                    <Grid item md={3} sm={5}>
                                        <Inputantd label="Phone Number" value={valueCheck ? personalDetails[0].PhoneNumber : ""} className="w-100" />
                                    </Grid>
                                    <Grid item md={1} sm={1} />
                                    <Grid item md={3} sm={5}>
                                        <Inputantd label="Highest Qualification" value={valueCheck ? 'MCA' : ''} className="w-100" />
                                    </Grid>
                                    <Grid item md={1} sm={1} />
                                    <Grid container>
                                        <Grid item md={3} sm={12}>
                                            <Grid container>
                                                <Grid item md={12} sm={5}>
                                                    <Inputantd label="Email ID" value={valueCheck ? personalDetails[0].EmailId : ""} className="w-100" />
                                                </Grid>
                                                <Grid item md={1} sm={1} />
                                                <Grid item md={12} sm={5}>
                                                    <Inputantd label="Location" value={valueCheck ? personalDetails[0].Location : ""} className="w-100" />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item md={1} />
                                        <Grid item md={3} sm={5}>
                                            <Textareaantd label="Current Address" value={valueCheck ? personalDetails[0].CurrentAddress : ""} className="w-100" />
                                        </Grid>
                                        <Grid item md={1} sm={1} />
                                        <Grid item md={3} sm={5}>
                                            <Textareaantd label="Permanent Address" value={valueCheck ? personalDetails[0].PermanentAddress : ""} className="w-100" />
                                        </Grid>
                                        <Grid item md={1} sm={1} />
                                        <Grid item md={3} sm={5}>
                                            <Inputantd label="Referred By" value={valueCheck ? personalDetails[0].ReferredBy : ""} className="w-100" />
                                        </Grid>
                                    </Grid>
                                </Grid>

                            </>
                        }
                        <Grid container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            // className="gridbtnalign"
                            spacing={3}>
                            <Grid item >
                                <Button size="lg" onClick={() => this.callroot()} className="btnmargin btnwidth btnclr">Next</Button>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    personalDetails: state.resumeReducer.resume,
    resumeId: state.employeeMasterReducer.employeeMasterTab,
    designationList:state.resumeReducer.designations,
    referredByMaster: state.fixers.referredBy,
});

export default connect(mapStateToProps)(PersonalDetails);