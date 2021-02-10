import React from 'react';
import { Grid } from '@material-ui/core';
import Calenderbox from '../../../formcomponent/calenderbox';
import Inputantd from '../../../formcomponent/inputantd';
import './employeemaster.css';
import { Button } from 'react-bootstrap';
import ValidationLibrary from "../../../validationlibrary/validation";
import { createEmployee } from './employeeMasterAction';
import DatePickerMui from '../../../formcomponent/DatePickerMUI';
import moment from 'moment';
import { connect } from 'react-redux';
import Dropdownantd from '../../../formcomponent/dropdownantd'
import { getDepartment } from '../../../fixers/fixersAction';
import { getDesignations } from '../create_resume/action/CreateResumeAction';
class OfficialDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errordummy: true,
            empOfficial_data:
            {
                'empdoJ':
                {
                    'value': '',
                    validation: [{ 'name': 'required' }],
                    error: null,
                    errmsg: null
                },
                'empdepartment':
                {
                    'value': '',
                    validation: [{ 'name': 'required' }],
                    error: null,
                    errmsg: null
                },
                'empdesignation':
                {
                    'value': '',
                    validation: [{ 'name': 'required' }],
                    error: null,
                    errmsg: null
                },
                'empbankname':
                {
                    'value': '',
                    validation: [{ 'name': 'required' },{'name':'alphabetsOnly'}],
                    error: null,
                    errmsg: null
                },
                'empbranchname':
                {
                    'value': '',
                    validation: [{ 'name': 'required' },{'name':'alphabetsOnly'}],
                    error: null,
                    errmsg: null
                },
                'empaccountnumber':
                {
                    'value': '',
                    validation: [{ 'name': 'required' },{"name":"allowNumaricOnly"},{"name":"custommaxLength","params":"15"}],
                    error: null,
                    errmsg: null
                },
                'empIFSCCode':
                {
                    'value':'',
                    validation:[{'name':'required'},{"name":"custommaxLength","params":"11"}],
                    error:null,
                    errmsg:null
                },
                'empofficialemail':
                {
                    'value': '',
                    validation: [{ 'name': 'required' },{"name":"email"}],
                    error: null,
                    errmsg: null
                },
                'empofficialmobile':
                {
                    'value': '',
                    validation: [{ 'name': 'required' },{"name":"mobile"}],
                    error: null,
                    errmsg: null
                },
                'empSecondaryContact':
                {
                    'value': '',
                    validation: [{ 'name': 'required' },{"name":"mobile"}],
                    error: null,
                    errmsg: null
                },
            },
        };
    }

    componentDidMount(){
        this.props.dispatch(getDepartment());
        this.props.dispatch(getDesignations());
    }



    checkValidation = () => {
        var mainvalue = {}
        var empOfficial_data = this.state.empOfficial_data;
        var targetkeys = Object.keys(empOfficial_data);
        console.log(targetkeys, "targetkeys");
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(empOfficial_data[targetkeys[i]].value, empOfficial_data[targetkeys[i]].validation);
            console.log(errorcheck, "errorcheck");
            empOfficial_data[targetkeys[i]].error = !errorcheck.state;
            empOfficial_data[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = empOfficial_data[targetkeys[i]].value
        }
        var filtererr = targetkeys.filter((obj) =>
            empOfficial_data[obj].error == true);
        console.log(filtererr.length)
        if (filtererr.length > 0) {
            this.setState({ error: true })
            console.log(filtererr,"adfsf")
        } else {
            this.setState({ error: false })

        }
        this.setState({
            mainvalue,
            empOfficial_data
        })

        if(filtererr.length === 0){
            this.employeeDataApi()
        }
    }

    changeDynamic = (data, key) => {
        console.log("key", key);
        console.log("data", data);
        var empOfficial_data = this.state.empOfficial_data;
        var targetkeys = Object.keys(empOfficial_data);

        var errorcheck = ValidationLibrary.checkValidation(data, empOfficial_data[key].validation);
        empOfficial_data[key].value = data;
        empOfficial_data[key].error = !errorcheck.state;
        empOfficial_data[key].errmsg = errorcheck.msg;
        this.setState({ empOfficial_data });
        var filtererr = targetkeys.filter((obj) =>
            empOfficial_data[obj].error == true || empOfficial_data[obj].error == null);
        if (filtererr.length > 0) {
            this.setState({
                error: true,
                errordummy: false
            })
        } else {
            this.setState({ error: false })
        }
    }

    employeeDataApi = () => {
        var empOfficialDataKeys = Object.keys(this.state.empOfficial_data);
        const { personalDetails } = this.props;
        var empOfficialApiDatas={
            resId:personalDetails[0].ResId,
            empfirstname:personalDetails[0].FirstName,
            emplastname:personalDetails[0].LastName,
            empdob:personalDetails[0].DoB,
            empage:moment().diff(personalDetails[0].DoB, 'years',false),
            empgender:personalDetails[0].Gender === 1 ? 'Male' : 'Female',
            empfathername:personalDetails[0].FatherName,
            empmobile:personalDetails[0].PhoneNumber,
            empQualification:"MCA",
            emppersemail:personalDetails[0].EmailId,
            empcurrentaddress:personalDetails[0].CurrentAddress,
            emppermanenetaddress:personalDetails[0].PermanentAddress,
            emplocation:personalDetails[0].Location,
            empreferredby:personalDetails[0].ReferredBy

        };
        for(var i in empOfficialDataKeys){
            empOfficialApiDatas[empOfficialDataKeys[i]]=this.state.empOfficial_data[empOfficialDataKeys[i]].value
        }
        this.props.dispatch(createEmployee(empOfficialApiDatas))
        this.clearForm()
    }

    clearForm = () => {
        var stateKeys=Object.keys(this.state.empOfficial_data);
        for(var i in stateKeys){
            this.state.empOfficial_data[stateKeys[i]].value=""
        }
    }


    render() {
        return (
            <React.Fragment>
                <div className="card top_move">
                    <div className="card-body">
                        <Grid container>
                            <Grid item md={3} sm={5}>
                                <DatePickerMui label="DOJ" className="w-100"
                                    changeData={(data) => this.changeDynamic(data, 'empdoJ')}
                                    value={this.state.empOfficial_data.empdoJ.value}
                                    error={this.state.empOfficial_data.empdoJ.error}
                                    errmsg={this.state.empOfficial_data.empdoJ.errmsg} />
                            </Grid>
                            <Grid item md={1} sm={1} />
                            <Grid item md={3} sm={5}>
                                <Dropdownantd
                                    label="Department"
                                    className="w-100"
                                    option={this.props.department && this.props.department.map(val => val.DeptName)}
                                    changeData={(data) => this.changeDynamic(data, 'empdepartment')}
                                    value={this.state.empOfficial_data.empdepartment.value}
                                    error={this.state.empOfficial_data.empdepartment.error}
                                    errmsg={this.state.empOfficial_data.empdepartment.errmsg}
                                />
                            </Grid>
                            <Grid item md={1} sm={1} />
                            <Grid item md={3} sm={5}>
                                <Dropdownantd
                                    label="Designation"
                                    className="w-100"
                                    option={this.props.designations && this.props.designations.map((val) => val.DesigName)}
                                    changeData={(data) => this.changeDynamic(data, 'empdesignation')}
                                    value={this.state.empOfficial_data.empdesignation.value}
                                    error={this.state.empOfficial_data.empdesignation.error}
                                    errmsg={this.state.empOfficial_data.empdesignation.errmsg}
                                />
                            </Grid>
                            
                            <Grid item md={3} sm={5}>
                                <Inputantd
                                    label="Official Email ID"
                                    className="w-100"
                                    changeData={(data) => this.changeDynamic(data, 'empofficialemail')}
                                    value={this.state.empOfficial_data.empofficialemail.value}
                                    error={this.state.empOfficial_data.empofficialemail.error}
                                    errmsg={this.state.empOfficial_data.empofficialemail.errmsg}
                                />
                            </Grid>
                            <Grid item md={1} sm={1} />
                            <Grid item md={3} sm={5}>
                                <Inputantd
                                    label="Official Mobile Number"
                                    className="w-100"
                                    changeData={(data) => this.changeDynamic(data, 'empofficialmobile')}
                                    value={this.state.empOfficial_data.empofficialmobile.value}
                                    error={this.state.empOfficial_data.empofficialmobile.error}
                                    errmsg={this.state.empOfficial_data.empofficialmobile.errmsg}
                                />
                            </Grid>
                            <Grid item md={1} sm={1} />
                            <Grid item md={3} sm={5}>
                                <Inputantd
                                    label="Secondary Contact"
                                    className="w-100"
                                    changeData={(data) => this.changeDynamic(data, 'empSecondaryContact')}
                                    value={this.state.empOfficial_data.empSecondaryContact.value}
                                    error={this.state.empOfficial_data.empSecondaryContact.error}
                                    errmsg={this.state.empOfficial_data.empSecondaryContact.errmsg}
                                />
                            </Grid>
                            <Grid item md={12} sm={12}>
                                <div className="text-primary">Bank Details</div>
                            </Grid>

                            <div className="empPersonal_card">
                                <Grid container>
                                    <Grid item md={3} sm={5}>
                                        <Inputantd
                                            label="Bank Name"
                                            className="w-100"
                                            changeData={(data) => this.changeDynamic(data, 'empbankname')}
                                            value={this.state.empOfficial_data.empbankname.value}
                                            error={this.state.empOfficial_data.empbankname.error}
                                            errmsg={this.state.empOfficial_data.empbankname.errmsg}
                                        />
                                    </Grid>
                                    <Grid item md={1} sm={1} />
                                    <Grid item md={3} sm={5}>
                                        <Inputantd
                                            label="Branch Name"
                                            className="w-100"
                                            changeData={(data) => this.changeDynamic(data, 'empbranchname')}
                                            value={this.state.empOfficial_data.empbranchname.value}
                                            error={this.state.empOfficial_data.empbranchname.error}
                                            errmsg={this.state.empOfficial_data.empbranchname.errmsg}
                                        />
                                    </Grid>
                                    <Grid item md={1} sm={1} />
                                    <Grid item md={3} sm={5}>
                                        <Inputantd
                                            label="Account Number"
                                            className="w-100"
                                            changeData={(data) => this.changeDynamic(data, 'empaccountnumber')}
                                            value={this.state.empOfficial_data.empaccountnumber.value}
                                            error={this.state.empOfficial_data.empaccountnumber.error}
                                            errmsg={this.state.empOfficial_data.empaccountnumber.errmsg}
                                        />
                                    </Grid>
                                    <Grid item md={1} sm={1} />
                                    <Grid item md={3} sm={5}>
                                        <Inputantd
                                            label="IFSC Code"
                                            className="w-100"
                                            changeData={(data) => this.changeDynamic(data, 'empIFSCCode')}
                                            value={this.state.empOfficial_data.empIFSCCode.value}
                                            error={this.state.empOfficial_data.empIFSCCode.error}
                                            errmsg={this.state.empOfficial_data.empIFSCCode.errmsg}
                                        />
                                    </Grid>
                                    <Grid item md={1} sm={1} />
                                </Grid>
                            </div>
                        </Grid>
                        <Grid container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            className="mt-3"
                            spacing={3}>
                            <Grid item >
                                <Button className="btnwidth btnclr"
                                    onClick={() => this.props.propFunc(0)}
                                >Prev</Button>
                            </Grid>
                            <Grid item >
                                <Button className="btnwidth btnclr" onClick={() => this.checkValidation()}>Save</Button>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    personalDetails:state.resumeReducer.resume,
    department:state.fixers.department,
    designations:state.resumeReducer.designations,
    employeeId:state.employeeMasterReducer.employeeId
})

export default connect(mapStateToProps)(OfficialDetails);