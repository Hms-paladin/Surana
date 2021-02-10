import {
    GET_EXPENSE_OPTION,
    GET_EXPENSE_DEPARTMENT
} from './ExpenseAction';

const defaultState = {
  getexpOptions:null,
  getexpDepartment:null
}

export const ExpenseReducer = (state=defaultState, action) => {
  console.log("boobooo",action.payload)
  switch(action.type){
      
      case GET_EXPENSE_OPTION:
          console.log("dataaaaaaaaaaaaaaa",action.payload);
          
           return {...state,getexpOptions:action.payload.data} 
           case GET_EXPENSE_DEPARTMENT:
          console.log("heyyyy",action.payload);
          
           return {...state,getexpDepartment:action.payload.data}    
      default:
          return state;
  }
}