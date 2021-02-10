import React from 'react';
import CenteredTabs from '../../tabcomponent/tabs';
import IpabList from './IpabList';
import AddIpab from './AddIpab';

class Ipab extends React.Component{
    render(){
        return(
            <React.Fragment>
                <CenteredTabs
                    tabonelabel="List"
                    tabtwolabel="Ipab"
                    componentone={<IpabList />}
                    componenttwo={<AddIpab/>}
                   
                />
            </React.Fragment>
        )
    }
}

export default Ipab;