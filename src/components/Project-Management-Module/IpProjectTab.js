import React from 'react';
import CenteredTabs from '../../../tabcomponent/tabs';
import IpProject from "./IpProject";
// import Checklist from '../../NewChecklistManagement/newchecklist/Checklist';
// import ChecklistAssignment from '../../NewChecklistManagement/newchecklistassignment/ChecklistAssignment';
class IpProjectTab extends React.Component{
    render(){
        return(
            <React.Fragment>
                {/* <h5>IP Project</h5> */}
                <CenteredTabs 
                    tabonelabel="Application"
                    tabtwolabel="Opposition"
                    componentone={<IpProject/>}
             />
            </React.Fragment>
        )
    }
}
export default IpProjectTab;