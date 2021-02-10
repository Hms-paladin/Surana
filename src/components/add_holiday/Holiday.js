import React from 'react';
import CenteredTabs from '../../tabcomponent/tabs';
import Holidaylist from './Holidaylist';
import Addholiday from './Addholiday'

class Holiday extends React.Component{
    render(){
        return(
            <React.Fragment>
                <CenteredTabs
                    tabonelabel="List"
                    tabtwolabel="Holiday"
                    componentone={<Holidaylist />}
                    componenttwo={<Addholiday />}
                   
                />
            </React.Fragment>
        )
    }
}

export default Holiday;