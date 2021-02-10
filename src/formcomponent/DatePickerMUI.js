import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import dateFormat from 'dateformat';


function disableDates(date,mindate){
	// console.log(mindate.getDate());
	return date.getDate()==(mindate?mindate.getDate():0);
}

class DatePickerMui extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selecteddate: props.value ? props.value : new Date()
        }
    }

    datepickerChange = (date) => {
        if (date == "Invalid Date") {
            this.props.invalidate && this.props.invalidate(date);
        } else {
            var datefmt = dateFormat(date, 'yyyy-mm-dd');
            this.props.changeData && this.props.changeData(datefmt);
        }

    }

    componentWillReceiveProps(props) {
        var datefmt = dateFormat(props.value && props.value, 'yyyy-mm-dd');
        this.setState({ selecteddate: datefmt })
    }

    render() {
        // console.log(this.props.value, "sdafasdfa")
        return (
            <>
                <label className={`commonlabel ${this.props.labelclass && this.props.labelclass}`}>
                    {this.props.label && this.props.label}{this.props.required && <span className="text-danger">*</span>}</label><br
                    className={`${this.props.breakclass && this.props.breakclass}`} />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        format="dd-MM-yyyy"
                        className={this.props.halfPicker ? "surana-half" : 'surana'}
                        value={this.state.selecteddate}
                        onChange={(date) => this.datepickerChange(date)}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        allowKeyboardControl={true}
                        animateYearScrolling={true}
                        inputVariant={'outlined'}
                        clearable={true}
                        minDate={this.props.minDate}
                        maxDate={this.props.maxDate}
                        disableFuture={this.props.disableFuture ? this.props.disableFuture : false}
                        disablePast={this.props.disablePast ? this.props.disablePast : false}
                        shouldDisableDate={(date)=>disableDates(date,this.props.blockDate?new Date(this.props.blockDate):null)}
                        minDateMessage={""}
                        maxDateMessag={""}
                    />
                </MuiPickersUtilsProvider>

                <div className="texterrmsg">
                    {
                        this.props.errmsg ? this.props.errmsg
                            : <div className="min_h_static" />
                    }
                </div>
            </>
        )
    }
}

export default DatePickerMui