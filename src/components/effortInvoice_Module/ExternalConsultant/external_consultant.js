import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import './external_consultant.css';

class External_Consultant extends React.Component{
    state={
        ExternalArrays:[
            {  
                index:1,
                heading:"Billable Hours",
                Table:[ "Date","Activitiy","Description", "Resource", "Actual Hours", "Rate(Rs)",  "Billable Hours","Amount(Rs)"]
            },
            {
              index:2,
              heading:"External Consultant",
              Table:[ "Date","Activitiy",  "Description", "Resource", "Actual Hours", "Rate(Rs)",  "Billable Hours","Amount(Rs)"]
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
                       <div className ="checklist_activity_border_bilable">
           {/* Heading */}
                         <div className ="avtivity_background">
                           <p className ="top_checklist">External Consultant</p>
                         </div>
           {/* Table Component */}
                         <div className ="grid_alignment_checklist billable_table">
                            <table >
                                <thead>
                                   <tr>
                                   <th scope="col">Billed</th>
                                    <th scope="col"><Checkbox></Checkbox></th>
                                    {
                                    this.state.ExternalArrays[1].Table.map((externalData)=>{
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
                                 <tr className="table_billable">
                                        <th scope="row"></th>
                                        <td><Checkbox></Checkbox></td>
                                        <td>21/05/2019</td>
                                        <td>Prepare </td>
                                        <td>Personnel</td>
                                        <td>Rs.50</td>
                                        <td>2</td>
                                        <td className="bill_input"><input size="small"/></td>
                                        <td>2</td>
                                        <td>Rs.100</td>
                                        </tr>
                                       
                                        <tr className="table_billable">
                                        <th scope="row"></th>
                                        <td><Checkbox></Checkbox></td>
                                        <td>21/05/2019</td>
                                        <td>Prepare </td>
                                        <td>Personnel</td>
                                        <td>Rs.50</td>
                                        <td>2</td>
                                        <td className="bill_input"><input size="small"/></td>
                                        <td>2</td>
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