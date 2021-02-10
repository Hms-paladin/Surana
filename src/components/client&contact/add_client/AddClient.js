import React from 'react';
import { Grid } from "@material-ui/core";
import Inputantd from "../../../formcomponent/inputantd";
import Dropdownantd from "../../../formcomponent/dropdownantd";
import Calenderbox from "../../../formcomponent/calenderbox";
import Textareaantd from "../../../formcomponent/textareaantd";
import Button from 'react-bootstrap/Button';
import {Icon} from 'antd';
import './AddClient.css';
import ValidationLibrary from "../../../validationlibrary/validation";


class AddClient extends React.Component{

    constructor(props) {
        super(props);
    
        this.state = {
        
          AddClientData: {
            clinet_name: {
              value: "",
              validation: [{ name: "required" }],
              error: null,
              errmsg: null,
            },
            industry_type: {
              value: "",
              validation: [{ name: "required" }],
              error: null,
              errmsg: null,
            },
            source: {
              value: "",
              validation: [{ name: "required" }],
              error: null,
              errmsg: null,
            },
            email_id: {
                value: "",
                validation: [{ name: "required" }],
                error: null,
                errmsg: null,
            },
            phone: {
                value: "",
                validation: [{ name: "required" }],
                error: null,
                errmsg: null,
            },
            address_1: {
                value: "",
                validation: [{ name: "required" }],
                error: null,
                errmsg: null,
            },
            address_2: {
                value: "",
                validation: [{ name: "required" }],
                error: null,
                errmsg: null,
            },           
          },
          whichindex: null,
          TaskId:'',
        };
      }

