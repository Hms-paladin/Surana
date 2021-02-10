// import React from 'react';
// import { Grid } from "@material-ui/core";
// import Calenderbox from "../../../formcomponent/calenderbox";
// import Dropdownantd from "../../../formcomponent/dropdownantd";
// import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
// import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
// import BillableDetails from '../BillableDetails/billableeffort_details';
// import External_Consultant from "../ExternalConsultant/external_consultant";
// import OpeDetails from '../OPeDetails/opeDetails';
// import SummaryDetails from '../SummaryDetails/summary_details';
// import './billable_head.css';

// class BillableHead extends React.Component{ 
//     state={
//         count:1
//     }
//     // Click Function
//     nextArrow=()=>{
//         this.setState({
//             count:this.state.count+1
//         })
//     }
//     previousArrow=()=>{
//         this.setState({
//             count:this.state.count-1
//         })
//     }
  
 
//     render(){
//         return(
//             <React.Fragment>
//               <div className ="card mt-5">
//                 <div className ="card-body">
//       {/* Heading */}
//                     <Grid item md={12} sm={12} className ="checklist_heading_div d-flex" >
//                             <div className ="plus_heading_div">
//                                 <div>
//                                     <h6 className ="checklist_heading">Billable Effort Invoice</h6>
//                                 </div>
//                             </div>
//                     </Grid>
//                     <Grid item md={12} sm={12} className ="add_checklist_heading_div">
//                         <h6 className ="checklist_heading">Generate Invoice</h6>
//                     </Grid>
//      {/* Head Component */}
//                     <div className ="grid_alignment_checklist_billable">
//                         <Grid container>
//                             <Grid item md={11} sm={12}>
//                                 <Grid container spacing ={2}>
//                                      <Grid item md={4} sm={5}>
//                                           <Dropdownantd label="Client" className="w-100"/>  
//                                      </Grid>
                                   
//                                      <Grid item md={3} sm={5}>
//                                            <Calenderbox label="Period" className="w-100" />
//                                      </Grid>
//                                      <Grid item md={1} sm-={5} className="slash_align">-</Grid>
//                                      <Grid item md={3} sm={5}>
//                                         <Calenderbox label="Date" className="w-100" />
//                                      </Grid>
//                                 </Grid>  
//                             </Grid>
//                         </Grid>                
//                     </div>
//     {/* Condition for table component */}
//                     {this.state.count===1 ? <BillableDetails/>: this.state.count===2? <External_Consultant/>: 
//                       this.state.count==3 ? <OpeDetails/>: this.state.count===4? <SummaryDetails/> :null
//                      }
//     {/* Arrow click  */}
//                     {this.state.count<4 ?
//                     <div className="billable_table_footer_align">
//                         <ArrowBackIosIcon onClick={this.previousArrow}/>
//                         <span>{this.state.count} of 4</span>
//                         <ArrowForwardIosIcon onClick={this.nextArrow}/>
//                     </div>  :
//                     null}
//                 </div>
//               </div>
//             </React.Fragment>
//         )
//     }
// }
// export default BillableHead;


import React from 'react';
import CenteredTabs from '../../../tabcomponent/tabs';
import InvoiceDetails from "../AddInvoiceDetails/invoiceDetails";
import OpeApproval from '../opeapproval/OpeApproval';


class BillableHead extends React.Component{
    render(){
        return(
            <CenteredTabs
            tabonelabel="Add Invoice Details"
            tabtwolabel="OPE Approval Request"
            // tabthreelabel="HOD Review"
            componentone={<InvoiceDetails/>}
            componenttwo={<OpeApproval/>}
           
        />
        )
    }
}
export default BillableHead;