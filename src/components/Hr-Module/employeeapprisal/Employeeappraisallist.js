import React from 'react';
import CenteredTabs from '../../../tabcomponent/tabs';
import EmployeeKRA from './EmployeeKRA';
import Employeeapprisal from './index'
import Addachievement from './Addachievement';

class Employeeapprisallist extends React.Component{
    render(){
        return(
            <React.Fragment>
                <CenteredTabs
                    tabonelabel="Employee KRA"
                    tabtwolabel="Employee KPI"
                    tabthreelabel="Employee Acheivement"
                    componentone={<EmployeeKRA />}
                    componenttwo={<Employeeapprisal />}
                    componentthree={< Addachievement/>}
                   
                />
            </React.Fragment>
        )
    }
}

export default Employeeapprisallist;