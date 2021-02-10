import React from 'react';
import CreatableSelect from 'react-select/creatable';

class ReactSelect extends React.Component {
    componentDidMount() {
        // alert(JSON.stringify(this.props.options))
    }
    componentDidUpdate(){
        // alert(JSON.stringify(this.props.value))
    }
    handleInputChange = (inputValue: any, actionMeta: any) => {
        console.group('Input Changed');
        console.log(inputValue);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
      };
    render() {
        const options = [
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' }
          ]
        return (
            <div className={`${this.props.divclass && this.props.divclass}`}>
                <label className={`commonlabel ${this.props.labelclass && this.props.labelclass}`}>
                    {this.props.label && this.props.label}{this.props.required && <span className="text-danger"> *</span>}</label><br
                    className={`${this.props.breakclass && this.props.breakclass}`} />
                <CreatableSelect
                    className={`${this.props.mode === 'multiple' ? 'dropdownantdMulti' : 'dropdownantd'} ${this.props.className && this.props.className}
                ${this.props.error && "Errorbr"}`}
                    // isClearable
                    closeMenuOnSelect={this.props.closeMenuOnSelect ? true : false}
                    hideSelectedOptions={true}
                    onChange={(e) => this.props.changeData && this.props.changeData(e)}
                    value={this.props.value}
                    options={this.props.options}
                    isMulti={this.props.isMulti ? true : false}
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

export default ReactSelect;