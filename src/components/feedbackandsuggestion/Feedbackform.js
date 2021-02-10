import React from 'react';
import CenteredTabs from '../../tabcomponent/tabs';
import Feedbacklist from './Feedbacklist';
import Addfeedback from './Addfeedback';

class Feedbackform extends React.Component{
    render(){
        return(
            <React.Fragment>
                <CenteredTabs
                    tabonelabel="List"
                    tabtwolabel="Feedbackform"
                    componentone={<Feedbacklist/>}
                    componenttwo={<Addfeedback/>}
                />
            </React.Fragment>
        )
    }
}
export default Feedbackform;