import React from 'react';
import CenteredTabs from "../../../tabcomponent/tabs";
import Timesheetmanagement from './Timesheetmanagement';
import Timesheet from './timesheet';

class TimesheetTab  extends React.Component{
   
    render(){
        const { department } = this.props;
        return(
            <React.Fragment>
                <CenteredTabs 
                    tabonelabel="Timesheet"
                    tabtwolabel="Timesheet View"
                  
                    componentone=  {<Timesheet/>}
                    componenttwo={<Timesheetmanagement department={department}/>}
               />

        </React.Fragment>
        )
    }
}


export default TimesheetTab;