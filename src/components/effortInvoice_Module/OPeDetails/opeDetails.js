import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import './opeDetails.css'

class OpeDetails extends React.Component{
    state={
        OpeArrays:[
            {  
                index:1,
                heading:"Billable Hours",
                Table:[ "Description", "Date", "Resource", "Rate", "Actual Hours", "Billable Hours","Amount"]
            },
            {
              index:2,
              heading:"External Consultant",
              Table:["Description", "Date", "Resource", "Rate", "Actual Hours", "Billable Hours","Amount"]
          },
          {
              index:3,
              heading:"OPE",
              Table:[ "Date",  "Expense","Resource", "Billable","Amount(Rs)"]
          },
        ]
      }

    render(){
        return(
          <React.Fragment>
                 <div className ="grid_alignment_checklist_billable">
                    <div className ="checklist_activity_border_bilable">
           {/* heading */}
                      <div className ="avtivity_background">
                        <p className ="top_checklist">OPE</p>
                      </div>
                      <div className ="grid_alignment_checklist_ope">
           {/* table component */}
                         <table className="ope_table">
                             <thead>
                                <tr>
                                <th scope="col">Billed</th>
                                 <th scope="col"><Checkbox></Checkbox></th>
                                 {this.state.OpeArrays[2].Table.map((externalData)=>{
                                         return(
                                           <>
                                             <th scope="col" className="table_padding_ope">{externalData}</th>   
                                           </>
                                           )
                                         })
                                 } 
                                </tr>
                             </thead>
                              <tbody>
                                  <tr className="table_billable">
                                    <th scope="row"></th>
                                     <th><Checkbox></Checkbox></th>
                                     <td>26/05/2019</td>
                                     <td>Documentation</td>
                                     <td>Personnel</td>
                                     <td>Rs.50</td>
                                     <td>2</td>
                                  </tr>
                                 <tr className="table_billable">
                                     <th scope="row"></th>
                                     <th><Checkbox></Checkbox></th>
                                     <td>26/05/2019</td>
                                     <td>Documentation</td>
                                     <td>Personnel</td>
                                     <td>Rs.50</td>
                                     <td>2</td>
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
export default OpeDetails;