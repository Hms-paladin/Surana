import React from 'react';
import CenteredTabs from '../../tabcomponent/tabs';
import Createemployeelist from './Createemployeelist';
import Addcreateemployee from './Addcreateemployee';

class Createemployee extends React.Component{
    render(){
        return(
            <React.Fragment>
                <CenteredTabs
                    tabonelabel="List"
                    tabtwolabel="Create Employee"
                    componentone={<Createemployeelist />}
                    componenttwo={<Addcreateemployee/>}
                   
                />
            </React.Fragment>
        )
    }
}
export default Createemployee; 