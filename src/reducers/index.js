import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';
import playReducer from '../playground/playReducer';
import modalReducer from '../hoc/modalReducer';
import tempReducer from '../tempData/tempReducer';
import { fixersReducer } from '../fixers/fixersReducer';
import { QuestionReducer } from '../components/Hr-Module/onlinetest/QuestionReducer';
import { resumeReducer } from '../components/Hr-Module/create_resume/action/ResumeReducer';
import inductionReducer from '../components/Hr-Module/induction_program/inductionReducer';
import { RecruitmentReducer } from '../components/Hr-Module/Recruitment/RecruitmentReducer';
import { SeveranceReducer } from '../components/Hr-Module/severance/SeveranceReducer';
import { employeeMasterReducer } from '../components/Hr-Module/NewEmployeemaster/employeeMasterReducer';
import {TimesheeReducer} from '../components/Productivity-Management-Module/Action/TimesheetReducer';
import {ExpenseReducer} from '../components/Productivity-Management-Module/Action/ExpenseReducer';
import { HearingReducer } from '../components/Productivity-Management-Module/Action/HearingReducer';
import { CourtReducer } from '../components/Case-Module/Action/CourtReducer';
import {CaseReducer} from '../components/Case-Module/NewCase/Action/CaseReducer'
import {DayReducer} from '../components/Case-Module/day_report/Action/DayReducer'
import { ProjectReducer } from '../components/Project-Management-Module/ProjectTemplate/Project_Action/ProjectReducer';
import { TrademarkOppositionReducer } from '../components/Project-Management-Module/TradeMark/OppositionTradeMark/Action/TMOppositionReducer';
import {AddProjectReducer} from '../components/Project-Management-Module/Project/AddProjectAction/AddProjectReducer'
import { TradeAPPReducer } from '../components/Project-Management-Module/TradeMark/ApplicationTradeMark/TradeAppAction/TradeAppReducer';
import {PatentReducer} from '../components/Project-Management-Module/Patent/PatentApplication/Patent_Action/PatentReducer'
import { TaskAssignmentReducer } from '../components/NewTask-Management/TaskAssignmentAction/TaskAssignmentReducer';
import { copyrightReducer } from '../components/Project-Management-Module/Copyright/CopyrightAction/CopyrightReducer';


// usermanagement
import {userGroupReducer} from "../components/User Management/reducer/UserGroupReducer";
import {userAccessReducer} from "../components/User Management/reducer/useraccessReducer";
import {UserMasterReducer} from "../components/User Management/User Master/usermasterreducer/UserMasterReducer";

export default history => combineReducers({
    router: connectRouter(history),
    form: formReducer,
    modal: modalReducer,
    nameReducer: playReducer,
    tempReducer: tempReducer,
    fixers: fixersReducer,
    resumeReducer: resumeReducer,
    employeeMasterReducer: employeeMasterReducer,
    onlineTest: QuestionReducer,
    induction: inductionReducer,
    recruitment: RecruitmentReducer,
    severance:SeveranceReducer,
    timesheet:TimesheeReducer,
    expense:ExpenseReducer,
    hearing:HearingReducer, 
    court:CourtReducer,
    case:CaseReducer,
    day:DayReducer,
    previousproject:ProjectReducer,
    trademarkopp:TrademarkOppositionReducer,
    tradeapp:TradeAPPReducer,
    addproject:AddProjectReducer,
    patentDom:PatentReducer,
    patentForeign:PatentReducer,
    taskAssignment:TaskAssignmentReducer,
    copyright:copyrightReducer,
    userGroup:userGroupReducer,
    usermaster:UserMasterReducer,
    useraccess:userAccessReducer,
});