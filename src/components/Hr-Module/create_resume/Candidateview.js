import React from "react";
import tableschema from "./candidateschema.json";
import CandidateDynTable from "./createResumeTable/DynTable";
import MyVerticallyCenteredModal from "./Sendemail.js"
import SMSsend from "./Sendsms.js";
import Grid from '@material-ui/core/Grid';
import "./previewresume.css"
import { apiurl } from "../../../App";
import { Input } from 'antd';

const { Search } = Input;

const axios = require('axios');
class Candidateview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userdata: null,
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
    alert("test")
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

  deleteData = (data) => {
    console.log(data.resume,"snfskn")
 axios({
   method: "DELETE",
   url: apiurl + "/deleteresume",
  
   data:{
    "id":data.resume
 }
 })
 .then((response)=>{
   console.log(response.data.data, "resdata");
   this.getTableData()
 })
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
  componentDidMount(){
    this.getTableData()
  }

    getTableData =()=>{
    var self = this
  axios({
    method: 'get',
    url: apiurl + "/getresumedetails",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(function (response) {
      console.log(response,"resdata")
      var usertabledata = []
      response.data.data.map((data,index)=>{
        var experiance = data.Experience[0] !== undefined ? data.Experience[0].Experience : "0"
        var department = data.Experience[0] !== undefined ? data.Experience[0].DeptName : "-"
        var designation = data.Experience[0] !== undefined ? data.Experience[0].DesigName : "-"
        var gender = data.Gender === "1" ? "Male" : "Female"
        console.log(data,"Experiance")

        usertabledata.push({resume:data.ResId,name:data.Name,age:data.Age,gender:gender,experiance:experiance,department:department,designation:designation,id:index})
      })
            // experience:data.Experience[0].Experience,department:data.Experience[0].DeptName,designation:data.Experience[0].DesigName,
      self.setState({usertabledata:usertabledata})
    })
    .catch(function (error) {
      console.log(error, "error");
    });
     }

     searchdata=(e)=>{
       this.setState({
         search:e.target.value
       })
    }

  render() {
  const searchdata = this.state.usertabledata.filter((data) => {
    if (this.state.search === null)
        return data
    else if (
      data.name !== null && data.name.toLowerCase().includes(this.state.search.toLowerCase())
      || data.age !== null && data.age.toString().toLowerCase().includes(this.state.search.toLowerCase())
      || data.gender !== null && data.gender.toLowerCase().includes(this.state.search.toLowerCase())
      || data.experiance !== null && data.experiance.toString().includes(this.state.search.toString())
      || data.department !== null && data.department.toLowerCase().includes(this.state.search.toLowerCase())
      // ||data.designation !== null && data.designation.toLowerCase().includes(this.state.search.toLowerCase())
      ) 
      {
        return data
    }
})
console.log(this.props,"dskfkjdshfk")
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
            tabledata={searchdata}
            primaryKey="userId"
            tableschema={tableschema.fields}
            multideleteData={(data) => this.multideleteData(data)}
            editclose={"editicon"}
            mainclassName={"userwidth"}
            tablehead={"Candidate List"}
            editTabControl={(index, edit)=>this.props.editTabControl(index, edit)}
            propFunc={this.props.propFunc}
            dispatch={this.props.dispatch}
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
