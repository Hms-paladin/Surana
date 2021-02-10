import React from 'react';
import Inputantd from '../../../formcomponent/inputantd';
import Dropdownantd from '../../../formcomponent/dropdownantd';
import { Grid, Checkbox } from '@material-ui/core';
import { Button } from 'react-bootstrap';
import './project.css';
import Textareaantd from '../../../formcomponent/textareaantd';
import ValidationLibrary from "../../../validationlibrary/validation.js";
import {getProjectType,getProjectName,getProjectClient,getProjectHod,getProjectBilling,getClientName} from './AddProjectAction/AddProjectAction'
import {connect} from 'react-redux'
import{notification} from 'antd'
import {apiurl} from '../../../App'
import axios from 'axios';
class AddProject extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          errordummy: true,
          addProject_data: {
            projectId: {
              value: "",
              validation: [{ name: "required" },{name:"allowNumaricOnly"}],
              error: null,
              errmsg: null,
            },
            project_type: {
              value: "",
              validation: [{ name: "required" }],
              error: null,
              errmsg: null,
            },
            project_name: {
              value: "",
              validation: [{ name: "required" }],
              error: null,
              errmsg: null,
            },
            client_name: {
              value: "",
              validation: [{ name: "required" }],
              error: null,
              errmsg: null,
            },    
            sub_project: {
                value: "",
                validation: [],
                error: null,
                errmsg: null,
              }, 
              other_party: {
                value: "",
                validation: [],
                error: null,
                errmsg: null,
              },   
              billing_type: {
                value: "",
                validation: [],
                error: null,
                errmsg: null,
              }, 
              hod_attorney: {
                value: "",
                validation: [],
                error: null,
                errmsg: null,
              },   
              assign_councel: {
                value: "",
                validation: [],
                error: null,
                errmsg: null,
              }, 
              description: {
                value: "",
                validation: [],
                error: null,
                errmsg: null,
              }, 
          },
        };
      }
      async componentDidMount() {
        await this.props.getProjectType();
        await this.props.getProjectName();
        await this.props.getProjectClient();
        await this.props.getProjectHod();
        await this.props.getProjectBilling();
        await this.props.getClientName()
      }
      checkValidation = () => {
        var mainvalue = {};
        var addProject_data = this.state.addProject_data;
        var targetkeys = Object.keys(addProject_data);
        console.log(targetkeys, "targetkeys");
        for (var i in targetkeys) {
          var errorcheck = ValidationLibrary.checkValidation(
            addProject_data[targetkeys[i]].value,
            addProject_data[targetkeys[i]].validation
          );
          console.log(errorcheck, "errorcheck");
          addProject_data[targetkeys[i]].error = !errorcheck.state;
          addProject_data[targetkeys[i]].errmsg = errorcheck.msg;
          mainvalue[targetkeys[i]] = addProject_data[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter(
          (obj) => addProject_data[obj].error == true
        );
        console.log(filtererr.length);
        if (filtererr.length > 0) {
          this.setState({ error: true });
        } else {
          this.setState({ error: false });
          this.insert()  
        this.setState({
          // mainvalue,
          addProject_data,
        });
      };
      
      }

      insert=()=>{
        var self = this;

        console.log(this.props.addproject_client,"addproject_client")
      
            let case_Project={
                projectId:this.state.addProject_data.projectId.value,
                projectType:this.props.addproject_type[this.state.addProject_data.project_type.value-1].ProjectTypeId,
                projectname:this.state.addProject_data.project_name.value,
                clientname:this.state.addProject_data.client_name.value && this.props.addproject_client[this.state.addProject_data.client_name.value-1].ClientId,
                Otherparty:this.state.addProject_data.other_party.value,
                Billingtype:this.state.addProject_data.billing_type.value,
                Assignedto:this.state.addProject_data.hod_attorney.value && this.props.addproject_hod[this.state.addProject_data.hod_attorney.value-1].EmpId,
                Assigncounsel:this.state.addProject_data.assign_councel.value && this.props.addproject_hod[this.state.addProject_data.assign_councel.value-1].EmpId,
                description:this.state.addProject_data.description.value
            }
      
            axios({
              method: "post",
              url: apiurl + "/addprojectcase",
              data: case_Project
                  
              
            })
              .then(function (response) {
                console.log(response.data.data, "responseresponse");
                notification.warning({
                  message: `Add Project/Case submitted successfully`,
                  duration: 3.5,
                  placement: "topRight",
                  className:"notification_dayreport"
                })
                // self.state.addProject_data.assign_councel.value=""
                // self.state.addProject_data.billing_type.value=""
                // self.state.addProject_data.client_name.value=""
                // self.state.addProject_data.description.value=""
                // self.state.addProject_data.hod_attorney.value=""
                // self.state.addProject_data.other_party.value=""
                // self.state.addProject_data.projectId.value=""
                // self.state.addProject_data.project_name.value=""
                // self.state.addProject_data.project_type.value=""
                // self.state.addProject_data.sub_project.value=""

    
           
                self.setState({});
              })
              .catch(function (error) {
                console.log(error, "error");
              });
      
          }     

      changeDynamic = (data, key) => {
        console.log("key", key);
        console.log("data", data);
        var addProject_data = this.state.addProject_data;
        var targetkeys = Object.keys(addProject_data);
        var errorcheck = ValidationLibrary.checkValidation(
          data,
          addProject_data[key].validation
        );
        addProject_data[key].value = data;
        addProject_data[key].error = !errorcheck.state;
        addProject_data[key].errmsg = errorcheck.msg;
        this.setState({ addProject_data });
        var filtererr = targetkeys.filter(
          (obj) =>
            addProject_data[obj].error == true || addProject_data[obj].error == null
        );
        if (filtererr.length > 0) {
          this.setState({ error: true, errordummy: false });
        } else {
          this.setState({ error: false });
        }
        var draval = []
            if(this.props.caseView){
         this.props.caseView.find((val,index)=>{
          var checkInternal = key==="case_no"?data:this.state.addProject_data.case_no.value
          var checkcourt = key==="court_no"?data: this.state.addProject_data.court_no.value
             if(val.InternalCaseNo === checkInternal
              && val.CaseNo ===checkcourt && draval.length<1){
              draval.push(val.DRA)
             }
          })
          this.setState({DraName:draval[0]})
        }
      };

      cancelClick=()=>{
        this.state.addProject_data.assign_councel.value=""
        this.state.addProject_data.billing_type.value=""
        this.state.addProject_data.client_name.value=""
        this.state.addProject_data.description.value=""
        this.state.addProject_data.hod_attorney.value=""
        this.state.addProject_data.other_party.value=""
        this.state.addProject_data.projectId.value=""
        this.state.addProject_data.project_name.value=""
        this.state.addProject_data.project_type.value=""
        this.state.addProject_data.sub_project.value=""
        this.setState({})
      }
    render(){
        return(
            <React.Fragment>
                <div className="card top_move">
                    <div className="card-body">
                        <Grid container spacing={1}>
                            <Grid item md={3} sm={5}>
                                <Inputantd className="w-100" label="Project Id"
                                   changeData={(data) => this.changeDynamic(data, 'projectId')}
                                   value={this.state.addProject_data.projectId.value}
                                   error={this.state.addProject_data.projectId.error}
                                   errmsg={this.state.addProject_data.projectId.errmsg}
                                   required
                                />
                            </Grid>
                            <Grid item md={3} sm={5}>
                                <Dropdownantd className="w-100" label="Project Type"
                                 option={
                                    this.props.addproject_type &&
                                    this.props.addproject_type.map((val) => val.ProjectDescription)
                                  }
                                  changeData={(data) =>
                                    this.changeDynamic(data, "project_type")
                                  }
                                  value={
                                    this.state.addProject_data.project_type.value
                                  }
                                  error={
                                    this.state.addProject_data.project_type.error
                                  }
                                  errmsg={
                                    this.state.addProject_data.project_type.errmsg
                                  }
                                  required
                                />
                            </Grid>
                            <Grid item md={3} sm={5}>
                                <Inputantd className="w-100" label="Project Name"
                                //  option={
                                //     this.props.addproject_name &&
                                //     this.props.addproject_name.map((val) => val.ProjectName)
                                //   }
                                  changeData={(data) =>
                                    this.changeDynamic(data, "project_name")
                                  }
                                  value={
                                    this.state.addProject_data.project_name.value
                                  }
                                  error={
                                    this.state.addProject_data.project_name.error
                                  }
                                  errmsg={
                                    this.state.addProject_data.project_name.errmsg
                                  }
                                  required
                                  />
                            </Grid>
                            <Grid item md={3} sm={5}>
                                <Dropdownantd className="w-100" label="Client Name"
                                 option={
                                    this.props.addproject_client &&
                                    this.props.addproject_client.map((val) => val.ClientName)
                                  }
                                  changeData={(data) =>
                                    this.changeDynamic(data, "client_name")
                                  }
                                  value={
                                    this.state.addProject_data.client_name.value
                                  }
                                  error={
                                    this.state.addProject_data.client_name.error
                                  }
                                  errmsg={
                                    this.state.addProject_data.client_name.errmsg
                                  }
                                  required
                                  />
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} className="project_cardcontainer">
                            <Grid item md={5} sm={12}>
                                <div className="card card_parent">
                                    <span className="card_heading">Project Type</span>
                                    <Grid container md={12} spacing={2} className="project_protype">
                                        <Grid item md={8} sm={5}>
                                            <Dropdownantd className="w-100" label="Sub Project"
                                            option={
                                                this.props.addproject_name &&
                                                this.props.addproject_name.map((val) => val.ProjectName)
                                              }
                                              changeData={(data) =>
                                                this.changeDynamic(data, "sub_project")
                                              }
                                              value={
                                                this.state.addProject_data.sub_project.value
                                              }
                                              error={
                                                this.state.addProject_data.sub_project.error
                                              }
                                              errmsg={
                                                this.state.addProject_data.sub_project.errmsg
                                              }
                                            />
                                        </Grid>
                                        <Grid item md={3} sm={5}>
                                            <Button className="btnwidth btnclr project_assignbutton">Assign Rates</Button>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>
                            <Grid item md={6} sm={12}>
                                <Grid container spacing={1}>
                                    <Grid item md={12} sm={12}>
                                        <Inputantd className="w-100" label="Other Party"
                                              changeData={(data) => this.changeDynamic(data, 'other_party')}
                                              value={this.state.addProject_data.other_party.value}
                                              error={this.state.addProject_data.other_party.error}
                                              errmsg={this.state.addProject_data.other_party.errmsg}
                                        />
                                    </Grid>
                                    <Grid item md={6} sm={6}>
                                        <Dropdownantd className="w-100" label="Billing Type"
                                         option={
                                            this.props.addproject_billing &&
                                            this.props.addproject_billing.map((val) => val.BillingTypeName)
                                          }
                                          changeData={(data) =>
                                            this.changeDynamic(data, "billing_type")
                                          }
                                          value={
                                            this.state.addProject_data.billing_type.value
                                          }
                                          error={
                                            this.state.addProject_data.billing_type.error
                                          }
                                          errmsg={
                                            this.state.addProject_data.billing_type.errmsg
                                          }/>
                                    </Grid>
                                    <Grid item md={6} sm={6}>
                                        <div className="d-flex">
                                            <div><Checkbox className="project_checkbox"/></div>
                                            <div className="project_checkboxtitle">Inter Department</div>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} className="project_cardcontainer">
                            <Grid item md={6} sm={12}>
                                <div className="card assigncard_parent">
                                    <span className="card_heading">Assigned To</span>
                                    <Grid container spacing={2} className="project_protype">
                                        <Grid item md={6} sm={5}>
                                            <Dropdownantd className="w-100" label="HOD/Attorney"
                                             option={
                                                this.props.addproject_hod &&
                                                this.props.addproject_hod.map((val) => val.EmpFirstName)
                                              }
                                              changeData={(data) =>
                                                this.changeDynamic(data, "hod_attorney")
                                              }
                                              value={
                                                this.state.addProject_data.hod_attorney.value
                                              }
                                              error={
                                                this.state.addProject_data.hod_attorney.error
                                              }
                                              errmsg={
                                                this.state.addProject_data.hod_attorney.errmsg
                                              }/>
                                        </Grid>
                                        <Grid item md={6} sm={5}>
                                            <Dropdownantd className="w-100" label="Assign Counsel"
                                             option={
                                                this.props.addproject_hod &&
                                                this.props.addproject_hod.map((val) => val.EmpFirstName)
                                              }
                                              changeData={(data) =>
                                                this.changeDynamic(data, "assign_councel")
                                              }
                                              value={
                                                this.state.addProject_data.assign_councel.value
                                              }
                                              error={
                                                this.state.addProject_data.assign_councel.error
                                              }
                                              errmsg={
                                                this.state.addProject_data.assign_councel.errmsg
                                              }/>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>
                            <Grid item md={6} sm={12}>
                                <Textareaantd className="w-100" label="Description"
                                changeData={(data) => this.changeDynamic(data, 'description')}
                                value={this.state.addProject_data.description.value}
                                error={this.state.addProject_data.description.error}
                                errmsg={this.state.addProject_data.description.errmsg}/>
                            </Grid>
                        </Grid>
                        <Grid container
                            direction="row"
                            justify="center"
                            alignItems="center" 
                            className="mt-5"
                            spacing={3}>
                            <Grid item >
                                <Button className="btnwidth btnclr"  onClick={() => this.checkValidation()}>
                                  Save
                                  </Button>
                            </Grid>
                            <Grid item >
                                <Button className="btnwidth btnclr_outline" onClick={this.cancelClick}>Cancel</Button>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("stateeee", state);
  
    return {
      addProject_data: state.resumeReducer.addProject_data,
      addproject_type: state.addproject.getprojectType,
      addproject_name: state.addproject.getprojectName,
      addproject_client:state.addproject.getClientName,
      addproject_hod:state.addproject.getprojectHod,
      addproject_billing:state.addproject.getprojectBilling
    };
  };
  export default connect(mapStateToProps, {
    getProjectName,
    getProjectType,
    getProjectClient,
    getProjectHod,
    getProjectBilling,
    getClientName
   
  })(AddProject);
