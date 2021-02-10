import React from 'react';
import CenteredTabs from '../../tabcomponent/tabs';
import AchievementList from './AchievementList';
import AchievementAddForm from './AchievementAddForm';

class EmployeeAchievement extends React.Component{
    render(){
        return(
            <CenteredTabs
                tabonelabel="List"
                tabtwolabel="Add Form"
                componentone={<AchievementList />}
                componenttwo={<AchievementAddForm />}
            />
        )
    }
}

export default EmployeeAchievement;