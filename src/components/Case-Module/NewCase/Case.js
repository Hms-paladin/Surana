import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import CaseAddForm from './CaseAddForm';
import NewCaseList from './NewCaseList';

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



class Case extends React.Component {
  state = {
    value: 0,
    edit: false,
    editTabIndex: ''
  };



  componentWillUnmount() {
    // Clearing the tab values
    // In store
    // this.props.dispatch(clearStore())
  }

  propsupdate = () => {   
    this.setState({
      value: 0,
    //   tableRowData:{data:data,id:id},

    })
  }

  

  handleChange = (event, value) => {
    this.setState({ value, tabstate: true, addvalue: this.state.addvalue + value });
  };



  render() {
    console.log("sdfkjhsdfkjhdsljfhsdjkfhsdf", this.props)
    const { classes, department, skills, resumeId, designations } = this.props;
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
            <Tab label="Add Case" />
            <Tab label="Case View" />        
          </Tabs>
        </Paper>

        {value === 0 &&
          <TabContainer>
            <CaseAddForm            
              dispatch={this.props.dispatch}
              edit={this.state.edit}
              tableRowData={this.state.tableRowData}
            />
          </TabContainer>
        }
        {value === 1 &&
          <TabContainer>
            <NewCaseList
              propFunc={()=>this.propsupdate()}
              dispatch={this.props.dispatch}            
              edit={this.state.edit}
            />
          </TabContainer>
        }       

      </div>
    );
  }
}





const mapStateToProps = (state) => ({
//   department: state.fixers.department,
//   skills: state.resumeReducer.skills,
//   candidateType: state.resumeReducer.candidateType,
//   resumeId: state.resumeReducer.resumeId,
//   designations: state.resumeReducer.designations
});

export default connect(mapStateToProps)(withStyles(styles)(Case))