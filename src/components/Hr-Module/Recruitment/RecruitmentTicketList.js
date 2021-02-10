import React from "react";
import tableschema from "./table/TableLTRschema.json";
import DynTable from "./table/DynTable";
import Grid from "@material-ui/core/Grid";
import { apiurl } from "../../../App";
import { Input, message } from "antd";

const { Search } = Input;

const axios = require("axios");
class RecruitmentTicketList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search:null,
      userdata: null,
      edituserdata: null,
      modalvisible: false,
      usertabledata: [],
      edit: null,
      modalShow: false,
      modalShowsms: false,
    };
  }
  setModalShow = (e) => {
    this.setState({
      modalShow: e,
    });
  };
  setModalShowsms = (e) => {
    this.setState({
      modalShowsms: e,
    });
  };
  sendsms = () => {
    return (
      <button
        className="btn btn-sm btn-success"
        onClick={() => this.setModalShowsms(true)}
        variant="success"
      >
        Send
      </button>
    );
  };
  sendemail = () => {
    return (
      <button
        className="btn btn-sm btn-success"
        onClick={() => this.setModalShow(true)}
        variant="success"
      >
        Send
      </button>
    );
  };
  deleteData = (e) => {
    axios({
      method:'DELETE',
      url:apiurl+'/removegenerateticket',
      data:{
        generateticketId:e.id
      }
    }).then((response)=>{
      message.success("Ticket Deleted Successfully")
      this.getTableData() 
    })
  };

  multideleteData = (e) => {
    let storearr = e;
    let sortvalue = storearr.sort(function (a, b) {
      return a - b;
    });
    console.log(sortvalue);
    let i = 1;
    for (i = 1; i < storearr.length + 1; i++) {
      this.state.usertabledata.splice(sortvalue[storearr.length - i] - 1, 1);
    }
    let j;
    for (j = 0; j < this.state.usertabledata.length; j++) {
      this.state.usertabledata[j].sno = j + 1;
    }
    this.setState({
      selected: [],
      usertabledata: this.state.usertabledata,
    });
  };
  componentDidMount() {
    this.getTableData() 
  }

  getTableData = () => {
    var self = this;
    axios({
      method: "get",
      url: apiurl + "/viewrequirement",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        console.log(response, "resdata");
        var usertabledata = [];
        response.data.data.map((data, index) => {
          usertabledata.push({
            name: data.Name,
            department: data.EmpDepartment,
            designation:data.EmpDesignation,
            id: data.GenerateTicketId,
          });
        });
        self.setState({ usertabledata: usertabledata });
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
        // || data.department !== null && data.department.toString().toLowerCase().includes(this.state.search.toLowerCase())
        ||data.designation !== null && data.designation.toLowerCase().includes(this.state.search.toLowerCase())
        ) 
        {
          return data
      }
  })
    return (
      <div>
        <div className="table_x_scroll cand_tablemain">
          <Search 
              className="w-25 cand_search"
              placeholder="Search.." 
              onSearch={value => console.log(value)} 
              enterButton 
              onChange={this.searchdata}
              />

          <div className="table_x_scroll">
            <DynTable
              editData={(data) => this.editData(data)}
              deleteData={(data) => this.deleteData(data)}
              tabledata={searchdata}
              primaryKey="userId"
              tableschema={tableschema.fields}
              multideleteData={(data) => this.multideleteData(data)}
              editclose={"editicon"}
              mainclassName={"userwidth"}
              tablehead={"List of Tickets"}
              propsFunc={(data)=>this.props.propsFunc(data)}
              listdata={(data)=>this.props.listdata(data)}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default RecruitmentTicketList;
