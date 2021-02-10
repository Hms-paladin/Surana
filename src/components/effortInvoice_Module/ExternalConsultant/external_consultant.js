import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import './external_consultant.css';

class External_Consultant extends React.Component{
    state={
        ExternalArrays:[
            {  
                index:1,
                heading:"Billable Hours",
                Table:["Description", "Date", "Resource", "Rate", "Actual Hours", "Billable Hours","Amount"]
            },
            {
              index:2,
              heading:"External Consultant",
              Table:[ "Description", "Date", "Resource", "Rate", "Actual Hours", "Billable Hours","Amount"]
          },
          {
              index:3,
              heading:"OPE",
              Table:["Expense", "Date", "Resource", "Billable","Amount"]
          },
        ]
      }
    render(){
        return(
            <React.Fragment>
             
                    <div className ="grid_alignment_checklist_billable">
                       <div className ="checklist_activity_border">
           {/* Heading */}
                         <div className ="avtivity_background">
                           <p className ="top_checklist">External Consultant</p>
                         </div>
           {/* Table Component */}
                         <div className ="grid_alignment_checklist">
                            <table >
                                <thead>
                                   <tr>
                                    <th scope="col"><Checkbox></Checkbox></th>
                                    {this.state.ExternalArrays[1].Table.map((externalData)=>{
                                            return(
                                              <>
                                                <th scope="col" className="table_padding">{externalData}</th>   
                                              </>
                                              )
                                            })
                                    } 
                                   </tr>
                                </thead>
                                 <tbody>
                                    <tr>
                                        <th scope="row"><Checkbox></Checkbox></th>
                                        <td>Prepare Legal Papers</td>
                                        <td>21/05/2019</td>
                                        <td>Personnel</td>
                                        <td>Rs.50</td>
                                        <td>2</td>
                                        <td className="external_input"><input size="small"/></td>
                                        <td>Rs.100</td>
                                    </tr>
                                    <tr>
                                        <th scope="row"><Checkbox></Checkbox></th>
                                        <td>Documentation</td>
                                        <td>26/05/2019</td>
                                        <td>Personnel</td>
                                        <td>Rs.50</td>
                                        <td>2</td>
                                        <td  className="external_input"><input size="small"/></td>
                                        <td>Rs.100</td>
                                     </tr>
                                 </tbody>
                             </table>
                            </div>
                        </div>
                    </div>  

            </React.Fragment>
        )
    }
}
export default External_Consultant;