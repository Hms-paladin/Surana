import React from 'react';
import { InputNumber } from 'antd';

class Inputnumber extends React.Component{
    render(){
        console.log("mypropsvalue",this.props)
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
                <InputNumber 
                className={`inputnumber ${this.props.className && this.props.className}`}
                min={this.props.min && this.props.min} 
                max={this.props.max && this.props.max} 
                defaultValue={this.props.defaultValue && this.props.defaultValue} 
                step={this.props.step && this.props.step}
                onChange={(e) => this.props.changeData && this.props.changeData(e)}
                name={this.props.name && this.props.name}
                value={this.props.value}
                type={"number"}
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

export default Inputnumber;