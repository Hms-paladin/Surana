import React from "react";
import tableschema from './OppTrademarkSchema.json';
import FiledOppositionTable from './TMOppositionTable/DynTable'
import Grid from '@material-ui/core/Grid';
// import "./previewresume.css"
import { apiurl } from "../../../../App";
import {Modal} from 'antd'
import { Input } from 'antd';
import Calenderbox from "../../../../formcomponent/calenderbox";
import './TradeMarkOpposition.css';

const axios = require('axios');

class FiledOppositionList extends React.Component {
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
  var calendar=<Calenderbox className="w-75"/>
  var self = this
  axios({
    method: 'get',
    url: apiurl + "/viewpreviousOppositeitems",
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
          stages:data.Stage,
          substages:data.Substage,
          date:data.Date,
          actual_date:(<Calenderbox className="w-50"/>),
          id:data.ProjectTemplateId})
        
      })      
      self.setState({usertabledata:usertabledata})
    })
    .catch(function (error) {
      console.log(error, "error");
    });
     }

    //  search function

    searchdata=(e)=>{
      let x;
      let m;
      let a;
      let schmetruedatasplit=[]
      let schmetruedata=[]
      let dataindex=[]
  
      for (x=0;x<this.state.data.length;x++){
      schmetruedatasplit.push(this.state.tableschema&&this.state.tableschema.length>0&&this.state.tableschema.filter((obj)=>obj.visible==true).map((item,key)=>{
      var checkempty=!this.state.data[x][item.key]?'':this.state.data[x][item.key];
        item[this.state.data[x].key]=checkempty;
      return(
       item.date?(this.bindDate(new Date(this.state.data[x][item.key]),item.format)):(item.key!=this.state.primaryKey ?this.state.data[x][item.key]:'')
        )
        }))
        
      }
  
      for(a=0;a<schmetruedatasplit.length;a++){
      schmetruedata=schmetruedata.concat(schmetruedatasplit[a])
      }
  
      const schmealldata=this.state.tableschema.filter((len)=>len.visible===false)
      const schmetruelength=this.state.tableschema.length-schmealldata.length
     
     
     const filtervalue=schmetruedata.filter(
       function(reduce) {
         return reduce.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1;
     }
     )
     console.log(filtervalue,"filtervalue")
  
      for (m=0;m<filtervalue.length;m++){
        dataindex.push(schmetruedata.indexOf(filtervalue[m]))
      }
      // console.log(schmetruelength,"dataindex")
  
      let p
      let q
      var defaultvalue=0
      let cal=schmetruelength
      for(q=0;q<schmetruedata.length;q++){
        console.log(defaultvalue,"defaultvalue")
        for(p=defaultvalue;p<schmetruelength+defaultvalue;p++){
          console.log(p)
          if(defaultvalue===schmetruelength-1){
            defaultvalue=defaultvalue+schmetruelength
          }
        }
      }
      
  
    }

  render() {
  //   console.log(this.state.usertabledata,"usertabledata")
  //   const searchdata = this.state.usertabledata.filter((data) => {
  //     return data
  // })
    return (
      <div>
        <div className=" filedOpp_tablemain">
          <div className="table_x_scroll">
          <FiledOppositionTable
            editData={(data) => this.editData(data)}
            deleteData={(data) => this.deleteData(data)}
            tabledata={this.state.usertabledata}
            primaryKey="userId"
            tableschema={tableschema.fields}
            multideleteData={(data) => this.multideleteData(data)}
            editclose={"editicon"}
            deleteclose={"deleteicon"}
            viewclose={"viewicon"}
            mainclassName={"userwidth"}
          />
          
        </div>
        </div>
      </div>
    )
  }
}
export default FiledOppositionList;