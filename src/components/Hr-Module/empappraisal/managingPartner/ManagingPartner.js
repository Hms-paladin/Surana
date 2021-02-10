import React from 'react';
import CenteredTabs from '../../../../tabcomponent/tabs';
import ManagingAppraisal from "../managingPartner/managingappraisal/ManagingAppraisal";
import ManagingRating from "../managingPartner/managingrating/ManagingRating";
import ManagingReview from "../managingPartner/managingreview/ManagingReview"


class ManagingPartner extends React.Component{
  render(){
    return(
      <CenteredTabs
      tabonelabel="Appraisal Rating"
      tabtwolabel="Appraisal"
      tabthreelabel="HOD Review"
      componentone={<ManagingRating/>}
      componenttwo={<ManagingAppraisal/>}
      componentthree={<ManagingReview/>}
  />
    )
  }
}
 
export default  ManagingPartner; 