      checkValidation = () => {
  
        var mainvalue = {};
        var AddClientData = this.state.AddClientData;
        var targetkeys = Object.keys(AddClientData);
        console.log(targetkeys, "targetkeys");
        for (var i in targetkeys) {
          var errorcheck = ValidationLibrary.checkValidation(
            AddClientData[targetkeys[i]].value,
            AddClientData[targetkeys[i]].validation
          );
          console.log(errorcheck, "errorcheck");
          AddClientData[targetkeys[i]].error = !errorcheck.state;
          AddClientData[targetkeys[i]].errmsg = errorcheck.msg;
          mainvalue[targetkeys[i]] = AddClientData[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter(
          (obj) => AddClientData[obj].error == true
        );
        console.log(filtererr.length);
        if (filtererr.length > 0) {
          this.setState({ error: true });
        } else {
          this.setState({ error: false, saveBtnClick:true });
        }
        this.setState({
          // mainvalue,
          AddClientData,
        });
        // this.check();
      };

      changeDynamic = (data, key) => {
        console.log("key", key);
        console.log("data", data);
        var AddClientData = this.state.AddClientData;
        var targetkeys = Object.keys(AddClientData);
        var errorcheck = ValidationLibrary.checkValidation(
          data,
          AddClientData[key].validation
        );
        AddClientData[key].value = data;
        AddClientData[key].error = !errorcheck.state;
        AddClientData[key].errmsg = errorcheck.msg;
        this.setState({ AddClientData });
        var filtererr = targetkeys.filter(
          (obj) =>
            AddClientData[obj].error == true ||
            AddClientData[obj].error == null
        );
        if (filtererr.length > 0) {
          this.setState({ error: true, errordummy: false });
        } else {
          this.setState({ error: false
             });
        }
        this.setState({
          // mainvalue,
          AddClientData,
        });
      };

    render(){
        return(
          <React.Fragment>
            <div className ="card mt-5">
                <div className ="card-body">
                    <Grid item md={12} sm={12} className ="checklist_heading_div d-flex" >
                        <div className ="plus_heading_div">
                           <div>
                            <h6 className ="checklist_heading">Client</h6>
                           </div>
                           <div className ="plus_icon_checklist">
                               <Icon type ="plus" />
                             </div>
                          </div>
                    </Grid>
                    <Grid item md={12} sm={12} className ="add_checklist_heading_div">
                        <h6 className ="checklist_heading">Add Client</h6>
                    </Grid>
     {/* body of the Add details */}
                    <div>
                       <div className ="grid_alignment_checklist">
                                <Grid container>
                                    <Grid md={11} sm={12}>
                                        <Grid container spacing ={2}>
                                            <Grid item md={8} sm={5} >
                                                <Inputantd label ="Client Name" className="w-100" 
                                                  changeData={(data)=>this.changeDynamic(data,'clinet_name')} 
                                                  value={this.state.AddClientData.clinet_name.value} 
                                                  error={this.state.AddClientData.clinet_name.error} 
                                                  errmsg={this.state.AddClientData.clinet_name.errmsg}
                                                  required
                                                  />
                                            </Grid>
                                            <Grid item md={4} sm={5}>
                                                <Dropdownantd  label="Industry Type" className="w-100" 
                                                 changeData={(data)=>this.changeDynamic(data,'industry_type')} 
                                                 value={this.state.AddClientData.industry_type.value} 
                                                 error={this.state.AddClientData.industry_type.error} 
                                                 errmsg={this.state.AddClientData.industry_type.errmsg}
                                                 required
                                                 />
                                            </Grid>
                                            <Grid item md={4} sm={5}>
                                                <Dropdownantd label =" Source" className="w-100" 
                                                  changeData={(data)=>this.changeDynamic(data,'source')} 
                                                  value={this.state.AddClientData.source.value} 
                                                  error={this.state.AddClientData.source.error} 
                                                  errmsg={this.state.AddClientData.source.errmsg}
                                                  />
                                            </Grid> 
                                            <Grid item md={8} sm={5}>
                                                <Inputantd label="Email ID" className="w-100"
                                                 changeData={(data)=>this.changeDynamic(data,'email_id')} 
                                                 value={this.state.AddClientData.email_id.value} 
                                                 error={this.state.AddClientData.email_id.error} 
                                                 errmsg={this.state.AddClientData.email_id.errmsg}
                                                  />
                                            </Grid>
                                            <Grid item md={4} sm={5}>
                                                <Inputantd label="Phone" className="w-100" 
                                                 changeData={(data)=>this.changeDynamic(data,'phone')} 
                                                  value={this.state.AddClientData.phone.value} 
                                                  error={this.state.AddClientData.phone.error} 
                                                  errmsg={this.state.AddClientData.phone.errmsg}
                                                  required
                                                  />
                                            </Grid>
                                              <Grid item md={4} sm={5}>
                                                <Textareaantd label="Address 1" className="w-100" 
                                                 changeData={(data)=>this.changeDynamic(data,'address_1')} 
                                                 value={this.state.AddClientData.address_1.value} 
                                                 error={this.state.AddClientData.address_1.error} 
                                                 errmsg={this.state.AddClientData.address_1.errmsg}
                                                 required
                                                 />
                                            </Grid>
                                            <Grid item md={4} sm={5}>
                                                <Textareaantd label="Address 2" className="w-100"
                                                 changeData={(data)=>this.changeDynamic(data,'address_2')} 
                                                 value={this.state.AddClientData.address_2.value} 
                                                 error={this.state.AddClientData.address_2.error} 
                                                 errmsg={this.state.AddClientData.address_2.errmsg}
                                                  />
                                            </Grid>
                                            <Grid item md={4} sm={5}>
                                                <Dropdownantd label="City" className="w-100"  />
                                            </Grid>
                                              <Grid item md={4} sm={5}>
                                                <Dropdownantd label="State" className="w-100" />
                                            </Grid>
                                            <Grid item md={4} sm={5}>
                                                <Dropdownantd label="Country" className="w-100" />
                                            </Grid>
                                            </Grid>  
                                        </Grid>
                                    </Grid>                                 
                            </div>
                        </div>
      {/* Contact person */}
                       <Grid item md={12} sm={12} className ="checklist_heading_div d-flex" >
                          <div className ="plus_heading_div">
                             <div>
                                <h6 className ="checklist_heading">Contact Person 1</h6>
                            </div>
                            <div className ="plus_icon_checklist">
                               <Icon type ="plus" />
                             </div>
                          </div>
                        </Grid>
                        <div className ="grid_alignment_checklist">
                             <Grid container>
                               <Grid md={11} sm={12}>
                                  <Grid container spacing ={2}>
                                      <Grid item md={6} sm={5}>
                                          <Inputantd label ="Name" className="w-100" 
                                              changeData={(data)=>this.changeDynamic(data,'clinet_name')} 
                                              value={this.state.AddClientData.clinet_name.value} 
                                              error={this.state.AddClientData.clinet_name.error} 
                                               errmsg={this.state.AddClientData.clinet_name.errmsg}
                                               required
                                          />
                                      </Grid>
                                      <Grid item md={6} sm={5}>
                                            <Inputantd  label="Email" className="w-100" />
                                      </Grid>
                                       <Grid item md={8} sm={5}>
                                           <Inputantd label ="Designation" className="w-100" />
                                        </Grid> 
                                        <Grid item md={4} sm={5}>
                                            <Inputantd label="Phone" className="w-100" />
                                        </Grid>
                                         <Grid item md={4} sm={5}>
                                            <Inputantd label="Mobile" className="w-100" />
                                         </Grid>
                                    </Grid>  
                                </Grid>
                            </Grid>  
                        </div>
      {/*Save and Cancel Button */}
                       <Grid container direction="row" justify="center" alignItems="center" className="mt-5" spacing={3}>
                            <Grid item >
                                <Button className="btnwidth btnclr" onClick={() => this.checkValidation()}>Save</Button>
                            </Grid>
                            
                            <Grid item >
                              <Button className="btnwidth btnclr_outline">Cancel</Button>
                            </Grid>
                        </Grid>
                </div>
            </div>
                    
          </React.Fragment>
        )
    }
}
export default AddClient;