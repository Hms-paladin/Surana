import React from 'react';
import Calenderbox from '../../../formcomponent/calenderbox'
import Card from 'react-bootstrap/Card'
import './landingpage.css';
import Grid from '@material-ui/core/Grid'
import ValidationLibrary from "../../../validationlibrary/validation.js";
// import {moment} from 'antd'
class LandingPage extends React.Component {
  state = {
    changeval: true,
    hrdata:
    {
      'period':
      {
        'value': '',
        validation: [{ 'name': '' }],
        error: "",
        errmsg: null
      },
      'to':
      {
        'value': '',
        validation: [{ 'name': '' }],
        error: null,
        errmsg: null
      },
    }
  }
  changeDynamic = (data, key) => {
    console.log("key", key);
    console.log("data", data);
    var hrdata = this.state.hrdata;
    var targetkeys = Object.keys(hrdata);

    var errorcheck = ValidationLibrary.checkValidation(data, hrdata[key].validation);
    hrdata[key].value = data;
    hrdata[key].error = !errorcheck.state;
    hrdata[key].errmsg = errorcheck.msg;
    this.setState({ hrdata });
    var filtererr = targetkeys.filter((obj) =>
      hrdata[obj].error == true || hrdata[obj].error == null);
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

    var hrdata = this.state.hrdata;
    var targetkeys = Object.keys(hrdata);
    console.log(targetkeys);
    for (var i in targetkeys) {
      var errorcheck = ValidationLibrary.checkValidation(hrdata[targetkeys[i]].value, hrdata[targetkeys[i]].validation);
      console.log(errorcheck);
      hrdata[targetkeys[i]].error = !errorcheck.state;
      hrdata[targetkeys[i]].errmsg = errorcheck.msg;
    }
    var filtererr = targetkeys.filter((obj) =>
      hrdata[obj].error == true);
    console.log(filtererr.length)
    if (filtererr.length > 0) {
      this.setState({ error: true })
    } else {
      this.setState({ error: false })

    }
    this.setState({ hrdata })

    let changenext = []
    let j = 0
    for (j = 0; j < targetkeys.length; j++) {
      changenext.push(this.state.hrdata[targetkeys[j]].error)
    }

    let nextvalue = changenext.every((val) => val === false)

    if (nextvalue === true) {
      this.props.propFunc && this.props.propFunc(2)
    }

  }

  submitData = (e) => {
    e.preventDefault();
    console.log("eData", e)
  }

  render() {
    return (
      <React.Fragment>
        <div className="d-flux flux-column">
          <b> HR Dash board</b><br /><br />
          <Grid container spacing={3}>
            <Grid item md={3} sm={4}>

              <Calenderbox placeholder={"dd-mm-yyyy"} className="w-100" label="Period From" moment={"DD-MM-YYYY"} format={"DD-MM-YYYY"}
                changeData={(data) => this.changeDynamic(data, 'period')}

                value={this.state.hrdata.period.value}
                error={this.state.hrdata.period.error}
                errmsg={this.state.hrdata.period.errmsg}
              />
            </Grid>

            <Grid item md={3} sm={4}>
              <Calenderbox  placeholder={"dd-mm-yyyy"} className="w-100" label="Period To" format={"DD-MM-YYYY"}

                changeData={(data) => this.changeDynamic(data, 'to')}

                value={this.state.hrdata.to.value}
                error={this.state.hrdata.to.error}
                errmsg={this.state.hrdata.to.errmsg} 
                />
            </Grid>
          </Grid>
        </div>
        <div className="mt-3">
          <Card style={{ width: '100%' }}>
            <Card.Body>
              <Card.Text className="flex">
                <div className="flex justify-space-bet" style={{ width: '35%' }}>
                  <div className="font_size_span">
                    <div>Time to Hire(TTH)</div><br />
                    <div>Time to Fill(TTF)</div><br />
                    <div>Quality of Hire(QOF)</div><br />
                    <div>Source of Hire Effectiveness(SOHE)</div><br />
                    <div>Employee Engagement Score(EES)</div><br />
                    <div>Training Effectiveness Score(TES)</div><br />

                  </div>
                  <div className="font_size_span">
                    <div>:</div><br />
                    <div>:</div><br />
                    <div>:</div><br />
                    <div>:</div><br />
                    <div>:</div><br />
                    <div>:</div><br />
                  </div>
                </div>


                <div style={{ width: '10%' }} className=" mr-3 font_size_days">
                  <div>days</div><br />
                  <div>days</div><br />
                  <div>%</div><br />
                  <div>%</div><br />
                  <div>%</div><br />
                  <div>%</div><br />
                </div>

                <div className="ml-5 borderleft" style={{ width: '10%' }}>
                </div>
                <div className="flex justify-space-bet " style={{ width: '35%' }}>
                  <div className="font_size_span">
                    <div>Return on Investment-Revenue</div><br />
                    <div>Return on Investment-Value</div><br />
                    <div>Employee Diversity Score</div><br />
                    <div>ROI to Employee Engagement Ratio</div><br />
                    <div>ROI to QOH Ratio</div><br />
                    <div>Retention Ratio</div><br />
                    <div>Time to Pay</div><br />

                  </div>
                  <div className="font_size_span">
                    <div>:</div><br />
                    <div>:</div><br />
                    <div>:</div><br />
                    <div>:</div><br />
                    <div>:</div><br />
                    <div>:</div><br />
                    <div>:</div><br />

                  </div>

                </div>

                <div style={{ width: '10%' }} className=" mr-3 font_size_days">
                  <div>%</div><br />
                  <div>INR</div><br />
                  <div>%</div><br />
                  <div>%</div><br />
                  <div>%</div><br />
                  <div>%</div><br />
                  <div>days</div><br />
                </div>

              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </React.Fragment>
    )
  }
}

export default LandingPage;