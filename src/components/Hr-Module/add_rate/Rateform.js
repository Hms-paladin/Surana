import React from 'react';
import CenteredTabs from '../../../tabcomponent/tabs';
import Ratelist from './Ratelist';
import Addrate from './Addrate'

class Rateform extends React.Component{
    render(){
        return(
            <React.Fragment>
                <CenteredTabs
                    tabonelabel="List"
                    tabtwolabel="Rate"
                    componentone={<Ratelist />}
                    componenttwo={<Addrate />}
                   
                />
            </React.Fragment>
        )
    }
}

export default Rateform;