import React from "react";
import { TimePicker } from 'antd';
import moment from 'moment';

class Timepickerantd extends React.Component{
    render(){
        return(
            <div>
                <label className={`commonlabel ${this.props.labelclass && this.props.labelclass}`}>  
                              {this.props.label && this.props.label}{this.props.required && <span className="text-danger">*</span>}</label><br />
                              <span
          className={`spanlabel ${
            this.props.spanclass && this.props.spanclass
          }`}
        >
          {this.props.span && this.props.span}
        </span>
                <TimePicker 
                onChange={(e)=>this.props.changeData&&this.props.changeData(e) }
                className={`timepickerantd ${this.props.className && this.props.className}`}
                placeholder={this.props.placeholder && this.props.placeholder}
                defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} 
                format={this.props.format && this.props.format}
                name={this.props.name && this.props.name}
                value={this.props.value}
                />
            </div>
        )
    }
}

export default Timepickerantd;