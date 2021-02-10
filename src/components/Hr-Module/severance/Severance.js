import React from 'react';
import CenteredTabs from '../../../tabcomponent/tabs';
import Feedbackseverance from './Feedbackseverance';
import SeveranceForm from './SeveranceForm';
import { connect } from 'react-redux';
import {getacceptedby,getreleivedby,getEmployeeNames} from './Action';
import { getDepartment } from '../../../fixers/fixersAction';
import Severanceview from './SeveranceView';

class Severance extends React.Component {

    state = {
        feedBackAllowed:false
    }
    componentDidMount() {
        this.props.dispatch(getacceptedby())
        this.props.dispatch(getreleivedby())
        // this.props.dispatch(getEmployeeNames())
        this.props.dispatch(getDepartment())
    }

    render() {
        console.log("sadflksdfklsdjfksjd",this.props)
        const {acceptedby,releivedby,dispatch,employees,department} = this.props;
        const {feedBackAllowed} = this.state;

        return (
            <React.Fragment>
                <CenteredTabs
                    tabonelabel="Severance Form"
                    tabtwolabel="Severance Feedback Form"
                    tabthreelabel="Severance List"
                    componentone={<SeveranceForm dispatch={dispatch} acceptedby={acceptedby} releivedby={releivedby} employees={employees} department={department} />}
                    componenttwo={ <Feedbackseverance dispatch={dispatch} /> }
                    componentthree={<Severanceview dispatch={dispatch}/>}
                />
            </React.Fragment>
        )
    }
}

// const mapStateToProps = (state) => {
//     console.log("sadfskdjflksdjfklsdfjskdf",state.severance.acceptedby)
// }


const mapStateToProps = (state) => ({
    acceptedby:state.severance.acceptedby,
    releivedby:state.severance.releivedby,
    employees:state.severance.employees,
    department:state.fixers.department
})


export default connect(mapStateToProps)(Severance)

