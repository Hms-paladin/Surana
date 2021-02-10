import React from 'react';
import { Form, Field, reduxForm } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import '../../empAchievement/EmployeeAchievement.css';
import './EmployeeAddPayroll.css';
import Dropdownantd from '../../../formcomponent/dropdownantd';
import Inputantd from '../../../formcomponent/inputantd';
import Button from 'react-bootstrap/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { FaRupeeSign } from 'react-icons/fa';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { apiurl } from "../../../App";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

import ValidationLibrary from "../../../validationlibrary/validation.js"
import { connect } from 'react-redux';

const axios = require('axios');

class EmployeeAddPayroll extends React.Component {
    state = {
        inputlist: [],
        inputadd: [],
        listofdepart: "",
        listofname: "",
        allnum: 0,
        deleteclose: false,
        altext: "",
        idstore: "",
        currentid: "",
        // altext2:"",  
        payrolldata:
        {
            'department':
            {
                'value': '',
                validation: [{ 'name': 'required' }],
                error: "",
                errmsg: null
            },
            'employeename':
            {
                'value': '',
                validation: [{ 'name': 'required' }, { name: 'alphabetsOnly' }],
                error: null,
                errmsg: null
            },
            'pay':
            {
                'value': '',
                validation: [{ 'name': 'required' }, { name: 'allowNumaricOnly' }],
                error: null,
                errmsg: null
            },
            'leaves':
            {
                'value': '',
                validation: [{ 'name': 'required' }, { name: 'allowNumaricOnly' }],
                error: null,
                errmsg: null
            },
            'month':
            {
                'value': '',
                validation: [{ 'name': 'required' }],
                error: null,
                errmsg: null
            },
            'year':
            {
                'value': '',
                validation: [{ 'name': 'required' }],
                error: null,
                errmsg: null
            },
            'altext1':
            {
                'value': '',
                validation: [{ 'name': 'required' }],
                error: null,
                errmsg: null
            },
            'alpay1':
            {
                'value': '',
                validation: [{ 'name': 'required' }],
                error: null,
                errmsg: null
            },
            //   'linkedin':
            //   {'value':'',
            //     validation:[{'name':'required'},{name:"futureDate"}],
            //     error:null,
            //     errmsg:null
            //   },
        }
    }
    add = () => {
        var inputstore = []
        inputstore.push(...this.state.inputlist,
            <React.Fragment>
                <Grid item sm={5} md={3}>
                    <Inputantd className={"w-100"} />
                </Grid>
                <Grid md={1} />
                <Grid item sm={5} md={3}>
                    <Inputantd className={"w-100"}
                        prefix={<FaRupeeSign />}
                    />
                </Grid>
                <IconButton aria-label="delete" className="button_align" onClick={this.delete_ded_Data}>
                    <DeleteIcon />
                </IconButton>
                <Grid md={3} />
            </React.Fragment >
        )
        this.setState({
            inputlist: inputstore
        })
        console.log(this.state.inputlist)
    }
    alldata = (value, key) => {
        this.setState({
            [key]: value
        })
    }

    add_list = () => {
        this.setState({
            allnum: this.state.allnum + 1,
            close: true, stateopen: true,
        })
    }

