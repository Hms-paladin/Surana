import React from 'react';
import CenteredTabs from '../../tabcomponent/tabs';
import Ratinglist from './Ratinglist';
import Addrating from './Addrating';


class Rating extends React.Component {
    render() {
        return (
            <React.Fragment>
                <CenteredTabs
                    tabonelabel="List"
                    tabtwolabel="Add rating"
                    componentone={<Ratinglist />}
                    componenttwo={<Addrating />}
                />

            </React.Fragment>


        )
    }
}
export default Rating;