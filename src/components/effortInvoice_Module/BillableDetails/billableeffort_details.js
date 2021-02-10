import React from 'react';
import './billableeffort_details.css';
import Checkbox from '@material-ui/core/Checkbox';

class BillableDetails extends React.Component{
    state={
      BillableArrays:[
          {  
              index:1,
              heading:"Billable Hours",
              Table:[  "Date","Activitiy",  "Description", "Resource", "Actual Hours", "Rate(Rs)",  "Billable Hours","Amount(Rs)"]
          },
          {
            index:2,
            heading:"External Consultant",
            Table:[ "Date","Description", "Resource","Activitiy", "Actual Hours", "Rate(Rs)",  "Billable Hours","Amount(Rs)"]
        },
        {
            index:3,
            heading:"OPE",
            Table:["Date", "Expense",  "Resource", "Billable","Amount(Rs)"]
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
                               <p className ="top_checklist">Billable Hours</p>
                            </div>
      {/* Table Component */}
                            <div className ="grid_alignment_checklist billable_table">
                                <table >
                                    <thead>
                                        <tr>
                                        <th scope="col">Billed</th>
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
                                        <td>26/03/2019</td>
                                        <td>Documentation</td>
                                        <td>Case Research</td>
                                        <td>Rs.50</td>
                                        <td>2</td>
                                        <td className="bill_input"><input size="small"/></td>
                                        <td>3</td>
                                        <td>Rs.500</td>
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








