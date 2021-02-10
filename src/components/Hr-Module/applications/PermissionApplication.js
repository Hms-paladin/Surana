import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Grid from "@material-ui/core/Grid";
import moment from 'moment';
import Timepickerantd from '../../../formcomponent/timepickerantd';
import Dropdownantd from '../../../formcomponent/dropdownantd';
import Calenderbox from '../../../formcomponent/calenderbox';
import Textareaantd from '../../../formcomponent/textareaantd';
import Inputnumberantd from '../../../formcomponent/inputnumberantd';
import Inputantd from '../../../formcomponent/inputantd';
import ValidationLibrary from "../../../validationlibrary/validation.js";
import { applyPermission } from "./applyLeaveAction";
import DatePickerMui from '../../../formcomponent/DatePickerMUI';
import Axios from 'axios';
import { apiurl } from '../../../App';

class PermissionApplication extends React.Component {
    state = {
        errordummy: true,
        permissionappdata:
        {
            'permavailed': {
                'value': '',
                validation: [{ 'name': 'required' }, { name: 'alphaNumaricOnly' }],
                error: null,
                errmsg: null
            },
            'permondate': {
                'value': '',
                validation: [{ 'name': 'required' }],
                error: null,
                errmsg: null
            },
            'permissionrequested': {
                'value': '',
                validation: [{ 'name': 'required' }, { name: 'allowNumaricOnly' }],
                error: null,
                errmsg: null
            },
            'startTime': {
                value: null,
                validation: [{ 'name': 'required' }],
                error: null,
                errmsg: null,
            },
            'endTime': {
                value: null,
                validation: [{ 'name': 'required' }],
                error: null,
                errmsg: null,
            },
            'reason': {
                'value': '',
                validation: [{ 'name': 'required' }],
                error: null,
                errmsg: null
            },
            'contact': {
                'value': '',
                validation: [{ 'name': 'required' }, { name: 'mobile_india' }],
                error: null,
                errmsg: null
            },

        }
    }

    componentDidMount() {
        this.getTotalPermission()
    }

    getTotalPermission = () => {
        Axios({
            method: 'POST',
            url: apiurl + '/totalpermissions',
            data: {
                empId: 1
            }
        }).then((response) => {
            console.log(response.data.data, "sadjfaskldfjasl")
            this.state.permissionappdata.permavailed.value = response.data.data[0].TotalPermissions
            this.setState({})
        }).catch((error) => {
            console.log(error)
        })
    }


