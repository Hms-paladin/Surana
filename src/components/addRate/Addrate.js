import React from 'react';
import './Addrate.css';
import { Grid } from '@material-ui/core';
import Dropdownantd from "../../formcomponent/dropdownantd";
import { Input, Select,  AutoComplete } from 'antd';
import Button from "react-bootstrap/Button";
import Inputantd from '../../formcomponent/inputantd';
import EnhancedTable from './table/DynTable';
import tableschema from './Addrate.json';

const { Option } = Select;

class AddRate extends React.Component{
    state={
        usertabledata:[],
    }
    componentDidMount(){
        this.setState({
          usertabledata:
          [{
          "fieldsArray":[
          {"name":"resource","value":"Kavya"},
          {"name":"activity","value":"Hearing"},
          {"name":"court","value":"Tribunals"},                
          {"name":"hearing","value":"Effective"},
          {"name":"casevalue","value":"Above-20000"},    
          {"name":"minrate","value":"-"}, 
          {"name":"maxrate","value":"5,000"}, 
          {"name":"uom","value":"Fixed"},   
          ]
        },
        {"fieldsArray":[
            {"name":"resource","value":"Kavin"},
            {"name":"activity","value":"Filing"},
            {"name":"court","value":"Tribunals"},
            {"name":"hearing","value":"Effective"}, 
            {"name":"casevalue","value":"Above-20000"}, 
            {"name":"minrate","value":"-"}, 
            {"name":"maxrate","value":"7000"}, 
            {"name":"uom","value":"Fixed"},      
            ]
        },     
        {"fieldsArray":[
            {"name":"resource","value":"Kavin"},
            {"name":"activity","value":"Conference"},
            {"name":"emacourtil","value":"Tribunals"},
            {"name":"hearing","value":"Non-Effective"}, 
            {"name":"casevalue","value":"Above-20000"}, 
            {"name":"minrate","value":"2500"}, 
            {"name":"maxrate","value":"15,000"}, 
            {"name":"uom","value":"Per Hour"},      
            ]
        },         
      ],
        })
          }
    render(){
        return(
           <React.Fragment>
               <div className="card">
                   <div className="card-body">
          {/* head align */}
                       <div className="rate_head">
                           <h5>Rate</h5>
                       </div>
                       <div className="mt-3"><h5>Add rate</h5></div>
          {/* body of the rate */}
                      <Grid container spacing={2}>
                          <Grid item md={4} sm={5}>
                              <Dropdownantd label="Resource" className="w-100"></Dropdownantd>
                          </Grid>
                          <Grid item md={4} sm={5}>
                              <Dropdownantd label="Activity" className="w-100"></Dropdownantd>
                          </Grid>
                          <Grid  item md={12} sm={5}>
                          <Grid container spacing ={2}>
                              <Grid  item md={4} sm={5}>
                              <Dropdownantd label="Court" className="w-100"></Dropdownantd>
                              </Grid>

                              <Grid  item md={4} sm={12}>
                              <Dropdownantd label="Hearing Type" className="w-100"></Dropdownantd>
                              </Grid>
                          </Grid>
                          </Grid>
                          <Grid  item md={12} sm={12}>
                          <Grid container spacing ={2}>
                              <Grid item md={4} sm={5}>
                              <Input.Group compact style={{marginLeft:'10px', marginTop:"30px"}}>
                                <Select defaultValue="Above" style={{ width: '35%' }}>
                                <Option value="1">Sign Up</Option>
                                <Option value="2">Sign In</Option>
                                </Select>
                                <AutoComplete
                                style={{ width: '62%'}}
                                placeholder="Case value in Rs."/>
                                </Input.Group>

                              </Grid>
                    
                              <Grid  item md={2} sm={5}>
                              <Inputantd label="Min Rate" className="w-100"></Inputantd>
                              </Grid>
                              <Grid  item md={2} sm={5}>
                              <Inputantd label="Max Rate" className="w-100"></Inputantd>
                              </Grid>
                              <Grid  item md={2} sm={5}>
                              <Dropdownantd label="Per Hour" className="w-100"></Dropdownantd>
                              </Grid>
                              <Grid  item md={1} sm={5}>
                              <Button className="btnwidth btnclr_outline">Add</Button>
                              </Grid>
                          </Grid>
                          </Grid>
                      </Grid>
        {/* View table */}
                      <div className="mt-3"><h5>View Rate</h5></div>
        {/* Enhanced Table */}
                    <div className=" table_x_scroll">
                         <EnhancedTable 
                            tabledata={this.state.usertabledata} 
                            // tabledata={searchdata}
                            // primaryKey="userId" 
                            tableschema={tableschema.fields}
                            // editOpen={(id,rowdata)=>this.editClick(id,rowdata)}
                            // deleterow={(id)=>this.deleterow(id)} 
                            // deleteSuccessClose={this.state.deleteSuccessClose}
                        />
                    </div>
                   </div>

               </div>
           </React.Fragment>
        )
    }
}
export default AddRate;
