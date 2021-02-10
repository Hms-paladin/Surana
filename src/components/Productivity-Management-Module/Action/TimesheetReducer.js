import {
      GET_MODEOF_PAYEMENT,
      GET_EXPENSE_TYPE,
      GET_TIMESHEET_PROJECTS,
      GET_TIMESHEET_ACTIVITY,
} from './TimesheetAction';

const defaultState = {
    mode_ofpayment:null,
    expense_type:null,
    timesheet_projects:null,
    timesheet_activity:null,
}

export const TimesheeReducer = (state=defaultState, action) => {
    console.log("boobooo",action.payload)
    switch(action.type){
        
        case GET_MODEOF_PAYEMENT:
            console.log("dataaaaaaaaaaaaaaa",action.payload);
            
             return {...state,mode_ofpayment:action.payload.data}  
        case GET_EXPENSE_TYPE:
            console.log("heyyyy",action.payload);
            
             return {...state,expense_type:action.payload.data}
        case GET_TIMESHEET_PROJECTS:
            console.log("heyyyy",action.payload);
                
            return {...state,timesheet_projects:action.payload.data}
        case GET_TIMESHEET_ACTIVITY:
            console.log("heyyyy",action.payload);
                
            return {...state,timesheet_activity:action.payload.data}            
        default:
            return state;
    }
}