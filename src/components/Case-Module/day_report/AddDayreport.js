import React from 'react';
import CenteredTabs from '../../../tabcomponent/tabs';
import Dayreportlist from './Dayreportlist';
import Dayreport from './Dayreport';

class AddDayreport extends React.Component{
    render(){
        return(
            <CenteredTabs
                tabonelabel="Add DayReport"
                tabtwolabel="DayReport List"
                componentone={<Dayreport />}
                componenttwo={<Dayreportlist/>}
            />
        )
    }
}

export default AddDayreport;