import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { Link } from 'react-router-dom';
import test from '../../images/test.jpg';
import surana from '../../images/surana.gif'
import { Route, withRouter, BrowserRouter as Router } from 'react-router-dom';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListSubheader from '@material-ui/core/ListSubheader';
import "./DrawerPage.css"

import {
    AppBar, Toolbar, IconButton,
    Drawer, CssBaseline, ListItem, ListItemIcon,
    ListItemText, List, MenuList, MenuItem
} from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

//Hr-Module
import LandingPage from '../Hr-Module/dashboard/LandingPage';
import Createresume from '../Hr-Module/create_resume/Createresume';
import Onlinetest from '../Hr-Module/onlinetest/onlinetest'
import Inductionprogram from '../Hr-Module/induction_program/Inductionprogram';
import Recruitment from '../Hr-Module/Recruitment/Recruitment';
import EmployeePayroll from '../Hr-Module/employeePayroll/EmployeePayroll';
import Leaveapplication from '../Hr-Module/applications/Application';
import RecruitmentTicketTab from '../Hr-Module/Recruitment/RecruitmentTicketTab';
// import AddEmployeeMaster from '../Hr-Module/addEmployee';
import UploadDocBtn from '../Hr-Module/uploadDoc/UploadDocBtn';
// import NewAppraisal from '../Hr-Module/appraisal/NewAppraisal';
import Severance from '../Hr-Module/severance/Severance';
import EmployeeMastertab from '../Hr-Module/NewEmployeemaster/EmployeeMastertab';
import EmployeeDetails from '../Hr-Module/NewEmployeemaster/EmployeeDetails'
import EmployeeKRA from '../Hr-Module/employeeapprisal/EmployeeKRA';
import Knowledge from '../Hr-Module/knowledge_mangement/Knowledge'
// import Rateform from '../Hr-Module/add_rate/Rateform';
import EmployeeapprisalKpi from '../Hr-Module/employeeapprisal/EmployeeapprisalKpi';
import AppraiseeUser from "../Hr-Module/empappraisal/appraiseeUser/AppraiseeUser";
import HodTab from "../Hr-Module/empappraisal/hodTab/HodTab";

import ManagingPartner from "../Hr-Module/empappraisal/managingPartner/ManagingPartner";
import NewAppraisal from '../Hr-Module/empappraisal/NewAppraisal';

// timesheet
import Productivitytab from '../Productivity-Management-Module/NewExpense/Productivitytab'
import ChecklistTab from '../NewChecklistManagement/ChecklistTab';
// import TaskAssignment from '../NewTask-Management/TaskAssignment';
import TimesheetTab from '../Productivity-Management-Module/TimeSheet/TimesheetTab';

// case-module
import Courtform from '../Case-Module/add_court/Courtform'
import Case from '../Case-Module/NewCase/Case';
import AddDayreport from '../Case-Module/day_report/AddDayreport'
import UnblockuserTab from '../Productivity-Management-Module/unblockuser/Unblock';
import NewInterviewtable from '../Hr-Module/interview/NewInterviewtable';
import Onlinetestlist from '../Hr-Module/onlinetest/Onlinetestlist';
import Permissionlist from '../Hr-Module/applications/Permissionlist';
import OnlinetestTab from '../Hr-Module/onlinetest/OnlinetestTab';

//Project Management Module
import TradeMark from '../Project-Management-Module/TradeMark/TrademarkMain/TradeMarkMain';
import DesignMain from '../Project-Management-Module/Design/DesignMain/DesignMain';
import ProjectTemplate from '../Project-Management-Module/ProjectTemplate/ProjectTemplate';
import Copyright from '../Project-Management-Module/Copyright/Copyright';
import Project from '../Project-Management-Module/Project/Project';
import PatentMain from '../Project-Management-Module/Patent/PatentMain/PatentMain'

//productivity module
// import timesheet from '../Timesheet-Module/timesheet';

// Task Management module
import TaskAssignment from '../NewTask-Management/TaskAssignment'
import TradeMarkDetails from '../Project-Management-Module/ProjectTradeDetails/projectdetails';


import UserGroup from '../User Management/User Group/usergroup';
import UserMaster from '../User Management/User Master/usermaster';
// Invoice module
import InvoiceDetails from "../effortInvoice_Module/AddInvoiceDetails/invoiceDetails";
import BillableDetails from "../effortInvoice_Module/BillableDetails/billableeffort_details";
import BillableHead from "../effortInvoice_Module/BillableHead/billable_head";
import OpeDetails from "../effortInvoice_Module/OPeDetails/opeDetails";
import Invoice_Details from "../effortInvoice_Module/InvoiceDetails/invoice_details";
import AddApproval from "../effortInvoice_Module/AddApproval/add_approval";
import OpeApproval from "../effortInvoice_Module/opeapproval/OpeApproval";

// Client and Contact Module
import ClientTable from "../client&contact/client_table/ClientTable";
import AddClient from "../client&contact/add_client/AddClient";
import  ClientContact from "../client&contact/clien_contact/ClientContact";
import DashboardClient from "../client&contact/dashboard/Dashboard";

