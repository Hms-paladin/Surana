import React from 'react';
import './Newinterviewtable.css';
import Grid from '@material-ui/core/Grid';
import Button from 'react-bootstrap/Button'
import Dropdownantd from '../../../formcomponent/dropdownantd';
import Calenderbox from '../../../formcomponent/calenderbox';
import Textareaantd from '../../../formcomponent/textareaantd';
import DatePickerMui from "../../../formcomponent/DatePickerMUI";

import { IoMdEye } from "react-icons/io";
import NewInterviewModal from './NewInterviewModal';
import { apiurl } from '../../../App'
import { Select } from 'antd';
import { DatePicker } from 'antd';
import { notification } from 'antd';

import dateFormat from 'dateformat';

import axios from 'axios';

const { Option } = Select;




class NewInterviewtable extends React.Component {
    state = {
        onlineTestDetails: [],
        intRemarks: '',
        view: false,
        designationList: [],
        resumeDetails: [],
        resumeID: null,
        designationID: null,
        status: "",
        candidateDetails: [],
        DoB: null,
        Location: null,
        CandtypeId: null,
        candidateAge: null,
        testDate: "",
        testScore: null,
        interviewScore: null,
        candidateId: null,
        intType: "",
        nameerr: "",
        typeerr: "",
        doberr: "",
        ageerr: "",
        adderr: "",
        caniderr: "",
        testscoreerr: "",
        intscoreerr: "",
        dateerr: "",
        statuserr: "",
    }
    interviewModal = () => {
        this.setState({
            view: true
        })
    }


    getResumeDetails = () => {
        fetch(apiurl + '/InterviewTablecandidatename', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json()).then((responseJson) => {
            console.log(responseJson, "response")
            this.setState({
                resumeDetails: responseJson.data,
            })

        }).catch((err) => {
            // 
        })

    }

    getOnlineTestDetails = (data) => {
        axios({
            method: 'POST',
            url: 'http://54.198.55.249:8159/api/v1/getscoredetails',
            data: {
                ResId: data
            }
        }).then((response) => {
            console.log(response.data.data[0].Test_Date, 'asdfasdfas')
            if (response.data.data.length > 0) {
                if (response.data.data[0].Test_Date !== null) {
                    this.state.testDate = response.data.data[0].Test_Date
                    // this.state.testDate = dateFormat(response.data.data[0].Test_Date, 'dd-mm-yyyy')
                    this.state.testScore = Number(response.data.data[0].Score_Percentage.split("%")[0])
                    this.setState({})
                }
            }
        }).catch((error) => {
            console.log(error)
        })
    }




    getDesignation = () => {
        fetch(apiurl + '/listofdesignations', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json()).then((responseJson) => {
            console.log(responseJson, "response")
            this.setState({
                designationList: responseJson.data,
                // designationID: responseJson.data.DesigId
            })

        }).catch((err) => {
            // 
        })

    }


    getCandidateNames = () => {
        let candidateNames = [];
        for (let i = 0; i < this.state.resumeDetails.length; i++) {
            candidateNames.push(<Option key={i + 1} value={this.state.resumeDetails[i].resumeId}>
                {this.state.resumeDetails[i].FirstName}</Option>)
        }

        return candidateNames;
    }

    getDesignationList = () => {
        let deisgnationNames = [];
        for (let i = 0; i < this.state.designationList.length; i++) {
            deisgnationNames.push(<Option key={i + 1} value={this.state.designationList[i].DesigId}>
                {this.state.designationList[i].DesigName}</Option>)
        }

        return deisgnationNames;
    }





    componentWillMount() {
        this.getResumeDetails();
        this.getDesignation();
    }



