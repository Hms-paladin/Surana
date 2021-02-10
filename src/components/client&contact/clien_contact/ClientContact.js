import React from 'react';
import { Grid } from "@material-ui/core";
import Inputantd from "../../../formcomponent/inputantd";
import EnhancedTable from './table/DynTable';
import tableschema from './ClientContact.json';


class ClientContact extends React.Component{
    state={
        usertabledata:[],
    }
    componentDidMount(){
        this.setState({
          usertabledata:
          [{
          "fieldsArray":[
          {"name":"name","value":"Kavya"},
          {"name":"designation","value":"-"},
          {"name":"email","value":"priya@gmail.com"},                
          {"name":"mobile","value":"123456789"},
          {"name":"phone","value":"0986654322"},      
          ]
        },
        {"fieldsArray":[
            {"name":"name","value":"Kavin"},
            {"name":"designation","value":"-"},
            {"name":"email","value":"santhiya@gmail.com"},
            {"name":"mobile","value":"345678922"}, 
            {"name":"phone","value":"0987654321"},      
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
                      <Grid item md={12} sm={12} className ="checklist_heading_div" >
                            <h6 className ="checklist_heading">Client Contact View</h6>
                      </Grid>
                      <div>
                        <div className ="grid_alignment_checklist">
                            <Grid container>
                                <Grid md={11} sm={12}>
                                    <Grid item md={6} sm={5} >
                                        <Inputantd label ="Client" className="w-100"/>
                                    </Grid>
                                 </Grid>  
                                   </Grid>
                        </div>
                     </div>
                     {/* Enhanced Table */}
                    <div className="container table_x_scroll">
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
export default ClientContact;