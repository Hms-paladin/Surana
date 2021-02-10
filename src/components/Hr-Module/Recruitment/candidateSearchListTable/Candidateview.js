import React from "react";
import tableschema from "./candidateschema.json";
import CandidateDynTable from "./DynTable.jsx";
import MyVerticallyCenteredModal from "./Sendemail.js"
import SMSsend from "./Sendsms.js";
import Grid from '@material-ui/core/Grid';
import "../../create_resume/previewresume.css"
import { apiurl } from "../../../../App";
import { Input } from 'antd';

const { Search } = Input;

const axios = require('axios');

class Candidateview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userdata: props.listdata,
      edituserdata: null,
      modalvisible: false,
      usertabledata: [],
      edit: null,
      modalShow: false,
      modalShowsms: false,
      search:null,
    };
  }
  setModalShow = (e) => {
    this.setState({
      modalShow: e
    })
  }
  setModalShowsms = (e) => {
    this.setState({
      modalShowsms: e
    })
  }
  sendsms = () => {
    return (
      <button className="btn btn-sm btn-success" onClick={() => this.setModalShowsms(true)}
        variant="success">Send</button>
    )
  }
  sendemail = () => {
    return (
      <button className="btn btn-sm btn-success" onClick={() => this.setModalShow(true)}
        variant="success">Send</button>
    )
  }
  //   {/* ViewData=(data)=>{
  //     return (
  //       <div>
  //     <button onClick={()=>{
  //       const getData=data;
  //       alert(JSON.stringify(getData))
  //     }}>view</button>  <button onClick={()=>{
  //       const getData=data;
  //       alert(JSON.stringify(getData))
  //     }}>hiii</button></div>)}; */}
  deleteData = (e) => {
    this.state.usertabledata.splice(e.sno - 1, 1)
    var i
    for (i = 0; i < this.state.usertabledata.length; i++) {
      this.state.usertabledata[i].sno = i + 1
    }
    this.setState({ usertabledata: this.state.usertabledata })
  }
  multideleteData = (e) => {
    let storearr = e
    let sortvalue = storearr.sort(function (a, b) {
      return a - b;
    });
    console.log(sortvalue)
    let i = 1
    for (i = 1; i < storearr.length + 1; i++) {
      this.state.usertabledata.splice(sortvalue[storearr.length - i] - 1, 1)
    }
    let j
    for (j = 0; j < this.state.usertabledata.length; j++) {
      this.state.usertabledata[j].sno = j + 1
    }
    this.setState({
      selected: [],
      usertabledata: this.state.usertabledata
    })
  }

     searchdata=(e)=>{
       this.setState({
         search:e.target.value
       })
    }

  render() {
  //   const searchdata = this.state.userdata.filter((data) => {
  //     if (this.state.search === null)
  //         return data
  //     else if (
  //       data.resume !== null && data.resume.toString().includes(this.state.search.toString())
  //       || data.name !== null && data.name.toLowerCase().includes(this.state.search.toLowerCase())
  //       || data.age !== null && data.age.toString().includes(this.state.search.toString())
  //       || data.gender !== null && data.gender.toLowerCase().includes(this.state.search.toLowerCase())
  //       || data.experience !== null && data.experience.toString().includes(this.state.search.toString())
  //       || data.department !== null && data.department.toLowerCase().includes(this.state.search.toLowerCase())
  //       ||data.designation !== null && data.designation.toLowerCase().includes(this.state.search.toLowerCase())
  //       ) 
  //       {
  //         return data
  //     }
  // })
    return (
      <div>
        <div className=" cand_tablemain">
          <Search 
              className="w-25 cand_search"
              placeholder="Search.." 
              // onSearch={value => console.log(value)} 
              enterButton 
              onChange={this.searchdata}
              />
              <div className="table_x_scroll">

          <CandidateDynTable
            editData={(data) => this.editData(data)}
            deleteData={(data) => this.deleteData(data)}
            tabledata={this.state.userdata}
            primaryKey="userId"
            tableschema={tableschema.fields}
            multideleteData={(data) => this.multideleteData(data)}
            editclose={"editicon"}
            mainclassName={"userwidth"}
            tablehead={"Candidate List"}
          />
          <MyVerticallyCenteredModal
            show={this.state.modalShow}
            onHide={() => this.setModalShow(false)}
          />
          <SMSsend
            show={this.state.modalShowsms}
            onHide={() => this.setModalShowsms(false)}
          />
        </div>
        </div>
      </div>
    )
  }
}
export default Candidateview;
