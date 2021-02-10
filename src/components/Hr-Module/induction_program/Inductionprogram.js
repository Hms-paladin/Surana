import React from 'react';
import CenteredTabs from '../../../tabcomponent/tabs';
import Addcandidate from './Addcandidate';
import './Inductionprogram.css'
import { connect } from 'react-redux';
import { getInductionCheckList } from './Action.js';
import { getDepartment, getEmployees } from '../../../fixers/fixersAction';
import { getSkills } from '../create_resume/action/CreateResumeAction';
import Addcandidatelist from './Addcandidatelist';
import './DynTable.css'

class Inductionprogram extends React.Component{

    state={
        changeTab:0,
        addCandidateData:[]
    }

    componentDidMount(){
        this.props.dispatch(getInductionCheckList());
        this.props.dispatch(getDepartment())
        this.props.dispatch(getSkills())
        this.props.dispatch(getEmployees())
    }
    render(){
        const { inductionCheckList,department,skills,candidates } = this.props;
        return(
            <React.Fragment>
                <div className="induction_heading">Induction Program</div>
                <CenteredTabs
                    className="tabscontrol"
                    // tabonelabel="List"
                    tabonelabel="Add candidate"
                    tabtwolabel="Candidates View"
                    // componentone={<Addcandidatelist />}
                    componentone={<Addcandidate inductionCheckList={inductionCheckList} candidates={candidates} department={department} skills={skills} addCandidateData={this.state.addCandidateData}/>}
                   componenttwo={<Addcandidatelist addCandidateData={(data)=>this.setState({addCandidateData:data,changeTab:0})} />}
                   changeTab={this.state.changeTab}
                />
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    inductionCheckList: state.induction.inductionCheckList,
    candidates: state.fixers.employees,
    department: state.fixers.department,
    skills: state.resumeReducer.skills
  });

export default connect(mapStateToProps)(Inductionprogram);