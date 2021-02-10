import React from 'react';
import TextField from '@material-ui/core/TextField';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Grid from "@material-ui/core/Grid";
import { TimePicker } from 'antd';
import moment from 'moment';
import "./Application.css";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Inputantd from '../../../formcomponent/inputantd';
import Dropdownantd from '../../../formcomponent/dropdownantd';
import Calenderbox from '../../../formcomponent/calenderbox';
import Textareaantd from '../../../formcomponent/textareaantd';
import Timepickerantd from '../../../formcomponent/timepickerantd';
import TimePickerMui from '../../../formcomponent/timePickerMui';
import ValidationLibrary from "../../../validationlibrary/validation.js";
import { getEmployees } from '../../../fixers/fixersAction';
import EmployeePayrolllist from '../employeePayroll/EmployeePayrollList';
import { onDuty } from './applyLeaveAction';
import DatePickerMui from '../../../formcomponent/DatePickerMUI';
import dateFormat from 'dateformat';


class OnDuty extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            add: 1,
            count: 1,
            onDuty: [0],
            errordummy: true,
            objectEntries: [],
            FinalData: [],
            myData: {},
            onDutyApi: [],
            dutydata:
            {
                'clientId': {
                    'value': '',
                    validation: [{ 'name': 'required' }],
                    error: null,
                    errmsg: null
                },
                'duration':
                {
                    'value': '',
                    validation: [{ 'name': 'required' }, { name: 'allowNumaricOnly' }, { "name": "custommaxLength", "params": "2" }],
                    error: null,
                    errmsg: null
                },
                'enter_name':
                {
                    'value': '',
                    validation: [{ 'name': 'required' }],
                    error: null,
                    errmsg: null
                },
                'refdate':
                {
                    'value': '',
                    validation: [{ 'name': 'required' }],
                    error: null,
                    errmsg: null
                },
                'startTime':
                {
                    'value': '',
                    validation: [{ 'name': 'required' }],
                    error: null,
                    errmsg: null
                },
                'endTime':
                {
                    'value': '',
                    validation: [{ 'name': 'required' }],
                    error: null,
                    errmsg: null
                },
                'assignment':
                {
                    'value': '',
                    validation: [{ 'name': 'required' }],
                    error: null,
                    errmsg: null
                },

            },
        };
    }


    checkValidation = () => {
        var mainvalue = {}
        var dutydata = this.state.dutydata;
        var dutykeys = Object.keys(dutydata);
        console.log(dutykeys, "dutykeys");
        for (var i in dutykeys) {
            var errorcheck = ValidationLibrary.checkValidation(dutydata[dutykeys[i]].value, dutydata[dutykeys[i]].validation);
            console.log(errorcheck, "errorcheck");
            dutydata[dutykeys[i]].error = !errorcheck.state;
            dutydata[dutykeys[i]].errmsg = errorcheck.msg;
            mainvalue[dutykeys[i]] = dutydata[dutykeys[i]].value
        }
        var filtererr = dutykeys.filter((obj) =>
            dutydata[obj].error == true);
        console.log(filtererr.length)
        if (filtererr.length > 0) {
            this.setState({ error: true })
        } else {
            this.setState({ error: false })
        }
        if (filtererr.length === 0) {
            // alert("Api")
            this.onDutyApi();
        } else {
            // alert("not Ok")
        }
        this.setState({
            mainvalue,
            dutydata
        })

    }


    changeDynamic = (data, key, index) => {
        console.log(data, key, index, 'asdfasdfasdfasdf')
        var dutydata = this.state.dutydata;
        // alert(this.state.FinalData[index][key].value)
        if (index != undefined) {
            this.state.FinalData[index][key].value = data  // Dynamic Final Data

            // if (key.includes('date')) {
            //     this.state.FinalData[index][key].value = dateFormat(data.toString(), 'dd-mm-yyyy');  // Dynamic Final Data
            // } else if (key.includes('Time')) {
            //     this.state.FinalData[index][key].value = dateFormat(data, 'H:MM')  // Dynamic Final Data
            // } else {
            //     this.state.FinalData[index][key].value = data  // Dynamic Final Data
            // }
        }

        console.log(dutydata)

        var dutykeys = Object.keys(dutydata);
        var errorcheck = ValidationLibrary.checkValidation(data, dutydata[key].validation);
        // if (key.includes('date')) {
        //     dutydata[key].value = dateFormat(data.toString(), 'dd-mm-yyyy');
        // } else if (key.includes('Time')) {
        //     dutydata[key].value = dateFormat(data, 'H:MM');
        // }else{
        //     dutydata[key].value = data;
        // }
        
        dutydata[key].value = data;
        dutydata[key].error = !errorcheck.state;
        dutydata[key].errmsg = errorcheck.msg;
        this.setState({ dutydata });
        var filtererr = dutykeys.filter((obj) =>
            dutydata[obj].error == true || dutydata[obj].error == null);
        if (filtererr.length > 0) {
            this.setState({
                error: true,
                errordummy: false
            })
        } else {
            this.setState({ error: false })
        }

    }


    addDuty = () => {

        console.log(this.state.dutydata)
        var add = this.state.add;
        add++;
        this.setState({ add })
        var key = [`refdate${this.state.add}`, `startTime${this.state.add}`, `endTime${this.state.add}`, `assignment${this.state.add}`]
        // var key = [`date${this.state.add}`, `start_time${this.state.add}`, `end_time${this.state.add}`, `end_time${this.state.add}`, `describe_management${this.state.add}`]
        for (var i in key) {
            Object.assign(this.state.myData, { [key[i]]: { value: "", validation: [{ 'name': 'required' }], error: null, errmsg: null } });
            Object.assign(this.state.dutydata, { [key[i]]: { value: "", validation: [{ 'name': 'required' }], error: null, errmsg: null } });
        }
        this.setState({})
        console.log(this.state.myData, "mydata")
        var data = this.state.myData
        this.state.FinalData.push({ ...data })
        this.setState({ myData: {} })
        this.setState({})
        console.log(this.state.FinalData)

        var FinalDataKeys = this.state.FinalData.map(val => Object.keys(val))
        console.log(FinalDataKeys, "FinalDataKeys")
        this.setState({ FinalDataKeys })
    }

    deleteOnDutyCheck = (index) => {
        // alert(index)
        this.setState({})
        var arr = [`${index}`]
        var obj_arr = this.state.dutydata

        var resultObj = {};
        // get all the keys from the object
        var getAllKeys = Object.keys(obj_arr);
        arr.forEach(function (item) {
            // looping through first object 
            getAllKeys.forEach(function (keyName) {
                // using index of to check if the object key name have a matched string
                if (keyName.indexOf(item) !== -1) {
                    resultObj[keyName] = obj_arr[keyName];
                }
            })
        })
        console.log(resultObj)

        var delkey = Object.keys(resultObj)
        for (var i in delkey) {
            delete this.state.dutydata[delkey[i]]
        }
        this.setState({})
    }
    

    deleteOnDuty = (index) => {
        var add = this.state.add;
        add--;
        this.setState({ add })
        var finalkeyVal = this.state.FinalDataKeys.splice(-1, 1)
        var arr = [`${finalkeyVal[0][0].charAt(finalkeyVal[0][0].length - 1)}`]
        // alert(JSON.stringify(arr))
        var obj_arr = this.state.dutydata
        var resultObj = {};
        var getAllKeys = Object.keys(obj_arr);
        arr.forEach(function (item) {
            // looping through first object 
            getAllKeys.forEach(function (keyName) {
                // using index of to check if the object key name have a matched string
                if (keyName.indexOf(item) !== -1) {
                    resultObj[keyName] = obj_arr[keyName];
                }
            })
        })
        console.log(resultObj)

        var delkey = Object.keys(resultObj)
        for (var i in delkey) {
            delete this.state.dutydata[delkey[i]]
        }
        var FinalData = this.state.FinalData.slice(0, -1)
        // alert(JSON.stringify(FinalData))
        this.setState({ FinalData })
        this.setState({})
    }

    onDutyApi = () => {
        // this.state.FinalData.map(val,index => this.state.onDutyApi.push({...val[index].map(valData=> valData.value)}))
        var objFinal = {}
        var myPush = [];
        var myKey;
        var key;
        for (var i in this.state.FinalData) {
            myKey = Object.keys(this.state.FinalData[i])
            console.log(myKey)
            for (var j in myKey) {
                // myCheckKey = myKey[j].substring(0, myKey[j].length - 1)
                // console.log(myKey[j].substring(0, myKey[j].length - 1))
                Object.assign(objFinal, { [myKey[j].substring(0, myKey[j].length - 1)]: this.state.FinalData[i][myKey[j]].value });
            }
            myPush.push(objFinal);
            objFinal = {}
            // alert(i)
        }
        console.log(myPush)
        console.log(objFinal)
        this.setState({})
        var onDutyData = myPush
        var ApiData = {
            leaveId: 2,
            empId: 2,
            reason: 'Exam',
            clientId: this.state.dutydata.clientId.value,
            duration: this.state.dutydata.duration.value,
            onduty: [
                ...onDutyData
            ]
        }

        console.log(this.state.ApiData, "ApiData")
        this.props.dispatch(onDuty(ApiData, () => this.resetFormData()))
    }

    resetFormData = () => {
        this.setState({
            objectEntries: [],
            FinalData: [],
            myData: {},
            onDutyApi: [],
        })
        var dutyDataKeys = Object.keys(this.state.dutydata);
        for (var i in dutyDataKeys) {
            this.state.dutydata[dutyDataKeys[i]].value = ''
        }
        this.setState({})
    }

    render() {
        console.log(this.state, "dutydata")
        const { clients, employeeList } = this.props;
        return (
            <div className="card top_move">
                <div className="card-body">
                    <Grid container spacing={6} className="text-left mt-2">
                        <Grid item md={8} sm={12} className="w-100">
                            <Dropdownantd
                                className={"w-100 mt-4"}
                                label="Client Name"
                                option={clients && clients.map(val => [val.ClientName])}
                                changeData={(data) => this.changeDynamic(data, 'clientId')}
                                value={this.state.dutydata.clientId.value}
                                error={this.state.dutydata.clientId.error}
                                errmsg={this.state.dutydata.clientId.errmsg}
                                required
                            />
                        </Grid>
                        <Grid item md={4} sm={6} className="w-100">
                            <Inputantd
                                label="No.of Days"
                                span="(Duration of Assignment)"
                                className="w-100"
                                changeData={(data) => this.changeDynamic(data, 'duration')}
                                value={this.state.dutydata.duration.value}
                                error={this.state.dutydata.duration.error}
                                errmsg={this.state.dutydata.duration.errmsg}
                                required
                            />
                        </Grid>

                        <Grid item md={12} sm={6} className="w-100 ">
                            <AddCircleOutlineIcon className="add_adjust" onClick={this.addDuty} />
                            <div className="card w-100 ">
                                <div className="card-body">
                                    <div className="flex">
                                        <Grid item md={4
                                        } sm={6} className="w-100">
                                            <Calenderbox className="w-100" label="Date" format={"DD-MM-YYYY"}
                                                changeData={(data) => this.changeDynamic(data, `refdate`)}
                                                value={this.state.dutydata.refdate.value}
                                                error={this.state.dutydata.refdate.error}
                                                errmsg={this.state.dutydata.refdate.errmsg}
                                                required
                                            />
                                        </Grid>
                                        <Grid md={1} />
                                        <Grid item md={4} sm={6} className="w-100">
                                            <TimePickerMui
                                                className="w-100"
                                                label="Start Time"
                                                changeData={(data) => this.changeDynamic(data, `startTime`)}
                                                value={this.state.dutydata.startTime.value}
                                                error={this.state.dutydata.startTime.error}
                                                errmsg={this.state.dutydata.startTime.errmsg}

                                            />
                                            <TimePickerMui className="w-100" label="End Time"
                                                changeData={(data) => this.changeDynamic(data, `endTime`)}
                                                value={this.state.dutydata.endTime.value}
                                                error={this.state.dutydata.endTime.error}
                                                errmsg={this.state.dutydata.endTime.errmsg}
                                            />
                                        </Grid>
                                        {/* <Grid md={1} />
                                        <Grid item md={3} sm={6} className="w-100">
                                        
                                        </Grid> */}
                                        <Grid md={1} />
                                        <Grid item md={4} sm={6} className="w-100">
                                            <Textareaantd
                                                className={"w-100"}
                                                label="Describe the Assignment"
                                                changeData={(data) => this.changeDynamic(data, `assignment`)}
                                                value={this.state.dutydata.assignment.value}
                                                error={this.state.dutydata.assignment.error}
                                                errmsg={this.state.dutydata.assignment.errmsg}
                                                required
                                            />
                                        </Grid>

                                    </div>
                                    {

                                        this.state.FinalData.map((val, index) => {
                                            console.log(val[this.state.FinalDataKeys[index][0]].error)
                                            return (
                                                <div className="flex">
                                                    <Grid item md={3} sm={6} className="w-100">
                                                        <Calenderbox className="w-100" label="Date" format={"DD-MM-YYYY"}
                                                            changeData={(data) => this.changeDynamic(data, this.state.FinalDataKeys[index][0], index)}
                                                            value={val[this.state.FinalDataKeys[index][0]].value}
                                                            error={val[this.state.FinalDataKeys[index][0]].error}
                                                            errmsg={val[this.state.FinalDataKeys[index][0]].error}
                                                            required
                                                        />
                                                    </Grid>
                                                    <Grid md={1} />
                                                    <Grid item md={3} sm={6} className="w-100">
                                                        <Timepickerantd
                                                            className="w-100"
                                                            label="Start Time"
                                                            changeData={(data) => this.changeDynamic(data, this.state.FinalDataKeys[index][1], index)}
                                                            value={val[this.state.FinalDataKeys[index][1]].value}
                                                            error={val[this.state.FinalDataKeys[index][1]].error}
                                                            errmsg={val[this.state.FinalDataKeys[index][1]].error}
                                                        />
                                                    </Grid>
                                                    <Grid md={1} />
                                                    <Grid item md={3} sm={6} className="w-100">
                                                        <Timepickerantd
                                                            className="w-100"
                                                            label="End Time"
                                                            changeData={(data) => this.changeDynamic(data, this.state.FinalDataKeys[index][2], index)}
                                                            value={val[this.state.FinalDataKeys[index][2]].value}
                                                            error={val[this.state.FinalDataKeys[index][2]].error}
                                                            errmsg={val[this.state.FinalDataKeys[index][2]].error}
                                                        />
                                                    </Grid>
                                                    <Grid item md={1} sm={6} className="w-100">
                                                        <button className="btn btn-primary btn-sm dutydelbtn" onClick={() => this.deleteOnDuty(index)}>Delete</button>
                                                    </Grid>


                                                    <Grid md={1} />
                                                    <Grid item md={3} sm={6} className="w-100">
                                                        <Textareaantd
                                                            className={"w-100"}
                                                            label="Describe the Assignment"
                                                            changeData={(data) => this.changeDynamic(data, this.state.FinalDataKeys[index][3], index)}
                                                            value={val[this.state.FinalDataKeys[index][3]].value}
                                                            error={val[this.state.FinalDataKeys[index][3]].error}
                                                            errmsg={val[this.state.FinalDataKeys[index][3]].error}
                                                            required
                                                        />
                                                    </Grid>
                                                    <Grid item md={3} sm={6} className="w-100">
                                                        <button className="btn btn-sm btn-danger" onClick={() => this.deleteOnDuty(index)}>Delete</button>
                                                    </Grid>
                                                </div>

                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <Grid item md={4} sm={6} className="w-100 ">
                                <div>
                                    <Dropdownantd
                                        className={"w-100"}
                                        label="Enter Name"
                                        span="(Duty assigned by)"
                                        option={employeeList && employeeList.map(val => val.EmpFirstName)}
                                        changeData={(data) => this.changeDynamic(data, 'enter_name')}
                                        value={this.state.dutydata.enter_name.value}
                                        error={this.state.dutydata.enter_name.error}
                                        errmsg={this.state.dutydata.enter_name.errmsg}
                                        required
                                    />
                                    <p className="hint_font"></p>
                                </div>
                            </Grid>
                        </Grid>


                    </Grid>
                    <Grid container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        className="gridbtnalign"
                        spacing={3}>
                        <Grid item >
                            <Button size="lg" className="btnmargin btnwidth btnclr" onClick={() => this.checkValidation()}>Save</Button>
                        </Grid>
                        <Grid item >
                            <Button size="lg" className="btnwidth btnclr_outline" onClick={() => this.resetFormData()}>Cancel</Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}
export default OnDuty;