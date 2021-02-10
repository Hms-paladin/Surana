import React from 'react';
import KnowledgeDynTable from "./knowledgeTable.js";
import KnowledgemanagementSearchSchema from  './KnowledgemanagementSearchSchema.json';
import { Grid } from '@material-ui/core';
import Inputantd from "../../../formcomponent/inputantd";
import Calenderbox from "../../../formcomponent/calenderbox";
import Button from 'react-bootstrap/Button';
import './knowledgemgmt.css';
import EditableTag  from './KnowledgeTag.js';
import { apiurl } from "../../../App";
import ValidationLibrary from "../../../validationlibrary/validation.js";
import moment from 'moment';


const axios = require('axios');


class Knowledgemanagementsearch  extends React.Component{
   constructor(props) {
       super(props);
       this.state = {
           userdata:null,
           edituserdata:null,
           modalvisible:false,
           usertabledata:[],
           usertabledatastatic:[],
           edit:null,
           inputlist: [],
           tagdata:[],
           tagvalue:[],
           knowledgesearch:
    {
      'from':
      {
        'value': '',
        validation: [{ 'name': 'required' }],
        error: "",
        errmsg: null
      },
      'to':
      {
        'value': '',
        validation: [{ 'name': 'required' }],
        error: null,
        errmsg: null
      },
    }
           
       };
     }
  // plus_loop = () => {
  //     var inputstore = []
  //     inputstore.push(...this.state.inputlist,
  //         < div >
  //             <Inputantd className="w-100"></Inputantd>
  //         </div >
  //     )
  //     this.setState({
  //         inputlist: inputstore
  //     })
  //     console.log(this.state.inputlist)
  // }
     componentDidMount(){
      var self = this
    axios({
      method: 'get',
      url: apiurl + "/getknowledgemanagement",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(function (response) {
        console.log(response.data.data,"resdata")
        var usertabledata = []
        var tagvalue = []
        var usertabledatastatic = []
        response.data.data.map((data,index)=>{
          usertabledata.push({title:data.Title,description:data.Description,date:data.LastUpdated,id:index,url:data.knowdocument})
          tagvalue.push(data.KnowTags)
          usertabledatastatic.push({title:data.Title,description:data.Description,date:data.LastUpdated,id:index,url:data.knowdocument})
          
        })
        self.setState({usertabledata:usertabledata,tagvalue:tagvalue,usertabledatastatic:usertabledatastatic})
      })
      .catch(function (error) {
        console.log(error, "error");
      });
       }

       tagvalue=(propstagdata)=>{
         console.log(propstagdata,"data")
         this.setState({tagdata:propstagdata})

         var tagfilterdata = []

         for(let z=0;z<propstagdata.length;z++){
          this.state.usertabledatastatic.map((data,index) => {
              if (propstagdata !== [] && this.state.tagvalue[index] !== "" && this.state.tagvalue[index].toLowerCase().includes(propstagdata[z]
              )) {
                tagfilterdata.push(data)
            }
        })
         }
         this.setState({usertabledata:tagfilterdata})

       }

       changeDynamic = (data, key) => {
        console.log("key", key);
        console.log("data", data);
        var knowledgesearch = this.state.knowledgesearch;
        var targetkeys = Object.keys(knowledgesearch);
    
        var errorcheck = ValidationLibrary.checkValidation(data, knowledgesearch[key].validation);
        knowledgesearch[key].value = data;
        knowledgesearch[key].error = !errorcheck.state;
        knowledgesearch[key].errmsg = errorcheck.msg;
        this.setState({ knowledgesearch });
        var filtererr = targetkeys.filter((obj) =>
          knowledgesearch[obj].error == true || knowledgesearch[obj].error == null);
        if (filtererr.length > 0) {
          this.setState({
            error: true,
            errordummy: false
          })
        } else {
          this.setState({ error: false })
        }
      }
    
      callroot = () => {
        this.setState({ changeval: false })
    
        var knowledgesearch = this.state.knowledgesearch;
        var targetkeys = Object.keys(knowledgesearch);
        console.log(targetkeys);
        for (var i in targetkeys) {
          var errorcheck = ValidationLibrary.checkValidation(knowledgesearch[targetkeys[i]].value, knowledgesearch[targetkeys[i]].validation);
          console.log(errorcheck);
          knowledgesearch[targetkeys[i]].error = !errorcheck.state;
          knowledgesearch[targetkeys[i]].errmsg = errorcheck.msg;
        }
        var filtererr = targetkeys.filter((obj) =>
          knowledgesearch[obj].error == true);
        console.log(filtererr.length)
        if (filtererr.length > 0) {
          this.setState({ error: true })
        } else {
          this.setState({ error: false })
          // const date = new Date('2017-4-28');
          console.log(this.state.knowledgesearch.from.value,"this.state.knowledgesearch.from.value")
          
          const start = new Date(this.state.knowledgesearch.from.value);
          const end = new Date(this.state.knowledgesearch.to.value);

          var searchboxdata = []

          this.state.usertabledatastatic.map((data,index)=>{
            console.log(data.length,"userdata")
            if(this.state.knowledgesearch.from.value===null || this.state.knowledgesearch.to.value===null ){
              searchboxdata.push({title:data.title,description:data.description,date:data.date,id:index,url:data.url})
            }else if(new Date(data.date) > start && new Date(data.date) < end){
              searchboxdata.push({title:data.title,description:data.description,date:data.date,id:index,url:data.url})
            }
          })
          console.log(searchboxdata,"searchdata")


          this.setState({
            usertabledata:searchboxdata
          })

        }
        this.setState({ knowledgesearch })
      }

      childclose=(tag)=>{
        if(!tag.includes(",")){

          var searchboxdata = []

          this.state.usertabledatastatic.map((data,index)=>{
              searchboxdata.push({title:data.title,description:data.description,date:data.date,id:index,url:data.url})
          })

          this.setState({
            usertabledata:searchboxdata
          })

        }
      }
     
   render(){
    const inputbox = this.state.inputlist.map((box) => box)

  //   const searchdata = this.state.usertabledata.filter((data,index) => {
  //     console.log(data,"mapdata")
  //     if (this.state.tagdata.length === 0){
  //         return data
  //     }
  //      else if (this.state.tagdata !== [] && this.state.tagvalue[index] !== "" && this.state.tagvalue[index].toLowerCase().includes(this.state.tagdata[0]
  //       )) {
  //         return data
  //     }
  // })

  console.log(this.state.tagdata,"searchboxdata")

       return(
        <div className="card mt-4" >
          <div className="card-body">
            <Grid container spacing={3} className="mb-3 mt-1">
                  <Grid item md={4} sm={5} className="p-0">
                    <EditableTag tagvalue={(data)=>this.tagvalue(data)} childclick={(tag)=>this.childclose(tag)}/>
                  </Grid>
                  <Grid item md={2} sm={4} >
                    {/* <label className="updated_down" >Date Updated</label> */}
                  </Grid>
                  <Grid item md={2} sm={2} className="p-0">
                      <Calenderbox className="mt-1" label="From" breakclass="d-none" 
                      moment={"DD-MM-YYYY"} format={"DD-MM-YYYY"}
                      changeData={(data) => this.changeDynamic(data, 'from')}
                      value={this.state.knowledgesearch.from.value}
                      error={this.state.knowledgesearch.from.error}
                      errmsg={this.state.knowledgesearch.from.errmsg}
                      />
                  </Grid>
                  <Grid item md={2} sm={2} className="calendar_to-move" >
                      <Calenderbox label="To" breakclass="d-none"  
                        moment={"DD-MM-YYYY"} format={"DD-MM-YYYY"}
                        changeData={(data) => this.changeDynamic(data, 'to')}
                        value={this.state.knowledgesearch.to.value}
                        error={this.state.knowledgesearch.to.error}
                        errmsg={this.state.knowledgesearch.to.errmsg}
                        disablePast
                        />
                  </Grid>
                  <Grid item md={2} sm={2}>
                    <Button className="btn btn-success btn-sm mt-4" onClick={this.callroot}>Search</Button>
                  </Grid>
              </Grid>
               <div>
                   <KnowledgeDynTable
                    // tabledata={ searchdata.length ===  0 ? []: searchdata }
                    tabledata={ this.state.usertabledata }
                    primaryKey="userId"
                    tableschema={KnowledgemanagementSearchSchema.fields}
                    tablehead={"Knowledge Management Search"}
                    editclose={"editicon"}
                    deleteclose={"deleteicon"}
                   />
               </div>
        </div>
      </div>
       )
   }
 }
export default Knowledgemanagementsearch;