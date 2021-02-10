import React from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import "./employeeapprisal.css";
import Grid from "@material-ui/core/Grid";
import Inputantd from "../../../formcomponent/inputantd";
import { Select, Table, Input } from "antd";
import { apiurl } from "../../../App";
import Dropdownantd from "../../../formcomponent/dropdownantd";
import ValidationLibrary from "../../../validationlibrary/validation";
import Button from "react-bootstrap/Button";
import "./employeekra.css";
import { notification } from "antd";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
const { Option } = Select;
const { Column } = Table;

let whichindex = "";

const initialState = {
  employeeError: "",
  acterror: "",
  subacterror: "",
  pererror: "",
  errorstate: "",
};

class EmployeeKRA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{ key: 1, sno: 1 }],
      kra_data: [
        {
          activityId: "",
          subactivityId: "",
          percentage: "",
        },
      ],
      activities: [],
      subactivities: [],
      employees: [],
      total: "",

      initialState,
      whichindex: "",
      total: "",
      employee: null,
      employeekra: [],
    };
  }

  addItems = () => {
    this.setState(
      {
        kra_data: [
          ...this.state.kra_data,
          { activity: "", subactivity: "", percentage: "" },
        ],
      },
      () => console.log("sdkfjdskfjsdfdsfjdklsf", this.state.kra_data)
    );
  };

  componentDidMount() {
    this.getActivity();
    this.getSubActivity();
    this.getEmployees();
  }

  validation = () => {
    let employeeError = "";
    let activityError = "";
    let subactivityError = "";
    let percentageError = "";
    let errorper = "";

    if (this.state.employee === null) {
      employeeError = "Field Required";
    }
    this.state.kra_data.map((val, index) => {
      whichindex = index;
      console.log("sdflsdfjkdsfsdkfsdkf", val.percentage);
      if (val.activityId === "") {
        activityError = "Field Required";
      }
      if (val.subactivityId === "") {
        subactivityError = "Field Required";
      }
      if (val.percentage === "") {
        percentageError = "Field Required";
      }

      if (val.percentage > 100) {
        alert("Maximum percentage exceeded");
        errorper = "maximum";
      }
    });

    if (
      employeeError ||
      activityError ||
      subactivityError ||
      percentageError ||
      errorper
    ) {
      this.setState({
        employeeError,
        activityError,
        subactivityError,
        percentageError,
        errorper,
        whichindex,
      });
      return false;
    }
    return true;
  };

  sendKraData = () => {
    const isValid = this.validation();
    if (isValid) {
      console.log("sdfsdhfjdshfjsdhfjsdf", this.state.total);
      let apidata = {
        empId: this.state.employee,
        employeekra: this.state.kra_data,
        total: this.state.total,
      };

      console.log("sdfkljsdlfsdf", apidata);

      fetch(apiurl + "/insertEmployeeKra", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apidata),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log("dsfjdshfjdshflsdj", responseJson);
          notification.warning({
            message: `EmployeeKra submitted successfully`,
            duration: 3.5,
            placement: "topRight",
            className: "notification_kra",
          });
        });
    } else {
      this.setState({
        errorstate: false,
      });
    }
  };

  getActivity = () => {
    fetch(apiurl + "/getactivity", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("sdflkjsdlkfjsdfksjdf", responseJson);
        this.setState({
          activities: responseJson.data,
        });
      });
  };

  getSubActivity = () => {
    fetch(apiurl + "/getsubactivity", {
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
          subactivities: responseJson.data,
        });
      });
  };

  getEmployees = () => {
    fetch(apiurl + "/severanceemployees", {
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
          employees: responseJson.data,
        });
      });
  };

  deleteItems = (index) => {
    let list = this.state.kra_data;
    list.splice(index, 1);
    this.setState({ list }, () => this.calculatePercentage());
  };

  employeesList = () => {
    console.log("Sdfsdjfsdkfsldf", this.state.employees);
    var rows = [];
    for (let i = 0; i < this.state.employees.length; i++) {
      rows.push(
        <Option
          value={this.state.employees[i].EmpId}
          name="employee"
          onChange={this.handleChange}
          key={i + 1}
        >
          {this.state.employees[i].EmpName}
        </Option>
      );
    }

    return rows;
  };

  handleChange = (event) => {
    console.log("dsfljsdkfjdsfj;sdkf", event);
    this.setState(
      {
        employee: event,
      }
    );
  };

  handleactivity = (event, num) => {
    console.log("sdfjsdhfjsdkhfjsdhfjlsdfh", event);
    this.state.kra_data.map((val, index) => {
      if (num === index) {
        val.activityId = event;
        console.log("sdfjkshdfjhdsjfhsdfj", val);
        this.setState({
          activityId: val,
        });
      }
    });
  };

  handlesubactivity = (event, num) => {
    {
      this.state.kra_data.map((val, index) => {
        if (num === index) {
          val.subactivityId = event;
          this.setState({
            subactivityId: val,
          });
        }
      });
    }
  };

  activtiyList = () => {
    var activities = [];
    for (let i = 0; i < this.state.activities.length; i++) {
      activities.push(
        <Option key={i + 1} value={this.state.activities[i].activityId}>
          {this.state.activities[i].ActivityName}
        </Option>
      );
    }
    return activities;
  };

  subactivityList = () => {
    var subactivites = [];
    for (let i = 0; i < this.state.subactivities.length; i++) {
      subactivites.push(
        <Option key={i + 1} value={this.state.subactivities[i].subactivityId}>
          {this.state.subactivities[i].SubActivityName}
        </Option>
      );
    }
    return subactivites;
  };

  handleTotal = (e, num) => {
    this.state.kra_data.map((val, index) => {
      if (num === index) {
        whichindex = num;
        val.percentage = e.target.value;
        this.setState(
          {
            percentage: val,
            whichindex,
          },
          () => this.calculatePercentage()
        );
      }
    });
  };

  calculatePercentage = () => {
    let totalpercentage = 0;
    for (let i = 0; i < this.state.kra_data.length; i++) {
      totalpercentage =
        totalpercentage + parseInt(this.state.kra_data[i].percentage);
    }

    console.log("sfjhsdfjhdsjfhsdjfhjsdf", totalpercentage);

    if (totalpercentage <= 100) {
      //    let total = 100 - totalpercentage;
      this.setState({
        errorstate: false,
        total: totalpercentage,
      });
    } else {
      this.setState({
        errorstate: true,
      });
    }
  };

  // resetFormData = () => {
  //   this.setState({
  //     employeekra: [], employee: null, total: '', whichindex: '', initialState, kra_data: []
  //   })
  // }

  render() {
    const classes = this.props;

    console.log(this.state.activities, "fdslkfjdsaklfjsakdf'");
    console.log(this.state.subactivity, "fdslkfjdsaklfjsakdf'");
    return (
      <React.Fragment>
        <h4 className="top_move ">
          <strong>Employee KRA</strong>
        </h4>
        <p className="mb-1">Employee</p>
        <Select
          style={{ width: 300 }}
          value={this.state.employee}
          onChange={this.handleChange}
          showSearch
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {this.employeesList()}
        </Select>
        <div style={{ color: "red", fontSize: "12px" }}>
          {this.state.employeeError && this.state.employeeError}
        </div>

        <div className={"icon-right"}>
          <AddCircleOutlineOutlinedIcon onClick={this.addItems} />
        </div>
        <div className="card top_move ">
          <div className="card-body">
            <div class="card">
              <div class="card-header">
                <div>
                  <ul className="card-titles row">
                    <li class="col-1-of-4">S.No</li>
                    <li class="col-1-of-4">Activity</li>
                    <li class="col-1-of-4">Sub Activity</li>
                    <li class="col-1-of-4">%</li>
                    <li class="col-1-of-4">Action</li>
                  </ul>
                </div>
              </div>

              {this.state.kra_data.map((val, index) => {
                console.log("sdfkljsdkfjsdkljf", index);
                return (
                  <div class="card-contents">
                    <div class="col-1-of-4">
                      <div class="card-key">{index + 1}</div>
                    </div>
                    <div class="col-1-of-4">
                      <Select
                        onChange={(event) => this.handleactivity(event, index)}
                        style={{ width: "100%" }}
                        showSearch
                        filterOption={(input, option) =>
                          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {this.activtiyList()}
                      </Select>

                      <div style={{ color: "red", fontSize: "12px" }}>
                        {this.state.activityError &&
                          this.state.whichindex === index &&
                          this.state.activityError}
                      </div>
                    </div>

                    <div class="col-1-of-4">
                      <Select
                        onChange={(event) =>
                          this.handlesubactivity(event, index)
                        }
                        style={{ width: "100%" }}
                        showSearch
                        filterOption={(input, option) =>
                          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {this.subactivityList()}
                      </Select>
                      <div style={{ color: "red", fontSize: "12px" }}>
                        {this.state.subactivityError &&
                          this.state.whichindex === index &&
                          this.state.subactivityError}
                      </div>
                    </div>
                    <div class="col-1-of-4">
                      <input
                        type="number"
                        style={{ height: "32px" }}
                        onChange={(e) => this.handleTotal(e, index)}
                      />
                      <div style={{ color: "red", fontSize: "12px" }}>
                        {this.state.percentageError &&
                          this.state.whichindex === index &&
                          this.state.percentageError}
                      </div>

                      <div style={{ color: "red", fontSize: "12px" }}>
                        {this.state.errorstate &&
                          this.state.whichindex === index &&
                          "Maximum percentage exceeded"}
                      </div>
                    </div>
                    <div class="col-1-of-4">
                      <div
                        class="del-icon"
                        onClick={() => this.deleteItems(index)}
                      >
                        <Fab aria-label="delete" className="del_btn_kra">
                          <DeleteIcon />
                        </Fab>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <Grid container spacing={4}>
              <Grid item md={6} />
              <Grid item md={2}>
                <div className="total_font">Total:</div>
              </Grid>
              <Grid item md={2} sm={3}>
                <Inputantd
                  className="w-75 total_kra-adjust"
                  value={this.state.total + "%"}
                />
              </Grid>
              <Grid item md={2} sm={3}>
                <Button className="btnwidth btnclr" onClick={this.sendKraData}>
                  Save
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default EmployeeKRA;