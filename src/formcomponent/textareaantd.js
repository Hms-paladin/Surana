import React from "react";
import { Input } from 'antd';

const { TextArea } = Input;


class Textareaantd extends React.Component{
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
                 <TextArea
                    // onChange={this.props.onChange && this.props.onChange }
                    onChange={(e)=>this.props.changeData&&this.props.changeData(e.target.value)}
                    placeholder={this.props.placeholder && this.props.placeholder}
                    className={`testareaantd ${this.props.className && this.props.className}
                    ${this.props.error && "Errorbr"}`}
                    name={this.props.name && this.props.name}
                    value={this.props.value}

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

export default Textareaantd;