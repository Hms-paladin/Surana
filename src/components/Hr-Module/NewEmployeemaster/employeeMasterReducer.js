import { EMPLOYEE_MASTER_TAB,EMPLOYEE_ID, EMPLOYEE_DETAILS } from "./employeeMasterAction";


const defaultState = {
    employeeMasterTab:null,
    employeeId:null,
    employeeDetails:null
}


export const employeeMasterReducer = (state=defaultState,action) => {
    switch (action.type) {
        case EMPLOYEE_MASTER_TAB:
            return{...state,employeeMasterTab:action.tabData}
        case EMPLOYEE_ID:
            return{...state,employeeId:action.payload}
        case EMPLOYEE_DETAILS:{
            return{...state,employeeDetails:action.payload}
        }
        default:
            return state;
    }
}