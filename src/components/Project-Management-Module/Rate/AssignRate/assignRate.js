import React from 'react';
import Dropdownantd from '../../../../formcomponent/dropdownantd';
import Ratecost from '../RateDropdown/Ratecost';
import Retainercost from "../RateDropdown/Retainercost";
import Hourslimit from "../RateDropdown/Hourslimit";
import { Modal, Select} from 'antd';
import './assignRate.css';
import { FaSlidersH } from 'react-icons/fa';
import Lumpcost from "../RateDropdown/Lumpcost"

const { Option } = Select;


class AssignRate extends React.Component{

    state={
        loading: false,
        visible: false,
        retainer:false,
        hours:false,
        lump:false
    }
    clickFunction=()=>{
        this.setState({
            visible: true,
          });
    }
    retainerFunction=()=>{
        this.setState({
            retainer: true,
          });
    }
    HoursFunction=()=>{
        this.setState({
            hours: true,
          });
    }
    LumpFunction=()=>{
        this.setState({
            lump:true
        })
    }

    TableFunction=()=>{
        this.props.history.push("tablerate")
    }
    
      handleCancel = () => {
        this.setState({ visible: false });
      };
      retainerCancel=()=>{
          this.setState({retainer: false})
      }
      HoursCancel=()=>{
        this.setState({hours: false})
      }
      LumpCancel=()=>{
        this.setState({lump: false})
      }

    render(){

        const { visible, retainer , hours, lump} = this.state;
        return(
          <React.Fragment>
              <div className="assing_rate_head">
                  <h5>Assign rate</h5>
              </div>
              <div style={{margin:'20px'}}>
                  <p className="client_name_head_rate">Client Name</p>
                  <p className="client_name_rate">L&T</p>
              </div>
              <div style={{marginLeft:'17px'}}>
              <p className="client_name_head_rate">Rate Type</p>
                <Select style={{ width: '35%' }}>
                    <Option value="1" onClick={this.clickFunction}>Blended</Option>
                    <Option value="2" onClick={this.retainerFunction}>Fixed Retainer</Option>
                    <Option value="3" onClick={this.HoursFunction}>Fixed Retainer + Hourly</Option>
                    <Option value="4" onClick={this.LumpFunction}>Lump sum</Option>
                    <Option value="5" onClick={this.TableFunction}>Variable</Option>
                </Select>
                
              </div>
              
              <Modal className="assignrate_modal" visible={visible} onCancel={this.handleCancel} footer={null} >
                <Ratecost/>
              </Modal>

              <Modal className="assignrate_modal" visible={retainer} onCancel={this.retainerCancel} footer={null} >
                <Retainercost/>
              </Modal>

              <Modal className="assignrate_modal" visible={hours} onCancel={this.HoursCancel} footer={null} >
                <Hourslimit/>
              </Modal>

              
              <Modal className="assignrate_modal" visible={lump} onCancel={this.LumpCancel} footer={null} >
                <Lumpcost/>
              </Modal>
          </React.Fragment>
        )
    }
}
export default AssignRate;