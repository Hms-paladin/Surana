import React from 'react';
import Grid from '@material-ui/core/Grid';
import Dropdownantd from '../../../formcomponent/dropdownantd';
import Calenderbox from '../../../formcomponent/calenderbox';
import './Severance.css';
import Textareaantd from '../../../formcomponent/textareaantd';
import Button from 'react-bootstrap/Button';
import ValidationLibrary from "../../../validationlibrary/validation.js"
import {severanceDetails,getEmployeeById} from './Action';

class SeveranceForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

            errordummy: true,
            severanceData: {
                'department': {
                    value: '',
                    validation: [{ name: 'required' }],
                    error: null,
                    errormsg: null,
                },
                'employeename': {
                    value: '',
                    validation: [{ name: 'required' }],
                    error: null,
                    errmsg: null
                },
                'dors': {
                    value: '',
                    validation: [{ name: 'required' }],
                    error: null,
                    errmsg: null,
                },
                'resignationaccepted': {
                    value: '',
                    validation: [{ name: 'required' }],
                    error: null,
                    errmsg: null,
                },
                'acceptedby': {
                    value: '',
                    validation: [{ name: 'required' }],
                    error: null,
                    errmsg: null,
                },
                'dor': {
                    value: '',
                    validation: [{ name: 'required' }],
                    error: null,
                    errmsg: null,
                },
                'description': {
                    value: '',
                    validation: [{ name: 'required' }],
                    error: null,
                    errmsg: null,
                },
                'adminnoc': {
                    value: '',
                    // validation:[{name:'required'}],
                    error: null,
                    errmsg: null,
                },
                'itnoc': {
                    value: '',
                    // validation:[{name:'required'}],
                    error: null,
                    errmsg: null,
                },
                'hrnoc': {
                    value: '',
                    // validation:[{name:'required'}],
                    error: null,
                    errmsg: null,
                },
                'releivedon': {
                    value: '',
                    validation: [{ name: 'required' }],
                    error: null,
                    errmsg: null,
                },
                'releivedby': {
                    value: '',
                    validation: [{ name: 'required' }],
                    error: null,
                    errmsg: null,
                }
            },
            "severance": [{
                "department": "Admin"
            }, {
                "department": "IT"
            }, {
                "department": "HR"
            }]
        }


        console.log("sdfsdfsdfsdfsdfsdf", this.state.severance)

    }




    resetForm = () => {

        const {department,employeename,dors,resignationaccepted,acceptedby,releivedby,releivedon,dor,hrnoc,itnoc,adminnoc,description} = this.state.severanceData

        department.value = "";
        employeename.value = "";
        dors.value = "";
        resignationaccepted.value = "";
        acceptedby.value = "";
        releivedby.value = "";
        releivedon.value = "";
        dor.value = "";
        hrnoc.value = "";
        itnoc.value = "";
        adminnoc.value = "";
        description.value = "";


        this.setState({})
    }


    checkValidation = () => {
        var mainvalue = {}
        var severanceData = this.state.severanceData;
        var severancekeys = Object.keys(severanceData);
        console.log(severancekeys, "severancekeys");
        for (var i in severancekeys) {
            var errorcheck = ValidationLibrary.checkValidation(severanceData[severancekeys[i]].value, severanceData[severancekeys[i]].validation);
            console.log(errorcheck, "errorcheck");
            severanceData[severancekeys[i]].error = !errorcheck.state;
            severanceData[severancekeys[i]].errmsg = errorcheck.msg;
            mainvalue[severancekeys[i]] = severanceData[severancekeys[i]].value
        }
        var filtererr = severancekeys.filter((obj) =>
            severanceData[obj].error == true);
        console.log(filtererr.length)
        if (filtererr.length > 0) {
            this.setState({ error: true })

        } else {
            this.setState({ error: false })
            this.sendDetails()

        }
        this.setState({
            mainvalue,
            severanceData
        })
    }

    sendDetails = () => {


        var dateofresignation = this.state.severanceData.dors.value._d;
        var convertedresignation = dateofresignation.getFullYear() + '-' + (dateofresignation.getMonth() + 1) + '-' + dateofresignation.getDate();


        var resignationaccepted = this.state.severanceData.resignationaccepted.value._d;
        var convertedaccepted = resignationaccepted.getFullYear() + '-' + (resignationaccepted.getMonth() + 1) + '-' + resignationaccepted.getDate();

        var relieving = this.state.severanceData.dor.value._d;
        var convertedrelieving = relieving.getFullYear() + '-' + (relieving.getMonth() + 1) + '-' + relieving.getDate();


        var relievedon = this.state.severanceData.releivedon.value._d;
        var convertedrelieving = relievedon.getFullYear() + '-' + (relievedon.getMonth() + 1) + '-' + relievedon.getDate();

        var adminnoc = this.state.severanceData.adminnoc.value._d;
        var converted_admin_noc = adminnoc.getFullYear() + '-' + (adminnoc.getMonth() + 1) + '-' + adminnoc.getDate();

        var itnoc = this.state.severanceData.itnoc.value._d;
        var converted_it_noc = itnoc.getFullYear() + '-' + (itnoc.getMonth() + 1) + '-' + itnoc.getDate();



        var hrnoc = this.state.severanceData.hrnoc.value._d;
        var converted_hr_noc = hrnoc.getFullYear() + '-' + (hrnoc.getMonth() + 1) + '-' + hrnoc.getDate();


        console.log("sdfjshdfjshdfjsd", this.state.severanceData)
        var EmpId = this.props.employees.find((val) => val.EmpFirstName === this.state.severanceData.employeename.value).EmpId
        var details = {
            "empId": EmpId,
            "deptId": this.state.severanceData.department.value,
            "dateofresignation": convertedresignation,
            "resignationacceptedon": convertedaccepted,
            "acceptedby": this.state.severanceData.acceptedby.value,
            "dateofrelieving": convertedrelieving,
            "remarks": this.state.severanceData.description.value,
            "severance": [{
                "department": "Admin",
                "nocgivenon": converted_admin_noc
            }, {
                "department": "IT",
                "nocgivenon": converted_it_noc
            }, {
                "department": "HR",
                "nocgivenon": converted_hr_noc
            }],
            "relievedby": this.state.severanceData.releivedby.value,
            "relievedon": convertedrelieving
        }
        console.log("nananananana", details)
        this.props.dispatch(severanceDetails(details))
        this.resetForm()

    }

    changeDynamic = (data, key) => {
      

        console.log("key", key);
        console.log("data", data);

        if(key === "department") {
            this.props.dispatch(getEmployeeById(data))
        }

        var severanceData = this.state.severanceData;
        var severancekeys = Object.keys(severanceData);

        var errorcheck = ValidationLibrary.checkValidation(data, severanceData[key].validation);
        severanceData[key].value = data;
        severanceData[key].error = !errorcheck.state;
        severanceData[key].errmsg = errorcheck.msg;
        this.setState({ severanceData });
        var filtererr = severancekeys.filter((obj) =>
            severanceData[obj].error == true || severanceData[obj].error == null);
        if (filtererr.length > 0) {
            this.setState({
                error: true,
                errordummy: false
            })

        } else {
            this.setState({ error: false })

        }
    }

    render() {
       
        console.log("fsdflsdfljsdfljksdflkjsdlkfjskd", this.props.department)
        const { acceptedby, releivedby, employees, department } = this.props;
        return (
            <React.Fragment>
                <div className="card top_move">
                    <div className="card-body">
                        <Grid container spacing={4}>
                            <Grid item md={3} sm={6}>
                                <Dropdownantd changeData={(data) => this.changeDynamic(data, 'department')} label={"Department"} className="w-100" option={department && department.map(val => val.DeptName)}
                                    value={this.state.severanceData.department.value}
                                    error={this.state.severanceData.department.error}
                                    errmsg={this.state.severanceData.department.errmsg}
                                    required
                                />
                            </Grid>
                            <Grid md={1} />
                            <Grid item md={3} sm={6}>
                                <Dropdownantd label={"Employee Name"} changeData={(data) => this.changeDynamic(data, 'employeename')} className="w-100" value={this.state.severanceData.employeename.value} option={employees && employees.map(val => val.EmpFirstName)}
                                    error={this.state.severanceData.employeename.error}
                                    errmsg={this.state.severanceData.employeename.errmsg}
                                    required
                                    convertString
                                />
                            </Grid>
                            <Grid md={1} />
                            <Grid item md={3} sm={6} className="w-100">
                                <Calenderbox placeholder={"dd/mm/yyyy"} className="w-100" label="Date of Resignation" changeData={(data) => this.changeDynamic(data, 'dors')} value={this.state.severanceData.dors.value} error={this.state.severanceData.dors.error}
                                    errmsg={this.state.severanceData.dors.errmsg} disableFuture
                                    required />
                            </Grid>
                            <Grid md={1} />
                            <Grid item md={3} sm={6} className="w-100">
                                <Calenderbox placeholder={"dd/mm/yyyy"} className="w-100" label="Resignation Accepted on" changeData={(data) => this.changeDynamic(data, 'resignationaccepted')} value={this.state.severanceData.resignationaccepted.value} error={this.state.severanceData.resignationaccepted.error}
                                    errmsg={this.state.severanceData.resignationaccepted.errmsg} disableFuture
                                    required
                                />
                            </Grid>
                            <Grid md={1} />
                            <Grid item md={3} sm={6} className="w-100">
                                <Dropdownantd label={"Accepted by"} className="w-100 department-height" option={acceptedby && acceptedby.map(val => val.EmpName)} changeData={(data) => this.changeDynamic(data, 'acceptedby')} value={this.state.severanceData.acceptedby.value} error={this.state.severanceData.acceptedby.error}
                                    errmsg={this.state.severanceData.acceptedby.errmsg}
                                    required />
                            </Grid>
                            <Grid md={1} />
                            <Grid item md={3} sm={6} className="w-100">
                                <Calenderbox placeholder={"dd/mm/yyyy"} className="w-100" label="Date of Relieving" changeData={(data) => this.changeDynamic(data, 'dor')} value={this.state.severanceData.dor.value} error={this.state.severanceData.dor.error}
                                    errmsg={this.state.severanceData.dor.errmsg} disablePast
                                    required />
                            </Grid>
                            <Grid item md={7} sm={12}>
                                <Textareaantd label="Remarks" changeData={(data) => this.changeDynamic(data, 'description')} value={this.state.severanceData.description.value}
                                    error={this.state.severanceData.description.error}
                                    errmsg={this.state.severanceData.description.errmsg}
                                    required
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item sm={5} md={5}>
                                <h6 className="form-subheading" >Department</h6>
                            </Grid>

                            <Grid item sm={6} md={5}>
                                <h6 className="form-subheading">NOC given on</h6>
                            </Grid>
                            <Grid item md={6} sm={6} className="move-justify">
                                <label className=" mt-2"> Admin</label>
                            </Grid>
                            <Grid item md={6} sm={6}  >
                                <Calenderbox placeholder={"dd/mm/yyyy"} className="date_space w-50" changeData={(data) => this.changeDynamic(data, 'adminnoc')} value={this.state.severanceData.adminnoc.value} error={this.state.severanceData.adminnoc.error}
                                    errmsg={this.state.severanceData.adminnoc.errmsg} />
                            </Grid>
                            <Grid item md={6} sm={6} className="move-justify  it_top-move">
                                <label className="it_top-move"  >IT</label>
                            </Grid>
                            <Grid item md={6} sm={6} className="top_move-date">
                                <Calenderbox placeholder={"dd/mm/yyyy"} className="date_space w-50 " changeData={(data) => this.changeDynamic(data, 'itnoc')} value={this.state.severanceData.itnoc.value} error={this.state.severanceData.itnoc.error}
                                    errmsg={this.state.severanceData.itnoc.errmsg} />
                            </Grid>
                            <Grid item md={6} sm={6} className="move-justify hr_top-move ">
                                <label className="">HR</label>
                            </Grid>
                            <Grid item md={6} sm={6} className="top_move-date">
                                <Calenderbox placeholder={"dd/mm/yyyy"} className="date_space w-50" changeData={(data) => this.changeDynamic(data, 'hrnoc')} value={this.state.severanceData.hrnoc.value} error={this.state.severanceData.hrnoc.error}
                                    errmsg={this.state.severanceData.hrnoc.errmsg} />
                            </Grid>
                            <Grid item md={6} sm={6} className="relieved-move">
                                <Calenderbox label={"Relieved on"} placeholder={"dd/mm/yyyy"} className="w-50 " changeData={(data) => this.changeDynamic(data, 'releivedon')} value={this.state.severanceData.releivedon.value} error={this.state.severanceData.releivedon.error}
                                    errmsg={this.state.severanceData.releivedon.errmsg}
                                    required
                                />
                            </Grid>
                            <Grid item md={6} sm={6} className="">
                                <div className="margin_label-adjust ">
                                    <Dropdownantd label={"Relieved by"} className="releivedby_space  "
                                        option={releivedby && releivedby.map(val => val.EmpName)} changeData={(data) => this.changeDynamic(data, 'releivedby')} value={this.state.severanceData.releivedby.value} error={this.state.severanceData.releivedby.error}
                                        errmsg={this.state.severanceData.releivedby.errmsg}
                                        required />
                                </div>
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
                                <Button size="lg" className="btnmargin btnwidth btnclr" onClick={() => this.checkValidation()}>Save</Button>
                            </Grid>
                            <Grid item >
                                <Button size="lg" className="btnwidth btnclr_outline" onClick={() => this.resetForm()}>Cancel</Button>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}



export default SeveranceForm;
