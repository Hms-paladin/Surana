
// import React from "react";
// import {Modal} from 'antd'
// import tableschema from './table/TableLTRschema.json'
// import { apiurl } from "../../../App";
// import { getPersonalDetails } from './employeeMasterAction';
// import EmployeeDetails from './EmployeeDetails'
// import "./employeemaster.css";
// import EmployeeDynTable from "./table/DynTable";
// const axios = require('axios');
// class EmployeeMasterList extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       userdata: null,
//       edituserdata: null,
//       modalvisible: false,
//       usertabledata: [],
//       edit: null,
//       modalShow: false,
//     };
//   }
//   setModalShow = (e) => {
//     this.setState({
//       modalShow: e
//     })
//   }
  
//   deleteData = (e) => {
//     this.state.usertabledata.splice(e.sno - 1, 1)
//     var i
//     for (i = 0; i < this.state.usertabledata.length; i++) {
//       this.state.usertabledata[i].sno = i + 1
//     }
//     this.setState({ usertabledata: this.state.usertabledata })
//   }
//   multideleteData = (e) => {
//     let storearr = e
//     let sortvalue = storearr.sort(function (a, b) {
//       return a - b;
//     });
//     console.log(sortvalue)
//     let i = 1
//     for (i = 1; i < storearr.length + 1; i++) {
//       this.state.usertabledata.splice(sortvalue[storearr.length - i] - 1, 1)
//     }
//     let j
//     for (j = 0; j < this.state.usertabledata.length; j++) {
//       this.state.usertabledata[j].sno = j + 1
//     }
//     this.setState({
//       selected: [],
//       usertabledata: this.state.usertabledata
//     })
//   }
// componentDidMount(){
//     var self = this
//   axios({
//     method: 'get',
//     url: apiurl + "/employeemaster",
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//   })
//     .then(function (response) {
//       console.log(response.data.data,"resdata")
//       var usertabledata = []
//       response.data.data.map((data,index)=>{
//         usertabledata.push({empId:data.EmpId,name:data.EmpFirstName,EmpDesignation:data.EmpDesignation,EmpDepartment:data.EmpDepartment,id:index})
        
//       })      
//       self.setState({usertabledata:usertabledata})
//     })
//     .catch(function (error) {
//       console.log(error, "error");
//     });
//      }

//      eyeOpen = (data) => {
//       this.props.dispatch(getPersonalDetails(1))
//       this.setState({
//         viewdata:data,
//         visible: true,
//             });
//           };
//   render() {

//     return (
//       <div>  
//            <div className="table_x_scroll empTable_position">
//                 <EmployeeDynTable 
//                       editData={(data)=>this.editData(data)} 
//                       deleteData={(data)=>this.deleteData(data)} 
//                       viewopen={this.eyeOpen}
//                       tabledata={this.state.usertabledata} 
//                       primaryKey="userId" 
//                        tableschema={tableschema.fields}
//                       multideleteData={(data)=>this.multideleteData(data)}
//                       editclose={"editicon"}
//                       mainclassName={"userwidth empTable_position"}
//                       tablehead={"Employee Master List"}
//                       />
//                       <div>
//                         <Modal className="modal_width"
//                         visible={this.state.visible}
//                         onOk={this.handleOk}
//                         onCancel={this.handleCancel}
//                         footer={null}  
//                       >
//                       <EmployeeDetails />
                      
//                       </Modal>
//                          </div>
//               </div>
//       </div>
//     )
//   }
// }
// export default EmployeeMasterList;




import React from "react";
import tableschema from './table/TableLTRschema.json'
import EmployeeTable from './table/DynTable'
import Grid from '@material-ui/core/Grid';
// import "./previewresume.css"
import { apiurl } from "../../../App";
import EmployeeDetails from './EmployeeDetails'
import {Modal} from 'antd'
import { Input } from 'antd';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const { Search } = Input;
const axios = require('axios');

class EmployeeMasterList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userdata: null,
      edituserdata: null,
      visible: false,
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
    var self = this
  axios({
    method: 'get',
    url: apiurl + "/employeemaster",
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
        console.log(data.EmpActive,"resdatadatadata")
        usertabledata.push({
          EmpId:data.EmpId,
          EmpFirstName:data.EmpFirstName,
          DesigName:data.DesigName,
          DeptName:data.DeptName,
          status:data.EmpActive == 1 ? "Active" : "Inactive",
          id:index})
        
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


  render() {
    const searchdata = this.state.usertabledata.filter((data) => {
      if (this.state.search === null)
          return data
      else if (data.EmpFirstName !== null && data.EmpFirstName.toLowerCase().includes(this.state.search.toLowerCase()) ||
               data.DesigName !== null && data.DesigName.toLowerCase().includes(this.state.search.toLowerCase()) ||
               data.DeptName !== null && data.DeptName.toLowerCase().includes(this.state.search.toLowerCase()) || 
               data.status !== null && data.status.toLowerCase().includes(this.state.search.toLowerCase()))
               {
          return data
      }
  })
    return (
      <div>
        <div className=" empmaster_tablemain">
          <div className="empmaster_tablesubmain">
            <Search 
              className="w-25 empmaster_search"
              placeholder="Search.." 
              onSearch={value => console.log(value)} 
              enterButton 
              onChange={this.searchdata}
              />
              <AddCircleOutlineIcon className="empmaster_addicon" onClick={() => this.props.propFunc(0)}/>
          </div>
          <div className="table_x_scroll">
          <EmployeeTable
            editData={(data) => this.editData(data)}
            deleteData={(data) => this.deleteData(data)}
            // tabledata={this.state.usertabledata}
            tabledata={searchdata}
            primaryKey="userId"
            tableschema={tableschema.fields}
            multideleteData={(data) => this.multideleteData(data)}
            editclose={"editicon"}
            mainclassName={"userwidth"}
            tablehead={"Employee Master"}
          />
          
        </div>
        </div>
      </div>
    )
  }
}
export default EmployeeMasterList;