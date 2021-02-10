import React from 'react';
import CenteredTabs from '../../tabcomponent/tabs';
import HearingList from './HearingList';
import AddHearing from './AddHearing';

class Hearing extends React.Component{
    render(){
        return(
            <CenteredTabs
                tabonelabel="List"
                tabtwolabel="Add Hearing Form"
                componentone={<HearingList />}
                componenttwo={<AddHearing />}
             />   
           
        )
    }
}

export default Hearing;