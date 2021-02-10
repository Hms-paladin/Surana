import React from 'react';
import EnhancedTable from "./table/DynTable";
import Courtschema from  './Courtschema.json';
import { apiurl } from '../../../App';
import axios from 'axios';
import {notification} from 'antd';
import './court.css';
import { Input } from 'antd';

const { Search } = Input;

class CourtList extends React.Component{
    constructor(props) {
        super(props);
      
        this.state = {
            userdata:null,
            edituserdata:null,
            modalvisible:false,
            usertabledata:[],
            edit:null,
            search:null,
        };
      }
      componentDidMount(){
        this.getmethod()
      }
      getmethod=()=>{
      var self = this
      axios({
        method: 'get',
        url: apiurl + "/viewcourt",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(function (response) {
          console.log(response.data.data,"resdata")
          var usertabledata = []
          response.data.data.map((data,index)=>{
            usertabledata.push({
              court_code:data.CourtShortName,
              court_name:data.CourtName,
              court_city:data.Courtcity, 
              court_address:data.CourtAddress,               
              id:data.AddCourtId
            })               
          })

          self.setState({usertabledata:usertabledata})
        })
        .catch(function (error) {
          console.log(error, "error");
        });
         }
        

    editClick=(id,data)=>{
      this.props.propFunc(id,data)
      console.log(data,"editdata")
      console.log(id,"editdata")

    }

    

    deleterow=(data)=> {
      console.log(data,"data")    
    
    var self = this
              axios({
                  method: 'delete',
                  url: `${apiurl}/deletecourt`,
                  data:{
                      "addcourtId":data
                      }
                  })
                  .then(function (response) {
                      console.log(response, "responsecourt");
                      // self.props.opendelete()
                     self.getmethod()
                     self.setState({deleteSuccessClose:true})
                     notification.warning({
                      message: `Deleted successfully`,
                      duration: 3.5,
                      placement: "topRight",
                      className:"notification_court"
                    })
                  })
                  .catch(function (error) {
                      console.log(error, "error");
                  });
    this.setState({})
  }
  searchdata=(e)=>{
    this.setState({
      search:e.target.value
    })
 }
  
    

    render(){
      const searchdata = this.state.usertabledata.filter((data) => {
        if (this.state.search === null)
            return data
        else if (data.court_code !== null && data.court_code.toLowerCase().includes(this.state.search.toLowerCase()) ||
         data.court_name !== null && data.court_name.toLowerCase().includes(this.state.search.toLowerCase()) || 
         data.court_city !== null && data.court_city.toLowerCase().includes(this.state.search.toLowerCase()) || 
         data.court_address !== null && data.court_address.toLowerCase().includes(this.state.search.toLowerCase())) {
            return data
        }
    })
        return(
                <div className="mt-5 Court_list_main">
                  <Search 
                    className="w-25 court_search"
                    placeholder="Search.." 
                    // onSearch={value => console.log(value)} 
                    enterButton 
                    onChange={this.searchdata}
                    />  
                    <EnhancedTable 
                    // tabledata={this.state.usertabledata} 
                    tabledata={searchdata}
                    primaryKey="userId" 
                    tableschema={Courtschema.fields}
                    editOpen={(id,rowdata)=>this.editClick(id,rowdata)}
                    deleterow={(id)=>this.deleterow(id)} 
                    deleteSuccessClose={this.state.deleteSuccessClose}
                    tablehead={"Court"} />
                </div>
        )
    }
  }

export default CourtList;
    