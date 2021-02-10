import React from 'react';
import Expenseschema from './Expenseviewschema.json';
import EnhancedTable from "./NewExpenseTable/DynTable";
import { Input, notification } from "antd";

import './Expenseview.css';
import { apiurl } from "../../../App";
const { Search } = Input;

const axios = require('axios');

class Expenseview extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userdata:null,
            edituserdata:null,
            modalvisible:false,
            usertabledata:[],
            search: null,
            edit:null
        };
      }

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

      componentDidMount(){
    var self = this
      axios({
        method: 'get',
        url: apiurl + "/viewexpense",
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
            usertabledata.push({Department:data.Department,Name:data.Name,Amount:data.Amount,CreateDate:data.CreateDate,id:index})
            console.log(data,"nix")
            console.log(usertabledata,"syed")
          })      
          self.setState({usertabledata:usertabledata})
        })
        .catch(function (error) {
          console.log(error, "error");
        });
        }

       
    searchdata = (e) => {
      this.setState({
        search: e.target.value,
      });
    };


    render(){
      const searchdata = this.state.usertabledata.filter((data) => {
        if (this.state.search === null) return data;
        else if (
          (data.Department !== null &&
            data.Department.toLowerCase().includes(
              this.state.search.toLowerCase()
            )) ||
          (data.Name !== null &&
            data.Name.toLowerCase().includes(this.state.search.toLowerCase())) ||
          (data.CreateDate !== null &&
            data.CreateDate.toLowerCase().includes(
              this.state.search.toLowerCase()
            )) 
          //   ||
          // (data.Amount !== null &&
          //   data.Amount.toLowerCase().includes(
          //     this.state.search.toLowerCase()
          //   )) 
        ) {
          return data;
        }
      });
        return(
            <React.Fragment>
            <div className="card card-min-height mt-4">
                <div className="card card-body"> 
  
            <div className="">
                <div  className="empSearch_Main">
                    <Search className=""
                    placeholder="Search.."

                    onChange={this.searchdata}
                    />
                  

                
                </div>

                <div className="table_x_scroll expense_table_adjust">
                    <EnhancedTable 
                    editData={(data)=>this.editData(data)} 
                    deleteData={(data)=>this.deleteData(data)} 
                    tabledata={searchdata} 
                    primaryKey="userId" 
                    tableschema={Expenseschema.fields} 
                    multideleteData={(data)=>this.multideleteData(data)}
                    editclose={"editicon"}
                    mainclassName={"userwidth"}
                    tablehead={"Expense List"}
                    deleteclose={"deleteicon"}

      
        />
</div>
                  
              
  
            </div>
            </div>
            </div>
         </React.Fragment>
        )
    }
}
export default Expenseview;