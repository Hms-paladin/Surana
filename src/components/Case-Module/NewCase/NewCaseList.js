import React from "react";
import tableschema from './NewCaseTable/TableLTRschema.json';
import CaseTable from  './NewCaseTable/DynTable';
import Grid from '@material-ui/core/Grid';
// import "./previewresume.css"
import { apiurl } from "../../../App";
import {Modal} from 'antd'
import { Input } from 'antd';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import './Case.css';

const { Search } = Input;
const axios = require('axios');

class NewCaseList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userdata: null,
      edituserdata: null,
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
  this.getCase()
}


getCase=()=>{
    var self = this
  axios({
    method: 'get',
    url: apiurl + "/getcase",
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
        usertabledata.push({CaseTypeName:data.CaseTypeName,ClientName:data.ClientName,ClientIndustry:data.ClientIndustry,Nexthearing:data.Nexthearing,Status:data.Status,id:data.caseId})
        
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
    searchdata=(e)=>{
      this.setState({
        search:e.target.value
      })
   }


   AddClick=()=>{
    this.props.propFunc()    
    this.setState({})
  }

  render() {
    const searchdata = this.state.usertabledata.filter((data) => {
      if (this.state.search === null)
          return data
      else if (data.CaseTypeName !== null && data.CaseTypeName.toString().toLowerCase().includes(this.state.search.toLowerCase()) || data.ClientName !== null && data.ClientName.toLowerCase().includes(this.state.search.toLowerCase()) || data.ClientIndustry !== null && data.ClientIndustry.toString().toLowerCase().includes(this.state.search.toLowerCase()) || data.Nexthearing !== null && data.Nexthearing.toLowerCase().includes(this.state.search.toLowerCase())|| data.Status !== null && data.Status.toLowerCase().includes(this.state.search.toLowerCase())) {
          return data
      }
  })
    return (
      <div>
        <div className=" empmaster_tablemain">
        <div className="caseListSearchCase">
          <Search 
          // cand_search
              className="case_Search"
              placeholder="Search.." 
              // onSearch={value => console.log(value)} 
              enterButton 
              onChange={this.searchdata}
              />
              <AddCircleOutlineIcon 
              className="case_addicon" 
              onClick={()=>this.AddClick()}/>
          </div>
          <div className="table_x_scroll">
          <CaseTable
            editData={(data) => this.editData(data)}
            deleteData={(data) => this.deleteData(data)}
            tabledata={searchdata}
            primaryKey="userId"
            tableschema={tableschema.fields}
            multideleteData={(data) => this.multideleteData(data)}
            editclose={"editicon"}
            mainclassName={"userwidth"}
            tablehead={"Case"}
            getCase={this.getCase}
          />
        
        </div>
        </div>
      </div>
    )
  }
}
export default NewCaseList;