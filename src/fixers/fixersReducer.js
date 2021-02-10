import {
    GET_DEPARTMENT, GET_EMPLOYEES, GET_CLIENT, GET_PROFESSIONAL_COURSE, GET_ALLOWANCE_TYPE, GET_DEDUCTION_TYPE,GET_QUALIFICATION_LIST,
    BUTTON_DISABLE_ACTION,GET_TYPEOF_INDUSTRY,GET_REFERRED_BY
} from "./fixersAction";

const defaultState = {
    industryMaster:null,
    referredBy:null,
    department:null,
    employees:null,
    clients:null,
    professionalCourse:null,
    qualificationList:null,
    buttonDisableState:false
}

export const fixersReducer = (state=defaultState, action) => {
    switch(action.type){
        case GET_TYPEOF_INDUSTRY:
            return{...state,industryMaster:action.payload.data}
        case GET_REFERRED_BY:
            return{...state,referredBy:action.payload.data}
        case GET_DEPARTMENT:
            return{...state,department:action.payload.data}
        case GET_QUALIFICATION_LIST:{
            return{...state,qualificationList:action.payload.data}
        }
        case GET_EMPLOYEES:
            return{...state,employees:action.payload.data}
        case GET_CLIENT:
            console.log("clients",action.payload.data)
            return{...state,clients:action.payload.data}
        case GET_PROFESSIONAL_COURSE:{
            return{...state,professionalCourse:action.payload.data}
        }
        case GET_ALLOWANCE_TYPE:{
            return{...state,allowanceType:action.payload.data}
        }
        case GET_DEDUCTION_TYPE:{
            return{...state,deductionType:action.payload.data}
        }
        case BUTTON_DISABLE_ACTION:{
            return{...state,buttonDisableState:action.payload}
        }
        default:
            return state;
    }
}