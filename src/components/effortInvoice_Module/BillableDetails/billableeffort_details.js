import React from 'react';
import './billableeffort_details.css';
import Checkbox from '@material-ui/core/Checkbox';

class BillableDetails extends React.Component{
    state={
      BillableArrays:[
          {  
              index:1,
              heading:"Billable Hours",
              Table:[ "Description", "Date", "Resource", "Rate", "Actual Hours", "Billable Hours","Amount"]
          },
          {
            index:2,
            heading:"External Consultant",
            Table:[ "Description", "Date", "Resource", "Rate", "Actual Hours", "Billable Hours","Amount"]
        },
        {
            index:3,
            heading:"OPE",
            Table:[ "Expense", "Date", "Resource", "Billable","Amount"]
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
                               <p className ="top_checklist">Billable Hours</p>
                            </div>
      {/* Table Component */}
                            <div className ="grid_alignment_checklist">
                                <table >
                                    <thead>
                                        <tr>
                                        <th scope="col"><Checkbox></Checkbox></th>
                                        
                                        {this.state.BillableArrays[0].Table.map((tableData)=>{
                                            console.log(tableData,"Wde")
                                            return(
                                                <>
                                                  <th scope="col" className="table_padding">{tableData}</th>   
                                                </>
                                              )
                                         })} 
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
                                        <td className="bill_input"><input size="small"/></td>
                                        <td>Rs.100</td>
                                        </tr>
                                        <tr>
                                        <th scope="row"><Checkbox></Checkbox></th>
                                        <td>Documentation</td>
                                        <td>26/05/2019</td>
                                        <td>Personnel</td>
                                        <td>Rs.50</td>
                                        <td>2</td>
                                        <td className="bill_input"><input size="small"/></td>
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
export default BillableDetails;








