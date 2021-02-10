import React from 'react';
import { Grid } from '@material-ui/core';
import DynTable from "./DynTable";
import tableschema from "./TableLTRschema.json";
import moment from "moment";
import dateformat from "dateformat";
import { apiurl } from "../../../App";
import { Input} from "antd";
import './Addcandidate.css'


const axios = require("axios");





class Addcandidatelist extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          userdata: null,
          usertabledata: [],
          search: null,
          // Payroll: {
          //   monthYear: dateformat(moment(), "yyyy-mm"),
          // },
        
        };
    }
  
    componentDidMount() {
        this.getTableData();
      }
      // payrollMonth = (data) => {
      //   console.log(this.state.Payroll.monthYear,"why");
      //   let payroll = this.state.Payroll;
      //   payroll.monthYear = dateformat(data._d, "yyyy-mm")
      //   this.setState({Payroll:payroll});
      //   this.getTableData();
      // };
     
      getTableData=()=>{
        var self = this;
        axios({
          method: "get",
          url: apiurl + "/getInduction",
          // headers: {
          //   Accept: "application/json",
          //   "Content-Type": "application/json",
          // },
        //   data:{
        //     monthYear:this.state.Payroll.monthYear
        // }
        })
          .then(function (response) {
            console.log(response.data.data, "resdata");
            var usertabledata = [];
            var userempId = []
            var userlist = []


            response.data.data.map((data,index) => {
            userlist.push(
              data.empId
            )
            })

            response.data.data.map((data,index) => {
              if(!userempId.includes(data.empId)){
              userempId.push(
                data.empId
              )
              
              
              usertabledata.push({
                Candidatename: data.Candidatename,
                DeptName: data.DeptName,
                CLName:data.CLName,
                Status:self.count(userlist,data.empId) === 4 ? <div style={{color:"green"}}>Completed</div> : <div onClick={()=>self.openAddCandidate(data)} style={{color:"red",cursor:"pointer"}}>Pending</div>,
                id:data.InduId
              });
            }

            });
            
            self.setState({usertabledata:usertabledata})
          })
          
          .catch(function (error) {
            console.log(error, "error");
          });
      }
      searchChange = (e) => {
        this.setState({ search: e.target.value })
      }


       count=(userdataArr,id)=> {    
        var cnt = 0;

        for (var i = 0; i < userdataArr.length; i++) {
            if (userdataArr[i]===id){
                cnt++;
            }
        }
        return cnt
      }

      openAddCandidate=(data)=>{
        this.props.addCandidateData(data)
      }

    render(){

      console.log([...new Set(this.state.colorId)],"colorId")

        const { Search } = Input;
        const searchData = []
        this.state.usertabledata.filter((data, index) => {
           console.log(data, "Search_data");
           if (this.state.search === undefined || this.state.search === null){
            searchData.push({
              Candidatename: data.Candidatename,
              DeptName:data.DeptName,
              CLName:data.CLName,
              Status:data.Status,
              id:data.id
              })
          }
          else if (
               data.Candidatename !== null && data.Candidatename.toLowerCase().includes(this.state.search.toLowerCase())
            // || data.product_name !== null && data.product_name.toLowerCase().includes(this.state.search.toLowerCase())
            || data.DeptName !== null && data.DeptName.toString().toLowerCase().includes(this.state.search.toString().toLowerCase())
            || data.CLName !== null && data.CLName.toString().toLowerCase().includes(this.state.search.toString().toLowerCase())
            || data.Status !== null && data.Status.toString().toLowerCase().includes(this.state.search.toString().toLowerCase())

            ) {
             
            searchData.push({
              Candidatename: data.Candidatename,
              DeptName:data.DeptName,
              CLName:data.CLName,
              Status:data.Status,
              id:data.id

              })
          }
        })

        return(
            <React.Fragment>
              
                       <div className="viewcandidate_table"> 
                      <div className="searchbar_div"> 
                <Search
                placeholder=" Search "
                onChange={(e) => this.searchChange(e)}
                style={{ width: 220 }}
                className="search_box_container"
              />    
              </div>                         
             <DynTable
            // editOpen={(id, rowdata) => this.editClick(id, rowdata)}
            tabledata={searchData}
            primaryKey="userId"
            tableschema={tableschema.fields}
            // multideleteData={(data) => this.multideleteData(data)}
            deleteclose={"deleteicon"}
            editclose={"editicon"}

            // tablehead={"Payroll List Search"} 
            >
            </DynTable>
            </div>

            </React.Fragment>
        )
    }
}
export default Addcandidatelist;