    changeDynamic = (data) => {
        this.getOnlineTestDetails(data)
        var resId = {
            "resId": data
        }


        this.setState({
            candidateId: data,
            resumeID: data,
        })

        fetch(apiurl + '/resumedetails', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(resId)
        }).then((response) => response.json()).then((responseJson) => {

            responseJson.data.map((val) => {
                return (
                    this.setState({
                        DoB: val.DoB,
                        Location: val.Location,
                        CandtypeId: val.ResId
                    }, () => this.calcualteAge(this.state.DoB))
                )
            })

        }).catch((err) => {
            //   
        })

    }


    calcualteAge = () => {
        var year = this.state.DoB && this.state.DoB.split('-');
        var current_year = new Date().getFullYear()
        var candidateAge = current_year - year[0];

        console.log("sdfjsdhfjsdhfjsdf", this.state.candidateAge)

        this.setState({
            candidateAge
        }, () => this.setState({ doberr: "", ageerr: "", adderr: "", caniderr: "" }))

    }



    storeTestDate = (data) => {
        // let testDate = data._d;


        // var convertedTestDate = testDate.getFullYear() + '-' + (testDate.getMonth() + 1) + '-' + testDate.getDate();

        console.log("sdkfhdsjfhsdfhsdf", data)

        this.setState({
            testDate: data
        }, () => this.setState({ dateerr: "" }))
    }


    handleChange = (e, key) => {
        if (key === 'remarks') {
            this.setState({
                intRemarks: e.target.value
            })
        }
        if (key === 'designation') {
            this.setState({
                designationID: e
            }, () => this.setState({ designationError: "" }))
        }

        if (key === "testScore") {
            this.setState({
                testScore: e.target.value
            }, () => this.setState({ testscoreerr: "" }))
        }

        if (key === "interviewScore") {

            this.setState({
                interviewScore: e.target.value
            }, () => this.setState({ intscoreerr: "" }))
        }

        if (key === 'type') {
            this.setState({
                intType: e.target.value
            }, () => this.setState({ typeerr: "" }))
        }
    }


    cancel = () => {
        this.state.testDate = "";
        this.state.testScore = "";
        this.state.intType = "";
        this.state.interviewScore = "";
        this.state.Location = "";
        this.state.candidateAge = "";
        this.state.candidateDetails = "";
        this.state.DoB = "";
        this.state.CandtypeId = "";
        this.state.resumeID = ""
        this.state.designationID = "";

        this.setState({})

    }


    validataion = () => {
        let nameerr = "";
        let typeerr = "";
        let doberr = "";
        let ageerr = "";
        let adderr = "";
        let caniderr = "";
        let testscoreerr = "";
        let intscoreerr = "";
        let dateerr = "";
        let statuserr = "";
        let designationError = "";


        if (this.state.candidateId === null) {
            nameerr = "Field Required"
        }
        if (this.state.designationID === null) {
            designationError = 'Field Required'
        }
        if (this.state.intType === "") {
            typeerr = "Field Required"
        }
        if (this.state.DoB === null) {
            doberr = "Field Required"
        }
        if (this.state.candidateAge === null) {
            ageerr = "Field Required"
        }
        if (this.state.Location === null) {
            adderr = "Field Required"
        }
        if (this.state.candidateId === null) {
            caniderr = "Field Required"
        }
        //    if(this.state.testScore === null){
        //          testscoreerr = "Field Required"
        //     }

        if (this.state.interviewScore === null) {
            intscoreerr = "Field Required"
        }

        //    if(this.state.testDate === ""){
        //        dateerr = "Field Required"
        //    }
        if (this.state.status === "") {
            statuserr = "Field Required"
        }


        if (nameerr || designationError || typeerr || doberr || ageerr || adderr || caniderr || testscoreerr || intscoreerr || dateerr || statuserr) {
            this.setState({
                nameerr,
                designationError,
                typeerr,
                doberr,
                ageerr,
                adderr,
                caniderr,
                testscoreerr,
                intscoreerr,
                dateerr,
                statuserr
            })
            return false
        }

        return true
    }

    storeData = () => {
        var current = new Date();

        var current_data = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();


        const isValid = this.validataion()


        if (isValid) {

            var interviewDetails = {
                "nameofcandidate": this.state.candidateId,
                "Interviewtype": this.state.intType,
                "dob": this.state.DoB,
                "age": this.state.candidateAge,
                "address": this.state.Location,
                "CandidateId": this.state.candidateId,
                "DesigId": this.state.designationID,
                "dateoftest": this.state.testDate,
                "score": this.state.testScore,
                "Interview": [{
                    "interviewquestions": "How Would you decide on your objective"
                },
                {
                    "interviewquestions": "How long were you at your last job"
                },
                {
                    "interviewquestions": "What Contribution do you make to a team"
                }],


                "Interviewerscore": this.state.interviewScore,
                "Intby": "1",
                "Inton": current_data,
                "Intremarks": this.state.intRemarks,
                "ResId": this.state.resumeID,
                "status": this.state.status
            }


            fetch(apiurl + '/masinterview', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(interviewDetails)
            }).then((response) => response.json()).then((responseJson) => {

                notification.warning({
                    message: `Successfully Posted`,
                    duration: 3.5,
                    placement: "topRight",
                });
                this.state.testScore = "";
                this.state.interviewScore = "";
                this.state.Location = "";
                this.state.candidateAge = "";
                this.state.candidateDetails = "";
                this.state.DoB = "";
                this.state.CandtypeId = "";
                this.state.resumeID = "";
                this.state.designationID = null;
                this.setState({
                    status: "",
                    intType: "",
                    testDate: ""
                })



            })
        }
    }

    generateAlert = (description) => {
        notification.success({
            message: "Success",
            description,
            onClick: () => {
                console.log("Notification Clicked!");
            },
        });
    };
    alertGenerate = (description) => {
        notification.warning({
            message: "Failed",
            description,
            onClick: () => {
                console.log("Notification Clicked!");
            },
        });
    };

    resulting = (data) => {
        if (data == "S") {
            this.generateAlert("Candidate Selected")
            this.setState({
                status: data,
                statuserr: false
            })
        }
        if (data == "R") {
            this.alertGenerate("Candidate Rejected")
            this.setState({

                status: data,
                statuserr: false
            })
        }

        if (data == "P") {
            this.generateAlert("Status Pending")
            this.setState({
                status: data,
                statuserr: false
            })
        }
        if (data == "N") {
            this.alertGenerate("Candidate Not Reported")
            this.setState({
                status: data,
                statuserr: false
            })
        }
    }


    render() {
        return (
            <div className="card top_move">
                <div className="card-body">
                    <div className="interviewtable">
                        <table className="w-100 ">
                            <tr className="interviewtable">
                                <th>Name of Candidate</th>
                                <th>Designation</th>
                                <th>Interview Round</th>
                                <th>Date of Birth</th>
                                <th>Age</th>
                            </tr>
                            <tr className="interviewtable">
                                <td className="candidate_width">
                                    <Select
                                        className={`${this.state.caniderr && 'interviewtableSelect'}`}
                                        style={{ width: '90%' }} value={this.state.resumeID}
                                        showSearch
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        onChange={(e) => this.changeDynamic(e)}>{this.getCandidateNames()}
                                    </Select>
                                </td>
                                <td className="candidate_width">
                                    <Select
                                        className={`${this.state.designationError && 'interviewtableSelect'}`}
                                        style={{ width: '90%' }}
                                        value={this.state.designationID}
                                        onChange={(e) => this.handleChange(e, 'designation')}
                                        showSearch
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {this.getDesignationList()}
                                    </Select>

                                </td>

                                <td className="interview_td"> <input type="text" value={this.state.intType} className={`${this.state.typeerr ? "table__input--err" : "table__input"}`} onChange={(e) => this.handleChange(e, 'type')} />  </td>

                                <td className="interview_td"> <input type="text" value={this.state.DoB} className={`${this.state.doberr ? "table__input--err" : "table__input"}`} /> </td>

                                <td className="interview_td"> <input type="text" value={this.state.candidateAge} className={`${this.state.ageerr ? "table__input--err" : "table__input"}`} /> </td>
                            </tr>
                        </table>
                        <table className="w-100 mt-2 interviewtable">
                            <tr className="interviewtable">
                                <th>Address</th>
                                <th className="testdetail_rm_bottom_width">Online Test Details</th>
                            </tr>
                            <tr className="interviewtable">
                                <td className="candidate_width"> <input type="text" value={this.state.Location} className={`${this.state.adderr ? "table__input--err" : "table__input"}`} /> </td>

                                <tr className="interviewtable">
                                    <th className="border_left">Candidate ID</th>
                                    <th>Date of Test</th>
                                    <th className="border_right">Score %</th>
                                </tr>
                                <tr className="testdetail_rm_width interviewtable">

                                    <td className="testdetail_width testdetail_rm_width">
                                        <input type="number" value={this.state.CandtypeId} className={`${this.state.caniderr ? "table__input--err" : "table__input"}`} /></td>

                                    <td className="testdetail_width testdetail_rm_bottom_width">
                                        <DatePickerMui value={this.state.testDate} disableFuture changeData={(data) => { this.storeTestDate(data) }} />
                                        <div>{this.state.dateerr &&
                                            <span style={{ color: "red", fontSize: "12px" }}>Field Required
                            </span>
                                        }
                                        </div>
                                        {/* <DatePickerMui
                          label={"Interim Date"}
                        className={"w-100"}

                        value={
                          this.state.interim[index].Interimdate 
                        }
                        // changeData={(data) => this.simple(data, index)}
                        changeData={(data) =>
                          this.simple(data, index)
                        }
                        /> */}
                                    </td>

                                    <td className="testdetail_width testdetail_rm_width"><input type="number" className={`${this.state.testscoreerr ? "table__input--err" : "table__input"}`} value={this.state.testScore}
                                        onChange={(e) => this.handleChange(e, 'testScore')}
                                        minlength="3" maxlength="4" /></td>
                                </tr>
                            </tr>
                        </table>
                    </div>

                    <div>
                        <div className='d-flex'>
                            <h3 className="prev_title">Previous Interviewer Details</h3>
                            <h3 className="prev_title" style={{paddingLeft:'22rem'}}>Current Interviewer Details</h3>
                        </div>
                        <Grid container spacing={3} className="mt-1">
                            <Grid item md={6} sm={12} className="w-100">
                                <table className="w-100 ">
                                    <tr className="interviewtable">
                                        <th>Name & Designation</th>
                                        <th>Date & Time</th>
                                        <th>Score%</th>
                                    </tr>
                                    <tr className="interviewtable">
                                        <td className=""></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr className="interviewtable">
                                        <td className=""></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </table>
                            </Grid>

                            <Grid item md={6} sm={12} className="w-100">
                                <table className="w-100 ">
                                    <tr className="interviewtable">
                                        <th>Interview Questions <IoMdEye className="interview_eye" onClick={this.interviewModal} /></th>
                                        <th>Score%</th>
                                    </tr>
                                    <tr className="interviewtable">
                                        <td className="">
                                            <input type="text"
                                                className={"table__input"}
                                                placeholder={'Remarks'}
                                                value={this.state.intRemarks}
                                                onChange={(e) => this.handleChange(e, 'remarks')}
                                            />
                                        </td>
                                        <td><input type="number" className={`${this.state.intscoreerr ? "table__input--err" : "table__input"}`} value={this.state.interviewScore} onChange={(e) => this.handleChange(e, 'interviewScore')} /></td>
                                    </tr>
                                </table>
                            </Grid>


                            <div className={`${this.state.statuserr ? "status__input--err" : "status__input"}`}>
                                <button
                                    className={`${this.state.status === "S" ? "btn btn-sm btn-success" : "btn btn-sm btn-outline-success"}`} onClick={(e) => this.resulting("S")}
                                    disabled={this.state.resumeID === null && true}
                                >
                                    Selected
                                </button>
                                <button
                                    className={`${this.state.status === "R" ? "btn btn-sm btn-danger" : "btn btn-sm btn-outline-danger"}`}
                                    onClick={(e) => this.resulting("R")}
                                    disabled={this.state.resumeID === null && true}

                                >
                                    Rejected
                                </button>
                                <button
                                    className={`${this.state.status === "P" ? "btn btn-sm btn-warning" : "btn btn-sm btn-outline-warning"}`} onClick={(e) => this.resulting("P")}
                                    disabled={this.state.resumeID === null && true}

                                >
                                    Pending
                                </button>
                                <button
                                    className={`${this.state.status === "N" ? "btn btn-sm btn-dark" : "btn btn-sm btn-outline-dark"}`}
                                    onClick={(e) => this.resulting("N")}
                                    disabled={this.state.resumeID === null && true}
                                >
                                    Not Reported
                                </button>
                            </div>

                            <Grid container
                                direction="row"
                                justify="center"
                                alignItems="center"
                                className="mb-3"
                                spacing={3}>
                                <Grid item>
                                    <Button size="lg" className="btnmargin btnwidth btnclr" onClick={this.storeData}>Save</Button>
                                </Grid>
                                <Grid item >
                                    <Button className="btnwidth btnclr_outline" onClick={this.cancel}>Cancel</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                    {this.state.view === true ? <NewInterviewModal /> : null}
                </div>
            </div>
        )
    }
}

export default NewInterviewtable;