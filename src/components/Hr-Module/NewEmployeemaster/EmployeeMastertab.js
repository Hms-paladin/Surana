import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
// import { getDepartment } from '../../../fixers/fixersAction';
import PersonalDetails from './Personaldetails';
import OfficialDetails from './Officialdetails';
import EmployeeMasterList from './EmployeemasterList';
import { clearStore, getSkills } from '../create_resume/action/CreateResumeAction';
import { getDepartment, getEmployees } from '../../../fixers/fixersAction';
import { getInductionCheckList } from '../induction_program/Action';
import Addcandidate from '../induction_program/Addcandidate';
import Addcandidatelist from '../induction_program/Addcandidatelist';
// import { getSkills, clearStore, getCandidateType } from './CreateResumeAction';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

const styles = {
  root: {
    flexGrow: 1,
  },
};



class EmployeeMastertab extends React.Component {
  state = {
    value: 0,
    hideTab: false,
    addCandidateData:[]
  };

  //   componentWillMount() {
  //     this.props.dispatch(getDepartment());
  //     this.props.dispatch(getSkills());
  //     this.props.dispatch(getCandidateType());
  //   }

  //   componentWillUnmount() {
  //     // Clearing the tab values
  //     // In store
  //     this.props.dispatch(clearStore())
  //   }

  propsupdate = (e, data) => {
    this.setState({
      value: e,
    })
  }

  choosenCandidateType = (e) => {
    if (e != 3) {
      this.setState({
        hideTab: true
      })
    } else {
      this.setState({
        hideTab: false
      })
    }
  }

  handleChange = (event, value) => {
    this.setState({ value, tabstate: true, addvalue: this.state.addvalue + value,addCandidateData:[] });
  };

  changesetdata = (data, key, errdata, errmsg) => {
    var name = key
    var errname = "errdata_" + key
    var errmsgs = "errmsg_" + key
    console.log(errdata, "errdata")
    console.log(errmsg, "errmsg")

    this.setState({
      [name]: data,
      [errname]: errdata,
      [errmsgs]: errmsg,
      addvalue: 0
    })
  }

  componentWillUnmount() {
    this.props.dispatch(clearStore())
  }
  componentWillMount(){
    this.props.dispatch(getInductionCheckList());
    this.props.dispatch(getDepartment())
    this.props.dispatch(getSkills())
    this.props.dispatch(getEmployees())
  }

  render() {
    const { classes, department, inductionCheckList, skills, candidates } = this.props;
    const { value } = this.state
    return (
      <div>
        <Paper className={`tab_align ${classes.root}`}>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Personal Details" />
            <Tab label="Official Details" />
            <Tab label="Employee Master List" />
            <Tab label="Induction Check List" />
            <Tab label="Candidate View" />
          </Tabs>
        </Paper>
        {value === 0 && <TabContainer><PersonalDetails propFunc={this.propsupdate} dispatch={this.props.dispatch} /></TabContainer>}
        {value === 1 && <TabContainer><OfficialDetails propFunc={this.propsupdate} dispatch={this.props.dispatch} department={department} /></TabContainer>}
        {value === 2 && <TabContainer><EmployeeMasterList propFunc={this.propsupdate} dispatch={this.props.dispatch} department={department} /></TabContainer>}
        {value === 3 && <TabContainer><Addcandidate inductionCheckList={inductionCheckList} candidates={candidates} department={department} skills={skills} addCandidateData={this.state.addCandidateData} addCandidateDataEmpty = {()=>this.setState({addCandidateData:[]})} /></TabContainer>}
        {value === 4 && <TabContainer><Addcandidatelist addCandidateData={(data)=>this.setState({addCandidateData:data,value:3})} /></TabContainer>}


      </div>
    );
  }
}

EmployeeMastertab.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  department: state.fixers.department,
  inductionCheckList: state.induction.inductionCheckList,
  candidates: state.fixers.employees,
  skills: state.resumeReducer.skills
});

export default connect(mapStateToProps)(withStyles(styles)(EmployeeMastertab))