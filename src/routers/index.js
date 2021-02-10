import React from 'react';
import { BrowserRouter, Switch, Route, HashRouter } from 'react-router-dom';
import layoutWrapper from '../hoc/layoutWrapper';


/* Hr-Module */
import LandingPage from '../components/Hr-Module/dashboard/LandingPage';
import Createresume from '../components/Hr-Module/create_resume/Createresume';
import Recruitment from '../components/Hr-Module/Recruitment/Recruitment';
import Application from '../components/Hr-Module/applications/Application';
import Onlinetestlist from '../components/Hr-Module/onlinetest/Onlinetestlist';
import Inductionprogram from '../components/Hr-Module/induction_program/Inductionprogram';
import Severance from '../components/Hr-Module/severance/Severance';
import Employeeapprisallist from '../components/Hr-Module/employeeapprisal/Employeeappraisallist';


import Candidates from '../components/candidates/Candidates';
import Case from '../components/case/Case'
import Notfound from '../components/notfound';
import EmployeePayroll from '../components/Hr-Module/employeePayroll/EmployeePayroll';
import Interviewtable from '../components/interview/Interviewtable';
import EmployeeLeave from '../components/empLeave/EmployeeLeave';
import MaterialuiTable from '../components/muitable/MaterialuiTable';
import TrainingPage from '../components/empTraining/TrainingPage';
import IndianFilling from '../components/add_pct/indian_filling/IndianFilling';
import Conference from '../components/conference/conference'
import InternationalFilling from '../components/add_pct/international_filling/InternationalFilling';
import AddAssignment from '../components/task_assignment/add_assignment/AddAssignment';
import Addchecklist from '../components/task_assignment/addchecklist/addchecklist';
import AddTrademarkIndia from '../components/addTrademarkIndia/AddTrademarkIndia';
import AddHearing from '../components/addHearing/AddHearing';
import Knowledge from '../components/knowledge_mangement/Knowledge';
import AddtmMain from '../components/addtm/AddtmMain';

import Hearing from '../components/addHearing/Hearing';
import TrademarkIndia from '../components/addTrademarkIndia/TrademarkIndia';
import ContinuosMonitering from '../components/continous_monitering/continuosmonitering';
import OpposedDefended from '../components/opposingfilled/opposeddefended/OpposedDefended';
import OpposedFilled from '../components/opposingfilled/opposingfilled/OpposingFilled';
import Clientform from '../components/client/Clientform';
import Holiday from '../components/add_holiday/Holiday';
import Rateform from '../components/add_rate/Rateform';
import Quiz from '../components/quiz/Quiz';
import Circular from '../components/circular/Circular';
import Feedbackform from '../components/feedbackandsuggestion/Feedbackform';
import Polls from '../components/polls/Polls';
import Rating from '../components/add_rating/Rating';
import Createemployee from '../components/createemployee/Createemployee';
/* Sathish */
import BookRequest from '../components/bookRequest/Bookrequest';
import BookRoom from "../components/bookRoom";
import Feedback from "../components/Feedback";
import Login from "../components/Login";
import Forgot from "../components/Login/forgot";
import AdminDashboard from '../components/adminDashbord'
import ChecklistManagement from '../components/checklist/ChecklistManagement';

import Ipab from '../components/ipab/Ipab';
import Article from '../components/post_article/Article';
import Courtform from '../components/add_court/Courtform';
import Users from '../table/Users';
import AddDayreport from '../components/day_report/AddDayreport';
import Timesheet from '../components/timesheet/timesheet';
// import AddIpab from '../components/ipab/AddIpab';
/* Sathish  */
// Productivity Module

import Unblockuser from '../components/unblockuser/Unblockuser';
// syed
import DesignIndia from '../components/projectManagementModule/addDesignIndia/DesignIndia';
import Copyright from '../components/projectManagementModule/copyright/Copyright';

// priya
import ApplicationFiled from '../components/projectManagementModule/trademarkApplication/TrademarkApplication';
import OppositionFiled from '../components/projectManagementModule/opposition/Opposition';

