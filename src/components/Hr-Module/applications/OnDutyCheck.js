
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Grid from "@material-ui/core/Grid";
import { TimePicker } from 'antd';
import moment from 'moment';
import "./Application.css";
import AddIcon from '@material-ui/icons/Add';
import Inputantd from '../../../formcomponent/inputantd';
import Dropdownantd from '../../../formcomponent/dropdownantd';
import Calenderbox from '../../../formcomponent/calenderbox';
import Textareaantd from '../../../formcomponent/textareaantd';
import Timepickerantd from '../../../formcomponent/timepickerantd';
import TimePickerMui from '../../../formcomponent/timePickerMui';
import ValidationLibrary from "../../../validationlibrary/validation.js";

class OnDuty extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      add: 0,
      count: 1,
      onDuty: [0],
      errordummy: true,
      objectEntries:[],
      dutydata:
      {
        'clientId': {
          'value': '',
          validation: [{ 'name': 'required' }, { name: 'alphabetsOnly' }],
          error: null,
          errmsg: null
        },
        'refdate':
        {
          'value': '',
          validation: [{ 'name': 'required' }, { name: 'alphabetsOnly' }],
          error: null,
          errmsg: null
        },
        'enter_name':
        {
          'value': '',
          validation: [{ 'name': 'required' }],
          error: null,
          errmsg: null
        },
        'date':
        {
          'value': '',
          validation: [{ 'name': 'required' }],
          error: null,
          errmsg: null
        },
        'startTime':
        {
          'value': '',
          validation: [{ 'name': 'required' }],
          error: null,
          errmsg: null
        },
        'endTime':
        {
          'value': '',
          validation: [{ 'name': 'required' }],
          error: null,
          errmsg: null
        },
        'assignment':
        {
          'value': '',
          validation: [{ 'name': 'required' }],
          error: null,
          errmsg: null
        },
      },
    };
  }

  checkValidation = () => {
    var mainvalue = {}
    var dutydata = this.state.dutydata;
    var dutykeys = Object.keys(dutydata);
    console.log(dutykeys, "dutykeys");
    for (var i in dutykeys) {
      var errorcheck = ValidationLibrary.checkValidation(dutydata[dutykeys[i]].value, dutydata[dutykeys[i]].validation);
      console.log(errorcheck, "errorcheck");
      dutydata[dutykeys[i]].error = !errorcheck.state;
      dutydata[dutykeys[i]].errmsg = errorcheck.msg;
      mainvalue[dutykeys[i]] = dutydata[dutykeys[i]].value
    }
    var filtererr = dutykeys.filter((obj) =>
      dutydata[obj].error == true);
    console.log(filtererr.length)
    if (filtererr.length > 0) {
      this.setState({ error: true })
    } else {
      this.setState({ error: false })
    }
    this.setState({
      mainvalue,
      dutydata
    })
  }

  changeDynamic = (data, key) => {
    var dutydata = this.state.dutydata;
    var dutykeys = Object.keys(dutydata);

    var errorcheck = ValidationLibrary.checkValidation(data, dutydata[key].validation);
    dutydata[key].value = data;
    dutydata[key].error = !errorcheck.state;
    dutydata[key].errmsg = errorcheck.msg;
    this.setState({ dutydata });
    var filtererr = dutykeys.filter((obj) =>
      dutydata[obj].error == true || dutydata[obj].error == null);
    if (filtererr.length > 0) {
      this.setState({
        error: true,
        errordummy: false
      })
    } else {
      this.setState({ error: false })
    }
  }
  addDuty = () => {
    var add = this.state.add;
    add++;
    this.setState({ add })
    var data = [];
    var count = 0;
    count++;
    this.state.onDuty.push(count)
    this.setState({})
    var key = [`date${this.state.add}`, `start_time${this.state.add}`, `end_time${this.state.add}`, `end_time${this.state.add}`, `describe_management${this.state.add}`]
    for (var i in key) {
      Object.assign(this.state.dutydata, { [key[i]]: { value: "" } });
    }
    // alert(JSON.stringify(this.state.dutydata))
    var objentries = Object.entries(this.state.dutydata).splice(3)
    this.state.objectEntries.push(objentries)
    this.setState({})
  }

  componentWillMount() {
    var objentries = Object.entries(this.state.dutydata).splice(3)
    this.state.objectEntries.push(objentries)
    console.log(objentries, "keysval")
    this.setState({})
  }

  render() {
    console.log(this.state.dutydata, "mystate")
    return (
      <div className="card top_move">
        <div className="card-body">
          <Grid container spacing={6} className="text-left mt-2">
            <Grid item md={4} sm={12} className="w-100">
              <Inputantd label="Client name"
                changeData={(data) => this.changeDynamic(data, 'client_name')}
                value={this.state.dutydata.client_name.value}
                error={this.state.dutydata.client_name.error}
                errmsg={this.state.dutydata.client_name.errmsg}
                required
              />
            </Grid>
            <Grid item md={4} sm={6} className="w-100">
              <Inputantd
                label="No.of days/hours"
                className="w-100"
                changeData={(data) => this.changeDynamic(data, 'no_ofdays')}
                value={this.state.dutydata.no_ofdays.value}
                error={this.state.dutydata.no_ofdays.error}
                errmsg={this.state.dutydata.no_ofdays.errmsg}
              />
              <span className="hint_font">(Duration of Assignment)</span>
            </Grid>
            <Grid item md={4} sm={6} className="w-100 ">
              <div>
                <Dropdownantd
                  className={"w-100"}
                  label="Enter Name"
                  option={["Class A", "Class B"]}
                  changeData={(data) => this.changeDynamic(data, 'enter_name')}
                  value={this.state.dutydata.enter_name.value}
                  error={this.state.dutydata.enter_name.error}
                  errmsg={this.state.dutydata.enter_name.errmsg}
                />
                <span className="hint_font">(Duty assigned by)</span>
              </div>
            </Grid>
            <Grid item md={12} sm={6} className="w-100 ">
              <AddIcon className="add_adjust" onClick={this.addDuty} />
              <div className="card w-100 ">
                <div className="card-body">

                  {
                    this.state.onDuty.map((val) => {
                      return (
                        <div className="flex">
                          <Grid item md={3} sm={6} className="w-100">
                            <Calenderbox className="w-100" label="Date" format={"DD-MM-YYYY"}
                              changeData={(data) => this.changeDynamic(data, `date`)}
                              value={this.state.dutydata.date.value}
                              error={this.state.dutydata.date.error}
                              errmsg={this.state.dutydata.date.errmsg}
                            />
                          </Grid>
                          <Grid md={1} />
                          <Grid item md={3} sm={6} className="w-100">
                            <Timepickerantd
                              className="w-100"
                              label="Start Time"
                              changeData={(data) => this.changeDynamic(data, `start_time`)}
                              value={this.state.dutydata.start_time.value}
                              error={this.state.dutydata.start_time.error}
                              errmsg={this.state.dutydata.start_time.errmsg}
                            />
                          </Grid>
                          <Grid md={1} />
                          <Grid item md={3} sm={6} className="w-100">
                            <Timepickerantd className="w-100"
                              label="End Time"
                              changeData={(data) => this.changeDynamic(data, `end_time`)}
                              value={this.state.dutydata.end_time.value}
                              error={this.state.dutydata.end_time.error}
                              errmsg={this.state.dutydata.end_time.errmsg}
                            />
                          </Grid>
                          <Grid md={1} />
                          <Grid item md={3} sm={6} className="w-100">
                            <Textareaantd
                              className={"w-100"}
                              label="Describe the Assignment"
                              changeData={(data) => this.changeDynamic(data, `describe_assignment`)}
                              value={this.state.dutydata.describe_assignment.value}
                              error={this.state.dutydata.describe_assignment.error}
                              errmsg={this.state.dutydata.describe_assignment.errmsg}
                            />
                          </Grid>
                        </div>

                      )
                    })
                  }
                </div>
              </div>
            </Grid>


          </Grid>
          <Grid container
            direction="row"
            justify="center"
            alignItems="center"
            className="gridbtnalign"
            spacing={3}>
            <Grid item >
              <Button size="lg" className="btnmargin btnwidth btnclr" onClick={() => this.checkValidation()}>Save</Button>
            </Grid>
            <Grid item >
              <Button size="lg" className="btnwidth btnclr_outline">Cancel</Button>
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}
export default OnDuty;