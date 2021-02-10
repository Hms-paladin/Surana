import React from 'react';
import CenteredTabs from '../../../tabcomponent/tabs';
import AppraisalModal from './AppraisalModal';
import Addquestionappraiser from './Addquestionappraiser';
import AppraisalRating from './AppraisalRating';
import ManagingPartner from './ManagingPartner';
import FollowReport from './FollowReport';
import AppraisalStepper from './AppraisalStepper';
class NewAppraisal extends React.Component{
    render(){
        return(
            <CenteredTabs
                tabonelabel="Self Appraisal"
                tabtwolabel="Appraiser-Add Questions"
                tabthreelabel="Appraisal Rating"
                tabfourlabel="Managing Partner's Review"
                tabfivelabel="Follow Up Reports"
                tabsixlabel="Appraisal Timelines"
                componentone={<AppraisalModal />}
                componenttwo={<Addquestionappraiser />}
                componentthree={<AppraisalRating/>}
                componentfour={<ManagingPartner/>}
                componentfive={<FollowReport/>}
                componentsix={<AppraisalStepper/>}
            />

        )
    }

}

export default NewAppraisal;