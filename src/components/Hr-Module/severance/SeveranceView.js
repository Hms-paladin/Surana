import React from "react";
import tableschema from "./severenceTable/TableLTRschema.json";
import SeverenceTable from './severenceTable/SeveranceTable';
import Grid from '@material-ui/core/Grid';
// import "./previewresume.css"
import { apiurl } from "../../../App";

const axios = require('axios');
class Severanceview extends React.Component {
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
      status:undefined,      
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
 
   deleteData = (data) => {
    console.log(data.id,"dfklsnflk")
    console.log(data,"snfskn")
 axios({
   method: "DELETE",
   url: apiurl + "/deleteseveranceform",
  
   data:{
    "id":data.id
 }
 })
 .then((response)=>{
   console.log(response.data.data, "resdata");
   this.getTableData()
 })
 }
    // this.state.usertabledata.splice(e.sno - 1, 1)
    // var i
    // for (i = 0; i < this.state.usertabledata.length; i++) {
    //   this.state.usertabledata[i].sno = i + 1
    // }
    // this.setState({ usertabledata: this.state.usertabledata })
  
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

  pendingClick=(id,data)=>{
    console.log(id,"pending")
    console.log(data,"pending")
  }

  getData = (id,data) => {
    // alert(id)
    // alert(data)
    // alert("success maamey!")
  }

componentDidMount(){
  this.getTableData()
}

  getTableData =()=>{
    var self = this
  axios({
    method: 'get',
    url: apiurl + "/getseverance",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(function (response) {
      console.log(response.data.data,"resdataresdata")
      var usertabledata = []
      var pending=[]
      // var tagvalue = []
      response.data.data.map((data,index)=>{
        pending.push(data.Status)

        usertabledata.push({
          empId:data.Name,
          deptId:data.DeptName,
          DateofResignation:data.DateofResignation,
          Resignationacceptedon:data.Resignationacceptedon,
          acceptedby:data.Acceptedbyname,
          DateofRelieving:data.DateofRelieving,   
          // pendingData:data.Status === 0 ? <p key={0}  className="text-danger">Pending</p> : <p key={1} className="text-success">Completed</p>,       
          id:data.SeveId,
        })
          console.log(pending,"pendingvals")
          console.log(data.Status,"status")
        
      })      
      self.setState({
        usertabledata:usertabledata,
        status:pending
      })
    })
    .catch(function (error) {
      console.log(error, "error");
    });
     }
  render() {
  //   console.log(this.state.usertabledata,"usertabledata")
  //   const searchdata = this.state.usertabledata.filter((data) => {
  //     return data
  // })
    return (
      <div>
        <div className="table_x_scroll">
          <SeverenceTable
            editData={(data) => this.editData(data)}
            deleteData={(data) => this.deleteData(data)}
            tabledata={this.state.usertabledata}
            primaryKey="userId"
            tableschema={tableschema.fields}
            multideleteData={(data) => this.multideleteData(data)}
            editclose={"editicon"}
            mainclassName={"userwidth"}
            tablehead={"Severance List"}
            PendingDatas={this.state.status}
            getData={(data)=>this.getData(data)}
          />
          {/* <MyVerticallyCenteredModal
            show={this.state.modalShow}
            onHide={() => this.setModalShow(false)}
          />
          <SMSsend
            show={this.state.modalShowsms}
            onHide={() => this.setModalShowsms(false)}
          /> */}
        </div>
      </div>
    )
  }
}
export default Severanceview;