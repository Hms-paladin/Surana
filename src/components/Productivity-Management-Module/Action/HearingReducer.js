import {
    GET_HEARING_TASK,
    GET_HEARING_PARTY
} from './HearingAction';

const defaultState = {
    gethearingTask:null,
    gethearingParty:null
}

export const HearingReducer = (state=defaultState, action) => {
  console.log("boobooo",action.payload)
  switch(action.type){
      
      case GET_HEARING_TASK:
          console.log("dataaaaaaaaaaaaaaa",action.payload);
          
           return {...state,gethearingTask:action.payload.data} 
      case GET_HEARING_PARTY:
          console.log("heyyyy",action.payload);
          
           return {...state,gethearingParty:action.payload.data}    
      default:
          return state;
  }
}