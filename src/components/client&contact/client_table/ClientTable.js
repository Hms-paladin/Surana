import React from 'react';
import { Grid } from "@material-ui/core";
import {Icon} from 'antd';
import EnhancedTable from './table/DynTable';
import tableschema from './ClientTable.json';
import { Input } from 'antd';

const { Search } = Input;

class ClientTable extends React.Component{
  state={
    usertabledata:[],

}
componentDidMount(){
    this.setState({
      usertabledata:
      [{
      "fieldsArray":[
      {"name":"client","value":"Kavya"},
      {"name":"address","value":"Kaviha"},
      {"name":"phone","value":"challenges"},                
      {"name":"department","value":"Litigation"},
      // {"name":"actual","value":"20 hrs"},      
     
      ]
      
    },
    {"fieldsArray":[
        {"name":"client","value":"Kavin"},
        {"name":"address","value":"Anjali"},
        {"name":"phone","value":"Admissablity"},
        {"name":"department","value":"Litigation"}, 
        // {"name":"actual","value":"20 hrs"},      
      
        ]
      
    },
   
  ],
    })
      }
    render(){
        return(
            <React.Fragment>
              <div className ="card mt-5">
                <div className ="card-body">
      {/* client Heading */} 
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
    {/* Search  */}
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

{/* Enhanced Table */}
         <div className="table_x_scroll" style={{width:"100%"}}>
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

                </div>
              </div>
            </React.Fragment>
        )
    }
}
export default ClientTable;