const AppRouter = () => (
    <HashRouter >
        <Switch>

            {/* Hr-Module */}

            <Route path="/" component={layoutWrapper(LandingPage)} exact />

            <Route path="/create_resume" component={layoutWrapper(Createresume)} exact />

            <Route path="/recruitment" component={layoutWrapper(Recruitment)} exact />

            <Route path="/application" component={layoutWrapper(Application)} exact />

            <Route path="/onlinetestlist" component={layoutWrapper(Onlinetestlist)} exact />

            <Route path="/induction_program" component={layoutWrapper(Inductionprogram)} exact />

            <Route path="/severance" component={layoutWrapper(Severance)} exact />

            <Route path="/Employeeapprisallist" component={layoutWrapper(Employeeapprisallist)} exact />
            
            {/* Hr-Module */}


            <Route path="/candidates" component={layoutWrapper(Candidates)} exact />

            <Route path="/employeepayroll" component={layoutWrapper(EmployeePayroll)} exact />

            <Route path="/employeeleave" component={layoutWrapper(EmployeeLeave)} exact />

            <Route path="/muitable" component={layoutWrapper(MaterialuiTable)} exact />


            <Route path="/case" component={layoutWrapper(Case)} exact />

            <Route path="/day_report" component={layoutWrapper(AddDayreport)} exact />

            <Route path="/interviewtable" component={layoutWrapper(Interviewtable)} exact />

            <Route path="/employeetraining" component={layoutWrapper(TrainingPage)} exact />

            <Route path="/knowledge" component={layoutWrapper(Knowledge)} exact />

            <Route path="/addtm" component={layoutWrapper(AddtmMain)} exact />

            <Route path="/ipab" component={layoutWrapper(Ipab)} exact />

            <Route path="/indianfilling" component={layoutWrapper(IndianFilling)} exact />

            <Route path="/InternationalFilling" component={layoutWrapper(InternationalFilling)} exact />

            <Route path="/addassignment" component={layoutWrapper(AddAssignment)} exact />

            <Route path="/addchecklist" component={layoutWrapper(Addchecklist)} exact />

            <Route path="/post_article" component={layoutWrapper(Article)} exact />

            <Route path="/conference" component={layoutWrapper(Conference)} exact />

            <Route path="/addtrademarkindia" component={layoutWrapper(AddTrademarkIndia)} exact />

            <Route path="/addhearing" component={layoutWrapper(AddHearing)} exact />

            <Route path="/hearing" component={layoutWrapper(Hearing)} exact />

            <Route path="/trademarkindia" component={layoutWrapper(TrademarkIndia)} exact />

            <Route path="/continuosmonitering" component={layoutWrapper(ContinuosMonitering)} exact />

            <Route path="/opposeddefended" component={layoutWrapper(OpposedDefended)} exact />

            <Route path="/opposedfilled" component={layoutWrapper(OpposedFilled)} exact />

            <Route path="/checklistmanagement" component={layoutWrapper(ChecklistManagement)} exact />

            <Route path="/Clientform" component={layoutWrapper(Clientform)} exact />

            <Route path="/Courtform" component={layoutWrapper(Courtform)} exact />

            <Route path="/add_holiday" component={layoutWrapper(Holiday)} exact />

            <Route path="/add_rateform" component={layoutWrapper(Rateform)} exact />

            <Route path="/quiz" component={layoutWrapper(Quiz)} exact />

            <Route path="/circular" component={layoutWrapper(Circular)} exact />

            <Route path="/polls" component={layoutWrapper(Polls)} exact />

            <Route path="/Feedbackform" component={layoutWrapper(Feedbackform)} exact />

            <Route path="/Rating" component={layoutWrapper(Rating)} exact />

            <Route path="/Createemployee" component={layoutWrapper(Createemployee)} exact />


            <Route path="/table" component={layoutWrapper(Users)} exact />

            <Route path="/EmployeePayroll" component={layoutWrapper(EmployeePayroll)} exact />

            <Route path="/TrainingPage" component={layoutWrapper(TrainingPage)} exact />

            <Route path="/Bookrequest" component={layoutWrapper(BookRequest)} exact />

            <Route path="/timesheet" component={layoutWrapper(Timesheet)} exact />



            {/** sathish */}
            <Route path="/bookrequest" component={layoutWrapper(BookRequest)} exact />
            <Route path="/bookroom" component={layoutWrapper(BookRoom)} exact />
            <Route path="/feedback" component={layoutWrapper(Feedback)} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/forgot" component={Forgot} exact />
            <Route path="/admindashboard" component={layoutWrapper(AdminDashboard)} exact />
            {/** sathish */}
            {/* Productivity module  */}
            <Route path="/unblockuser" component={layoutWrapper(Unblockuser)} exact />
            {/* syed */}
            <Route path="/DesignIndia" component={layoutWrapper(DesignIndia)} exact />
            <Route path="/Copyright" component={layoutWrapper(Copyright)} exact />
            {/* priya */}
            <Route path="/TrademarkApplication" component={layoutWrapper(ApplicationFiled)} exact />
            <Route path="/Opposition" component={layoutWrapper(OppositionFiled)} exact />
            <Route component={Notfound} />

        </Switch>
    </HashRouter>
);

export default AppRouter;