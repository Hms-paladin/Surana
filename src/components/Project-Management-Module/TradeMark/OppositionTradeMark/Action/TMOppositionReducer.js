import {
    GET_STAGE_LIST,
    GET_SUBSTAGE_LIST,
    GET_STATUS_LIST,
    GET_CLASS_LIST,
    GET_PROJECT_NAME
} from './TMOppositionAction';

const defaultState = {
  getstageList:null,
  getsubStageList:null,
  getStatusList:null,
  getClassList:null,
}

export const TrademarkOppositionReducer = (state=defaultState, action) => {
  console.log("boobooo",action.payload)
  switch(action.type){
      
        case GET_STAGE_LIST:
          console.log("dataaaaaaaaaaaaaaa",action.payload);
          
           return {...state,getstageList:action.payload.data} 
        case GET_SUBSTAGE_LIST:
          console.log("heyyyy",action.payload);
          
           return {...state,getsubStageList:action.payload.data}
        case GET_STATUS_LIST:
            console.log("status",action.payload);
            
             return {...state,getStatusList:action.payload.data}        
        case GET_CLASS_LIST:
            console.log("class",action.payload);
            
             return {...state,getClassList:action.payload.data}   
        case GET_PROJECT_NAME:
        return {...state,getprojectName: action.payload.data}           
      default:
          return state;
  }
}