    checkValidation = () => {
        var mainvalue = {}
        var permissionappdata = this.state.permissionappdata;
        var permissionappdatakeys = Object.keys(permissionappdata);
        console.log(permissionappdatakeys, "leaveApplicationkeys");
        for (var i in permissionappdatakeys) {
            var errorcheck = ValidationLibrary.checkValidation(permissionappdata[permissionappdatakeys[i]].value, permissionappdata[permissionappdatakeys[i]].validation);
            console.log(errorcheck, "errorcheck");
            permissionappdata[permissionappdatakeys[i]].error = !errorcheck.state;
            permissionappdata[permissionappdatakeys[i]].errmsg = errorcheck.msg;
            mainvalue[permissionappdatakeys[i]] = permissionappdata[permissionappdatakeys[i]].value
        }
        var filtererr = permissionappdatakeys.filter((obj) =>
            permissionappdata[obj].error == true);
        console.log(filtererr.length)
        if (filtererr.length > 0) {
            this.setState({ error: true })
        } else {
            this.setState({ error: false })

        }
        this.setState({
            mainvalue,
            permissionappdata
        })
        if (filtererr.length === 0) {
            this.PermissionApplicationApi();
            var permissiondata = {
                leaveId: 4,
                permavailed: this.state.permissionappdata.permavailed.value,
                empId: 2,
                permissionrequested: this.state.permissionappdata.permissionrequested.value,
                permondate: this.state.permissionappdata.permondate.value,
                startTime: this.state.permissionappdata.startTime.value,
                endTime: this.state.permissionappdata.endTime.value,
                reason: this.state.permissionappdata.reason.value,
                contact: this.state.permissionappdata.contact.value
            }
            //this.props.dispatch(applyPermission(permissiondata))
        }

    }
    changeDynamic = (data, key) => {
        console.log("key", key);
        console.log("data", data);
        // alert(typeof key)
        // alert(data)
        var permissionappdata = this.state.permissionappdata;
        var permissionappdatakeys = Object.keys(permissionappdata);

        var errorcheck = ValidationLibrary.checkValidation(data, permissionappdata[key].validation);
        permissionappdata[key].value = data;
        permissionappdata[key].error = !errorcheck.state;
        permissionappdata[key].errmsg = errorcheck.msg;
        this.setState({ permissionappdata });
        var filtererr = permissionappdatakeys.filter((obj) =>
            permissionappdata[obj].error == true || permissionappdata[obj].error == null);
        if (filtererr.length > 0) {
            this.setState({
                error: true,
                errordummy: false
            })
        } else {
            this.setState({ error: false })
        }
    }
    PermissionApplicationApi = () => {
        var PermissionApplicationApi = {};
        PermissionApplicationApi.empId = 1;
        PermissionApplicationApi.leaveId = 4;
        // PermissionApplicationApi.permavailed=5;
        // PermissionApplicationApi.permissionrequested=2;
        var permissionappdatakeys = Object.keys(this.state.permissionappdata)
        var permissionappData = Object.values(this.state.permissionappdata);
        console.log(PermissionApplicationApi, "PermissionApplicationApi");
        for (var i in permissionappdatakeys) {
            PermissionApplicationApi[permissionappdatakeys[i]] = this.state.permissionappdata[permissionappdatakeys[i]].value
        }
        PermissionApplicationApi.startTime = PermissionApplicationApi.startTime
            .format('HH:mm');
        PermissionApplicationApi.endTime = PermissionApplicationApi.endTime
            .format('HH:mm');
        console.log(PermissionApplicationApi, "PermissionApplicationApi")
        this.props.dispatch(applyPermission(PermissionApplicationApi, () => this.resetFormData()))
    }
    resetFormData = () => {
        var permissionappdatakeys = Object.keys(this.state.permissionappdata)
        for (var i in permissionappdatakeys) {
            this.state.permissionappdata[permissionappdatakeys[i]].value = ''
        }
        this.setState({})
    }
    render() {
        return (
            <div className="card top_move">
                <div className="card-body">
                    <Grid container spacing={6} className="text-left mt-2">
                        <Grid item md={4} sm={6} className=" w-100">
                            <h5>Permission Availed: {this.state.permissionappdata.permavailed.value}</h5>
                            {/* <Inputantd
                                className={"w-100"}
                                label="Permission Available"
                                span="(Permission availed)"
                                value={this.state.permissionappdata.permavailed.value}
                                // changeData={(data)=>this.changeDynamic(data,'permavailed')} 
                                // error={this.state.permissionappdata.permavailed.error} 
                                // errmsg={this.state.permissionappdata.permavailed.errmsg}
                                required
                            /> */}
                            {/* <span className="hint_font">(Permission already availed)</span> */}
                        </Grid>
                        <Grid item md={4} sm={6} className="w-100">
                            <DatePickerMui className="w-100 date_permission" label="On Date" format={"DD-MM-YYYY"}
                                changeData={(data) => this.changeDynamic(data, 'permondate')}
                                value={this.state.permissionappdata.permondate.value}
                                error={this.state.permissionappdata.permondate.error}
                                errmsg={this.state.permissionappdata.permondate.errmsg}
                                required
                            />
                        </Grid>
                        <Grid item md={4} sm={6} className="w-100">
                            <Inputantd
                                label="No.of hrs"
                                span="(Permission requested)"
                                className="w-100"
                                changeData={(data) => this.changeDynamic(data, 'permissionrequested')}
                                value={this.state.permissionappdata.permissionrequested.value}
                                error={this.state.permissionappdata.permissionrequested.error}
                                errmsg={this.state.permissionappdata.permissionrequested.errmsg}
                                required
                            />
                        </Grid>
                        <Grid item md={4} sm={6}>
                            <Inputantd label={"Emergency Contact Number"} className="w-100"
                                changeData={(data) => this.changeDynamic(data, 'contact')}
                                value={this.state.permissionappdata.contact.value}
                                error={this.state.permissionappdata.contact.error}
                                errmsg={this.state.permissionappdata.contact.errmsg}
                            />
                        </Grid>

                        <Grid item md={4} sm={6} className="w-100 card_date">
                            <div className="flex labelhgt">
                                <label className="w-100 mr-2">

                                    <Timepickerantd
                                        className="timepickerantd w-100"
                                        placeholder="Start Time"
                                        defaultValue={moment('00:00', 'HH:mm')}
                                        format='HH:mm'
                                        changeData={(data) => this.changeDynamic(data, 'startTime')}
                                        disabledSeconds={() => [2]}
                                        value={this.state.permissionappdata.startTime.value}
                                        error={this.state.permissionappdata.startTime.error}
                                        errmsg={this.state.permissionappdata.startTime.errmsg}
                                    />
                                </label>
                                <label className="w-100">

                                    <Timepickerantd
                                        className="timepickerantd w-100"
                                        placeholder="End Time"
                                        defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
                                        format='HH:mm'
                                        changeData={(data) => this.changeDynamic(data, 'endTime')}
                                        value={this.state.permissionappdata.endTime.value}
                                        error={this.state.permissionappdata.endTime.error}
                                        errmsg={this.state.permissionappdata.endTime.errmsg}
                                    />
                                </label>
                            </div>
                        </Grid>
                        <Grid item md={4} sm={6} className="w-100">
                            <Textareaantd
                                className={"w-100"}
                                label="Reason"
                                changeData={(data) => this.changeDynamic(data, 'reason')}
                                value={this.state.permissionappdata.reason.value}
                                error={this.state.permissionappdata.reason.error}
                                errmsg={this.state.permissionappdata.reason.errmsg}
                            />
                        </Grid>

                    </Grid>

                    <Grid container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        className="gridbtnalign"
                        spacing={3}
                    >
                        <Grid item >
                            <Button className="btnmargin btnwidth btnclr" onClick={() => this.checkValidation()}>Save</Button>
                        </Grid>
                        <Grid item >
                            <Button className="btnwidth btnclr_outline" onClick={() => this.resetFormData()}>Cancel</Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}
export default PermissionApplication;
