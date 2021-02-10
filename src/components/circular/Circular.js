import React from 'react';
import CenteredTabs from '../../tabcomponent/tabs';
import Circularlist from './Circularlist';
import Addcircular from './Addcircular';


class Circular extends React.Component{
    render(){
        return(
            <React.Fragment>
                <CenteredTabs
                    tabonelabel="List"
                    tabtwolabel="Circular"
                    componentone={<Circularlist />}
                    componenttwo={<Addcircular/>}
                   
                />
            </React.Fragment>
        )
    }
}
export default Circular;