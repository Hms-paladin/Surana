import React  from 'react';
import { Grid } from "@material-ui/core";
import Calenderbox from "../../../formcomponent/calenderbox";
import Inputantd from "../../../formcomponent/inputantd";
import {Table} from "antd";
import './summary_details.css';
import Button from 'react-bootstrap/Button';


class SummaryDetails extends React.Component{
    render(){
        
const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ];
  
        return(
           <React.Fragment>
                    <div className ="grid_alignment_checklist_billable">
                         <div className ="checklist_activity_border_bilable">
           {/* Summary heading */}
                            <div className ="avtivity_background">
                               <p className ="top_checklist">Summary</p>
                            </div>
                            <div className ="grid_alignment_checklist">
                            <Grid container>
             {/* Invoice heading */}
                            <Grid item md={11} sm={12}>
                                <Grid container spacing ={4}>
                                     <Grid item md={6} sm={5}>
                                          <Inputantd label="Invoice No" className="w-100"/>  
                                     </Grid>
                                     <Grid item md={4} sm={5}>
                                        <Calenderbox label="Date" className="w-100" />
                                     </Grid>
                                </Grid>  
                            </Grid>
                          </Grid> 
                            </div>  
                            <div className ="grid_alignment_checklist_sum">
                            <table className="dd">
                                <thead>
                                    <tr> 
                                       <>
                                        <th scope="col" className="table_padd">Billable Hours</th>   
                                        <th scope="col" className="table_padd">External Consultant</th>  
                                        <th scope="col" className="table_padd">OPE</th>  
                                        <th scope="col" className="table_padd">Total</th>  
                                       </>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td>Rs. 100</td>
                                    <td>Rs. 100</td>
                                    <td>Rs. 100</td>
                                    <td>Rs.50</td>
                                    </tr>
                                </tbody>
                            </table>
                            </div>
         {/* Save Button */}
                            <Grid container direction="row" justify="center" alignItems="center" className="mt-1" spacing={3}>
                            <Grid item >
                                <Button className="btnwidth btnclr">Save</Button>
                            </Grid>
                            
                            <Grid item >
                              <Button className="btnwidth btnclr_outline">Cancel</Button>
                            </Grid>
                        </Grid>
                            
                          
                                
                            
                        </div>
                                               
                    </div>  

           </React.Fragment>
        )
    }
}
export default SummaryDetails