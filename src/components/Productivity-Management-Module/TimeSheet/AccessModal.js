import React from "react";
import { Modal, Tag } from "antd";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Dropdownantd from "../../../formcomponent/dropdownantd";
import axios from 'axios';
import { apiurl } from '../../../App';
import ValidationLibrary from "../../../validationlibrary/validation.js";
import { notification } from "antd";
class AccessModal extends React.Component {
  state = {
    access: [],
    accessId: [],
    assignaccessdata: {
      'access': {
        value: "",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
      },
    },
  };

  componentDidMount() {
    var self = this;
    axios({
      method: "GET",
      url: apiurl + "/listofemployees",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log(response.data.data, "listofemployees");
      var access = [];
      var EmpId = [];
      response.data.data.map((data) => {
        access.push(data.EmpFirstName);
        EmpId.push(data.EmpId);
      });
      self.setState({ access: access, accessId: EmpId });
    });
  }
  changeDynamic = (data, key) => {
    console.log("key", key);
    console.log("data", data);
    var assignaccessdata = this.state.assignaccessdata;
    var targetkeys = Object.keys(assignaccessdata);

    var errorcheck = ValidationLibrary.checkValidation(data, assignaccessdata[key].validation);
    assignaccessdata[key].value = data;
    assignaccessdata[key].error = !errorcheck.state;
    assignaccessdata[key].errmsg = errorcheck.msg;
    this.setState({ assignaccessdata });
    var filtererr = targetkeys.filter((obj) =>
      assignaccessdata[obj].error == true || assignaccessdata[obj].error == null);
    if (filtererr.length > 0) {
      this.setState({
        error: true,
        errordummy: false
      })
    } else {
      this.setState({ error: false })
    }
  }
  callroot = () => {
    this.setState({ changeval: false })

    var assignaccessdata = this.state.assignaccessdata;
    var targetkeys = Object.keys(assignaccessdata);
    console.log(targetkeys);
    for (var i in targetkeys) {
      var errorcheck = ValidationLibrary.checkValidation(assignaccessdata[targetkeys[i]].value, assignaccessdata[targetkeys[i]].validation);
      console.log(errorcheck);
      assignaccessdata[targetkeys[i]].error = !errorcheck.state;
      assignaccessdata[targetkeys[i]].errmsg = errorcheck.msg;
    }
    var filtererr = targetkeys.filter((obj) =>
      assignaccessdata[obj].error == true);
    console.log(filtererr.length)
    if (filtererr.length > 0) {
      this.setState({ error: true })
    } else {
      this.setState({ error: false })



      var self = this
      axios({
        method: 'post',
        url: apiurl + '/assignaccess',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: {
          assignaccessdata:this.state.assignaccessdata.access.value
        }
      }).then((response) => {
        console.log(response.data.data, "recruitmentsearch")

        if (response.data.data.length === 0) {
          notification.warning({
            message: `EmployeeKra submitted successfully`,
            duration: 3.5,
            placement: "topRight",
            className: "notification_kra",
          });
          
        } else {
          // this.props.propFunc && this.props.propFunc(2)
          notification.warning({
            message: `EmployeeKra submitted successfully`,
            duration: 3.5,
            placement: "topRight",
            className: "notification_kra",
          });

        }

        this.state.assignaccessdata.access.value = ""
       
        this.setState({})

      })

    }
    this.setState({ assignaccessdata })

    

  }
  render() {
    console.log(this.state.assignaccessdata.access,"sdfkasdfjksa")
    return (
      <React.Fragment>
        <h5>Employee</h5>
        <Card>
          <Card.Body>
            <Card>
              <Card.Body>
                <Dropdownantd
                  label={"Assign to"}
                  className="w-100 qualification-height"
                  option={this.state.access}
                  changeData={(data) => this.changeDynamic(data, "access")}
                  value={this.state.assignaccessdata.access.value}
                  error={this.state.assignaccessdata.access.error}
                  errmsg={this.state.assignaccessdata.access.errmsg}
                  mode={'multiple'}
                />
              </Card.Body>
            </Card>
            <div className="flt_btn">
              <Button size="sm" className="flt_btn-color" onClick={this.callroot}>
                Submit
              </Button>
            </div>
          </Card.Body>
        </Card>
      </React.Fragment>
    );
  }
}
export default AccessModal;
