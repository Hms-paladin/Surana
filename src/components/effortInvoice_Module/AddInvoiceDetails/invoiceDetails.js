import React from 'react';
import { Grid } from "@material-ui/core";
import Inputantd from "../../../formcomponent/inputantd";
import {Icon} from 'antd';
import Button from 'react-bootstrap/Button';
import Dropdownantd from "../../../formcomponent/dropdownantd";
import Calenderbox from '../../../formcomponent/calenderbox';
import ValidationLibrary from "../../../validationlibrary/validation";
import BillableDetails from "../../effortInvoice_Module/BillableDetails/billableeffort_details";
import External_Consultant from "../../effortInvoice_Module/ExternalConsultant/external_consultant";
import OpeDetails from "../../effortInvoice_Module/OPeDetails/opeDetails";
import SummaryDetails from "../../effortInvoice_Module/SummaryDetails/summary_details";


class InvoiceDetails extends React.Component{

    constructor(props) {
        super(props);
    
        this.state = {
        
          InvoiceData: {
            clinet_name: {
              value: "",
              validation: [{ name: "required" }],
              error: null,
              errmsg: null,
            },
            Date: {
              value: "",
              validation: [{ name: "required" }],
              error: null,
              errmsg: null,
            },
            Project_name: {
              value: "",
              validation: [{ name: "required" }],
              error: null,
              errmsg: null,
            },
            total_hrs: {
                value: "",
                validation: [{ name: "required" }],
                error: null,
                errmsg: null,
            },
            from_date: {
                value: "",
                validation: [{ name: "required" }],
                error: null,
                errmsg: null,
            },
            to_date: {
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
        var InvoiceData = this.state.InvoiceData;
        var targetkeys = Object.keys(InvoiceData);
        console.log(targetkeys, "targetkeys");
        for (var i in targetkeys) {
          var errorcheck = ValidationLibrary.checkValidation(
            InvoiceData[targetkeys[i]].value,
            InvoiceData[targetkeys[i]].validation
          );
          console.log(errorcheck, "errorcheck");
          InvoiceData[targetkeys[i]].error = !errorcheck.state;
          InvoiceData[targetkeys[i]].errmsg = errorcheck.msg;
          mainvalue[targetkeys[i]] = InvoiceData[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter(
          (obj) => InvoiceData[obj].error == true
        );
        console.log(filtererr.length);
        if (filtererr.length > 0) {
          this.setState({ error: true });
        } else {
          this.setState({ error: false, saveBtnClick:true });
        }
        this.setState({
          // mainvalue,
          InvoiceData,
        });
        // this.check();
      };

      changeDynamic = (data, key) => {
        console.log("key", key);
        console.log("data", data);
        var InvoiceData = this.state.InvoiceData;
        var targetkeys = Object.keys(InvoiceData);
        var errorcheck = ValidationLibrary.checkValidation(
          data,
          InvoiceData[key].validation
        );
        InvoiceData[key].value = data;
        InvoiceData[key].error = !errorcheck.state;
        InvoiceData[key].errmsg = errorcheck.msg;
        this.setState({ InvoiceData });
        var filtererr = targetkeys.filter(
          (obj) =>
            InvoiceData[obj].error == true ||
            InvoiceData[obj].error == null
        );
        if (filtererr.length > 0) {
          this.setState({ error: true, errordummy: false });
        } else {
          this.setState({ error: false
             });
        }
        this.setState({
          // mainvalue,
          InvoiceData,
        });
      };

    render(){
        return(
            <React.Fragment>
              <div className ="card mt-5">
                    <div className ="card-body">
    {/* Invoice Headings */}
               
                        <Grid item md={12} sm={12} className ="add_checklist_heading_div">
                            <h6 className ="checklist_heading">Add Invoice Details</h6>
                        </Grid>
                      
      {/* body of the invoice details */}
                        <div>
                            <div className ="grid_alignment_checklist">
                                <Grid container>
                                    <Grid md={11} sm={12}>
                                        <Grid container spacing ={2}>
                                            <Grid item md={4} sm={5}>
                                                <Inputantd label ="Client Name" className="w-100" 
                                                  changeData={(data)=>this.changeDynamic(data,'clinet_name')} 
                                                  value={this.state.InvoiceData.clinet_name.value} 
                                                  error={this.state.InvoiceData.clinet_name.error} 
                                                  errmsg={this.state.InvoiceData.clinet_name.errmsg}
                                                  />
                                            </Grid>
                                            <Grid item md={4} sm={5}>
                                                <Dropdownantd label ="Project Name" className="w-100" 
                                                  changeData={(data)=>this.changeDynamic(data,'Project_name')} 
                                                  value={this.state.InvoiceData.Project_name.value} 
                                                  error={this.state.InvoiceData.Project_name.error} 
                                                  errmsg={this.state.InvoiceData.Project_name.errmsg}
                                                  />
                                            </Grid> 
                                            <Grid item md={4} sm={5}>
                                                <Calenderbox label="Date" className="w-100" />
                                            </Grid>
                                          
                                            <Grid item md={1} sm={5} style={{display:'flex', fontSize:'17px', marginTop:'4px'}}>Peroid </Grid>
                                            <Grid item md={2} sm={5} >
                                                <Calenderbox placeholder="From Date" className="w-100" />
                                            </Grid> 
                                             <Grid item md={2} sm={5}>
                                                <Calenderbox placeholder="To Date" className="w-100" />
                                            </Grid>
                                         
                                            </Grid>  
                                        </Grid>
                                    </Grid>
                            </div>
                        </div>
     {/*Save and Cancel Button */}
                        <Grid container direction="row" justify="center" alignItems="center" className="mt-1" spacing={3}>
                            <Grid item >
                                <Button className="btnwidth btnclr" onClick={() => this.checkValidation()}>Generate</Button>
                            </Grid>
                            
                            <Grid item >
                              <Button className="btnwidth btnclr_outline">Cancel</Button>
                            </Grid>
                        </Grid>
                        <div className="card gtrtgtrgt">
                          <BillableDetails/>
                          <External_Consultant/>
                          <OpeDetails/>
                          <SummaryDetails/>

                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default InvoiceDetails;