import {
    GET_INTERNAL_CASE,
    GET_COURT_CASE_NO,
} from './DayreportAction';

const defaultState = {
  getinternalcaseOptions:null,
  getcourtcaseOptions:null,
}

export const DayreportReducer = (state=defaultState, action) => {
  console.log("boobooo",action.payload)
  switch(action.type){
      
      case GET_INTERNAL_CASE:
          console.log("dataaaaaaaaaaaaaaa",action.payload);
          
           return {...state,getinternalcaseOptions:action.payload.data} 
      case GET_COURT_CASE_NO:
          console.log("heyyyy",action.payload);
          
           return {...state,getcourtcaseOptions:action.payload.data}          
      default:
          return state;
  }
}