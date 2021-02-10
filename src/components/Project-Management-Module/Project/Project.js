import React from 'react';
import CenteredTabs from '../../../tabcomponent/tabs';
import AddProject from './AddProject';
import AddProjectList from './AddProjectList';

class Project extends React.Component{
    render(){
        return(
            <React.Fragment>
                <CenteredTabs
                    tabonelabel="Add Project"
                    tabtwolabel="Project View"
                    componentone={<AddProject/>}
                    componenttwo={<AddProjectList/>}
                   
                />
            </React.Fragment>
        )
    }
}
export default Project;