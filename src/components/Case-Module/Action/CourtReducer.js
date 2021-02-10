import {
    GET_COURT_NAME,
    GET_CITY_NAME,
    PUT_COURT_DATA
} from './CourtAction';

const defaultState = {
  getcourtOptions:null,
  getcityOptions:null,
  editcourtdata:null
}

export const CourtReducer = (state=defaultState, action) => {
  console.log("boobooo",action.payload)
  switch(action.type){
      
      case GET_COURT_NAME:
          console.log("dataaaaaaaaaaaaaaa",action.payload);
          
           return {...state,getcourtOptions:action.payload.data} 
      case GET_CITY_NAME:
          console.log("heyyyy",action.payload);
          
           return {...state,getcityOptions:action.payload.data}
      case PUT_COURT_DATA:
            console.log("edit",action.payload);
            
             return {...state,editcourtdata:action.payload.data}    
      default:
          return state;
  }
}