import React from 'react';
import Inputnumberantd from '../../../formcomponent/inputnumberantd';
import Calenderbox from '../../../formcomponent/calenderbox';
import Dropdownantd from '../../../formcomponent/dropdownantd';
import { Grid } from '@material-ui/core';
import Button from 'react-bootstrap/Button';
import './createEmployee.css'
import Inputantd from '../../../formcomponent/inputantd';
import ValidationLibrary from '../../../validationlibrary/validation.js';
import { addEmployee } from './action';


class AddEmployee extends React.Component {
    state = {
        addEmployee: {
            'empname': {
                'value': '',
                validation: [{ name: 'required' }],
                error: "",
                errmsg: null
            },
            'empDoJ': {
                'value': '',
                validation: [{ name: 'required' }],
                error: null,
                errmsg: null
            },
            'emproleId': {
                'value': '',
                validation: [{ name: 'required' }],
                error: null,
                errmsg: null
            },
            // 'employeeId': {
            //     'value': '',
            //     validation: [{ name: 'required' }],
            //     error: null,
            //     errmsg: null
            // },
            'empfirstname': {
                'value': '',
                validation: [{ name: '' }],
                error: null,
                errmsg: null
            },
            'emplastname': {
                'value': '',
                validation: [{ name: 'required' }],
                error: null,
                errmsg: null
            },
            'empDOB': {
                'value': '',
                validation: [{ name: '' }],
                error: null,
                errmsg: null
            },
            // 'educationLevel': {
            //     'value': '',
            //     validation: [{ name: '' }],
            //     error: null,
            //     errmsg: null
            // },
            'emppersemail': {
                'value': '',
                validation: [{ name: 'email' }],
                error: '',
                errmsg: null
            },
            'empmobile': {
                'value': '',
                validation: [{ 'name': 'mobile' }],
                error: null,
                errmsg: null
            },
            // 'secondaryContact': {
            //     'value': '',
            //     validation: [{ name: '' }],
            //     error: null,
            //     errmsg: null
            // },
            // 'designation': {
            //     'value': '',
            //     validation: [{ name: '' }],
            //     error: null,
            //     errmsg: null
            // },
            'deptId': {
                'value': '',
                validation: [{ name: '' }],
                error: null,
                errmsg: null
            },
            'empbankname': {
                'value': '',
                validation: [{ name: '' }],
                error: null,
                errmsg: null
            },
            'empbranchname': {
                'value': '',
                validation: [{ name: '' }],
                error: null,
                errmsg: null
            },
            'empaccountnumber': {
                'value': '',
                validation: [{ name: '' }],
                error: null,
                errmsg: null
            },
            // 'employeeStatus': {
            //     'value': '',
            //     validation: [{ name: '' }],
            //     error: null,
            //     errmsg: null
            // },
            // 'officialMobileNumber': {
            //     'value': '',
            //     validation: [{ name: 'mobile' }],
            //     error: null,
            //     errmsg: null
            // },
            'empofficialemail': {
                'value': '',
                validation: [{ name: 'email' }],
                error: null,
                errmsg: null
            }

        }
    }


    changeDynamic = (data, key) => {
        // alert(data)
        console.log("key", key);
        console.log("data", data);
        var addEmployee = this.state.addEmployee;
        var targetkeys = Object.keys(addEmployee);

        var errorcheck = ValidationLibrary.checkValidation(data, addEmployee[key].validation);
        addEmployee[key].value = data;
        addEmployee[key].error = !errorcheck.state;
        addEmployee[key].errmsg = errorcheck.msg;
        this.setState({ addEmployee });
        var filtererr = targetkeys.filter((obj) =>
            addEmployee[obj].error == true || addEmployee[obj].error == null);
        if (filtererr.length > 0) {
            // this.props.changesetdata(data, key, true, addEmployee[key].errmsg)
            this.setState({ error: true })
        } else {
            this.setState({ error: false })
        }
        
    }


    callroot = () => {
        var addEmployee = this.state.addEmployee;
        var targetkeys = Object.keys(addEmployee);
        console.log(targetkeys);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(addEmployee[targetkeys[i]].value, addEmployee[targetkeys[i]].validation);
            console.log(errorcheck);
            addEmployee[targetkeys[i]].error = !errorcheck.state;
            addEmployee[targetkeys[i]].errmsg = errorcheck.msg;
        }
        var filtererr = targetkeys.filter((obj) =>
            addEmployee[obj].error == true);
        console.log(filtererr.length)
        if (filtererr.length > 0) {
            this.setState({ error: true })
        } else {
            this.setState({ error: false })

        }
        this.setState({ addEmployee })

        let changenext = []
        let j = 0
        for (j = 0; j < targetkeys.length; j++) {
            changenext.push(this.state.addEmployee[targetkeys[j]].error)
        }

        let nextvalue = changenext.every((val) => val === false)

