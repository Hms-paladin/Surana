import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Link } from 'react-router-dom';
import test from '../images/test.jpg';
import surana from '../images/surana.gif';


import {
  AppBar, Toolbar, IconButton,
  Drawer, CssBaseline,ListItem,ListItemIcon,
  ListItemText,List,MenuList,MenuItem
} from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';



const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    marginLeft: 50,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: 50,
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

class MiniDrawer extends React.Component {
  state = {
    open: true,
  };

  handleDrawerOpen = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { classes,children } = this.props;
    const { open } = this.state;

    return (
      <div className={` posfix ${classes.root}`}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={`appbarstyle ${classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          })}`}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
            {/* <Typography variant="h6" color="inherit" noWrap>
              Mini variant drawer
            </Typography> */}
             <Grid container justify="flex-end" alignItems="center">
              <div className={"flex"}>
                <div>
                <h6 className="headername mt-2 mr-3">Surana</h6>
                </div>
                <div>
              <Avatar alt="Remy Sharp" src={test} className={""} />
              </div>
              </div>
            </Grid>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open,
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            }),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            
          </div>
          <div className="flex">
          <img src={surana} className={`${this.state.open?"surana_logo":"surana_logo_sm"}`} />
            <span className={`${this.state.open?"text_logo":"text_logo_none"}`}>Surana</span>
            </div>

            
            <MenuList className="menu_background_clr">

            <MenuItem component={Link} to="/">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                  <ListItemText primary="Dashboard" />
            </MenuItem>

            <MenuItem component={Link} to="/Recruitment">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                  <ListItemText primary="Recruitment" />
            </MenuItem>

            <MenuItem component={Link} to="/create_resume">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                  <ListItemText primary="Create Resume" />
            </MenuItem>

           
            <MenuItem component={Link} to="/Onlinetestlist">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                  <ListItemText primary="Onlinetest" />
            </MenuItem>

            <MenuItem component={Link} to="/Interviewtable">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                  <ListItemText primary="Interview Table" />
            </MenuItem>

            <MenuItem component={Link} to="/induction_program">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                  <ListItemText primary="Induction Program" />
            </MenuItem>

            <MenuItem component={Link} to="/Employeeapprisallist">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                  <ListItemText primary="Employee Apprisal" />
            </MenuItem>

            <MenuItem component={Link} to="/Employeepayroll">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                  <ListItemText primary="Employee Payroll" />
            </MenuItem>

            <MenuItem component={Link} to="/employeetraining">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                  <ListItemText primary="EmployeeTraining" />
            </MenuItem>

            <MenuItem component={Link} to="/Knowledge">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                  <ListItemText primary="Knowledge Management" />
            </MenuItem>

            <MenuItem component={Link} to="/Application">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                  <ListItemText primary="Employee Leave & Permission" />
            </MenuItem>


            <MenuItem component={Link} to="/Severance">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                  <ListItemText primary="Severance" />
            </MenuItem> 

            <MenuItem component={Link} to="/Case">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                  <ListItemText primary="Case" />
            </MenuItem> 

            <MenuItem component={Link} to="/day_report">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                  <ListItemText primary="Day Report" />
            </MenuItem> 
            
            <MenuItem component={Link} to="/Courtform">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                  <ListItemText primary="Add Court" />
            </MenuItem>
         
            <MenuItem component={Link} to="/Addtm">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                  <ListItemText primary="TM-60" />
            </MenuItem>
            
           
           
            <MenuItem component={Link} to="indianfilling">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                  <ListItemText primary="Indianfilling" />
            </MenuItem> 

            <MenuItem component={Link} to="/Ipab">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                  <ListItemText primary="IPAB" />
            </MenuItem> 
           
            <MenuItem component={Link} to="Article">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                  <ListItemText primary="Post Article" />
            </MenuItem> 

            <MenuItem component={Link} to="conference">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                  <ListItemText primary="Conference" />
            </MenuItem> 

            <MenuItem component={Link} to="internationalfilling">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                  <ListItemText primary="Internationalfilling" />
            </MenuItem> 

            <MenuItem component={Link} to="addassignment">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                  <ListItemText primary="Addassignment" />
            </MenuItem> 

            <MenuItem component={Link} to="addchecklist">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                  <ListItemText primary="Addchecklist" />
            </MenuItem> 

            <MenuItem component={Link} to="continuosmonitering">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                  <ListItemText primary="ContinuosMonitering" />
            </MenuItem>

            <MenuItem component={Link} to="opposeddefended">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                  <ListItemText primary="OpposedDefended" />
            </MenuItem>

            <MenuItem component={Link} to="opposedfilled">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                  <ListItemText primary="OpposedFilled" />
            </MenuItem>

            <MenuItem component={Link} to="checklistmanagement">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                  <ListItemText primary="ChecklistManagement" />
            </MenuItem>

            <MenuItem component={Link} to="Clientform">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                  <ListItemText primary="Add Client" />
                  </MenuItem>

                 

            <MenuItem component={Link} to="/Holiday">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                  <ListItemText primary="Add Holiday" />
            </MenuItem>

            <MenuItem component={Link} to="/Rateform">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                  <ListItemText primary="Add Rate" />
            </MenuItem>

            <MenuItem component={Link} to="/Quiz">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                  <ListItemText primary="Add Quiz" />
            </MenuItem>

            <MenuItem component={Link} to="/Circular">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                  <ListItemText primary="Add Circular and Announcement" />
                  </MenuItem>

                  <MenuItem component={Link} to="/Feedbackform">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                  <ListItemText primary="Feedback and Suggestion" />
                  </MenuItem>

                  <MenuItem component={Link} to="/Polls">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                  <ListItemText primary="Add Polls" />
                  </MenuItem>

           <MenuItem component={Link} to="/Rating">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                  <ListItemText primary="Add Rating" />
            </MenuItem> 

          

            <MenuItem component={Link} to="/Createemployee">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                  <ListItemText primary="Create Employee" />
            </MenuItem>

          
            <MenuItem component={Link} to="Bookrequest">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                  <ListItemText primary="Book Request" />
            </MenuItem> 

            <MenuItem component={Link} to="timesheet">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                  <ListItemText primary="Time Sheet" />
            </MenuItem> 

            <MenuItem component={Link} to="DesignIndia">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                  <ListItemText primary="Design India" />
            </MenuItem> 

            <MenuItem component={Link} to="Copyright">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                  <ListItemText primary="Copyright" />
            </MenuItem> 
            
            </MenuList>
          <List>
 
          </List>
        </Drawer>
        <main
        style={{width:"10%"}}
         className={`mt-5 ${classNames(classes.content, {
          [classes.contentShift]: open,
        })}`} 
        >
          {children}
        </main>
      </div>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);

