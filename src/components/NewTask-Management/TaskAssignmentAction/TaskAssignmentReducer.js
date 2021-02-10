import {
  GET_PROJECT_CASE,
  GET_EMPLOYEE_NAME,
  PUT_TASK_DATA
 
  
} from './TaskAssignmentAction';
const defaultState = {
  getprojectCase: null,
  getemployeeName: null,
puttaskData:null
  
};

export const TaskAssignmentReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_PROJECT_CASE:
      console.log("gettask", action.payload.data);

      return { ...state, getprojectCase: action.payload.data };
    case GET_EMPLOYEE_NAME:
      console.log("gettask", action.payload.data);

      return { ...state, getemployeeName: action.payload.data };
   
   case PUT_TASK_DATA:
            console.log("edit",action.payload);
            
             return {...state,puttaskData:action.payload.data} 
    //     case GET_ALLOTMENT:
    //         console.log("dataaaaaaaaaaaaaaa", action.payload);
      
    //         return { ...state, getTradeallotment: action.payload.data };
    //         case GET_STAGES:
    //             console.log("dataaaaaaaaaaaaaaa", action.payload);
          
    //             return { ...state, getTradestages: action.payload.data };
    //             case GET_SUB_STAGES:
    //                 console.log("dataaaaaaaaaaaaaaa", action.payload);
              
    //                 return { ...state, getTradeSubstages: action.payload.data };
    default:
      return state;
  }
};
