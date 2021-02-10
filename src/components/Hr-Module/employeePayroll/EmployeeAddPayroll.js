import React from "react";
import { Form, Field, reduxForm } from "redux-form";
import Grid from "@material-ui/core/Grid";
import "../../empAchievement/EmployeeAchievement.css";
import "./EmployeeAddPayroll.css";
import Dropdownantd from "../../../formcomponent/dropdownantd";
import Inputantd from "../../../formcomponent/inputantd";
import Button from "react-bootstrap/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { FaRupeeSign } from "react-icons/fa";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { apiurl } from "../../../App";
// import AddIcon from '@material-ui/icons/Add';
import Fab from "@material-ui/core/Fab";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import ValidationLibrary from "../../../validationlibrary/validation.js";

import { employeeAddPayroll } from "./Action";
import { Input, notification } from "antd";
import Calenderbox from "../../../formcomponent/calenderbox";
import { DatePicker } from "antd";
import moment from "moment";
import dateformat from "dateformat"


import { getDepartment } from '../../../fixers/fixersAction';
import { getEmployeeById, getEmployeeDoj } from "../severance/Action";
import { connect } from 'react-redux';

const axios = require("axios");
const monthFormat = "YYYY/MM";
var alldata = "";
var whichindex = null;

const dateFormat = "YYYY MMM DD"


