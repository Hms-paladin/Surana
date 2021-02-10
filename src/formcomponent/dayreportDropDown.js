import React from 'react';
import { Select } from 'antd';

const { Option } = Select;


class DayreportDropDown extends React.Component {
    onSearch = (val) => {
        console.log(val)
    }
    render() {
        var value = this.props.value;

        // While using multi select first value always set as empty string
        // To over come that
        if (this.props.mode === "multiple" && this.props.value && this.props.value.length > 0) {
            // console.log("asdfafasf",this.props.value)
            value = this.props.value.filter(Number);
        }
        if (this.props.mode === "multiple" && this.props.value && this.props.value.length > 0 && this.props.convertString) {
            // console.log("asdfafasf",this.props.value)
            value = this.props.value;
        }
        if (this.props.mode === "multiple" && value === "") {
            value = []
        }
        console.log(this.props.option, "propsvalue")
        return (
            <div className={`${this.props.divclass && this.props.divclass}`}>
                <label className={`commonlabel ${this.props.labelclass && this.props.labelclass}`}>
                    {this.props.label && this.props.label}{this.props.required && <span className="text-danger"> *</span>}</label><br
                    className={`${this.props.breakclass && this.props.breakclass}`} />
                    <span
          className={`spanlabel ${
            this.props.spanclass && this.props.spanclass
          }`}
        >
          {this.props.span && this.props.span}
        </span>
                <Select
                    className={`${this.props.mode === 'multiple' ? 'dropdownantdMulti' : 'dropdownantd'} ${this.props.className && this.props.className}
                    ${this.props.error && "Errorbr"}`}
                    placeholder={this.props.placeholder && this.props.placeholder}
                    optionFilterProp={this.props.optionFilterProp && this.props.optionFilterProp}
                    onChange={(e) => this.props.changeData && this.props.changeData(e)}
                    onFocus={this.props.onFocus && this.props.onFocus}
                    onBlur={this.props.onBlur && this.props.onBlur}
                    defaultValue={this.props.defaultValue && this.props.defaultValue}
                    onSearch={this.props.showSearch && this.onSearch}
                    optionFilterProp="children"
                    value={value} // Don`t change it into this.props.value 
                    name={this.props.name && this.props.name}
                    mode={this.props.mode && this.props.mode}
                    size={this.props.size && this.props.size}
                    showArrow
                    showSearch={this.props.showSearch && this.props.showSearch}
                    filterOption={(input, option) =>
                        // console.log(option.props.children[1].toLowerCase(),"daslfja")
                        option.props.children[1].toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.props.option && (this.props.option).map((val, index) => {
                        //  console.log(val,"asdfasfasf")
                        return (
                            // {/* prop convertString for dropdown value else it will get index number like 1 and 2 */}
                            <Option key={index} value={val.id}>
                                {val && val.name}
                            </Option>
                        )
                    })}
                </Select>
                {
                    this.props.errmsg &&
                    <div className="texterrmsg">
                        {
                            this.props.errmsg ? this.props.errmsg
                                : <div className="min_h_static" />
                        }
                    </div>
                }
            </div>
        )
    }
}

export default DayreportDropDown;
