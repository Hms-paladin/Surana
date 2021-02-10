import React from 'react';
import CenteredTabs from '../../../tabcomponent/tabs';
import Knowledgemgmt from './knowledgemgmt';
import Knowledgemanagementsearch from './Knowledgemanagementsearch'
class Knowledge extends React.Component{
    render(){
        return(
            <React.Fragment>
                <CenteredTabs
                    tabonelabel="Knowledge Management"
                    tabtwolabel="Search"
                    componentone={<Knowledgemgmt />}
                    componenttwo={<Knowledgemanagementsearch/>}
                   
                />
            </React.Fragment>
        )
    }
}

export default Knowledge;