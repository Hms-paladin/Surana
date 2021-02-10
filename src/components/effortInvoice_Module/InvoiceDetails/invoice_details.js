import React from 'react';
import {Icon} from 'antd';
import { Grid } from "@material-ui/core";
import { Input } from 'antd';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import EnhancedTable from './table/DynTable';
import tableschema from './invoiceSchema.json';



const { Search } = Input;


class Invoice_Details extends React.Component{
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
        //   {"name":"download","value":<div className="timeicon"><span className="text-danger"><Icon ty
        //   pe="file-pdf" /></span><span className="text-success ml-2"><Icon type="file-excel"/></span></div>},  
          {"name":"actual","value":"20 hrs"},      
          {"name":"working","value":"20 hrs"},
          {"name":"amount","value":"14,000"},

        //   {"name":"actions","value":<div><Icon type="reload" onClick={this.modalOpen}/></div>},
          ]
          
        },
        {"fieldsArray":[
            {"name":"employee","value":"Kavin"},
            {"name":"client","value":"Anjali"},
            {"name":"project","value":"Admissablity"},
            {"name":"date","value":"16 Oct 2019"}, 
            {"name":"actual","value":"20 hrs"},      
            {"name":"working","value":"20 hrs"},
            {"name":"amount","value":"14,000"},

            // {"name":"actions","value":<div><Icon type="reload" onClick={this.modalOpen}/></div>},
            // {"name":"download","value":<div className="timeicon"><span className="text-danger"><Icon type="file-pdf" /></span><span className="text-success ml-2"><Icon type="file-excel"/></span></div>},

            ]
          
        },
       
      ],
        })
          }
    render(){
        return(
            <React.Fragment>
                   <Grid item md={12} sm={12} className ="checklist_heading_div d-flex" >
                            <div className ="plus_heading_div">
                                <div>
                                    <h6 className ="checklist_heading">Invoice Details</h6>
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
        
         <div className="">
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
export default Invoice_Details;