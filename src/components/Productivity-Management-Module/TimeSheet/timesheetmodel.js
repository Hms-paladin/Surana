import { Modal, Button } from 'antd';
import React from 'react';
import { TimePicker } from 'antd';
import moment from 'moment';
import Calenderbox from "../../../formcomponent/calenderbox";
import TimePickerMui from '../../../formcomponent/timePickerMui'
import DatePickerMui from '../../../formcomponent/DatePickerMUI';
import ValidationLibrary from "../../../validationlibrary/validation";
import Grid from '@material-ui/core/Grid';
const format = 'HH:mm';

class Timesheetmodel extends React.Component {
  state = {
    manualEntry: {
      startTime: {
        value: "",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
      },
      endTime: {
        value: "",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
      },
      entryDate: {
        value: "",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
      },
    }
  }
  changeDynamic = (data, key) => {
    console.log("key", key);
    console.log("data", data);
    var manualEntry = this.state.manualEntry;
    var targetkeys = Object.keys(manualEntry);

    var errorcheck = ValidationLibrary.checkValidation(data, manualEntry[key].validation);
    manualEntry[key].value = data;
    manualEntry[key].error = !errorcheck.state;
    manualEntry[key].errmsg = errorcheck.msg;

    this.setState({ manualEntry });

    var filtererr = targetkeys.filter((obj) =>
      manualEntry[obj].error == true || manualEntry[obj].error == null);
    if (filtererr.length > 0) {
      this.setState({ error: true })
    } else {
      this.setState({ error: false })
    }
  }

  callroot = () => {
    var manualEntry = this.state.manualEntry;
    var targetkeys = Object.keys(manualEntry);
    console.log(targetkeys);
    for (var i in targetkeys) {
      var errorcheck = ValidationLibrary.checkValidation(manualEntry[targetkeys[i]].value, manualEntry[targetkeys[i]].validation);
      console.log(errorcheck, "errorcheck");
      manualEntry[targetkeys[i]].error = !errorcheck.state;
      manualEntry[targetkeys[i]].errmsg = errorcheck.msg;
    }
    var filtererr = targetkeys.filter((obj) =>
      manualEntry[obj].error == true);
    console.log(filtererr.length)
    if (filtererr.length > 0) {
      this.setState({ error: true })
    } else {
      this.setState({ error: false })

    }
    this.setState({ manualEntry })

    let changenext = []
    let j = 0
    for (j = 0; j < targetkeys.length; j++) {
      changenext.push(this.state.manualEntry[targetkeys[j]].error)
    }

    if (filtererr.length === 0) {
      var manualEntryData={
        startTime:this.state.manualEntry.startTime.value,
        endTime:this.state.manualEntry.endTime.value,
        entryDate:this.state.manualEntry.entryDate.value
      }
      this.props.getManualEntryData(manualEntryData)
    }
  }
  render() {
    console.log(this.state,"checkstate")
    return (
      <div>
        <Modal
          title="Manual Time"
          visible={this.props.openmodel}
          onOk={this.props.modelcl}
          onCancel={this.props.modelcl}
          footer={null}
        >
          <Grid container spacing={2}>
            <Grid item md={6} sm={5}>
              <TimePickerMui
                label="Start time"
                className="timepickerantd mr-3"
                value={this.state.manualEntry.startTime.value}
                changeData={(data) =>
                  this.changeDynamic(data, "startTime")
                }
                value={this.state.manualEntry.startTime.value}
                error={this.state.manualEntry.startTime.error}
                errmsg={this.state.manualEntry.startTime.errmsg}
              />
            </Grid>
            <Grid item md={3} sm={5}>
              <TimePickerMui
                label="End time"
                className="timepickerantd mr-3"
                changeData={(data) =>
                  this.changeDynamic(data, "endTime")
                }
                value={this.state.manualEntry.endTime.value}
                error={this.state.manualEntry.endTime.error}
                errmsg={this.state.manualEntry.endTime.errmsg}
              />
            </Grid>
            <Grid item md={6} sm={5}>
              <DatePickerMui
                className="w-50"
                label="Select Date"
                changeData={(data) =>
                  this.changeDynamic(data, "entryDate")
                }
                value={this.state.manualEntry.entryDate.value}
                error={this.state.manualEntry.entryDate.error}
                errmsg={this.state.manualEntry.entryDate.errmsg}
              />
            </Grid>
          </Grid>
          <div className="d-flex">
                <button type="button" class="btn btn-light">Cancel</button>
                <button type="button" class="btn btn-primary" onClick={this.callroot}>Save</button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Timesheetmodel;
