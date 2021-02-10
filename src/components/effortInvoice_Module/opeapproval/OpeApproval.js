import React from 'react';
import EnhancedTable from './table/DynTable';
import tableschema from './OpeApproval.json';
import { Input } from '@material-ui/core';
import './OpeApproval.css';


class OpeApproval extends React.Component{

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
          {"name":"date","value":"20 Dec 2020"},
          {"name":"expense","value":"Professional"}, 
          {"name":"request","value":"15,000"},     
          {"name":"approved","value":<input></input>},          
         
          ]
          
        },
        {"fieldsArray":[
            {"name":"employee","value":"Kavin"},
            {"name":"client","value":"Anjali"},
            {"name":"project","value":"Admissablity"},
            {"name":"date","value":"20 Jan 2019"}, 
            {"name":"expense","value":"Legal"},    
            {"name":"request","value":"15,000"},     
            {"name":"approved","value":<input className="opeapproval_input"></input>},       
          
            ]
          
        },
       
      ],
        })
          }

    render(){
        return(
            <React.Fragment>
  {/* Enhanced Table */}
                 <div className="table_x_scroll ope_input">
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
            </React.Fragment>
        )
    }
}
export default OpeApproval;