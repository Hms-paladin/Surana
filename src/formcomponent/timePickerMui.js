import React from 'react';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
  import DateFnsUtils from '@date-io/date-fns';
  

class TimePickerMui extends React.Component{
    render(){
        return(
            <>
                <div className="">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <label className={`commonlabel ${this.props.labelclass && this.props.labelclass}`}>  
                              {this.props.label && this.props.label}{this.props.required && <span className="text-danger">*</span>}</label><br />
                <KeyboardTimePicker
                        className="surana"
                        name={this.props.name && this.props.name}
                        value={this.props.value ? this.props.value : null}
                        onChange={(e)=>this.props.changeData&&this.props.changeData(e) }
                        KeyboardButtonProps={{
                            'aria-label': 'change time',
                        }}
                        inputVariant="outlined"
                />
                </MuiPickersUtilsProvider>
                <div className="texterrmsg">
                    {
                        this.props.errmsg ? this.props.errmsg
                            : <div className="min_h_static" />
                    }
                </div>
                </div>
            </>
        )
    }
}

export default TimePickerMui;