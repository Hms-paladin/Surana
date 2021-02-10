import React from 'react';
import SearchBox from '../../../formcomponent/searchBox';
import Expenseschema from './Expenseviewschema.json';
import EnhancedTable from "./NewExpenseTable/DynTable";
import './Expenseview.css';
import { apiurl } from "../../../App";

const axios = require('axios');

class Expenseview extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userdata:null,
            edituserdata:null,
            modalvisible:false,
            usertabledata:[],
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

        //  search function

    // searchdata=(e)=>{
    //   let x;
    //   let m;
    //   let a;
    //   let schmetruedatasplit=[]
    //   let schmetruedata=[]
    //   let dataindex=[]
  
    //   for (x=0;x<this.state.data.length;x++){
    //   schmetruedatasplit.push(this.state.tableschema&&this.state.tableschema.length>0&&this.state.tableschema.filter((obj)=>obj.visible==true).map((item,key)=>{
    //   var checkempty=!this.state.data[x][item.key]?'':this.state.data[x][item.key];
    //     item[this.state.data[x].key]=checkempty;
    //   return(
    //    item.date?(this.bindDate(new Date(this.state.data[x][item.key]),item.format)):(item.key!=this.state.primaryKey ?this.state.data[x][item.key]:'')
    //     )
    //     }))
        
    //   }
  
    //   for(a=0;a<schmetruedatasplit.length;a++){
    //   schmetruedata=schmetruedata.concat(schmetruedatasplit[a])
    //   }
  
    //   const schmealldata=this.state.tableschema.filter((len)=>len.visible===false)
    //   const schmetruelength=this.state.tableschema.length-schmealldata.length
     
     
    //  const filtervalue=schmetruedata.filter(
    //    function(reduce) {
    //      return reduce.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1;
    //  }
    //  )
    //  console.log(filtervalue,"filtervalue")
  
    //   for (m=0;m<filtervalue.length;m++){
    //     dataindex.push(schmetruedata.indexOf(filtervalue[m]))
    //   }
    //   // console.log(schmetruelength,"dataindex")
  
    //   let p
    //   let q
    //   var defaultvalue=0
    //   let cal=schmetruelength
    //   for(q=0;q<schmetruedata.length;q++){
    //     console.log(defaultvalue,"defaultvalue")
    //     for(p=defaultvalue;p<schmetruelength+defaultvalue;p++){
    //       console.log(p)
    //       if(defaultvalue===schmetruelength-1){
    //         defaultvalue=defaultvalue+schmetruelength
    //       }
    //     }
    //   }
      
  
    // }


    render(){
        return(
            <React.Fragment>
            <div className="card card-min-height mt-4">
                <div className="card card-body"> 
  
            <div className="">
                <div  className="empSearch_Main">
                    <SearchBox className=""
                    placeholder=""/>
                
                </div>

                <div className="table_x_scroll expense_table_adjust">
                    <EnhancedTable 
                    editData={(data)=>this.editData(data)} 
                    deleteData={(data)=>this.deleteData(data)} 
                    tabledata={this.state.usertabledata} 
                    primaryKey="userId" 
                    tableschema={Expenseschema.fields} 
                    multideleteData={(data)=>this.multideleteData(data)}
                    editclose={"editicon"}
                    mainclassName={"userwidth"}
                    tablehead={"Expense List"}

      
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