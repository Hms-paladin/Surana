import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import './tabs.css';

const styles = {
  root: {
    flexGrow: 1,
  },
};


function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
  }
  
  TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
  };

class CenteredTabs extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      value:this.props.changeTab?this.props.changeTab:0
    }

    console.log("messaga",this.props)
  }

  UNSAFE_componentWillReceiveProps(newProps){
    if(newProps.changeTab || newProps.changeTab === 0){
    this.setState({value:newProps.changeTab})
    }
}

  handleChange = (event, value) => {
  
    // this.props.tabcontrol && 
    this.setState({ value });
  };

  

  render() {
    const { classes, } = this.props;
    const { value } = this.state;

    const { tabonelabel,tabtwolabel,tabthreelabel,
            tabfourlabel,tabfivelabel,tabsixlabel,
            tabsevenlabel,tabeightlabel,tabninelabel,
            tabtenlabel} = this.props

    
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
          {tabonelabel && <Tab label={tabonelabel} />}

          {tabonelabel && tabtwolabel && <Tab label={tabtwolabel} />}

          {tabonelabel && tabtwolabel && tabthreelabel && <Tab label={tabthreelabel} />}

          {tabonelabel && tabtwolabel && tabthreelabel && tabfourlabel && 
          <Tab label={tabfourlabel} />}

          {tabonelabel && tabtwolabel && tabthreelabel && tabfourlabel && 
            tabfivelabel && <Tab label={tabfivelabel} />}

          {tabonelabel && tabtwolabel && tabthreelabel && tabfourlabel && 
            tabfivelabel && tabsixlabel && <Tab label={tabsixlabel} />}

          {tabonelabel && tabtwolabel && tabthreelabel && tabfourlabel && 
            tabfivelabel && tabsixlabel && tabsevenlabel && <Tab label={tabsevenlabel} />}

          {tabonelabel && tabtwolabel && tabthreelabel && tabfourlabel && 
            tabfivelabel && tabsixlabel && tabsevenlabel && tabeightlabel && 
            <Tab label={tabeightlabel} />}

          {tabonelabel && tabtwolabel && tabthreelabel && tabfourlabel && 
            tabfivelabel && tabsixlabel && tabsevenlabel && tabeightlabel && 
            tabninelabel && <Tab label={tabninelabel} />}

          {tabonelabel && tabtwolabel && tabthreelabel && tabfourlabel && 
            tabfivelabel && tabsixlabel && tabsevenlabel && tabeightlabel && 
            tabninelabel && tabtenlabel && <Tab label={tabtenlabel} />}
        </Tabs>
      </Paper>
      {value === 0 && <TabContainer>{this.props.componentone}</TabContainer>}
        {value === 1 && <TabContainer>{this.props.componenttwo}</TabContainer>}
        {value === 2 && <TabContainer>{this.props.componentthree}</TabContainer>}
        {value === 3 && <TabContainer>{this.props.componentfour}</TabContainer>}
        {value === 4 && <TabContainer>{this.props.componentfive}</TabContainer>}
        {value === 5 && <TabContainer>{this.props.componentsix}</TabContainer>}
        {value === 6 && <TabContainer>{this.props.componentseven}</TabContainer>}
        {value === 7 && <TabContainer>{this.props.componenteight}</TabContainer>}
        {value === 8 && <TabContainer>{this.props.componentnine}</TabContainer>}
        {value === 9 && <TabContainer>{this.props.componentten}</TabContainer>}
      </div>
    );
  }
}

CenteredTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CenteredTabs);