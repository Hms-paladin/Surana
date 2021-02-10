import React from 'react';
import CenteredTabs from '../../../tabcomponent/tabs';
import Unblockuser from './Unblockuser';


class UnblockuserTab  extends React.Component{
    render(){
        return(
            <React.Fragment>
                <CenteredTabs 
                    tabonelabel="Unblock Users"
                  
                    componentone=  {<Unblockuser/>}
               />

        </React.Fragment>
        )
    }
}
export default UnblockuserTab;