const { MonthPicker } = DatePicker;
class EmployeeAddPayroll extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allowance: [
        {
          allowname: "",
          allowamount: "",
        },
      ],
      deduction: [
        {
          dedname: "",
          dedamount: "",
        },
      ],
      amterror: false,
      btnChange: false,
      allerror: false,
      allerrormsg: null,
      allamt: false,
      assignments: [],
      saveBtnClick: false,
      inputlist: [],
      inputadd: [],
      listofdepart: "",
      listofname: "",
      allnum: 0,
      dednum: 0,
      deleteclose: false,
      altext: "",
      idstore: "",
      currentid: "",
      // altext2:"",
      payrolldata: {
        department: {
          value: "",
          validation: [{ name: "required" }],
          error: "",
          errmsg: null,
        },
        employeename: {
          value: "",
          validation: [{ name: "required" }],
          error: null,
          errmsg: null,
        },
        pay: {
          value: null,
          validation: [{ name: "required" }, { name: "allowNumaricOnly" }],
          error: null,
          errmsg: null,
        },
        leaves: {
          value: "",
          validation: [{ name: "required" }, { name: "mark" }],
          error: null,
          errmsg: null,
        },

        dateofjoin: {
          value: "",
          validation: [{ name: "required" }],
          error: null,
          errmsg: null,
        },
      },
      employeenames: [],
      monthYear: dateformat(moment(), "yyyy-mm"),

      payroll_deduction: [],
      totalamount: "",
      whichindex: null,
      basicpay: 0,
      payRollAllowanceId: '',
      payRollDeductionId: '',
      DepId: '',
      EmpId: '',
    };
  }


  add = () => {
    var inputstore = [];
    inputstore.push(
      ...this.state.inputlist,
      <React.Fragment>
        <Grid item sm={5} md={3}>
          <Inputantd className={"w-100"} />
        </Grid>
        <Grid md={1} />
        <Grid item sm={5} md={3}>
          <Inputantd className={"w-100"} prefix={<FaRupeeSign />} />
        </Grid>
        <IconButton
          aria-label="delete"
          className="button_align"
          onClick={this.delete_ded_Data}
        >
          <DeleteIcon className="mt-4" />
        </IconButton>
        <Grid md={3} />
      </React.Fragment>
    );
    this.setState({
      inputlist: inputstore,
    });
    console.log(this.state.inputlist);
  };

  alldata = (value, key) => {
    console.log(key, "key");
    console.log(value, "value");

    this.setState({
      [key]: value,
    });
  };

  alldeductiondata = (value, key) => {
    console.log("sdflksdjfklsjdf", key);
    this.setState(
      {
        [key]: value,
      },
      () => console.log("sdlfjdsfjlsd;fsd", alldata)
    );
  };

  // adding list for allowance

  add_list = () => {
    this.setState({
      allnum: this.state.allnum + 1,
      close: true,
      stateopen: true,
    });
  };

  // adding list for deduction

  addDeduction = () => {
    this.setState({
      dednum: this.state.dednum + 1,
      close: true,
      stateopen: true,
    });
  };

  componentDidMount() {
    var self = this;

    this.props.dispatch(getDepartment())



    axios({
      method: "get",
      //   url: 'http://10.0.0.177:8154/api/v1/category',
      url: apiurl + "/listofdepartments",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        console.log(response, "responseadd");
        let i = 0;
        var departarr = [];
        for (i; i < response.data.data.length; i++) {
          departarr.push(response.data.data[i].DeptName);
        }
        self.setState({ listofdepart: departarr });
      })
      .catch(function (error) {
        console.log(error, "error");
      });

    axios({
      method: "get",
      url: apiurl + "/listofemployees",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        console.log(response, "responseadd");
        let j = 0;
        var employeearr = [];
        for (j; j < response.data.data.length; j++) {
          employeearr.push(response.data.data[j].EmpName);
        }
        self.setState({ listofname: employeearr });
      })
      .catch(function (error) {
        console.log(error, "error");
      });

    this.getEmployeeNames();
  }

  //
  getEmployeeNames = () => {
    axios({
      method: "get",
      url: apiurl + "/severanceemployees",
      Header: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        this.setState({
          employeenames: response.data.data,
        });
      })
      .catch((error) => { });
  };

  delete_all_Data = (e, id) => {
    console.log(e, "eee");
    console.log(id, "id");
    var idstore = [];
    idstore.push(...this.state.idstore, id);
    let unique = [...new Set(idstore)];
    unique.sort(function (a, b) {
      return b - a;
    });
    this.setState({ deleteclose: true, idstore: unique, currentid: id });
  };
  delete_ded_Data = (e) => {
    this.state.inputlist.splice(e, 1).splice(e, 1);
    this.setState({});
  };

  changeDynamic = (data, key, num) => {
    console.log("key", key);

    console.log("data", data);

    if (key === "department") {
      this.state.payrolldata.employeename.value=''
      const { employees } = this.props

      this.props.dispatch(getEmployeeById(data))    


      // if(employees && employees.length > 0) { 
      // const emp = employees.find((emp,index) => (index === 0))
      // employees.length > 0 && this.props.dispatch(getEmployeeDoj(emp.EmpId))
      // }

  if(key === "employeename") {
  
    const {employees} = this.props


    }

    if (key === "employeename") {
      var empId = this.props.employees.find((val) => val.EmpFirstName === data).EmpId;
      this.props.dispatch(getEmployeeDoj(empId))
    }



    if (key === "pay") {
      this.setState(
        {
          totalamount: data,
        },
        () =>
          console.log("sdfkjsdhfjdshfjsdf", this.state.payrolldata.pay.value)
      );
    }

    var payrolldata = this.state.payrolldata;
    var targetkeys = Object.keys(payrolldata);

    var errorcheck = ValidationLibrary.checkValidation(
      data,
      payrolldata[key].validation
    );
    payrolldata[key].value = data;
    payrolldata[key].error = !errorcheck.state;
    payrolldata[key].errmsg = errorcheck.msg;
    this.setState({ payrolldata });
    var filtererr = targetkeys.filter(
      (obj) => payrolldata[obj].error == true || payrolldata[obj].error == null
    );
    if (filtererr.length > 0) {
      this.setState({
        error: true,
        errordummy: false,
      });
    } else {
      this.setState({ error: false });

    }
  };
}

  UNSAFE_componentWillReceiveProps(newProps) {


    if (newProps.tableRowData) {

      this.state.payrolldata.employeename.value = newProps.tableRowData.data.Employee
      this.state.payrolldata.department.value = newProps.tableRowData.data.department
      this.state.payrolldata.leaves.value = newProps.tableRowData.data.Leaves
      this.state.payrolldata.dateofjoin = moment(newProps.tableRowData.data.JoiningDate).format('YYYY-MM-DD')
      this.state.monthYear = moment(newProps.tableRowData.data.MonthYear).format('YYYY-MM')
      this.state.payrolldata.pay = newProps.tableRowData.data.Pay
      this.state.allowance.allowname = newProps.tableRowData.data.AllowName
      this.state.allowance.allowamount = newProps.tableRowData.data.AllowAmt
      this.state.deduction.dedname = newProps.tableRowData.data.DeductName
      this.state.deduction.dedamount = newProps.tableRowData.data.DeductAmt
      this.state.totalamount = newProps.tableRowData.data.TotalAmt

      this.state.payRollDeductionId = newProps.tableRowData.data.id
      this.state.payRollAllowanceId = newProps.tableRowData.data.id
      console.log(newProps, "newProps")

      this.setState({ btnChange: true })
      console.log(newProps, "newprops")
    }
  }




  check = () => {

    console.log("sdfhjsdakf", this.state.allowance)

    var empId = this.props.employees.find((val) => val.EmpFirstName === this.state.payrolldata.employeename.value).EmpId;


    var dateofjoin = this.props.doj ? this.props.doj : this.state.payrolldata.dateofjoin.value._d;




    if (!this.props.doj) {
      var converteddate =
        dateofjoin.getFullYear() +
        "-" +
        (dateofjoin.getMonth() + 1) +
        "-" +
        dateofjoin.getDate();
    }
    console.log("sadfjhsdajfhjfhsdf", converteddate);
    if (this.state.btnChange === false) {
      var self = this;
      var allowdata = {
        empId: empId,
        deptId: this.state.payrolldata.department.value,
        dateofjoining: this.props.doj ? this.props.doj : converteddate,
        pay: this.state.payrolldata.pay.value,
        NoOfleaves: this.state.payrolldata.leaves.value,
        totalamount: this.state.totalamount,
        monthYear: this.state.monthYear,
        payroll: this.state.allowance,
        payrolldeduction: this.state.deduction,
      };
      self.setState({
        saveBtnClick: false
      });
      this.props.dispatch(employeeAddPayroll(allowdata));


      const { payrolldata, allowance, deduction } = this.state;


      payrolldata.department.value = "";
      payrolldata.employeename.value = "";
      payrolldata.leaves.value = "";
      payrolldata.dateofjoin.value = "";
      payrolldata.pay.value = "";
      allowance.length = 1;
      allowance.allowname = "";
      allowance.allowamount = "";
      deduction.length = 1;
      deduction.dedname = "";
      deduction.dedamount = "";
      this.state.totalamount = "";

      console.log("sdfhjsdakf", allowance)



      this.setState({})



      console.log("sdfsdlfjsdfdsf", allowdata);
    }
    else if (this.state.btnChange === true) {
      console.log("sdfkjhsdalfkjhasdj", this.state.addPayroll)
      console.log("sdfkjhsdalfkjhasdjss", this.props.payrolldetails)
      //court name id
      var Employee_Name = this.props.payrolldetails.map((val) => {

        if (val.EmpFirstName === this.state.payrolldata.employeename.value) {
          console.log(val.EmpFirstName, "nix")
          console.log(this.state.payrolldata.employeename.value, "nix")

          return val.EmpFirstName
        }

      })
      for (let i = 0; i < Employee_Name.length; i++) {
        if (Employee_Name[i]) {
          var EmployeeNameId = Employee_Name[i]
          break;
        }
      }
      console.log(EmployeeNameId, "EmployeeNameId")
      //city name id
      var Dept_Name = this.props.payrolldetails.map((val) => {

        if (val.DeptId === this.state.payrolldata.department.value) {
          console.log(val.DeptId, "nix")
          console.log(this.state.payrolldata.department.value, "nix")

          return val.DeptId
        }

      })
      for (let i = 0; i < Dept_Name.length; i++) {
        if (Dept_Name[i]) {
          var EmployeeNameId = Dept_Name[i]
          break;
        }
      }
      var self = this

      let putPayroll = {

        "deptId": this.state.DepId,
        "dateofjoining": this.state.payrolldata.dateofjoin.value,
        "NoOfleaves": this.state.payrolldata.leaves.value,
        "pay": this.state.payrolldata.pay.value,
        "totalamount": this.state.totalamount,
        "monthYear": this.state.monthYear,
        "newAllowancePayrollList": [{
          "allowname": this.state.allowance,
          "allowamount": this.state.allamt,
        }
        ],
        "editAllowancePayrollList": [
          {
            "payRollAllowanceId": this.state.payRollAllowanceId,
            "allowname": this.state.allowance.allowname,
            "allowamount": this.state.allowance.allamt,
          }
        ],
        "delteAllowancePayrollList": [
          {
            payRollAllowanceId: this.state.payRollAllowanceId
          }
        ],
        "newPayrolldeductionList": [
          {
            "dedname": this.state.deduction.dedname,
            "dedamount": this.state.deduction.dedamount
          }
        ],
        "editPayrolldeductionList": [
          {
            "payRollDeductionId": this.state.payRollDeductionId,
            "dedname": this.state.deduction.dedname,
            "dedamount": this.state.deduction.dedamount
          }
        ],
        "deletePayrolldeductionList": [
          {
            "payRollDeductionId": this.state.payRollDeductionId
          }
        ],
      }



      axios({
        method: "POST",
        url: apiurl + "/editPayRoll",
        data: putPayroll

      })
        .then(function (response) {
          console.log(response.data.data, "responseresponse");
          console.log(putPayroll, "putPayroll");
          self.state.payrolldata.employeename.value = ""
          self.state.payrolldata.department.value = ""
          self.state.payrolldata.leaves.value = ""
          self.state.payrolldata.pay.value = ""
          self.state.payrolldata.dateofjoin.value = ""
          self.state.allowance = ""
          self.state.deduction = ""
          notification.warning({
            message: `Payroll Data is Updated successfully`,
            duration: 3.5,
            placement: "topRight",
            className: "notification_court"
          })

          // self.state.payrolldata.amount.value=""
          // self.props.showclose && self.props.showclose()
          self.setState({});
        })
        .catch(function (error) {
          console.log(error, "error");
        });
    }
  };

  callroot = () => {
    this.state.allowance.map((val) => {
      if (val.allowname === "") {
        this.setState({ allerror: true, allerrormsg: "Field Required" });
      } else if (val.allowamount === "") {
        this.setState({ allerror: true, allerrormsg: "Field Required" });
      } else {
        this.setState({ allerror: false });
      }
    });

    this.state.deduction.map((val, index) => {
      if (val.dedname === "") {
        this.setState({ allerror: true, allerrormsg: "Field Required" });
      } else if (val.dedamount === "") {
        this.setState({ allerror: true, allerrormsg: "Field Required" });
      } else {
        this.setState({ allerror: false });
      }
    });
    var payrolldata = this.state.payrolldata;
    var targetkeys = Object.keys(payrolldata);
    this.state.payrolldata.dateofjoin.value = this.props.doj ? this.props.doj : "";
    console.log(targetkeys);
    for (var i in targetkeys) {
      var errorcheck = ValidationLibrary.checkValidation(
        payrolldata[targetkeys[i]].value,
        payrolldata[targetkeys[i]].validation
      );
      console.log(errorcheck);
      payrolldata[targetkeys[i]].error = !errorcheck.state;
      payrolldata[targetkeys[i]].errmsg = errorcheck.msg;
    }
    var filtererr = targetkeys.filter((obj) => payrolldata[obj].error == true);
    console.log(filtererr.length);
    if (filtererr.length > 0) {
      this.setState({ error: true });
    } else {
      this.setState({ error: false, saveBtnClick: true });
    }
    if (filtererr.length === 0 && !this.state.amterror) {
      this.setState(
        {
          payrolldata,
        },
        () => this.check()
      );
    } else {
    }

    console.log(payrolldata, "payrolldata");
  };

  handleChange = (e, key, num) => {
    e.preventDefault();
    this.state.allowance.map((data, index) => {
      whichindex = num;
      if (num === index) {
        if (key === "altext") {
          data.allowname = e.target.value;
          data.allowname !== "" && this.setState({ allerror: false });
          this.setState(
            {
              allowname: data,
            },
            () => console.log("sdfjshdfjsdhf", this.state.allowname)
          );
        }
        if (key === "alamt") {
          data.allowamount = e.target.value;
          data.allowamount !== "" && this.setState({ allerror: false });
          this.setState(
            {
              allowamount: data,
            },
            () => this.handleAllowance()
          );
        }
      }
    });
  };

  handleAllowance = () => {
    console.log("sfjsdhfjsdhfjsdhfsdjf", this.state.dedamount);
    let totalallowance = 0;
    for (let j = 0; j < this.state.allowance.length; j++) {
      totalallowance =
        totalallowance + parseInt(this.state.allowance[j].allowamount);
    }

    console.log("sdfjdshfjshdfjsdf", this.state.payrolldata.pay.value);

    if (this.state.payrolldata.pay.value >= totalallowance) {
      var basicpay =
        totalallowance + parseInt(this.state.payrolldata.pay.value);
      this.setState(
        {
          allamt: false,
          basicpay,
          totalamount: basicpay,
        },
        () => this.state.dedamount !== undefined && this.calculateDeduction()
      );
    } else {
      //

      this.setState({
        allamt: true,
        whichindex,
      });
    }
  };

  handleDeductions = (e, key, num) => {
    e.preventDefault();
    this.state.deduction.map((data, index) => {
      if (num === index) {
        whichindex = num;
        if (key === "dedtext") {
          data.dedname = e.target.value;
          data.dedname !== "" && this.setState({ allerror: false });
          this.setState({
            dedname: data,
          });
        }
        if (key === "dedamount") {
          data.dedamount = e.target.value;
          data.dedamount !== "" && this.setState({ allerror: false });
          this.setState(
            {
              dedamount: data,
            },
            () => this.calculateDeduction()
          );
        }
      }
    });
  };

  calculateDeduction = () => {
    let total = 0;
    for (let i = 0; i < this.state.deduction.length; i++) {
      total = parseInt(total) + parseInt(this.state.deduction[i].dedamount);
    }

    if (this.state.payrolldata.pay.value >= total) {
      var totalamount = this.state.basicpay - total;
      this.setState({
        amterror: false,
        totalamount,
      });
    } else {
      this.setState({ amterror: true, whichindex });
    }
  };

  addItems = () => {
    this.setState(
      {
        allowance: [
          ...this.state.allowance,
          { allowname: "", allowamount: "" },
        ],
      },
      () => console.log("sdfdsfljdsf", this.state.allowance)
    );
  };

  addDeduction = () => {
    this.setState({
      deduction: [...this.state.deduction, { dedname: "", dedamount: "" }],
    });
  };

  removeDeduction = (index) => {
    let deducs = this.state.deduction;
    deducs.splice(index, 1);
    this.setState({ deducs }, () => this.calculateDeduction());
  };

  removeItems = (index) => {
    let list = this.state.allowance;
    list.splice(index, 1);
    this.setState({ list }, () => this.handleAllowance());
  };


  storeMonth = data => {
    console.log("monthdata", dateformat(data._d, "yyyy-mm"))
    this.setState({ monthYear: dateformat(data._d, "yyyy-mm") })
  }

  cancel = () => {
    this.state.payrolldata.department.value = "";
    this.state.payrolldata.department.error = null;
    this.state.payrolldata.department.errmsg = null;

    this.state.payrolldata.employeename.value = "";
    this.state.payrolldata.employeename.error = null;
    this.state.payrolldata.employeename.errmsg = null;

    this.state.payrolldata.pay.value = "";
    this.state.payrolldata.pay.error = null;
    this.state.payrolldata.pay.errmsg = null;

    this.state.payrolldata.leaves.value = "";
    this.state.payrolldata.leaves.error = null;
    this.state.payrolldata.leaves.errmsg = null;

    this.state.payrolldata.dateofjoin.value = "";
    this.state.payrolldata.dateofjoin.error = null;
    this.state.payrolldata.dateofjoin.errmsg = null;
    this.state.allowance.allowname = "";
    this.state.allowance.allowamount = "";
    this.state.deduction.dedamount = "";
    this.state.deduction.dedname = "";
    this.state.totalamount = "";

    this.setState({});
  };
  render() {
    console.log(this.props, "tableRowData")

    const { department, employees } = this.props;
    return (
      <React.Fragment>
        <div className="card  top_move">
          <div className="card-body">
            <Grid item sm={5} md={3}>
              <label>Month & Year</label>
              <div>
                <MonthPicker className="w-100" defaultValue={moment()} onChange={(data) => this.storeMonth(data)} />
              </div>
            </Grid>
            <Grid container spacing={2}>
              <Grid item sm={5} md={3}>
                <Dropdownantd
                  name={"department"}
                  label={"Department"}
                  className={"w-100"}
                  option={department && department.map(val => val.DeptName)}
                  changeData={(data) => this.changeDynamic(data, "department")}
                  value={this.state.payrolldata.department.value}
                  error={this.state.payrolldata.department.error}
                  errmsg={this.state.payrolldata.department.errmsg}
                ></Dropdownantd>
                {/* {box} */}
              </Grid>
              <Grid md={1} />
              <Grid item sm={5} md={3}>
                <Dropdownantd
                  label={"Employee Name"}
                  className={"w-100"}
                  option={employees && employees.map(val => val.EmpFirstName)}
                  changeData={(data) =>
                    this.changeDynamic(data, "employeename")
                  }
                  value={this.state.payrolldata.employeename.value}
                  error={this.state.payrolldata.employeename.error}
                  errmsg={this.state.payrolldata.employeename.errmsg}
                  convertString

                />


              </Grid>
              <Grid md={1} />
              <Grid item sm={5} md={3}>
                <Inputantd
                  label={"Basic Pay"}
                  className={"w-100"}
                  changeData={(data) => this.changeDynamic(data, "pay")}
                  value={this.state.payrolldata.pay.value}
                  error={this.state.payrolldata.pay.error}
                  errmsg={this.state.payrolldata.pay.errmsg}
                />
              </Grid>
              <Grid md={1} />
              <Grid item sm={5} md={3}>
                <Inputantd
                  label={"No. of Leaves"}
                  className={"w-100"}
                  option={[1, 2]}
                  changeData={(data) => this.changeDynamic(data, "leaves")}
                  value={this.state.payrolldata.leaves.value}
                  error={this.state.payrolldata.leaves.error}
                  errmsg={this.state.payrolldata.leaves.errmsg}
                />
              </Grid>
              <Grid md={1} />

              <Grid item md={3} sm={6} className="w-100">
                <Calenderbox
                  placeholder={"dd/mm/yyyy"}
                  className="w-100"
                  label="Date of joining"
                  value={this.props.doj ? moment(this.props.doj) : this.state.payrolldata.dateofjoin.value}
                  error={this.state.payrolldata.dateofjoin.error}
                  format={dateFormat}
                  changeData={(data) => this.changeDynamic(data, "dateofjoin")}
                  errmsg={this.state.payrolldata.dateofjoin.errmsg}
                  disableFuture
                />


              </Grid>
              <Grid md={1} />

              <Grid item sm={12} md={12}>
                <h6 className="form-subheading">Allowance</h6>
              </Grid>

              {this.state.allowance.map((val, index) => {
                return (
                  <div
                    style={{
                      display: "inline-flex",
                      width: "100%",
                      marginLeft: ".8%",
                    }}
                  >
                    <Grid item sm={5} md={3}>
                      <div style={{ marginTop: "10%" }}>
                        <input
                          style={{
                            width: "100%",
                            paddingLeft: "5px",
                            height: "34px",
                          }}
                          onChange={(e) =>
                            this.handleChange(e, "altext", index)
                          }
                          value={this.state.allowance.allowname}
                        />
                        <div>
                          {this.state.allerror && (
                            <span style={{ color: "red", fontSize: "12px" }}>
                              {this.state.allerrormsg}
                            </span>
                          )}
                        </div>
                      </div>
                    </Grid>
                    <Grid md={1} />
                    <Grid item sm={5} md={3}>
                      <div className="input-icons" style={{ marginTop: "10%" }}>
                        <div className="icon">
                          <FaRupeeSign />
                        </div>
                        <input
                          style={{
                            width: "100%",
                            paddingLeft: "28px",
                            height: "34px",
                          }}
                          onChange={(e) => this.handleChange(e, "alamt", index)}
                          value={this.state.allowance.allowamount}
                          type="number"
                        />

                        <div>
                          {this.state.allerror && (
                            <span style={{ color: "red", fontSize: "12px" }}>
                              {this.state.allerrormsg}
                            </span>
                          )}
                        </div>
                        <div>
                          {this.state.allamt &&
                            this.state.whichindex === index && (
                              <span style={{ color: "red" }}>
                                {"Maximum amount exceeded"}
                              </span>
                            )}
                        </div>
                      </div>
                    </Grid>
                    <Grid>
                      {index === 0 ? (
                        <div
                          color="primary"
                          className="icon_down"
                          disabled={""}
                          onClick={this.addItems}
                        >
                          <AddCircleOutlineOutlinedIcon />{" "}
                        </div>
                      ) : (
                          <IconButton
                            aria-label="delete"
                            className="button_align"
                            onClick={() => this.removeItems(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        )}
                    </Grid>
                  </div>
                );
              })}

              <Grid item sm={12} md={12}>
                <h6 className="form-subheading">Deductions</h6>
              </Grid>

              {this.state.deduction.map((val, index) => {
                return (
                  <div
                    style={{
                      display: "inline-flex",
                      width: "100%",
                      marginLeft: ".8%",
                    }}
                  >
                    <Grid item sm={5} md={3}>
                      <div style={{ marginTop: "10%", marginBottom: "10%" }}>
                        <input
                          style={{
                            width: "100%",
                            paddingLeft: "5px",
                            height: "34px",
                          }}
                          onChange={(e) =>
                            this.handleDeductions(e, "dedtext", index)
                          }
                          value={this.state.deduction.dedname}
                        />
                        <div>
                          {this.state.allerror && (
                            <span style={{ color: "red", fontSize: "12px" }}>
                              {this.state.allerrormsg}
                            </span>
                          )}
                        </div>
                      </div>
                    </Grid>
                    <Grid md={1} />
                    <Grid item sm={5} md={3}>
                      <div className="input-icons" style={{ marginTop: "10%" }}>
                        <div className="icon">
                          <FaRupeeSign />
                        </div>
                        <input
                          style={{
                            width: "100%",
                            paddingLeft: "28px",
                            height: "34px",
                          }}
                          onChange={(e) =>
                            this.handleDeductions(e, "dedamount", index)
                          }
                          value={this.state.deduction.dedamount}
                          type="number"
                        />
                        <div>
                          {this.state.allerror && (
                            <span style={{ color: "red", fontSize: "12px" }}>
                              {this.state.allerrormsg}
                            </span>
                          )}
                        </div>

                        <div>
                          {this.state.amterror &&
                            this.state.whichindex === index && (
                              <span style={{ color: "red" }}>
                                {"Maximum amount exceeded"}
                              </span>
                            )}
                        </div>
                      </div>
                    </Grid>
                    <Grid>
                      {index === 0 ? (
                        <div
                          color="primary"
                          className="icon_down"
                          disabled={""}
                          onClick={this.addDeduction}
                        >
                          <AddCircleOutlineOutlinedIcon />{" "}
                        </div>
                      ) : (
                          <IconButton
                            aria-label="delete"
                            className="button_align"
                            onClick={() => this.removeDeduction(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        )}
                    </Grid>
                  </div>
                );
              })}
            </Grid>
            <Grid item sm={5} md={3}>
              <Inputantd
                label={"Total Amount"}
                className={"w-100"}
                value={this.state.totalamount}
              />
            </Grid>

            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              // className="mt-5"
              spacing={3}
            >
              <Grid item>
                <Button
                  className="appRating_btnsize btnclr"
                  onClick={!this.state.saveBtnClick ? this.callroot : null}
                // {this.state.saveBtnClick === true ? this.checkValidation : null}
                >
                  {this.state.btnChange === true ? "Update" : "Save"}
                </Button>
              </Grid>
              {/* <Grid item>
                <Button className="btnwidth btnclr" onClick={this.callroot}>
                  Save
                </Button>
              </Grid> */}
              <Grid item>
                <Button
                  className="btnwidth btnclr_outline"
                  onClick={this.cancel}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  employees: state.severance.employees,
  department: state.fixers.department,
  doj: state.severance.doj
})

export default connect(mapStateToProps)(EmployeeAddPayroll);
