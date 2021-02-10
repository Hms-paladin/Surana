import {
  GET_INT_NUM,
  GET_COURT_NUM,
  GET_CASE_VIEW
    
} from './DayAction';

const defaultState = {
  getinterNum:null,
  getCourtCaseNum:null,
  // getdayclient:null,
  getcaseview:null,
 
}

export const DayReducer = (state=defaultState, action) => {
  console.log("boobooo",action.payload)
  switch(action.type){
      
      case GET_INT_NUM:
          console.log("dataaaaaaaaaaaaaaa",action.payload);
          
           return {...state,getinterNum:action.payload.data} 
           case GET_COURT_NUM:
          console.log("heyyyy",action.payload);
          
           return {...state,getCourtCaseNum:action.payload.data} 
           case GET_CASE_VIEW:
             console.log("getcase",action.payload)
             return {...state,getcaseview:action.payload.data}     
      default:
          return state;
  }
}