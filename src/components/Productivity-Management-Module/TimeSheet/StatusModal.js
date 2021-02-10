import React from "react";
import "./timesheet.css";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { apiurl } from "../../../App";
import jQuery from "jquery";
import {Input} from 'antd';
import Inputantd from "../../../formcomponent/inputantd";
// var list=this.state.statusTasklist.map((val)=>val.TaskName)
// console.log(list,"list")
class StatusModal extends React.Component {
  state = {
    progressValue:"0",
    statusTasklist: [],
    callstatus:"",
    patent: [
      {
        id: 1,
        time: "9:30AM-10:30AM",
      },
      {
        id: 2,
        time: "9:30AM-10:30AM",
      },
      {
        id: 3,
        time: "11:00AM-12:00PM",
      },
      {
        id: 4,
        time: "2:00PM-3:30PM Dec6",
      },
    ],

    // progress: 50,
  };

  componentDidMount() {
    var self = this;
    axios({
      method: "get",
      url: apiurl + "/tasklist",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        console.log(response.data.data, "resdata");
        var statusTasklist = [];
        // var tagvalue = []
        response.data.data.map((data, index) => {
          statusTasklist.push(data.TaskName);
        });
        console.log(statusTasklist, "status");
        self.setState({ statusTasklist: statusTasklist });
      })
      .catch(function (error) {
        console.log(error, "error");
      });
  }

  // clickHandler() {
  //   this.setState({
  //     progress: this.state.progress < 100 ? this.state.progress + 5 : 100,
  //   });
  // }
  // clickHandlerMinus() {
  //   this.setState({
  //     progress: this.state.progress > 5 ? this.state.progress - 5 : 0,
  //   });
  // }
  
    onChangeListener=(event)=> {
      // var el = this.refs.inputRangeRef
      console.log("biii",event.target.value)
      jQuery("body").trigger("inputRange.changed", {
        value: event.target.value
      });
      this.setState({progressValue:event.target.value})
    }
    changePercentage = (e) => {
      console.log(e,"sdfasa")
      this.setState({
        progressValue:e.target.value
      })
    }
    callTasklist=(data)=>{
      this.setState({
        callstatus:data        
      })
    }

  render() {
    var progress = {
      width: this.state.progress + "%",
      // width: this.state.progress - "%"
    };
    console.log(this.props.TaskList, "nix");
    return (
      <React.Fragment>
        <div className="d-flex">
          <div className="line">
            <h5 className="form-subheading">Status </h5>
            <Card>
              <Card.Body>
                <h5 className="form-subheading">Task List </h5>
                <div className="scroll_right">
                  {this.state.patent.map((val, index) => {
                    return (
                      <div className="d-flex">
                        <div className="w-100 padding_top">
                          <div className="hoverr">
                            <div className="font_patent" onClick={(data)=>this.callTasklist(this.state.statusTasklist[index])}>
                              {this.state.statusTasklist[index]}
                            </div>
                            <span>{val.time}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card.Body>
            </Card>
          </div>
          <div className="task_width">
            <h5 style={{ marginLeft: "25%" }} className="form-subheading">
              Task Status
            </h5>
            <Card className="card_status">
              <div>
                <div className="status_calltask">{this.state.callstatus}</div>
              {/* <div className="shell_width">
                  <div className="shell">
                   <div className="bar" style={ progress }>
                   <span>  { this.state.progress + "%" }</span>
                </div>
             </div>
               <div>
               <button onClick={ this.clickHandler.bind(this)  }>+</button>
               <button onClick={ this.clickHandlerMinus.bind(this)  }>-</button>
               </div>
           </div> */}
           <div className="d-flex mt-3 ">
           <span className="font-original"></span>
           <div className="percent_field">

              <input  className="w-75 move_aside" value={this.state.progressValue} onChange={this.changePercentage}/>
              <span>%</span>
              </div>
              </div>
    
           <div className="percentage_move mt-3">
           <span>0%</span>
           <span>50%</span>
           <span>100%</span>
           </div>
              <div className="input-range">
                <input
                  type="range"
                  value={this.state.progressValue}
                  ref="inputRangeRef"
                  onChange={this.onChangeListener}
                  className="input-range__slider"
                  min="0"
                  max="100"
                  step='1'
                  defaultValue="0"
          />
          {/* <p>{this.state.progressValue+'%'}</p> */}
              </div>
              
              </div>
            </Card>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default StatusModal;
