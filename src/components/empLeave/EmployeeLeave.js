import React from 'react';
import CenteredTabs from '../../tabcomponent/tabs';
import EmployeeLeaveApproval from './EmployeeLeaveApproval';
import EmployeeLeaveAddForm from './EmployeeLeaveAddForm';

class EmployeeLeave extends React.Component{
    render(){
        return(
            <CenteredTabs
                tabonelabel="List"
                tabtwolabel="Add Form"
                componentone={<EmployeeLeaveApproval />}
                componenttwo={<EmployeeLeaveAddForm />}
            />
        )
    }
}

export default EmployeeLeave;