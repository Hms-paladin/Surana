import {GET_ACCEPTED_BY, GET_RELEIVED_BY, GET_EMPLOYEE_NAMES,GET_EMPLOYEE_BY_ID,GET_EMPLOYEE_DOJ} from './Action';

const defaultstate = {
    acceptedby:null,
    releivedby:null,
    employees:null
}


export const SeveranceReducer = (state=defaultstate,action) => {
    console.log("sdfksdjfklsjdfklsdjflksdjf",action)
    switch(action.type) {
        case GET_ACCEPTED_BY:
            return{...state,acceptedby:action.payload.data}
           
            case GET_RELEIVED_BY:
                return{...state,releivedby:action.payload.data} 
            case GET_EMPLOYEE_NAMES:
                    return{...state,employees:action.payload.data}  
            case GET_EMPLOYEE_BY_ID:
                return{...state,employees:action.payload.data} 
            case GET_EMPLOYEE_DOJ:
                return {...state,doj:action.payload}                   
        default:
            return state;    
    }
}