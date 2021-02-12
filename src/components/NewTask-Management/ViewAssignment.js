import React from "react";
// import tableschema from "./TaskAssignmentTable/TableLTRschema.json";
import taskSchema from './TaskAssignmentSchema.json';
import EnhancedTable from "./TaskAssignmentTable/DynTable";
import Grid from "@material-ui/core/Grid";
// import "./previewresume.css"
import { apiurl } from "../../App";
import { Modal } from "antd";
import { Input, notification } from "antd";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Dropdownantd from "../../formcomponent/dropdownantd";
import { getEmployee } from "./TaskAssignmentAction/TaskAssignmentAction";
import { connect } from "react-redux";
import ValidationLibrary from "../../validationlibrary/validation";
import pin from '../../images/court.jpg'
const { Search } = Input;
const axios = require("axios");

class ViewAssignment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userdata: null,
      edituserdata: null,
      usertabledata: [],
      edit: null,
      errordummy: true,
      modalShow: false,
      modalShowsms: false,
      search: null,
      viewAssignmentData: {
        Employee: {
          value: "",
          validation: [{ name: "required" }],
          error: null,
          errmsg: null,
        },
      },
    };
  }
  setModalShow = (e) => {
    this.setState({
      modalShow: e,
    });
  };
  setModalShowsms = (e) => {
    this.setState({
      modalShowsms: e,
    });
  };

  componentDidMount() {
    this.getAssignment();
    this.props.getEmployee();
  }
  getAssignment = () => {
    var self = this;
    axios({
      method: "get",
      url: apiurl + "/viewAssignment",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        console.log(response.data.data, "resdata");
        var usertabledata = [];
        // var tagvalue = []
        response.data.data.map((data, index) => {
          usertabledata.push({
            Employee: data.Employee,
            Task: data.Task,
            Efforthours: data.Efforthours,
            ExpectedDate: data.ExpectedDate,
            Priority: data.Priority,

            Percentage: data.Percentage,
            // client:data.ClientName,
            // ProCase:data.ProjectName,
            id: data.TaskId,
          });
        });
        self.setState({ usertabledata: usertabledata });
      })
      .catch(function (error) {
        console.log(error, "error");
      });
  };

  searchdata = (e) => {
    this.setState({
      search: e.target.value,
    });
  };

  AddClick = () => {
    this.props.propFunc();
    this.setState({});
  };
  editClick = (id, data) => {
    this.props.propFunc(id, data);
    console.log(data, "editdata");
    console.log(id, "editdata");
  };
  deleterow = (data) => {   
    console.log(data, "data");
    var self = this;
    axios({
      method: "delete",
      url: `${apiurl}/removetaskassignment`,
      data: {
        "taskId": data,
      },
    })
      .then(function (response) {
        console.log(response, "responsecourt");
        // self.props.opendelete()
        self.getAssignment();
        alert("ggg");
        self.setState({ deleteSuccessClose: true });
        notification.warning({
          message: `Deleted successfully`,
          duration: 3.5,
          placement: "topRight",
          className: "notification_court",
        });
      })
      .catch(function (error) {
        console.log(error, "myerror");
      });
    this.setState({});
  };
   
  changeDynamic = (data, key) => {
    console.log("key", key);
    console.log("data", data);
    var viewAssignmentData = this.state.viewAssignmentData;
    var targetkeys = Object.keys(viewAssignmentData);
    var errorcheck = ValidationLibrary.checkValidation(
      data,
      viewAssignmentData[key].validation
    );
    viewAssignmentData[key].value = data;
    viewAssignmentData[key].error = !errorcheck.state;
    viewAssignmentData[key].errmsg = errorcheck.msg;
    this.setState({ viewAssignmentData });
    var filtererr = targetkeys.filter(
      (obj) =>
        viewAssignmentData[obj].error == true ||
        viewAssignmentData[obj].error == null
    );
    if (filtererr.length > 0) {
      this.setState({ error: true, errordummy: false });
    } else {
      this.setState({ error: false });
    }
  };
  checkValidation = () => {
    var mainvalue = {};
    var viewAssignmentData = this.state.viewAssignmentData;
    var targetkeys = Object.keys(viewAssignmentData);
    console.log(targetkeys, "targetkeys");
    for (var i in targetkeys) {
      var errorcheck = ValidationLibrary.checkValidation(
        viewAssignmentData[targetkeys[i]].value,
        viewAssignmentData[targetkeys[i]].validation
      );
      console.log(errorcheck, "errorcheck");
      viewAssignmentData[targetkeys[i]].error = !errorcheck.state;
      viewAssignmentData[targetkeys[i]].errmsg = errorcheck.msg;
      mainvalue[targetkeys[i]] = viewAssignmentData[targetkeys[i]].value;
    }
    var filtererr = targetkeys.filter(
      (obj) => viewAssignmentData[obj].error == true
    );
    console.log(filtererr.length);
    if (filtererr.length > 0) {
      this.setState({ error: true });
    } else {
      this.setState({ error: false });
    }
    this.setState({
      mainvalue,
      viewAssignmentData,
    });
  };

  render() {
    const searchdata = this.state.usertabledata.filter((data) => {
      if (this.state.search === null) return data;
      else if (
        (data.Employee !== null &&
          data.Employee.toLowerCase().includes(
            this.state.search.toLowerCase()
          )) ||
        (data.Task !== null &&
          data.Task.toLowerCase().includes(this.state.search.toLowerCase())) ||
        (data.Efforthours !== null &&
          data.Efforthours.toLowerCase().includes(
            this.state.search.toLowerCase()
          )) ||
        (data.ExpectedDate !== null &&
          data.ExpectedDate.toLowerCase().includes(
            this.state.search.toLowerCase()
          )) ||
        (data.Priority !== null &&
          data.Priority.toLowerCase().includes(
            this.state.search.toLowerCase()
          )) ||
        (data.Percentage !== null &&
          data.Percentage.toLowerCase().includes(
            this.state.search.toLowerCase()
          ))
      ) {
        return data;
      }
    });
    return (
      <div>
        <div className=" empmaster_tablemain">
          <div>
            <Dropdownantd
              className="w-25"
              option={
                this.props.taskEmployee &&
                this.props.taskEmployee.map((val) => val.EmpFirstName)
              }
              changeData={(data) => this.changeDynamic(data, "Employee")}
              value={this.state.viewAssignmentData.Employee.value}
              error={this.state.viewAssignmentData.Employee.error}
              errmsg={this.state.viewAssignmentData.Employee.errmsg}
            ></Dropdownantd>
          </div>
          <div className="caseListSearch">
            <Search
              // cand_search
              className="case_Search"
              placeholder="Search.."
              // onSearch={value => console.log(value)}
              enterButton
              onChange={this.searchdata}
            />
            {/* <AddCircleOutlineIcon
              className="case_addicon"
              onClick={() => this.AddClick()}
            /> */}
          </div>
          <div className="table_x_scroll">
            <EnhancedTable
              tabledata={searchdata}
              primaryKey="userId"
              tableschema={taskSchema.fields}
              multideleteData={(data) => this.multideleteData(data)}

              deleterow={(id) => this.deleterow(id)}
              deleteSuccessClose={this.state.deleteSuccessClose}
              editOpen={(id, rowdata) => this.editClick(id, rowdata)}
              mainclassName={"userwidth"}
              tablehead={"View Assignment"}
              editclose={"editicon"}
              deleteclose={"deleteicon"}



            />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log("stateeee", state);

  return {
    viewAssignmentData: state.resumeReducer.viewAssignmentData,
    taskEmployee: state.taskAssignment.getemployeeName,
  };
};
export default connect(mapStateToProps, {
  getEmployee,
})(ViewAssignment);