// // User Login 
// import Userlogin from "../user_login/login/Login";

// Appraisal
// import HodReview from "../empappraisal/hodReview/HodReview";
// import ManagingPartner from "../empappraisal/managingPartner/ManagingPartner";
import SelectedCandidatesList from '../Hr-Module/SelectedCandidatesList';


// navbarLogo 

import HRLogo from "../../images/navbarLogo/HR.svg"
import Admin from "../../images/navbarLogo/Admin.svg"
import CaseLogo from "../../images/navbarLogo/Case.svg"
import Checklist from "../../images/navbarLogo/Checklist.svg"
import ClientContactImg from "../../images/navbarLogo/Client & Contact.svg"
import ContinousMonitoring from "../../images/navbarLogo/Continous Monitoring.svg"
import Invoice from "../../images/navbarLogo/Invoice.svg"
import KnowledgeLogo from "../../images/navbarLogo/Knowledge.svg"
import Library from "../../images/navbarLogo/Library.svg"
import Productivity from "../../images/navbarLogo/Productivity.svg"
import ProjectLogo from "../../images/navbarLogo/Project.svg"
import Task from "../../images/navbarLogo/Task.svg"
import UserManagement from "../../images/navbarLogo/User Management.svg"

// Addrate

import AddRate from "../addRate/Addrate"
import Useraccess_rights from '../User Management/UserAccess/userAccessRights';
import { userAccessFunc } from '../User Management/action/useraccessAction';
import { connect } from 'react-redux'

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    nested: {
        paddingLeft: theme.spacing(4),
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
        expand1: false,
        expand2: false,
        expand3: false,
        expand4: false,
        expand5: false,
        expand6: false,
        expand7: false,
        expand8: false,
        expand9: false,
        expand10: false,
        expand11: false,
        expand12: false,
        expand13: false,
        expand14: false,
    };

    handleDrawerOpen = () => {
        this.setState({ open: !this.state.open });
    };

    collapse = (id) => {
        if (id === 1) {
            this.setState({ expand1: !this.state.expand1 })
        }
        if (id === 2) {
            this.setState({ expand2: !this.state.expand2 })
        }
        if (id === 3) {
            this.setState({ expand3: !this.state.expand3 })
        }
        if (id === 4) {
            this.setState({ expand4: !this.state.expand4 })
        }
        if (id === 5) {
            this.setState({ expand5: !this.state.expand5 })
        }
        if (id === 6) {
            this.setState({ expand6: !this.state.expand6 })
        }
        if (id === 7) {
            this.setState({ expand7: !this.state.expand7 })
        }
        if (id === 8) {
            this.setState({ expand8: !this.state.expand8 })
        }
        if (id === 9) {
            this.setState({ expand9: !this.state.expand9 })
        }
        if (id === 10) {
            this.setState({ expand10: !this.state.expand10 })
        }
        if (id === 11) {
            this.setState({ expand11: !this.state.expand11 })
        }
        if (id === 12) {
            this.setState({ expand12: !this.state.expand12 })
        }
        if (id === 13) {
            this.setState({ expand13: !this.state.expand13 })
        }
        if (id === 14) {
            this.setState({ expand14: !this.state.expand14 })
        }
        this.setState({})
    }

    componentDidMount(){
        let local =  JSON.parse(localStorage.getItem("token"))
        this.props.dispatch(userAccessFunc(local.data[0].id))
    }

    render() {
        const { classes, children } = this.props;
        const { open } = this.state;
        const { useraccess } = this.props

        let HrAccess = useraccess && useraccess[0].item[0].item 
        let projectAccess = useraccess && useraccess[3].item[0].item 
        let caseAccess = useraccess && useraccess[1].item[0].item 
        let checkListAccess = useraccess && useraccess[2].item[0].item 
        let productivityAccess = useraccess && useraccess[4].item[0].item 
        let taskAccess = useraccess && useraccess[5].item[0].item 

        // HR
        let dashboardView = null
        let resumeView = null
        let recruiteView = null
        let questionView = null
        let onlineTestView = null
        let interviewView = null
        let selCandidateView = null
        let empMasterView = null
        let KRAView = null
        let KPIView = null
        let AppraisalView = null
        let leaveAppView = null
        let severanceView = null
        let requirementTicketView = null


        let hrmouleView = HrAccess && HrAccess.some((data)=>{
            return data.allow_view === "Y"
        })

        let projectmoduleView = projectAccess && projectAccess.some((data)=>{
            return data.allow_view === "Y"
        })

        let casemoduleView = caseAccess && caseAccess.some((data)=>{
            return data.allow_view === "Y"
        })

        let checklistmoduleView = checkListAccess && checkListAccess.some((data)=>{
            return data.allow_view === "Y"
        })

        let productivitymoduleView = productivityAccess && productivityAccess.some((data)=>{
            return data.allow_view === "Y"
        })

        let taskmoduleView = taskAccess && taskAccess.some((data)=>{
            return data.allow_view === "Y" 
        })
        
        HrAccess && HrAccess.map((value)=>{
            
            switch (value.id) {
                case 1:
                    dashboardView = value.allow_view === "Y" ? true : false
                    break;
                case 2:
                    resumeView = value.allow_view === "Y" ? true : false
                    break;    
                case 3:
                    recruiteView = value.allow_view === "Y" ? true : false
                    break;
                case 4:
                    questionView = value.allow_view === "Y" ? true : false
                    break;    
                case 5:
                    onlineTestView = value.allow_view === "Y" ? true : false
                    break;
                case 6:
                    interviewView = value.allow_view === "Y" ? true : false
                    break;    
                // case 1:
                //     selCandidateView = value.allow_view === "Y" ? true : false
                //     break;
                case 14:
                    empMasterView = value.allow_view === "Y" ? true : false
                    break;    
                case 10:
                    KRAView = value.allow_view === "Y" ? true : false
                    break;
                case 12:
                    KPIView = value.allow_view === "Y" ? true : false
                    break;    
                case 13:
                    AppraisalView = value.allow_view === "Y" ? true : false
                    break;
                case 9:
                    leaveAppView = value.allow_view === "Y" ? true : false
                    break;    
                case 15:
                    severanceView = value.allow_view === "Y" ? true : false
                    break;
                case 16:
                    requirementTicketView = value.allow_view === "Y" ? true : false
                    break;    
                default:
                    break;
            }
           
        })

        // project 
        let projectView = null
        let ipStageView = null
        let trademarkView = null
        let designView = null
        let patentView = null
        let copyrightView = null
        let ipProjectView = null


        projectAccess && projectAccess.map((value)=>{
            switch (value.id) {
                case 27:
                    projectView = value.allow_view === "Y" ? true : false
                    break;
                case 25:
                    ipStageView = value.allow_view === "Y" ? true : false
                    break;
                case 21:
                    trademarkView = value.allow_view === "Y" ? true : false
                    break;
                case 23:
                    designView = value.allow_view === "Y" ? true : false
                    break;
                case 24:
                    patentView = value.allow_view === "Y" ? true : false
                    break;
                case 26:
                    copyrightView = value.allow_view === "Y" ? true : false
                    break;
                case 22:
                    ipProjectView = value.allow_view === "Y" ? true : false
                    break;
                default:
                    break;
            }
        })

        // case
        let courtView = null
        let caseView = null
        let dayreportView = null


        caseAccess && caseAccess.map((value)=>{
            switch (value.id) {
                case 17:
                    courtView = value.allow_view === "Y" ? true : false
                    break;
                case 18:
                    caseView = value.allow_view === "Y" ? true : false
                    break;
                case 19:
                    dayreportView = value.allow_view === "Y" ? true : false
                    break;
                default:
                    break;
            }
        })

        // productivity
        let timeSheetView = null
        let expenseView = null
        let unblockUserView = null


        productivityAccess && productivityAccess.map((value)=>{
            switch (value.id) {
                case 28:
                    timeSheetView = value.allow_view === "Y" ? true : false
                    break;
                case 29:
                    expenseView = value.allow_view === "Y" ? true : false
                    break;
                case 30:
                    unblockUserView = value.allow_view === "Y" ? true : false
                    break;
                default:
                    break;
            }
        })

        // Task
        let taskAssView = null

        taskAccess && taskAccess.map((value)=>{
            switch (value.id) {
                case 31:
                    taskAssView = value.allow_view === "Y" ? true : false
                    break;
                default:
                    break;
            }
        })

        // checkList
        let checkListView = null

        checkListAccess && checkListAccess.map((value)=>{
            switch (value.id) {
                case 20:
                    checkListView = value.allow_view === "Y" ? true : false
                    break;
                default:
                    break;
            }
        })


        console.log(hrmouleView,"hrmouleView")



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
                        <img src={surana} className={`${this.state.open ? "surana_logo" : "surana_logo_sm"}`} />
                        <span className={`${this.state.open ? "text_logo" : "text_logo_none"}`}>Surana</span>
                    </div>



                    <MenuList className="menu_background_clr">

                        {/* Hr Module - One*/}
                        {hrmouleView && <>
                        <MenuItem button onClick={() => this.collapse(1)} component={Link}>
                            <ListItemIcon>
                                {/* <InboxIcon /> */}
                                {/* <HRLogo /> */}
                                <img src={HRLogo} className="navbarLogo" />
                            </ListItemIcon>
                            <ListItemText primary="HR" />
                            {this.state.expand1 ? <ExpandLess /> : <ExpandMore />}
                        </MenuItem>

                        <Collapse in={this.state.expand1} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {dashboardView && <MenuItem button className={classes.nested} component={Link} to="/Home/dashboard">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="DashBoard" />
                                </MenuItem>}

                               {resumeView && <MenuItem button className={classes.nested} component={Link} to="/Home/Resume">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Create Resume" />
                                </MenuItem>}

                                {recruiteView && <MenuItem button className={classes.nested} component={Link} to="/Home/Recruitment">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Recruitment" />
                                </MenuItem>}

                                {questionView && <MenuItem button className={classes.nested} component={Link} to="/Home/InterviewQuestions">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Questions" />
                                </MenuItem>}

                                {onlineTestView && <MenuItem button className={classes.nested} component={Link} to="/Home/Onlinetest">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Online Test" />
                                </MenuItem>}

                                {interviewView && <MenuItem button className={classes.nested} component={Link} to="/Home/Interviewtable">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Interview Management" />
                                </MenuItem>}

                                <MenuItem button className={classes.nested} component={Link} to="/Home/selectedcandidates">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Selected Candidates" />
                                </MenuItem>

                                {empMasterView && <MenuItem className="ml-3" component={Link} to="/Home/EmployeeMaster">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Employee Master" />
                                </MenuItem>}

                                {KRAView && <MenuItem className="ml-3" component={Link} to="/Home/EmployeeKRA">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Employee KRA" />
                                </MenuItem>}



                                {KPIView && <MenuItem className="ml-3" component={Link} to="/Home/EmployeeAppraisalkpi">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Employee Appraisal KPI" />
                                </MenuItem>}

                                {/* <MenuItem className="ml-3" component={Link} component={Link} to="/Home/Appraisal">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="dd" />
                                </MenuItem> */}
{/* Employee Appraisal start */}
                                {AppraisalView &&<><MenuItem className="ml-3" button onClick={() => this.collapse(14)}  >
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Employee Appraisal" />
                                    {this.state.expand14 ? <ExpandLess /> : <ExpandMore />}
                                </MenuItem>
                                <Collapse in={this.state.expand14} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>

                                    <MenuItem   button className={classes.nested} component={Link} to="/Home/empuser"  component={Link} to="/Home/Appraisal">
                                            <ListItemIcon className="ml-3">
                                                <InboxIcon />
                                            </ListItemIcon>
                                            <ListItemText className="ml-3" primary="User"/>
                                        </MenuItem>

                                        <MenuItem  button className={classes.nested} component={Link} to="/Home/hodreview">
                                            <ListItemIcon  className="ml-3">
                                                <InboxIcon />
                                            </ListItemIcon>
                                            <ListItemText  className="ml-3" primary="Hod Review" />
                                        </MenuItem>
                                        <MenuItem  button className={classes.nested} component={Link} to="/Home/managingpartner">
                                            <ListItemIcon className="ml-3">
                                                <InboxIcon />
                                            </ListItemIcon>
                                            <ListItemText className="ml-3" primary="Managing Partner" />
                                        </MenuItem>
                                    </List>
                                </Collapse>
                                </>}
{/* Employee Appraisal end*/}

                                {leaveAppView && <MenuItem button className={classes.nested} component={Link} to="/Home/Leave">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Leave Application" />
                                </MenuItem>}

                                {/* <MenuItem button className={classes.nested} component={Link} to="/Home/Payroll">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Payroll" />
                                </MenuItem> */}

                                {severanceView && <MenuItem className="ml-3" component={Link} to="/Home/Severance">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Severance" />
                                </MenuItem>}

                                {requirementTicketView && <MenuItem className="ml-3" component={Link} to="/Home/Ticket">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Requirement Ticket" />
                                </MenuItem>}


                                {/* <MenuItem button className={classes.nested} component={Link} to="/Home/Induction">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Induction Program" />
                                </MenuItem> */}



                                {/* <MenuItem button className={classes.nested} component={Link} to="/Home/ApplicationList">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Leave And Permission List" />
                                </MenuItem> */}



                                {/* <MenuItem  className="ml-3" component={Link} to="/Home/Knowledge">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Knowledge Management" />
                                </MenuItem> */}



                                {/* <MenuItem  className="ml-3" component={Link} to="/Home/Rateform">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Add Rate" />
                                </MenuItem> */}



                                {/* <MenuItem  className="ml-3" component={Link} to="/Home/AddEmployee">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Create Employee" />
                                </MenuItem> */}





                                {/* <MenuItem  className="ml-3" component={Link} to="/Home/Career">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Career" />
                                </MenuItem> */}

                            </List>
                        </Collapse>
                        
                        </>}
                        
                        {/* Hr Module */}

                        {/* Project Management - Two*/}
                        {projectmoduleView && <>
                        <MenuItem button onClick={() => this.collapse(2)}>
                            <ListItemIcon>
                                {/* <InboxIcon /> */}
                                <img src={ProjectLogo} className="navbarLogo" />
                            </ListItemIcon>
                            <ListItemText primary="Project" />
                            {this.state.expand2 ? <ExpandLess /> : <ExpandMore />}
                        </MenuItem>
                        <Collapse in={this.state.expand2} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>

                                {projectView && <MenuItem button className={classes.nested} component={Link} to="/Home/Project">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Project" />
                                </MenuItem>}

                                {ipStageView && <MenuItem button className={classes.nested} component={Link} to="/Home/ProjectTemplate">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="IP Stage Template" />
                                </MenuItem>}

                                {trademarkView && <MenuItem button className={classes.nested} component={Link} to="/Home/Trademark">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Trade Mark" />
                                </MenuItem>}

                                {designView && <MenuItem button className={classes.nested} component={Link} to="/Home/Design">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Design" />
                                </MenuItem>}

                                {patentView && <MenuItem button className={classes.nested} component={Link} to="/Home/Patent">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Patent" />
                                </MenuItem>}

                                {copyrightView && <MenuItem button className={classes.nested} component={Link} to="/Home/Copyright">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="CopyRight" />
                                </MenuItem>}


                                {ipProjectView && <MenuItem button className={classes.nested} component={Link} to="/Home/trademarkdetails">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="IP Project Dashboard" />
                                </MenuItem>}

                               
                            </List>
                        </Collapse>
                        </>}
                        {/* Project Management  End*/}

                        {/* Case Management - Three*/}
                        {casemoduleView && <>
                        <MenuItem button onClick={() => this.collapse(3)}>
                            <ListItemIcon>
                            <img src={CaseLogo} className="navbarLogo" />
                            </ListItemIcon>
                            <ListItemText primary="Case" />
                            {this.state.expand3 ? <ExpandLess /> : <ExpandMore />}
                        </MenuItem>


                        <Collapse in={this.state.expand3} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>

                                {courtView && <MenuItem button className={classes.nested} component={Link} to="/Home/Courtform">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Court" />
                                </MenuItem>}

                                {caseView && <MenuItem button className={classes.nested} component={Link} to="/Home/Case">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Case" />
                                </MenuItem>}

                                {dayreportView && <MenuItem button className={classes.nested} component={Link} to="/Home/Dayreport">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Day Report" />
                                </MenuItem>}
                            </List>
                        </Collapse>
                        </>}
                        {/* Case Management End*/}

                        {/* Productivity Module - Four*/}
                        {productivitymoduleView && <>
                        <MenuItem button onClick={() => this.collapse(4)}>
                            <ListItemIcon>
                            <img src={Productivity} className="navbarLogo" />
                            </ListItemIcon>
                            <ListItemText primary="Productivity" />
                            {this.state.expand4 ? <ExpandLess /> : <ExpandMore />}
                        </MenuItem>
                        <Collapse in={this.state.expand4} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {timeSheetView && <MenuItem button className={classes.nested} component={Link} to="/Home/Timesheet">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Timesheet" />
                                </MenuItem>}
                                {expenseView && <MenuItem button className={classes.nested} component={Link} to="/Home/Expense">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Expense" />
                                </MenuItem>}
                                {unblockUserView && <MenuItem button className={classes.nested} component={Link} to="/Home/Unblockuser">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Unblockuser" />
                                </MenuItem>}
                            </List>
                        </Collapse>
                        </>}
                        {/* Productivity End */}

                        {/* Invoice - Five */}
                        
                        <MenuItem button component={Link} to="/Home/billablehead">
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Billable Effort Invoice" />
                           
                        </MenuItem>
                        {/* <MenuItem button onClick={() => this.collapse(5)}>
                            <ListItemIcon>
                            <img src={Invoice} className="navbarLogo" />
                            </ListItemIcon>
                            <ListItemText primary="Invoice" />
                            {this.state.expand5 ? <ExpandLess /> : <ExpandMore />}
                        </MenuItem>
                        <Collapse in={this.state.expand5} timeout="auto" unmountOnExit>
                        </Collapse> */}
                        {/* Invoice End - Five */}



                        {/* Task Management - Six*/}
                        {taskmoduleView && <>
                        <MenuItem button onClick={() => this.collapse(6)}>
                            <ListItemIcon>
                            <img src={Task} className="navbarLogo" />
                            </ListItemIcon>
                            <ListItemText primary="Task" />
                            {this.state.expand6 ? <ExpandLess /> : <ExpandMore />}
                        </MenuItem>
                        <Collapse in={this.state.expand6} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>

                                {taskAssView && <MenuItem button className={classes.nested} component={Link} to="/Home/TaskAssignment">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Task Assignment" />
                                </MenuItem>}

                            </List>
                        </Collapse>
                        </>}

                        {/* Task Management End */}



                        {/* Checklist Management - Seven*/}
                        {checklistmoduleView && <>
                        <MenuItem button onClick={() => this.collapse(7)}>
                            <ListItemIcon>
                            <img src={Checklist} className="navbarLogo" />
                            </ListItemIcon>
                            <ListItemText primary="Checklist" />
                            {this.state.expand7 ? <ExpandLess /> : <ExpandMore />}
                        </MenuItem>
                        <Collapse in={this.state.expand7} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>

                                {checkListView && <MenuItem button className={classes.nested} component={Link} to="/Home/ChecklistTab">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Checklist Management" />
                                </MenuItem>}
                            </List>
                        </Collapse>
                        </>}
                        {/* Checklist Management */}

                        {/* Knowledge - Eight */}
                        <MenuItem button onClick={() => this.collapse(8)}>
                            <ListItemIcon>
                            <img src={KnowledgeLogo} className="navbarLogo" />
                            </ListItemIcon>
                            <ListItemText primary="Knowledge" />
                            {this.state.expand8 ? <ExpandLess /> : <ExpandMore />}
                        </MenuItem>
                        <Collapse in={this.state.expand8} timeout="auto" unmountOnExit>
                        </Collapse>
                        {/* Knowledge End - Eight */}

                        {/* Continous Monitoring - Nine */}
                        <MenuItem button onClick={() => this.collapse(9)}>
                            <ListItemIcon>
                            <img src={ContinousMonitoring} className="navbarLogo" />
                            </ListItemIcon>
                            <ListItemText primary="Continous Monitoring" />
                            {this.state.expand9 ? <ExpandLess /> : <ExpandMore />}
                        </MenuItem>
                        <Collapse in={this.state.expand9} timeout="auto" unmountOnExit>
                        </Collapse>
                        {/* Continous Monitoring End - Nine */}

                        {/* Client & Contact - Ten */}
                        <MenuItem button onClick={() => this.collapse(10)}>
                            <ListItemIcon>
                            <img src={ClientContactImg} className="navbarLogo" />
                            </ListItemIcon>
                            <ListItemText primary="Client & Contact" />
                            {this.state.expand10 ? <ExpandLess /> : <ExpandMore />}
                        </MenuItem>
                        <Collapse in={this.state.expand10} timeout="auto" unmountOnExit>
                        </Collapse>
                        {/* Client & Contact End - Ten */}

                        {/* Library - Eleven */}
                        <MenuItem button onClick={() => this.collapse(11)}>
                            <ListItemIcon>
                            <img src={Admin} className="navbarLogo" />
                            </ListItemIcon>
                            <ListItemText primary="Admin" />
                            {this.state.expand11 ? <ExpandLess /> : <ExpandMore />}
                        </MenuItem>
                        <Collapse in={this.state.expand11} timeout="auto" unmountOnExit>
                        </Collapse>
                        {/* Library End- Eleven */}

                        {/* Admin - Twelve */}
                        <MenuItem button onClick={() => this.collapse(12)}>
                            <ListItemIcon>
                            <img src={Library} className="navbarLogo" />
                            </ListItemIcon>
                            <ListItemText primary="Library" />
                            {this.state.expand12 ? <ExpandLess /> : <ExpandMore />}
                        </MenuItem>
                        <Collapse in={this.state.expand12} timeout="auto" unmountOnExit>
                        </Collapse>
                        {/* Admin End- Twelve */}



                        {/* User Management - Thirteen*/}
                        <MenuItem button onClick={() => this.collapse(13)}>
                            <ListItemIcon>
                            <img src={UserManagement} className="navbarLogo" />
                            </ListItemIcon>
                            <ListItemText primary="User Management" />
                            {this.state.expand13 ? <ExpandLess /> : <ExpandMore />}
                        </MenuItem>
                        <Collapse in={this.state.expand13} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>

                                <MenuItem button className={classes.nested} component={Link} to="/Home/UserGroup">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="User Group" />
                                </MenuItem>

                                <MenuItem button className={classes.nested} component={Link} to="/Home/UserMaster">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="User Master" />
                                </MenuItem>
                                
                                <MenuItem button className={classes.nested} component={Link} to="/Home/UserAccessRights">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="User Access Rights" />
                                </MenuItem>

                            </List>
                        </Collapse>
                        {/* User Management End Thirteen*/}

{/* 


                        <MenuItem button onClick={() => this.collapse(3)}>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Checklist" />
                            {this.state.expand3 ? <ExpandLess /> : <ExpandMore />}
                        </MenuItem>
                        <Collapse in={this.state.expand3} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>

                                <MenuItem button className={classes.nested} component={Link} to="/Home/ChecklistTab">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Checklist Management" />
                                </MenuItem>
                            </List>
                        </Collapse>


                        <MenuItem button onClick={() => this.collapse(5)}>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Productivity" />
                            {this.state.expand4 ? <ExpandLess /> : <ExpandMore />}
                        </MenuItem>

                        <Collapse in={this.state.expand5} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>

                                <MenuItem button className={classes.nested} component={Link} to="/Home/Timesheet">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Timesheet" />
                                </MenuItem>
                                <MenuItem button className={classes.nested} component={Link} to="/Home/Expense">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Expense" />
                                </MenuItem>
                                <MenuItem button className={classes.nested} component={Link} to="/Home/Unblockuser">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Unblockuser" />
                                </MenuItem>
                            </List>
                        </Collapse> */}

                        {/* <MenuItem button onClick={() => this.collapse(8)}>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Billable Effort Invoice" />
                            {this.state.expand6 ? <ExpandLess /> : <ExpandMore />}
                        </MenuItem> */}
{/* 
                          <MenuItem button component={Link} to="/Home/billablehead">
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Billable Effort Invoice" />
                           
                        </MenuItem> */}

                        <Collapse in={this.state.expand8} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>

                                <MenuItem button className={classes.nested} component={Link} to="/Home/InvoiceDetails">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Add Invoice Details" />
                                </MenuItem>
                               
                                <MenuItem button className={classes.nested} component={Link} to="/Home/billablehead">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Billable effort Details" />
                                </MenuItem>

                                <MenuItem button className={classes.nested} component={Link} to="/Home/invoiceDtails">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Invoice Details" />
                                </MenuItem>
                                <MenuItem button className={classes.nested} component={Link} to="/Home/addapproval">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Add Approval" />
                                </MenuItem>
                            </List>
                        </Collapse>

                        <MenuItem button onClick={() => this.collapse(9)}>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Client-Module" />
                            {this.state.expand6 ? <ExpandLess /> : <ExpandMore />}
                        </MenuItem>
                        <Collapse in={this.state.expand9} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>

                               <MenuItem button className={classes.nested} disabled component={Link} to="/Home/dashboardclient">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Dashboard" />
                                </MenuItem>

                                <MenuItem button className={classes.nested} component={Link} to="/Home/clienttable">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Client Table" />
                                </MenuItem>
                                <MenuItem button className={classes.nested} component={Link} to="/Home/addclient">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Add Client" />
                                </MenuItem>
                                <MenuItem button className={classes.nested} component={Link} to="/Home/clientcontact">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Client Contact" />
                                </MenuItem>
                            
                            </List>
                        </Collapse>


                        {/* <MenuItem button onClick={() => this.collapse(10)}>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="User Login" />
                            {this.state.expand6 ? <ExpandLess /> : <ExpandMore />}
                        </MenuItem>
                        <Collapse in={this.state.expand10} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>

                                <MenuItem button className={classes.nested} component={Link} to="/Home/userlogin">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Login" />
                                </MenuItem>
                           ]
                             
                            </List>
                        </Collapse> */}
{/* 
                        <MenuItem button onClick={() => this.collapse(11)}>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Appraisal" />
                            {this.state.expand6 ? <ExpandLess /> : <ExpandMore />}
                        </MenuItem>
                        <Collapse in={this.state.expand11} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>

                            <MenuItem button className={classes.nested} component={Link} to="/Home/appraisalform">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Appraisal" />
                                </MenuItem>

                                <MenuItem button className={classes.nested} component={Link} to="/Home/hodreview">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Hod Review" />
                                </MenuItem>
                                <MenuItem button className={classes.nested} component={Link} to="/Home/managingpartner">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Managing Partner" />
                                </MenuItem>
                            </List>
                        </Collapse> */}




                        

                        {/* <MenuItem button onClick={() => this.collapse(4)}>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Task Mgmt-Module" />
                            {this.state.expand4 ? <ExpandLess /> : <ExpandMore />}
                        </MenuItem>
                        <Collapse in={this.state.expand3} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>

                                <MenuItem button className={classes.nested} component={Link} to="/Home/TaskAssignment">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Task Management" />
                                </MenuItem>
                            </List>
                        </Collapse>
                        <MenuItem button onClick={() => this.collapse(5)}>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Productivity-Module" />
                            {this.state.expand4 ? <ExpandLess /> : <ExpandMore />}
                        </MenuItem>
                        <Collapse in={this.state.expand5} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>

                                <MenuItem button className={classes.nested} component={Link} to="/Home/Timesheet">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Timesheet" />
                                </MenuItem>
                                <MenuItem button className={classes.nested} component={Link} to="/Home/Expense">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Expense" />
                                </MenuItem>
                                <MenuItem button className={classes.nested} component={Link} to="/Home/Unblockuser">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Unblockuser" />
                                </MenuItem>
                            </List>
                        </Collapse>
 */}

                    </MenuList>

                    <List>

                    </List>
                </Drawer>
                <main
                    style={{ width: "10%" }}
                    className={`mt-5 ${classNames(classes.content, {
                        [classes.contentShift]: open,
                    })}`}
                >
                    {children}
                    <Route exact path={`${this.props.match.path}/dashboard`} component={LandingPage} />
                    <Route exact path={`${this.props.match.path}/Resume`} component={Createresume} />
                    <Route exact path={`${this.props.match.path}/Recruitment`} component={Recruitment} />
                    <Route exact path={`${this.props.match.path}/Onlinetest`} component={OnlinetestTab} />
                    <Route exact path={`${this.props.match.path}/InterviewQuestions`} component={Onlinetestlist} />
                    <Route exact path={`${this.props.match.path}/Interviewtable`} component={NewInterviewtable} />
                    <Route exact path={`${this.props.match.path}/selectedcandidates`} component={SelectedCandidatesList} />
                    <Route exact path={`${this.props.match.path}/Induction`} component={Inductionprogram} />
                    <Route exact path={`${this.props.match.path}/Payroll`} component={EmployeePayroll} />
                    <Route exact path={`${this.props.match.path}/Leave`} component={Leaveapplication} />
                    {/* <Route exact path={`${this.props.match.path}/ApplicationList`} component={Permissionlist} /> */}
                    <Route exact path={`${this.props.match.path}/Appraisal`} component={NewAppraisal} />
                    <Route exact path={`${this.props.match.path}/EmployeeKRA`} component={EmployeeKRA} />
                    <Route exact path={`${this.props.match.path}/EmployeeAppraisalkpi`} component={EmployeeapprisalKpi} />
                    <Route exact path={`${this.props.match.path}/Severance`} component={Severance} />
                    <Route exact path={`${this.props.match.path}/Knowledge`} component={Knowledge} />
                    {/* <Route exact path={`${this.props.match.path}/Rateform`} component={Rateform} /> */}
                    <Route exact path={`${this.props.match.path}/Timesheet`} component={TimesheetTab} />
                    <Route exact path={`${this.props.match.path}/Ticket`} component={RecruitmentTicketTab} />
                    {/* <Route exact path={`${this.props.match.path}/AddEmployee`} component={AddEmployeeMaster} /> */}
                    <Route exact path={`${this.props.match.path}/uploadDoc`} component={UploadDocBtn} />
                    {/* <Route exact path={`${this.props.match.path}/career`} component={Careerform} /> */}
                    {/* <Route exact path={`${this.props.match.path}/task_manage`} component={TaskAssignment} /> */}
                    <Route exact path={`${this.props.match.path}/case`} component={Case} />
                    <Route exact path={`${this.props.match.path}/employeemaster`} component={EmployeeMastertab} />
                    <Route exact path={`${this.props.match.path}/courtform`} component={Courtform} />
                    <Route exact path={`${this.props.match.path}/ChecklistTab`} component={ChecklistTab} />
                    <Route exact path={`${this.props.match.path}/TaskAssignment`} component={TaskAssignment} />
                    <Route exact path={`${this.props.match.path}/Dayreport`} component={AddDayreport} />
                    <Route exact path={`${this.props.match.path}/Employeedetails`} component={EmployeeDetails} />
                    <Route exact path={`${this.props.match.path}/Expense`} component={Productivitytab} />
                    <Route exact path={`${this.props.match.path}/Unblockuser`} component={UnblockuserTab} />
                    <Route exact path={`${this.props.match.path}/empuser`} component={AppraiseeUser} />
                    <Route exact path={`${this.props.match.path}/hodreview`} component={HodTab} />
                    <Route exact path={`${this.props.match.path}/managingpartner`} component={ManagingPartner} />
                    
                    

                    {/* Project Management module */}
                    <Route exact path={`${this.props.match.path}/Trademark`} component={TradeMark} />
                    <Route exact path={`${this.props.match.path}/Design`} component={DesignMain} />
                    <Route exact path={`${this.props.match.path}/Patent`} component={PatentMain} />
                    <Route exact path={`${this.props.match.path}/ProjectTemplate`} component={ProjectTemplate} />
                    <Route exact path={`${this.props.match.path}/Copyright`} component={Copyright} />
                    <Route exact path={`${this.props.match.path}/Project`} component={Project} />
                    {/* TradeMarkDetails */}
                    <Route exact path={`${this.props.match.path}/trademarkdetails`} component={TradeMarkDetails} />


                    {/* Productivity Module */}
                    {/* <Route exact path={`${this.props.match.path}/Timesheet`} component={timesheet} /> */}

                    {/* User Management Module */}
                    <Route exact path={`${this.props.match.path}/UserGroup`} component={UserGroup} />
                    <Route exact path={`${this.props.match.path}/UserMaster`} component={UserMaster} />
                    <Route exact path={`${this.props.match.path}/UserAccessRights`} component={Useraccess_rights} />


                    {/* Effort Invoice  Management */}
                    <Route exact path={`${this.props.match.path}/InvoiceDetails`} component={InvoiceDetails}/>
                    <Route exact path={`${this.props.match.path}/billablehead`} component={BillableHead}/>
                    <Route exact path={`${this.props.match.path}/billableope`} component={OpeDetails}/>
                    <Route exact path={`${this.props.match.path}/invoiceDtails`} component={Invoice_Details}/>
                    <Route exact path={`${this.props.match.path}/addapproval`} component={AddApproval}/>
                    <Route exact path={`${this.props.match.path}/opeapproval`} component={OpeApproval}/>

                    {/* Client and Contact Modukle */}
                    <Route exact path={`${this.props.match.path}/clienttable`} component={ClientTable }/>
                    <Route exact path={`${this.props.match.path}/addclient`} component={AddClient }/>
                    <Route exact path={`${this.props.match.path}/clientcontact`} component={ClientContact }/>
                    <Route exact path={`${this.props.match.path}/dashboardclient`} component={DashboardClient}/>

                    {/* User Login 

                     <Route exact path={`${this.props.match.path}/userlogin`} component={Userlogin}/> */}

                    {/* Appraisal Module */}
                    {/* <Route exact path={`${this.props.match.path}/hodreview`} component={HodReview} />
                    <Route exact path={`${this.props.match.path}/managingpartner`} component={ManagingPartner} />
   */}
             {/* Add Rate */}
                    <Route exact path={`${this.props.match.path}/addrate`} component={AddRate} />
                </main>
            </div >
        );
    }
}

MiniDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
	userAccessFunc,
	dispatch                // ← Add this
  })

  const mapStateToProps = (state) => {
    return {
        useraccess:state.useraccess.useraccess
    };
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(MiniDrawer))