        if (nextvalue === true) {
            // this.checkupdate();
            // this.props.propFunc && this.props.propFunc(2)
        }
        if (filtererr.length === 0) {
            //   this.checkupdate();
              this.addEmployeeApi();
        }
    }


    addEmployeeApi = () => {
        var keys=Object.keys(this.state.addEmployee)
        var data={}
        for(var i in keys){
            data[keys[i]]=this.state.addEmployee[keys[i]].value
        }
        // alert(JSON.stringify(data))
        this.props.dispatch(addEmployee(data))
        for(var i in keys){
            this.state.addEmployee[keys[i]].value=''
        }
    }



    render() {
        const { department } = this.props;
        return (
            <div className="card top_move">
                <div className="card-body">
                    <Grid container spacing={2}>
                        <Grid item md={3} sm={5}>
                            <Inputantd
                                label="Employee Name"
                                className="w-100"
                                changeData={(data) => this.changeDynamic(data, 'empname')}
                                value={this.state.addEmployee.empname.value}
                                error={this.state.addEmployee.empname.error}
                                errmsg={this.state.addEmployee.empname.errmsg}
                                required
                            />
                        </Grid>
                        <Grid item md={1} />
                        <Grid item md={3} sm={5}>
                            <Calenderbox placeholder={"dd/mm/yyyy"}
                                label="Date of Joining"
                                className="w-100"
                                changeData={(data) => this.changeDynamic(data, 'empDoJ')}
                                value={this.state.addEmployee.empDoJ.value}
                                error={this.state.addEmployee.empDoJ.error}
                                errmsg={this.state.addEmployee.empDoJ.errmsg}
                                required
                            />
                        </Grid>
                        <Grid item md={1} />
                        <Grid item md={3} sm={5}>
                            <Inputantd
                                label="Employee Role"
                                className="w-100"
                                changeData={(data) => this.changeDynamic(data, 'emproleId')}
                                value={this.state.addEmployee.emproleId.value}
                                error={this.state.addEmployee.emproleId.error}
                                errmsg={this.state.addEmployee.emproleId.errmsg}
                                required
                            />
                        </Grid>
                        <Grid item md={1} />
                        <Grid item md={3} sm={5}>
                            <Inputnumberantd
                                label="Employee Id"
                                className="w-100"
                                // changeData={(data) => this.changeDynamic(data, 'employeeId')}
                                // value={this.state.addEmployee.employeeId.value}
                                // error={this.state.addEmployee.employeeId.error}
                                // errmsg={this.state.addEmployee.employeeId.errmsg}
                                // required
                            />
                        </Grid>
                        <Grid item md={3} />
                        <Grid item md={10} sm={11}>
                            <label className="labelmodify">Personal Details:</label>
                        </Grid>
                        <Grid item md={1} />
                        <Grid item md={3} sm={5}>
                            <Inputantd
                                label="First Name"
                                className="w-100"
                                changeData={(data) => this.changeDynamic(data, 'empfirstname')}
                                value={this.state.addEmployee.empfirstname.value}
                                error={this.state.addEmployee.empfirstname.error}
                                errmsg={this.state.addEmployee.empfirstname.errmsg}
                                required
                            />
                        </Grid>
                        <Grid item md={1} />
                        <Grid item md={3} sm={5}>
                            <Inputantd
                                label="Last Name"
                                className="w-100"
                                changeData={(data) => this.changeDynamic(data, 'emplastname')}
                                value={this.state.addEmployee.emplastname.value}
                                error={this.state.addEmployee.emplastname.error}
                                errmsg={this.state.addEmployee.emplastname.errmsg}
                                required
                            />
                        </Grid>
                        <Grid item md={1} />
                        <Grid item md={3} sm={5}>
                            <Calenderbox placeholder={"dd/mm/yyyy"}
                                label="Date of Birth"
                                className="w-100"
                                changeData={(data) => this.changeDynamic(data, 'empDOB')}
                                value={this.state.addEmployee.empDOB.value}
                                error={this.state.addEmployee.empDOB.error}
                                errmsg={this.state.addEmployee.empDOB.errmsg}
                            />
                        </Grid>
                        <Grid item md={1} />
                        <Grid item md={3} sm={5}>
                            <Inputantd
                                label="Education Level"
                                className="w-100"
                                // changeData={(data) => this.changeDynamic(data, 'educationLevel')}
                                // value={this.state.addEmployee.educationLevel.value}
                                // error={this.state.addEmployee.educationLevel.error}
                                // errmsg={this.state.addEmployee.educationLevel.errmsg}
                            />
                        </Grid>
                        <Grid item md={1} />
                        <Grid item md={3} sm={5}>
                            <Inputantd
                                label="Email"
                                className="w-100"
                                changeData={(data) => this.changeDynamic(data, 'emppersemail')}
                                value={this.state.addEmployee.emppersemail.value}
                                error={this.state.addEmployee.emppersemail.error}
                                errmsg={this.state.addEmployee.emppersemail.errmsg}
                            />
                        </Grid>
                        <Grid item md={1} />
                        <Grid item md={3} sm={5}>
                            <Inputantd
                                label="Mobile Number"
                                className="w-100"
                                changeData={(data) => this.changeDynamic(data, 'empmobile')}
                                value={this.state.addEmployee.empmobile.value}
                                error={this.state.addEmployee.empmobile.error}
                                errmsg={this.state.addEmployee.empmobile.errmsg}
                            />
                        </Grid>
                        <Grid item md={1} />
                        <Grid item md={3} sm={5}>
                            <Inputantd
                                label="Secondary Contact"
                                className="w-100"
                                // changeData={(data) => this.changeDynamic(data, 'secondaryContact')}
                                // value={this.state.addEmployee.secondaryContact.value}
                                // error={this.state.addEmployee.secondaryContact.error}
                                // errmsg={this.state.addEmployee.secondaryContact.errmsg}
                            />
                        </Grid>
                        <Grid item md={1} />
                        <Grid item md={3} sm={5}>
                            <Dropdownantd
                                label="Designation"
                                className="w-100"
                                // option={["check", "checkData"]}
                                // changeData={(data) => this.changeDynamic(data, 'designation')}
                                // value={this.state.addEmployee.designation.value}
                                // error={this.state.addEmployee.designation.error}
                                // errmsg={this.state.addEmployee.designation.errmsg}
                            />
                        </Grid>
                        <Grid item md={1} />
                        <Grid item md={3} sm={5}>
                            <Dropdownantd
                                label="Department"
                                className="w-100"
                                option={department && department.map(val => val.DeptName)}
                                changeData={(data) => this.changeDynamic(data, 'deptId')}
                                value={this.state.addEmployee.deptId.value}
                                error={this.state.addEmployee.deptId.error}
                                errmsg={this.state.addEmployee.deptId.errmsg}
                            />
                        </Grid>
                        <Grid item md={1} />
                        <Grid item md={10} sm={11}>
                            <label className="labelmodify">Bank Details:</label>
                        </Grid>
                        <Grid item md={1} />
                        <Grid item md={7} sm={5}>
                            <Inputantd
                                label="Bank Name"
                                className="w-100"
                                changeData={(data) => this.changeDynamic(data, 'empbankname')}
                                value={this.state.addEmployee.empbankname.value}
                                error={this.state.addEmployee.empbankname.error}
                                errmsg={this.state.addEmployee.empbankname.errmsg}
                            />
                        </Grid>
                        <Grid item md={1} />
                        <Grid item md={3} sm={5}>
                            <Inputantd
                                label="Branch Name"
                                className="w-100"
                                changeData={(data) => this.changeDynamic(data, 'empbranchname')}
                                value={this.state.addEmployee.empbranchname.value}
                                error={this.state.addEmployee.empbranchname.error}
                                errmsg={this.state.addEmployee.empbranchname.errmsg}
                            />
                        </Grid>
                        <Grid item md={1} />
                        <Grid item md={3} sm={5}>
                            <Inputantd
                                label="Account Number"
                                className="w-100"
                                changeData={(data) => this.changeDynamic(data, 'empaccountnumber')}
                                value={this.state.addEmployee.empaccountnumber.value}
                                error={this.state.addEmployee.empaccountnumber.error}
                                errmsg={this.state.addEmployee.empaccountnumber.errmsg}
                            />
                        </Grid>
                        <Grid item md={1} />
                        <Grid item md={3} sm={5}>
                            <Dropdownantd
                                label="Employee Status"
                                className="w-100"
                                // option={["Activate", "Deactivate"]}
                                // changeData={(data) => this.changeDynamic(data, 'employeeStatus')}
                                // value={this.state.addEmployee.employeeStatus.value}
                                // error={this.state.addEmployee.employeeStatus.error}
                                // errmsg={this.state.addEmployee.employeeStatus.errmsg}
                            />
                        </Grid>
                        <Grid item md={1} />
                        <Grid item md={3} sm={5}>
                            <Inputnumberantd
                                label="Official Mobile Number"
                                className="w-100"
                                labelclass="empwrap"
                                // changeData={(data) => this.changeDynamic(data, 'officialMobileNumber')}
                                // value={this.state.addEmployee.officialMobileNumber.value}
                                // error={this.state.addEmployee.officialMobileNumber.error}
                                // errmsg={this.state.addEmployee.officialMobileNumber.errmsg}
                            />
                        </Grid>
                        <Grid item md={1} />
                        <Grid item md={3} sm={5}>
                            <Inputantd
                                label="Official Mail"
                                className="w-100"
                                changeData={(data) => this.changeDynamic(data, 'empofficialemail')}
                                value={this.state.addEmployee.empofficialemail.value}
                                error={this.state.addEmployee.empofficialemail.error}
                                errmsg={this.state.addEmployee.empofficialemail.errmsg}
                            />
                        </Grid>
                        <Grid container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            className="mt-5"
                            spacing={3}>
                            <Grid item >
                                <Button className="btnwidth btnclr" onClick={this.callroot}>Save</Button>
                            </Grid>
                            <Grid item >
                                <Button className="btnwidth btnclr_outline">Cancel</Button>
                            </Grid>

                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}

export default AddEmployee;