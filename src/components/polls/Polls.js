import React from 'react';
import CenteredTabs from '../../tabcomponent/tabs';
import Pollslist from './Pollslist';
import Addpolls from './Addpolls';

class Polls extends React.Component {
    render() {
        return (
            <React.Fragment>
                <CenteredTabs
                    tabonelabel="List"
                    tabtwolabel="Polls"
                    componentone={<Pollslist />}
                    componenttwo={<Addpolls />}
                />

            </React.Fragment>

        )
    }
}
export default Polls;