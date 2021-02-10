import React from 'react';
import { connect } from 'react-redux';
import EmployeeTraining from './EmployeeTraining';
import CenteredTabs from '../../tabcomponent/tabs';

class TrainingPage extends React.Component{
    render(){
        return(
            <React.Fragment>
                <CenteredTabs
                    tabonelabel="Add Form"
                    componentone={<EmployeeTraining />}
                />
            </React.Fragment>
        )
    }
}

export default connect()(TrainingPage);