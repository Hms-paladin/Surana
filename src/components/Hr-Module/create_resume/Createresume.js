import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Profile from './Profile';
import NewExperience from './Experience';
import NewEducation from './Education';
import Skills from './Skills.js';
import License from './License.js';
import Summary from './Summary';
import Typography from '@material-ui/core/Typography';
import Candidateview from "./Candidateview";
import { connect } from 'react-redux';
import { getDepartment, getQualificationList, getTypeOfIndustry } from '../../../fixers/fixersAction';
import { getSkills, clearStore, getCandidateType, getDesignations } from './action/CreateResumeAction';

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



class Createresume extends React.Component {
  state = {
    value: 0,
    hideTab: false,
    edit: false,
    editTabIndex: ''
  };

  componentWillMount() {
    this.props.dispatch(getDepartment());
    this.props.dispatch(getSkills());
    this.props.dispatch(getCandidateType());
    this.props.dispatch(getDesignations());
    this.props.dispatch(getQualificationList());
    this.props.dispatch(getTypeOfIndustry());
  }

  componentWillUnmount() {
    // Clearing the tab values
    // In store
    this.props.dispatch(clearStore())
  }

  
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
    this.setState({ value, tabstate: true, addvalue: this.state.addvalue + value });
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
  };

  editTabControl = (index, edit) => {
    this.setState({
      editTabIndex: index,
      edit: edit
    })
  }



  render() {
    console.log("sdfkjhsdfkjhdsljfhsdjkfhsdf", this.props)
    const { classes, department, skills, resumeId, designations, buttonDisableState } = this.props;
    const { value } = this.state
    console.log(this.state.value, "value")
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
            <Tab label="Personal Info" />
            <Tab label="Education" />
            <Tab label="Experience" disabled={this.state.hideTab} />
            <Tab label="Skills" />
            <Tab label="License" />
            <Tab label="Summary" />
            <Tab label="Candidate List" />

          </Tabs>
        </Paper>

        {value === 0 &&
          <TabContainer>
            <Profile
              propFunc={this.propsupdate}
              changesetdata={(data, key, errdata, errmsg) => this.changesetdata(data, key, errdata, errmsg)}
              dispatch={this.props.dispatch}
              candidateType={this.props.candidateType}
              choosenCandidateType={this.choosenCandidateType}
              edit={this.state.edit}
              buttonDisableState={buttonDisableState}
            />
          </TabContainer>
        }
        {value === 1 &&
          <TabContainer>
            <NewEducation
              propFunc={this.propsupdate}
              dispatch={this.props.dispatch}
              resumeId={resumeId}
              skipTab={this.state.hideTab}
              editTabIndex={this.state.editTabIndex}
              edit={this.state.edit}
              buttonDisableState={buttonDisableState}
            />
          </TabContainer>
        }
        {value === 2 &&
          <TabContainer>
            <NewExperience
              propFunc={this.propsupdate}
              dispatch={this.props.dispatch}
              department={department}
              resumeId={resumeId}
              designations={designations}
              editTabIndex={this.state.editTabIndex}
              edit={this.state.edit}
              buttonDisableState={buttonDisableState}
            />
          </TabContainer>
        }
        {value === 3 &&
          <TabContainer>
            <Skills
              propFunc={this.propsupdate}
              dispatch={this.props.dispatch}
              department={department}
              skills={skills}
              resumeId={resumeId}
              edit={this.state.edit}
              buttonDisableState={buttonDisableState}
              skipTab={this.state.hideTab}

            />
          </TabContainer>
        }
        {value === 4 &&
          <TabContainer>
            <License
              propFunc={this.propsupdate}
              dispatch={this.props.dispatch}
              department={department}
              skills={skills}
              resumeId={resumeId}
              edit={this.state.edit}
              buttonDisableState={buttonDisableState}
              skipTab={this.state.hideTab}

            />
          </TabContainer>
        }
        {value === 5 && <TabContainer><Summary propFunc={this.propsupdate} resumeId={resumeId} editTabControl={(index, edit) => this.editTabControl(index, edit)} /></TabContainer>}
        {value === 6 && <TabContainer><Candidateview dispatch={this.props.dispatch} propFunc={this.propsupdate} editTabControl={(index, edit) => this.editTabControl(index, edit)} /></TabContainer>}

      </div>
    );
  }
}

Createresume.propTypes = {
  classes: PropTypes.object.isRequired,
};



const mapStateToProps = (state) => ({
  buttonDisableState: state.fixers.buttonDisableState,
  department: state.fixers.department,
  skills: state.resumeReducer.skills,
  candidateType: state.resumeReducer.candidateType,
  resumeId: state.resumeReducer.resumeId,
  resumeData: state.resumeReducer.resume,
  designations: state.resumeReducer.designations
});

export default connect(mapStateToProps)(withStyles(styles)(Createresume))