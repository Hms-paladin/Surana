import React from "react";
import tableschema from './AddProjectTable/TableLTRschema.json';
import AddProjectDynTable from './AddProjectTable/DynTable'
import Grid from '@material-ui/core/Grid';
// import "./previewresume.css"
import { apiurl } from "../../../App";
import {Modal} from 'antd'
import { Input } from 'antd';

const axios = require('axios');

class AddProjectList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userdata: null,
      edituserdata: null,
      usertabledata: [],
      edit: null,
      modalShow: false,
      modalShowsms: false,
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

    console.log(data,"deleteid")

    var self = this
  axios({
    method: 'delete',
    url: apiurl + "/deleteprojectcase",
    data:{
      proId:data.id
    },
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(function (response) {
      self.getcall()
    })
  }

  componentDidMount(){
    this.getcall()
     }

     getcall=()=>{
      var self = this
      axios({
        method: 'get',
        url: apiurl + "/viewaddprojectcase",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(function (response) {
          console.log(response.data.data,"resdata")
          var usertabledata = []
          // var tagvalue = []
          response.data.data.map((data,index)=>{
            usertabledata.push({
                ProjectName:data.ProjectName,
                ClientName:data.ClientName,
                CreatedDate:data.CreatedDate,
             
              id:data.ProId})
            
          })      
          self.setState({usertabledata:usertabledata})
        })
        .catch(function (error) {
          console.log(error, "error");
        });
     }

    //  search function



  render() {
  //   console.log(this.state.usertabledata,"usertabledata")
  //   const searchdata = this.state.usertabledata.filter((data) => {
  //     return data
  // })
    return (
      <div>
        <div className="filedOpp_tablemain">
          <div className="table_x_scroll">
          <AddProjectDynTable
            editData={(data) => this.editData(data)}
            deleteData={(data) => this.deleteData(data)}
            tabledata={this.state.usertabledata}
            primaryKey="userId"
            tableschema={tableschema.fields}
            editclose={"editicon"}
            mainclassName={"userwidth"}
          />
          
        </div>
        </div>
      </div>
    )
  }
}
export default AddProjectList;