import React from 'react';
import CenteredTabs from '../../tabcomponent/tabs';
import Checklist from './Checklist';
import ChecklistAssignment from './ChecklistAssignment';

class ChecklistTab extends React.Component{
    render(){
        return(
            <React.Fragment>
                <CenteredTabs 
                
                 tabonelabel="Checklist"
                 tabtwolabel="Checklist Assignment"
                 componentone={<Checklist />}
                 componenttwo={<ChecklistAssignment />}
             />


                

          
            </React.Fragment>
        )
    }
}
export default ChecklistTab