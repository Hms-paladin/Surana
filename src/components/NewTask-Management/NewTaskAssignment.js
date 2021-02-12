import React from "react";
import { Grid } from "@material-ui/core";
import DayreportDropDown from '../../formcomponent/dayreportDropDown';
import { Button } from "react-bootstrap";
import "./NewAssignment.css";
import Inputantd from "../../formcomponent/inputantd";
import Calenderbox from "../../formcomponent/calenderbox";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ValidationLibrary from "../../validationlibrary/validation";
import {
  getEmployee,
  getProjectCase,
} from "./TaskAssignmentAction/TaskAssignmentAction";
import { connect } from "react-redux";
import { DatePicker,Select,notification } from "antd";
import { apiurl } from '../../App'
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import moment from "moment";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import axios from "axios";
import Dropdownantd from "../../formcomponent/dropdownantd";
import { getClient } from '../../fixers/fixersAction';

const Axios = require("axios");
var whichindex = null;
const { Option } = Select;
class NewTaskAssignment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      changeval: true,
      assignments:[],
      saveBtnClick:false,
      errordummy: true,
      btnChange:false,
      data: [{ key: 1 }],
      allerror: false,
      allerrormsg: null,
      Assignments: [
        {
          // taskId:'',
          task: "",
          efforthours: Number(""),
          expectedDate:moment(new Date()).format('YYYY-MM-DD'),
          prId: "",
          percentage: "",
        },
      ],
      newtaskassignData: {
        newAssign_empoyee: {
          value: "",
          validation: [{ name: "required" }],
          error: null,
          errmsg: null,
        },
        Client: {
          value: "",
          validation: [{ name: "required" }],
          error: null,
          errmsg: null,
        },
        Project: {
          value: "",
          validation: [{ name: "required" }],
          error: null,
          errmsg: null,
        },
      },
      whichindex: null,
      TaskId:'',
    };
  }
  async componentDidMount() {
    await this.props.getProjectCase();
    await this.props.getEmployee();
    await this.props.getClient();
    this.getPriority();
  }

  checkValidation = () => {
    this.state.Assignments.map((val) => {
      if (val.task === "") {
        this.setState({ allerror: true, allerrormsg: "Field Required" });
      } else if (val.efforthours === "") {
        this.setState({ allerror: true, allerrormsg: "Field Required" });
      } else if (val.expectedDate) {
        this.setState({ allerror: true, allerror: "Field Required" });
      } else if (val.prId=== "") {
        this.setState({ allerror: true, allerror: "Field Required" });
      } 
      else if (val.percentage ==="") {
        this.setState({ allerror: true, allerror: "Field Required" });
      }else {
        this.setState({ allerror: false });
      }
    });
    var mainvalue = {};
    var newtaskassignData = this.state.newtaskassignData;
    var targetkeys = Object.keys(newtaskassignData);
    console.log(targetkeys, "targetkeys");
    for (var i in targetkeys) {
      var errorcheck = ValidationLibrary.checkValidation(
        newtaskassignData[targetkeys[i]].value,
        newtaskassignData[targetkeys[i]].validation
      );
      console.log(errorcheck, "errorcheck");
      newtaskassignData[targetkeys[i]].error = !errorcheck.state;
      newtaskassignData[targetkeys[i]].errmsg = errorcheck.msg;
      mainvalue[targetkeys[i]] = newtaskassignData[targetkeys[i]].value;
    }
    var filtererr = targetkeys.filter(
      (obj) => newtaskassignData[obj].error == true
    );
    console.log(filtererr.length);
    if (filtererr.length > 0) {
      this.setState({ error: true });
    } else {
      this.setState({ error: false, saveBtnClick:true });
    }
    this.setState({
      // mainvalue,
      newtaskassignData,
    });
    this.check();
  };

  check = () => {
    if(this.state.btnChange === false){
      var self = this;
    var taskData = {
      empId:this.state.newtaskassignData.newAssign_empoyee.value,
      clientId:this.state.newtaskassignData.Client.value,
      projectId:this.state.newtaskassignData.Project.value,
      task:this.state.Assignments,
     
    
      // 'ClientIndustry':this.state.client_industry.value
    };
    // Axios.post()
    //   this.props.dispatch(addnewtaskassignData(allowdata))
    // console.log('see',this.props)
    //   console.log("sdfsdlfjsdfdsf", allowdata)
    Axios({
      method: "POST",
      url: apiurl + "/addtaskassignment",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: taskData,
    })
      .then((response) => {
        notification.warning({
          message: `Added successfully`,
          duration: 3.5,
          placement: "topRight",
          className: "Notification_Case",
        });
        this.state.newtaskassignData.Project.value = "";
        this.state.newtaskassignData.newAssign_empoyee.value = "";
        this.state.newtaskassignData.Client.value = "";
        self.setState({
          saveBtnClick:false
        });
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
    }
    // Update
    else if(this.state.btnChange === true){
      console.log("sdfkjhsdalfkjhasdj",this.state.addtaskdata)
      console.log("sdfkjhsdalfkjhasdjss",this.props.taskEmployee)
      //court name id
      var Employee_Name=this.props.taskEmployee.map((val) => {
 
        if(val.EmpFirstName === this.state.newtaskassignData.newAssign_empoyee.value){
          console.log(val.EmpFirstName,"nix")
          console.log(this.state.newtaskassignData.newAssign_empoyee.value,"nix")

          return val.EmpId
        } 
      
    })
    for(let i = 0;i<Employee_Name.length;i++){
      if(Employee_Name[i]){
        var EmployeeNameId = Employee_Name[i]
        break;
      }
    }
    console.log(EmployeeNameId,"EmployeeNameId")
    //city name id
    var Client_Name=this.props.taskEmployee.map((val) => {
 
      if(val.EmpFirstName === this.state.newtaskassignData.Client.value){
        console.log(val.EmpFirstName,"its me")
        console.log(this.state.newtaskassignData.newAssign_empoyee.value,"dont show")

        return val.ClientId
      } 
    
  })

  for(let i = 0;i<Client_Name.length;i++){
    if(Client_Name[i]){
      var ClientNameId = Client_Name[i]
      break;
    }
  }
  console.log(ProjectNameId,"ProjectNameId")
  //city name id
  var Project_Name=this.props.taskProject.map((val) => {

    if(val.ProjectName === this.state.newtaskassignData.Project.value){
      console.log(val.ProjectName,"its me")
      console.log(this.state.newtaskassignData.Project.value,"dont show")

      return val.ProjectId
    } 
  
})
for(let i = 0;i<Project_Name.length;i++){
  if(Project_Name[i]){
    var ProjectNameId = Project_Name[i]
    break;
  }
}
      var self = this
      
      let putAssignmentData={
        "empId":this.state.newtaskassignData.newAssign_empoyee.value,
        "clientId":this.state.newtaskassignData.Client.value,
        "projectId":this.state.newtaskassignData.Project.value,              
        "task":[{
          "taskId":this.state.TaskId,
          "task" :this.state.Assignments.task,
          "efforthours":this.state.Assignments.efforthours,
          "expectedDate":this.state.Assignments.expectedDate,
          "prId":this.state.Assignments.prId,
          "percentage":this.state.Assignments.percentage
        }],
        // "taskId":this.state.Assignments
      }

    

      axios({
        method: "PUT",
        url: apiurl + "/updateassignment",
        data: putAssignmentData                 
        
      })
        .then(function (response) {
          console.log(response.data.data, "responseresponse");
          console.log(putAssignmentData, "putAssignmentData");
          self.state.newtaskassignData.newAssign_empoyee.value=""
          self.state.newtaskassignData.Client.value=""
          self.state.newtaskassignData.Project.value=""
          self.state.Assignments=""
          notification.warning({
            message: `Task Assignment Data is Updated successfully`,
            duration: 3.5,
            placement: "topRight",
            className:"notification_court"
          })
          
          // self.state.newtaskassignData.amount.value=""
          // self.props.showclose && self.props.showclose()
          self.setState({});
        })
        .catch(function (error) {
          console.log(error, "error");
        });  
    }
  };

  changeDynamic = (data, key) => {
    console.log("key", key);
    console.log("data", data);
    var newtaskassignData = this.state.newtaskassignData;
    var targetkeys = Object.keys(newtaskassignData);
    var errorcheck = ValidationLibrary.checkValidation(
      data,
      newtaskassignData[key].validation
    );
    newtaskassignData[key].value = data;
    newtaskassignData[key].error = !errorcheck.state;
    newtaskassignData[key].errmsg = errorcheck.msg;
    this.setState({ newtaskassignData });
    var filtererr = targetkeys.filter(
      (obj) =>
        newtaskassignData[obj].error == true ||
        newtaskassignData[obj].error == null
    );
    if (filtererr.length > 0) {
      this.setState({ error: true, errordummy: false });
    } else {
      this.setState({ error: false
         });
    }
    this.setState({
      // mainvalue,
      newtaskassignData,
    });
  };
  UNSAFE_componentWillReceiveProps(newProps){
    if(newProps.tableRowData){
     
    this.state.newtaskassignData.newAssign_empoyee.value = newProps.tableRowData.data.Employee
    this.state.newtaskassignData.Client.value = newProps.tableRowData.data.client
    this.state.newtaskassignData.Project.value=newProps.tableRowData.data.ProCase
    this.state.Assignments.task=newProps.tableRowData.data.Task
    this.state.Assignments.efforthours=newProps.tableRowData.data.Efforthours
    this.state.Assignments.expectedDate=moment(newProps.tableRowData.data.ExpectedDate).format('YYYY-MM-DD')
    this.state.Assignments.prId=newProps.tableRowData.data.Priority
    this.state.Assignments.percentage=newProps.tableRowData.data.Percentage
    this.state.TaskId=newProps.tableRowData.data.id
    console.log(newProps,"newProps")
    

    this.setState({btnChange:true})
  }
  }
  addAssignment = () => {
    this.setState(
      {
        Assignments: [
          ...this.state.Assignments,
          { task: "",expectedDate: "", efforthours: "", prId: "",percentage:"" },
        ],
      },
      () => console.log("sdfdsfljdsf", this.state.Assignments)
    );
  };
  removeItems = (index) => {
    let list = this.state.Assignments;
    list.splice(index, 1);
    this.setState({ list });
  };
  handleChange = (e, key, num) => {
    e.preventDefault();
    let task_Assignment = this.state.Assignments;
    let getAssignment = task_Assignment[num];
    if (key === "task") {
      getAssignment.task = e.target.value;
      console.log("empty", getAssignment.task);
      getAssignment.task !== "" && this.setState({ allerror: false });
    } else if (key === "efforthours") {
      getAssignment.efforthours = Number(e.target.value);
      console.log("efforthours", getAssignment.efforthours);
    }
     else if (key === "expectedDate") {
      getAssignment.expectedDate = e.target.value;
      console.log("expectedDate", getAssignment.expectedDate);
    } else if (key === "prId") {
      getAssignment.prId = e.target.value;
      console.log("prId", getAssignment.prId);
    }
    else if (key === "percentage") {
      getAssignment.percentage = Number(e.target.value);
      console.log("percentage", getAssignment.percentage);
    }
    this.setState({ Assignments: task_Assignment });
  };
  simpleDate = (data, num) => {
    let selectedDate = data !== null ? data._d : "";

    if (selectedDate === "") {
      var convertDate = "";
    } else {
      var convertDate =
        selectedDate.getFullYear() +
        "-" +
        (selectedDate.getMonth() + 1) +
        "-" +
        selectedDate.getDate();
    }

    this.state.Assignments.map((val, index) => {
      if (num === index) {
        val.expectedDate = convertDate;
        console.log("sadfkjsahfajkherkjhaskjdf", val);

        this.setState(
          {
            Interimdate: val,
          },
          () =>
            console.log("safkjsdhfjshfjsdfh", this.state.Assignments[0].expectedDate)
        );
      }
    });

    this.setState({});
  };
  

getPriority = () => {
  fetch(apiurl + "/priority", {
    method: "get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log("sdflkjsdlkfjsdfkdfdsjdf", responseJson);
      this.setState({
        assignments: responseJson.data,
      });
    });
};
nameList = () => {
  var assignments = [];
  for (let i = 0; i < this.state.assignments.length; i++) {
    console.log(this.state.assignments, "Assignments...");
    assignments.push(
      <Option key={i + 1}  value={this.state.assignments[i].PrId}>
        {this.state.assignments[i].Priority}
      </Option>
    );
  }
  return assignments;
};
nameSelect = (event, num) => {
  let allerror = "";
  this.state.Assignments.map((val, index) => {
    console.log(val,"val")
    whichindex = index;
    if (val.assignments === "") {
      allerror = "Field Required";
    }
    if (num === index) {
      val.prId = event.props.value     
      
      this.setState({});
    }
  });
};
  render() {
    console.log("taskAssignment", this.state.Assignments);
    return (
      <React.Fragment>
        <div className="card top_move">
          <div className="card-body">
            <Grid container spacing={6} className="mt-3">
              <Grid item md={4} sm={5}>
                <Dropdownantd
                  label="Employee"
                  className="w-100"
                  option={
                    this.props.taskEmployee &&
                    this.props.taskEmployee.map((val) => val.EmpFirstName)
                  }

                  changeData={(data) =>
                    this.changeDynamic(data, "newAssign_empoyee")
                  }
                  value={this.state.newtaskassignData.newAssign_empoyee.value}
                  error={this.state.newtaskassignData.newAssign_empoyee.error}
                  errmsg={this.state.newtaskassignData.newAssign_empoyee.errmsg}
                ></Dropdownantd>
              </Grid>
              <Grid item md={4} sm={5}>
                <Dropdownantd
                  label="Client"
                  className="w-100"
                    option={
                      this.props.clientList &&
                      this.props.clientList.map((val) => val.ClientName)
                    }
                  
                  changeData={(data) => this.changeDynamic(data, "Client")}
                  value={this.state.newtaskassignData.Client.value}
                  error={this.state.newtaskassignData.Client.error}
                  errmsg={this.state.newtaskassignData.Client.errmsg}
                ></Dropdownantd>
              </Grid>
              <Grid item md={4} sm={5}>
                <Dropdownantd
                  label="Project/Case"
                  className="w-100"
                  option={
                    this.props.taskProject &&
                    this.props.taskProject.map((val) => val.ProjectName)
                  }
                  changeData={(data) => this.changeDynamic(data, "Project")}
                  value={this.state.newtaskassignData.Project.value}
                  error={this.state.newtaskassignData.Project.error}
                  errmsg={this.state.newtaskassignData.Project.errmsg}
                ></Dropdownantd>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item md={12} sm={12}>
              <div className="card mt-5">
                  <div className="card-body">
                    <div className="newExp_border">
                      {/* <div>
                        <AddCircleOutlineOutlinedIcon
                          onClick={this.addAssignment}
                          className="newExp_addicon"
                        />
                      </div> */}
                      {this.state.Assignments.map((val, index) => {
                        return (
                          <div className="flex">
                            <Grid item sm={6} md={3}>
                              {/* <Inputantd
                            label={"Name"}
                            className={"w-100"}
                            changeData={(data) =>
                              this.changeDynamic(data, "name")
                            }
                            value={this.state.newtaskassignData.name.value}
                            error={this.state.newtaskassignData.name.error}
                            errmsg={this.state.newtaskassignData.name.errmsg}
                          /> */}
                              <div style={{ marginTop: "5%" }}>
                                <div>
                                  <label>Task</label>
                                </div>
                                <input
                                  style={{
                                    width: "100%",
                                    paddingLeft: "5px",
                                    height: "34px",
                                  }}
                                  onChange={(e) =>
                                    this.handleChange(e, "task", index)
                                  }
                                  value={this.state.Assignments.task}
                                />
                                <div>
                                  {this.state.allerror &&
                                    this.state.Assignments[index].task == "" && (
                                      <span
                                        style={{
                                          color: "red",
                                          fontSize: "12px",
                                        }}
                                      >
                                        {this.state.allerrormsg}
                                      </span>
                                    )}
                                </div>
                              </div>
                            </Grid>
                            <Grid md={1} />
                            <Grid item sm={6} md={3}>
                              <div style={{ marginTop: "5%" }}>
                                <div>
                                  <label>Effort Hours</label>
                                </div>
                                <input
                                  type="number"
                                  style={{
                                    width: "100%",
                                    paddingLeft: "5px",
                                    height: "34px",
                                  }}
                                  onChange={(e) =>
                                    this.handleChange(e, "efforthours", index)
                                  }
                                  value={this.state.Assignments.efforthours}
                                />

                                <div>
                                  {this.state.allerror &&
                                    this.state.Assignments[index].efforthours == "" && (
                                      <span
                                        style={{
                                          color: "red",
                                          fontSize: "12px",
                                        }}
                                      >
                                        {this.state.allerrormsg}
                                      </span>
                                    )}
                                </div>
                              </div>
                            </Grid>
                            <Grid md={1} />
                            <Grid item sm={6} md={3}>
                              <div style={{ marginTop: "5%" }}>
                              <div className="mt-2">
                                <label>Expected Date</label>
                              </div>
                              <DatePicker
                                value={
                                  this.state.Assignments[index].expectedDate !== ""
                                    ? moment(
                                        this.state.Assignments[index].expectedDate
                                      )
                                    : ""
                                }
                                onChange={(data) => this.simpleDate(data, index)}
                              />
                                
                              </div>
                            </Grid>
                            <Grid item md={1} />
                            <Grid item sm={6} md={3}>
                              <div style={{ marginTop: "5%" }}>
                              <div>
                                <label>Priority</label>
                              </div>
                              <Select
                                onChange={(prId,event) =>
                                  this.nameSelect(event, index)
                                }
                                style={{ width: "100%" }}
                              >
                                {this.nameList()}
                              </Select>

                              <div>
                                {this.state.allerror &&
                                  this.state.Assignments[index].prId == "" && (
                                    <span
                                      style={{ color: "red", fontSize: "12px" }}
                                    >
                                      {this.state.allerrormsg}
                                    </span>
                                  )}
                              </div>
                                
                              </div>
                            </Grid>
                            <Grid md={1} />
                            <Grid item md={1} sm={2}  className="offer_adjust" >
                              <LocalOfferOutlinedIcon/>
                              </Grid>
                              {/* <Grid md={1} /> */}
                            <Grid item sm={6} md={3}>
                              <div style={{ marginTop: "5%" }}>
                                <div>
                                  <label>%</label>
                                </div>
                                <input
                                  type="number"
                                  style={{
                                    width: "50%",
                                    paddingLeft: "5px",
                                    height: "34px",
                                  }}
                                  onChange={(e) =>
                                    this.handleChange(e, "percentage", index)
                                  }
                                  value={this.state.Assignments.percentage}
                                />

                                <div>
                                  {this.state.allerror &&
                                    this.state.Assignments[index].percentage == "" && (
                                      <span
                                        style={{
                                          color: "red",
                                          fontSize: "12px",
                                        }}
                                      >
                                        {this.state.allerrormsg}
                                      </span>
                                    )}
                                </div>
                               
                              </div>
                             
                            </Grid>
                            {index === 0 ? (
                                <div className="addassign_addbtn">
                                <AddCircleOutlineOutlinedIcon
                                  onClick={this.addAssignment}
                                  className="newExp_addicon"
                                />
                              </div>
                              ):null}
                            <Grid>
                              {index === 0 ? null : (
                                <IconButton
                                  aria-label="delete"
                                  className="button_align "
                                  onClick={() => this.removeItems(index)}
                                >
                                  <DeleteIcon className="mt-4" />
                                </IconButton>
                              )}
                            </Grid>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                className="mt-2"
                spacing={3}
              >
                <Grid item>
                  <Button
                    className="appRating_btnsize btnclr"
                    onClick={!this.state.saveBtnClick ? this.checkValidation : null}
                    // {this.state.saveBtnClick === true ? this.checkValidation : null}
                  >
                    {this.state.btnChange === true ? "Update" : "Save" } 
                  </Button>
                </Grid>
                <Grid item>
                  <Button className="appRating_btnsize btnclr_outline">
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  console.log("stateeee", state);

  return {
    newtaskassignData: state.resumeReducer.newtaskassignData,
    taskEmployee: state.taskAssignment.getemployeeName,
    taskProject: state.taskAssignment.getprojectCase,
    taskEdit:state.taskAssignment.puttaskData,
    clientList:state.fixers.clients
  };
};
export default connect(mapStateToProps, {
  getProjectCase,
  getEmployee,
  getClient
})(NewTaskAssignment);

