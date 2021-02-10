import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import dateFormat from 'dateformat';

const dateFormation = "DD/MM/YYYY";

class Calenderbox extends React.Component{
    disableDatePast = (current) => {
        let customDate = moment(Date.now(),"DD-MM-YYYY");
        return current && current < moment(Date.now(), "dd-mm-yyyy");
    }

    disableDateFuture = (current) => {
        return current && current > moment().add(0, "day")
        
    }    
    
    render(){
        console.log(this.props.value,"checkingprops")
        return(
            <div>
                <label className={`commonlabel ${this.props.labelclass && this.props.labelclass}`}>
                    {this.props.label && this.props.label}{this.props.required && <span className="text-danger">*</span>}</label><br 
                    className={`${this.props.breakclass && this.props.breakclass}`}/>
                    <span
          className={`spanlabel ${
            this.props.spanclass && this.props.spanclass
          }`}
        >
          {this.props.span && this.props.span}
        </span>
                <DatePicker
                    className={`calenderantdstyle ${this.props.className && this.props.className} ${this.props.error && "Errorbr"}`}
                    placeholder={this.props.placeholder && this.props.placeholder}
                    onChange={(e,dateString)=>this.props.changeData&&this.props.changeData(e)}
                    format={this.props.format ? this.props.format : dateFormation}
                    // className={`calenderantdstyle ${this.props.className && this.props.className}`}
                    //  defaultValue={
                    //     this.props.defaultValue ? moment(this.props.defaultValue, this.props.formatdefaultValue) :  moment("12-10-2020", "DD-MM-YYYY")
                    // }
                    // moment={this.props.moment && this.props.moment}
                    value={this.props.value}
                    disabled={this.props.disabled?true:false}
                    disabledDate={this.props.disablePast && this.disableDatePast || this.props.disableFuture && this.disableDateFuture }

                />
                <div className="texterrmsg">
                {
                    this.props.errmsg ? this.props.errmsg
                    : <div className="min_h_static" />
                }
                </div>
            </div>
        )
    }
} 

export default Calenderbox;