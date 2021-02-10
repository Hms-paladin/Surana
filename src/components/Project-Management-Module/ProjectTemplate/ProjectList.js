import React from "react";
import tableschema from './ProjectTemplateSchema.json';
import ProjectDynTable from './ProjectTable/DynTable'
import Grid from '@material-ui/core/Grid';
import "./ProjectTemplate.css"
import { apiurl } from "../../../App";
import {Modal} from 'antd'
import { Input } from 'antd';
import Modalreact from "./ProjectTable/viewmodel"
import Deletemodal from "./ProjectTable/deletemodel"
import DragdropTable from "../DragTable";



const axios = require('axios');

class NewCaseList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userdata: null,
      edituserdata: null,
      usertabledata: [],
      edit: null,
    };
  }

componentDidMount(){
  this.templatecall()
     }

     templatecall=()=>{
      var self = this
      axios({
        method: 'get',
        url: apiurl + "/viewprojectTemplate",
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
              substages:data.Substage?data.Substage:"----",
              TDays:data.TDays?data.TDays:"----",
              RBDays:data.RBDays?data.RBDays:"----",
              LinkToPrevious:data.LinkToPrevious?data.LinkToPrevious:"----",
              // DocumentsRequired:data.DocumentsRequired?data.DocumentsRequired:"----",
              id:data.ProjectTemplateId})
            
          })      
          self.setState({usertabledata:usertabledata,userFullData:response.data.data})
        })
        .catch(function (error) {
          console.log(error, "error");
        });
     }

    UNSAFE_componentWillReceiveProps(newprops){
      this.setState({currentState:newprops.currentState})
      this.templatecall()
      console.log(newprops.currentState,"currentState")
    }

    viewdata=(id)=>{
      var viewdata = this.state.userFullData.filter((data,index)=>{
       return data.ProjectTemplateId===id
      })

      var viewdata = viewdata[0]

      var viewdetails = (
        <div className="projectTemplateview_container">
      <div className="projectTemplateview_key">
    <div>Template</div>
    <div>Process</div>
    <div>Type</div>
    <div>Stage</div>
    <div>Substage</div>
    <div>T + Days</div>
    <div>Remind Before Days</div>
    <div>Link To Previous</div>
    <div>Documents Required</div>
    </div>
    <div className="projectTemplateview_colon">
      <div>:</div>
      <div>:</div>
      <div>:</div>
      <div>:</div>
      <div>:</div>
      <div>:</div>
      <div>:</div>
      <div>:</div>
      <div>:</div>
    </div>
    <div className="projectTemplateview_value">
    <div>{viewdata.Template?viewdata.Template:"----"}</div>
    <div>{viewdata.Process?viewdata.Process:"----"}</div>
    <div>{viewdata.Type?viewdata.Type:"----"}</div>
    <div>{viewdata.Stage?viewdata.Stage:"----"}</div>
    <div>{viewdata.Substage?viewdata.Substage:"----"}</div>
    <div>{viewdata.TDays?viewdata.TDays:"----"}</div>
    <div>{viewdata.RBDays?viewdata.RBDays:"----"}</div>
    <div>{viewdata.LinkToPrevious?viewdata.LinkToPrevious:"----"}</div>
    <div>{viewdata.DocumentsRequired?viewdata.DocumentsRequired:"----"}</div>
    </div>

    </div>

      )


      this.setState({viewModelOpen:true,viewdata:viewdetails})
      console.log(viewdata,"viewdata")
    }

    editData=(id)=>{
      var editvalue = this.state.userFullData.filter((data,index)=>{
        return data.ProjectTemplateId===id
       })
 
       var editvalue = editvalue [0]
      this.props.editcall(editvalue)
    }

    deleterow=()=>{
      var self = this
      axios({
        method: 'delete',
        url: apiurl + "/deleteprojectTemplate",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data:{
          projectTemplateId:this.state.deleteId
        }
      })
        .then(function (response) {
        self.templatecall()
        self.props.LinkToPreviouscall()
        self.setState({opendelete:false})
        })
    }

    deleteData=(id)=>{
      this.setState({opendelete:true,deleteId:id})
    }

    clodeModel=()=>{
      this.setState({viewModelOpen:false,opendelete:false})
    }

  render() {
    console.log(this.state.currentState,"viewModelOpen")
    console.log(this.state.userFullData,"viewModelOpen1")


    var tableData = []

    this.state.currentState && this.state.userFullData.map((data,index)=>{
      if(data.Template===this.state.currentState.Project_template_data.template.value && data.Process ===this.state.currentState.Project_template_data.process.value && data.Type === this.state.currentState.Project_template_data.type.value || data.Template===this.state.currentState.Project_template_data.template.value && this.state.currentState.Project_template_data.template.value === "Copyright"){
        tableData.push({
          stages:data.Stage,
          substages:data.Substage?data.Substage:"----",
          TDays:data.TDays?data.TDays:"----",
          RBDays:data.RBDays?data.RBDays:"----",
          LinkToPrevious:data.LinkToPrevious?data.LinkToPrevious:"----",
          id:data.ProjectTemplateId,
          indexid:index.toString()
        
      })
      }
    })

    console.log(tableData,"tableData")

    return (
      <div>
        <div className=" empmaster_tablemain">
          {/* <ProjectDynTable
            editOpen={(data) => this.editData(data)}
            viewOpen={(data) => this.viewdata(data)}
            deleteOpen={(data) => this.deleteData(data)}
            tabledata={tableData}
            primaryKey="userId"
            tableschema={tableschema.fields}
          /> */}
          <DragdropTable 
            heading={[
                {id:"order", label:"Order"},
              { id: "", label: "S.No" },
              { id: "stages", label: "Stages" },
              { id: "substage", label: "Sub Stages" },
              { id: "t+days", label: "T + Days" },
              { id: "remindbeforedays", label: "Remind BeforeDays" },
              { id: "linktoprevious", label: "Link To Previous" },
              { id: "", label: "View" },
              { id: "", label: "Action" },

            ]}
            rowdata={tableData && tableData}
            editOpen={(data) => this.editData(data)}
            viewOpen={(data) => this.viewdata(data)}
            deleteOpen={(data) => this.deleteData(data)}
          />
          
        </div>
        {this.state.viewModelOpen&&
        <Modalreact modalopen={true}
          onclickok={this.clodeModel}
          viewdata={this.state.viewdata}
          modelclassName={"nonebtnmodel templateView"}
          />
        }

          {this.state.opendelete &&
          <Deletemodal modalopen={true}
          onclickok={this.clodeModel}
          deleterow={this.deleterow}
          />
          }
      </div>
    )
  }
}
export default NewCaseList;