import React from "react";
import { DatePicker } from "antd";
import moment from 'moment';
import dateFormat from 'dateformat';

const { RangePicker } = DatePicker;

const dateFormation = "DD-MM-YYYY";

class CalendarRagePicker extends React.Component{
    disableDatePast = (current) => {
        let customDate = dateFormat(Date.now(),"dd-mm-yyyy");
        return current && current < moment(customDate, "dd-mm-yyyy");
    }

    disableDateFuture = (current) => {
        return current && current > moment().add(0, "day")
        
    } 
    render(){
        return(
            <>
            <label className={`commonlabel ${this.props.labelclass && this.props.labelclass}`}>
                    {this.props.label && this.props.label}{this.props.required && <span className="text-danger">*</span>}</label><br 
                    className={`${this.props.breakclass && this.props.breakclass}`}/>
                <RangePicker
                        className={`calenderantdstyle ${this.props.className && this.props.className} ${this.props.error && "Errorbr"}`}
                        onChange={(e)=>this.props.changeData&&this.props.changeData(e)}
                        format={this.props.format ? this.props.format : dateFormation}
                        value={this.props.value}
                        defaultValue={this.props.defaultValue}
                        disabledDate={this.props.disablePast && this.disableDatePast || this.props.disableFuture && this.disableDateFuture }
                />
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

export default CalendarRagePicker;