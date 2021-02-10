import React from 'react';
import CenteredTabs from '../../tabcomponent/tabs';
import Quizlist from './Quizlist';
import Addquiz from './Addquiz';

class Quiz extends React.Component {
    render() {
        return (
            <React.Fragment>
                <CenteredTabs
                    tabonelabel="List"
                    tabtwolabel="Quiz"
                    componentone={<Quizlist />}
                    componenttwo={<Addquiz />}
                />

            </React.Fragment>

        )
    }
}
export default Quiz;