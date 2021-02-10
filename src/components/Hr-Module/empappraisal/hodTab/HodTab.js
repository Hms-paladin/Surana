import React from 'react';
import CenteredTabs from '../../../../tabcomponent/tabs';
import AppraisalHod from "./appraisalhod/AppraisalHod";
import AppraisalRating from "./appraisalraing/AppraisalRating";
import HodReview from "./hodreview/HodReview";


class HodTab extends React.Component{
  render(){
    return(
      <CenteredTabs
      tabonelabel="Appraisal"
      tabtwolabel="Appraisal Rating"
      tabthreelabel="HOD Review"
      componentone={<AppraisalHod/>}
      componenttwo={<AppraisalRating/>}
      componentthree={<HodReview/>}
  />
    )
  }
}
 
export default  HodTab; 