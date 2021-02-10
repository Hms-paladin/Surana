import React from "react";
import DynTable from "./payrollTable/DynTable";
import tableschema from "./payrollTable/TableLTRschema.json";
import { Grid } from "@material-ui/core";
import Inputantd from "../../../formcomponent/inputantd";
import Calenderbox from "../../../formcomponent/calenderbox";
import Button from "react-bootstrap/Button";
import "./EmployeeAddPayroll.css";
import { apiurl } from "../../../App";
import ValidationLibrary from "../../../validationlibrary/validation.js";
import moment from "moment";
import dateformat from "dateformat";
import { DatePicker } from "antd";
import { data } from "jquery";

const axios = require("axios");
const { MonthPicker } = DatePicker;

class EmployeePayrolllist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userdata: null,
      edituserdata: null,
      modalvisible: false,
      usertabledata: [],
      usertabledatastatic: [],
      edit: null,
      user: "",
      Payroll: {
        monthYear: dateformat(moment(), "yyyy-mm"),
      },
    };
  }

  componentDidMount() {
    this.getTableData();
  }

  payrollMonth = (data) => {
    console.log(this.state.Payroll.monthYear,"why");
    let payroll = this.state.Payroll;
    payroll.monthYear = dateformat(data._d, "yyyy-mm")
    this.setState({Payroll:payroll});
    this.getTableData();
  };

  
  getTableData=()=>{
    var self = this;
    axios({
      method: "post",
      url: apiurl + "/getPayRollList",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data:{
        monthYear:this.state.Payroll.monthYear
    }
    }).then(function (response) {
        console.log(response.data.data, "resdata");
        var usertabledata = [];
        // var usertabledatastatic = [];
        response.data.data.map((data,index) => {
          usertabledata.push({
            EmpFirstName: data.EmpFirstName,
            DeptName: data.DeptName,
            numberOfWorkingDays:data.numberOfWorkingDays,
            TotalAmount:data.TotalAmount,
            basicPay:data.basicPay,
            id:data.payRollId
          });
          // usertabledatastatic.push({
          //   EmpFirstName: data.EmpFirstName,
          //   DeptName: data.DeptName,
          //   numberOfWorkingDays:data.numberOfWorkingDays,
          //   basicPay:data.basicPay
          // });
        });
        
        
        self.setState({usertabledata:usertabledata})
      })
      
      .catch(function (error) {
        console.log(error, "error");
      });
  }
  editClick = (id, data) => {
    this.props.propFunc(id, data);
    console.log(data, "editdata");
    console.log(id, "editdata");
  };
  
deleteData =(data)=>{
console.log(data,"snfskn")
axios({
  method: "DELETE",
  url: apiurl + "/deletepaylist",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  data:{
   "PayId":data
}
}).then((response)=>{
  console.log(response.data.data, "resdata");
  this.getTableData()
})
}

  render() {
    return (
      <div className="card mt-4">
        <div className="card-body">
          <Grid container spacing={3} className="mb-3 mt-1">
            <Grid item md={2} sm={4}></Grid>
            <Grid item md={2} sm={2} className="p-0">
              <span>Month & Year</span>
              <div>
                <MonthPicker
                  className="w-100"
                  defaultValue={moment()}
                  onChange={(data) => this.payrollMonth(data)}
                />
              </div>
            </Grid>

          </Grid>
          <div>
            <DynTable
            // editOpen={(id, rowdata) => this.editClick(id, rowdata)}
            editclose="editicon"
            tabledata={this.state.usertabledata}
            primaryKey="userId"
            tableschema={tableschema.fields}
            multideleteData={(data) => this.multideleteData(data)}
            deleteData={(data) => this.deleteData(data)}            
            tablehead={"Payroll List Search"} >
            </DynTable>
          </div>
        </div>
      </div>
    );
  }
}
export default EmployeePayrolllist;