    componentDidMount() {
        var self = this
        axios({
            method: 'get',
            url: apiurl + "/listofemployees",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(function (response) {
                console.log(response, "responseadd");
                let j = 0
                var employeearr = []
                for (j; j < response.data.data.length; j++) {
                    employeearr.push(response.data.data[j].EmpName)
                }
                self.setState({ listofname: employeearr })

            })
            .catch(function (error) {
                console.log(error, "error");
            });
    }

    delete_all_Data = (e, id) => {
        console.log(e, "eee")
        console.log(id, "id")
        var idstore = []
        idstore.push(...this.state.idstore, id)
        let unique = [...new Set(idstore)]
        unique.sort(function (a, b) { return b - a })
        this.setState({ deleteclose: true, idstore: unique, currentid: id })
    }
    delete_ded_Data = (e) => {
        this.state.inputlist.splice(e, 1)
            .splice(e, 1)
        this.setState({})
    }

    changeDynamic = (data, key) => {
        console.log("key", key);
        console.log("data", data);
        var payrolldata = this.state.payrolldata;
        var targetkeys = Object.keys(payrolldata);

        var errorcheck = ValidationLibrary.checkValidation(data, payrolldata[key].validation);
        payrolldata[key].value = data;
        payrolldata[key].error = !errorcheck.state;
        payrolldata[key].errmsg = errorcheck.msg;
        this.setState({ payrolldata });
        var filtererr = targetkeys.filter((obj) =>
            payrolldata[obj].error == true || payrolldata[obj].error == null);
        if (filtererr.length > 0) {
            this.setState({
                error: true,
                errordummy: false
            })
        } else {
            this.setState({ error: false })
        }
        this.setState({
            stateopen: true
        })
    }

    callroot = () => {

        var payrolldata = this.state.payrolldata;
        var targetkeys = Object.keys(payrolldata);
        console.log(targetkeys);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(payrolldata[targetkeys[i]].value, payrolldata[targetkeys[i]].validation);
            console.log(errorcheck);
            payrolldata[targetkeys[i]].error = !errorcheck.state;
            payrolldata[targetkeys[i]].errmsg = errorcheck.msg;
        }
        var filtererr = targetkeys.filter((obj) =>
            payrolldata[obj].error == true);
        console.log(filtererr.length)
        if (filtererr.length > 0) {
            this.setState({ error: true })
        } else {
            this.setState({ error: false })

        }
        this.setState({ payrolldata })

        console.log(payrolldata, "payrolldata")




        axios({
            method: 'post',
            url: apiurl + '/addPayroll',
            // headers: {'Content-Type': 'application/json'},
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            data: {
                "deptId": payrolldata.department.value,
                "empId": payrolldata.employeename.value,
                "empbasic": payrolldata.pay.value,
                "paymonth": payrolldata.month.value,
                "payYear": payrolldata.year.value,
                "NoOfleaves": payrolldata.leaves.value,
                "dednId": 2,
                "allowId": 2
            }
        })
            .then(function (response) {
                console.log(response, "responsepayrolldata");
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    render() {

        var addinput = this.state.inputlist.map((box) => box)
        //  var addinputbox = this.state.inputadd.map((box) => box)

        console.log(this.state, "state")

        var i = 0
        var inputstore = []
        for (i; i < this.state.allnum; i++) {
            const alldata = "altext" + (i + 2)
            const deddata = "alpay" + (i + 2)
            const deldata = i + 1

            inputstore.push(
                < React.Fragment >
                    <Grid item sm={5} md={3}>
                        <Inputantd className={"w-100"}
                            changeData={(data) => this.alldata(data, alldata)}
                            value={this.state[alldata]}
                        />
                    </Grid>
                    <Grid md={1} />
                    <Grid item sm={5} md={3}>
                        <Inputantd className={"w-100"}
                            prefix={<FaRupeeSign />}
                            changeData={(data) => this.alldata(data, deddata)}
                            value={this.state[deddata]}
                        />
                    </Grid>
                    <IconButton aria-label="delete" className="button_align" onClick={() => this.delete_all_Data(inputstore, deldata + 1)}>
                        <DeleteIcon />
                    </IconButton>
                    <Grid md={3} />
                </React.Fragment >
            )
        }


        if (this.state.deleteclose) {
            var j = 0
            for (j; j < this.state.idstore.length; j++) {
                console.log(this.state.currentid, "currrentid")
                console.log(this.state.idstore, "idstore")
                const curid = this.state.idstore.indexOf(this.state.currentid)
                console.log(curid, "curid")
                this.state.idstore.splice(curid - 1, 1)
            }
            this.setState({ deleteclose: false, idstore: [] })
        }


        return (
            <React.Fragment>
                <div className="card  top_move">
                    <div className="card-body">
                        <Grid container spacing={2}>
                            <Grid item sm={5} md={3}>
                                <Dropdownantd name={"department"}
                                    label={"Department"}
                                    className={"w-100"}
                                    option={this.state.listofdepart}
                                    changeData={(data) => this.changeDynamic(data, 'department')}
                                    value={this.state.payrolldata.department.value}
                                    error={this.state.payrolldata.department.error}
                                    errmsg={this.state.payrolldata.department.errmsg}

                                ></Dropdownantd>
                                {/* {box} */}
                            </Grid>
                            <Grid md={1} />
                            <Grid item sm={5} md={3}>
                                <Dropdownantd label={"Employee Name"}
                                    className={"w-100"}
                                    option={this.state.listofname}
                                    changeData={(data) => this.changeDynamic(data, 'employeename')}
                                    value={this.state.payrolldata.employeename.value}
                                    error={this.state.payrolldata.employeename.error}
                                    errmsg={this.state.payrolldata.employeename.errmsg}
                                />
                            </Grid>
                            <Grid md={1} />
                            <Grid item sm={5} md={3}>
                                <Inputantd label={"Pay"} className={"w-100"}
                                    changeData={(data) => this.changeDynamic(data, 'pay')}
                                    value={this.state.payrolldata.pay.value}
                                    error={this.state.payrolldata.pay.error}
                                    errmsg={this.state.payrolldata.pay.errmsg}
                                />
                            </Grid>
                            <Grid md={1} />
                            <Grid item sm={5} md={3}>
                                <Inputantd label={"No of Leaves"} className={"w-100"} option={[1, 2]}
                                    changeData={(data) => this.changeDynamic(data, 'leaves')}
                                    value={this.state.payrolldata.leaves.value}
                                    error={this.state.payrolldata.leaves.error}
                                    errmsg={this.state.payrolldata.leaves.errmsg}
                                />
                            </Grid>
                            <Grid md={1} />
                            <Grid item sm={5} md={3}>
                                <Dropdownantd label={"Month"} className={"w-100"} option={["May", "June"]}
                                    changeData={(data) => this.changeDynamic(data, 'month')}
                                    value={this.state.payrolldata.month.value}
                                    error={this.state.payrolldata.month.error}
                                    errmsg={this.state.payrolldata.month.errmsg}
                                />
                            </Grid>
                            <Grid md={1} />
                            <Grid item sm={5} md={3}>
                                <Dropdownantd label={"Year"} className={"w-100"} option={["2019", "2020"]}
                                    changeData={(data) => this.changeDynamic(data, 'year')}
                                    value={this.state.payrolldata.year.value}
                                    error={this.state.payrolldata.year.error}
                                    errmsg={this.state.payrolldata.year.errmsg}
                                />
                            </Grid>
                            <Grid item sm={12} md={12}>
                                <h6 className="form-subheading">Allowance</h6>
                            </Grid>
                            <Grid item sm={5} md={3}>
                                <Inputantd className={"w-100"}
                                    changeData={(data) => this.changeDynamic(data, 'altext1')}
                                    value={this.state.payrolldata.altext1.value}
                                />
                            </Grid>
                            <Grid md={1} />
                            <Grid item sm={5} md={3}>
                                <Inputantd className={"w-100"}
                                    prefix={<FaRupeeSign />}
                                    changeData={(data) => this.changeDynamic(data, 'alpay1')}
                                    value={this.state.payrolldata.alpay1.value}

                                />
                            </Grid>
                            {/* <AddCircleOutlineIcon className="icon_down"onClick={this.add_list}></AddCircleOutlineIcon> */}
                            <Fab color="primary" className="icon_down" disabled={""} onClick={this.add_list}  >
                                <AddIcon />
                            </Fab>
                            <Grid md={4} />
                            {/* {addinputbox} */}
                            {inputstore}

                            <Grid item sm={12} md={12}>
                                <h6 className="form-subheading">Deductions</h6>
                            </Grid>
                            <Grid item sm={5} md={3}>
                                <Inputantd className={"w-100"}
                                />
                            </Grid>
                            <Grid md={1} />
                            <Grid item sm={5} md={3}>
                                <Inputantd className={"w-100"} prefix={<FaRupeeSign />}
                                />

                            </Grid>
                            {/* <AddCircleOutlineIcon className="icon_down" onClick={this.add}></AddCircleOutlineIcon> */}
                            <Fab color="primary" className="icon_down" onClick={this.add}  >
                                <AddIcon />
                            </Fab>
                            <Grid md={4} />
                            {addinput}
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

                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    department: state.fixers.department
});

export default connect(mapStateToProps)(EmployeeAddPayroll);