import React from 'react';
import {Icon} from 'antd';
import { Grid } from "@material-ui/core";
import { Input } from 'antd';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import EnhancedTable from './table/DynTable';
import tableschema from './addApproval.json';

const { Search } = Input;


class AddApproval extends React.Component{
    state={
        usertabledata:[],

    }
    componentDidMount(){
        this.setState({
          usertabledata:
          [{
          "fieldsArray":[
          {"name":"employee","value":"Kavya"},
          {"name":"client","value":"Kaviha"},
          {"name":"project","value":"challenges"},                
          {"name":"date","value":"16 Oct 2019"},
          {"name":"actual","value":"20 hrs"},      
          {"name":"expense","value":"20 hrs"},
          {"name":"request","value":"14,000"},
          {"name":"approved","value":"14,000"},
          ]
          
        },
        {"fieldsArray":[
            {"name":"employee","value":"Kavin"},
            {"name":"client","value":"Anjali"},
            {"name":"project","value":"Admissablity"},
            {"name":"date","value":"16 Oct 2019"}, 
            {"name":"actual","value":"20 hrs"},      
            {"name":"expense","value":"20 hrs"},
            {"name":"request","value":"14,000"},
            {"name":"approved","value":"14,000"},
            ]
          
        },
       
      ],
        })
          }
    render(){
        return(
            <React.Fragment>
                   <Grid item md={12} sm={12} className ="checklist_heading_div d-flex" >
        {/* Approval Heading  */}
                       <div className ="plus_heading_div">
                             <div>
                                <h6 className ="checklist_heading">Add Approval Request</h6>
                              </div>
                                <div className ="plus_icon_checklist">
                                    <Icon type ="plus" />
                                </div>
                         </div>
                   </Grid>
                    <div>
                      <div className=" cand_tablemain d-flex">
                         <div>
                        <Search 
                            className="w-25 cand_search"
                            placeholder="Search.." 
                            // onSearch={value => console.log(value)} 
                            //   enterButton 
                            //   onChange={this.searchdata}
                            />
                          </div>
              {/* <div className="dd">
             <DeleteIcon/>

         </div> */}

{/* Enhanced Table */}
         <div className="table_x_scroll">
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
export default AddApproval;