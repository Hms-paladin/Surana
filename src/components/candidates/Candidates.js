import React from 'react';
import { connect } from 'react-redux';
import CenteredTabs from '../../tabcomponent/tabs';
import CandidadatesList from './CandidatesList';
import modalWrapper from '../../hoc/modalWrapper';
import CandidatesDetails from './candidatesDetails';
import CandidatesAddForm from './CandidatesAddForm';

const CandidatesViewContent = modalWrapper(CandidatesDetails);

class Candidates extends React.Component{
    render(){
        const { modal, dispatch } = this.props;
        return(
            <React.Fragment>
            <CenteredTabs
                tabonelabel="List"
                tabtwolabel="Add Form"
                componentone={<CandidadatesList dispatch={dispatch}/>}
                componenttwo={<CandidatesAddForm />}
            />
            <CandidatesViewContent isOpen={modal.edit} title={"Candidates Details"} modalClassName={"modal-md"} className={"mt-4"} modalHeader/>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    modal: state.modal
});

export default connect(mapStateToProps)(Candidates);