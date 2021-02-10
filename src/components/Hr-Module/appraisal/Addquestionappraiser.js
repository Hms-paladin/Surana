import React from 'react';
import Dropdownantd from '../../../formcomponent/dropdownantd';
import { Grid } from '@material-ui/core';
import './Appraiser.css';
import Button from 'react-bootstrap/Button';
import ValidationLibrary from "../../../validationlibrary/validation"

class AddquestionAppraiser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errordummy: true,
            addquestionappraisaldata:
            {
                'addquest_category':
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
        var addquestionappraisaldata = this.state.addquestionappraisaldata;
        var targetkeys = Object.keys(addquestionappraisaldata);
        console.log(targetkeys, "targetkeys");
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(addquestionappraisaldata[targetkeys[i]].value, addquestionappraisaldata[targetkeys[i]].validation);
            console.log(errorcheck, "errorcheck");
            addquestionappraisaldata[targetkeys[i]].error = !errorcheck.state;
            addquestionappraisaldata[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = addquestionappraisaldata[targetkeys[i]].value
        }
        var filtererr = targetkeys.filter((obj) =>
            addquestionappraisaldata[obj].error == true);
        console.log(filtererr.length)
        if (filtererr.length > 0) {
            this.setState({ error: true })
        } else {
            this.setState({ error: false })

        }
        this.setState({
            mainvalue,
            addquestionappraisaldata
        })
    }
    changeDynamic = (data, key) => {
        console.log("key", key);
        console.log("data", data);
        var addquestionappraisaldata = this.state.addquestionappraisaldata;
        var targetkeys = Object.keys(addquestionappraisaldata);

        var errorcheck = ValidationLibrary.checkValidation(data, addquestionappraisaldata[key].validation);
        addquestionappraisaldata[key].value = data;
        addquestionappraisaldata[key].error = !errorcheck.state;
        addquestionappraisaldata[key].errmsg = errorcheck.msg;
        this.setState({ addquestionappraisaldata });
        var filtererr = targetkeys.filter((obj) =>
            addquestionappraisaldata[obj].error == true || addquestionappraisaldata[obj].error == null);
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
        return (
            <React.Fragment>
                <div className="card top_move">
                    <div className="card-body">
                        <div className="addquest_head">
                            <h5>Appraiser-Add Questions</h5>
                        </div>
                        <Grid container className="mt-3">
                            <Grid item md={4} sm={6}>
                                <Dropdownantd className="w-100" label="Category"
                                    changeData={(data) => this.changeDynamic(data, 'addquest_category')}
                                    //    value={this.state.addquestionappraisaldata.addquest_category.value} 
                                    error={this.state.addquestionappraisaldata.addquest_category.error}
                                    errmsg={this.state.addquestionappraisaldata.addquest_category.errmsg}
                                />
                            </Grid>

                        </Grid>
                        <div className="addquest_top">
                            <h5>Parameters</h5>
                            <Grid container spacing={1}>
                                <Grid item md={3} sm={5} className="mt-2">
                                    <div className="addquest_border">
                                        <div>
                                            <span className="addquest_card">1-3</span>
                                        </div>
                                        <p className="mt-1">Unable to keep up with times and Requires constant reminders to Complete the tasks
                                       </p>
                                    </div>
                                </Grid>
                                <Grid item md={1} sm={1} />
                                <Grid item md={3} sm={5} className="mt-2">
                                    <div className="addquest_border">
                                        <div>
                                            <span className="addquest_card">4-6</span>
                                        </div>
                                        <p className="mt-1">Maintains the time and completes the Task with few reminders</p>
                                    </div>
                                </Grid>
                                <Grid item md={1} sm={1} />
                                <Grid item md={3} sm={5} className="mt-2">
                                    <div className="addquest_border">
                                        <div>
                                            <span className="addquest_card">7-9</span>
                                        </div>
                                        <p className="mt-1"> Always on time and completes the Tasks well ahead of time</p>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                        <Grid container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            className="mt-5"
                            spacing={3}>
                            <Grid item >
                                <Button className="btnwidth btnclr" onClick={() => this.checkValidation()}>Submit</Button>
                            </Grid>
                            <Grid item >
                                <Button className="btnwidth btnclr_outline">Cancel</Button>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default AddquestionAppraiser;