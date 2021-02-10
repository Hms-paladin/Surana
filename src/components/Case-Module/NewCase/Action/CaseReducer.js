import {
    GET_CASE_NAME,
    GET_CASE_TYPE,
    GET_CASE_CITY,
    GET_CASE_ADJOURNMENT,
    GET_CASE_BILLING,
    GET_CASE_FILED,
    GET_CASE_SUB,
    GET_CASE_CLIENT,
    GET_COMPANY_CLIENT,
    GET_STATUS,
    GET_PROJECT_NAME
} from './CaseAction';

const defaultState = {
  getTypecase:null,
  getStatuscase:null,
  getNamecase:null,
  getCitycase:null,
  getAdjournmentcase:null,
  getBillingcase:null,
  getFiledcase:null,
  getSubcase:null,
  getClientcase:null,
  getCompanyclient:null
  
}

export const CaseReducer = (state=defaultState, action) => {
  console.log("boobooo",action.payload)
  switch(action.type){
      
      case GET_CASE_NAME:
          console.log("dataaaaaaaaaaaaaaa",action.payload);
          
           return {...state,getNamecase:action.payload.data} 
           case GET_CASE_TYPE:
          console.log("heyyyy",action.payload);
          
           return {...state,getTypecase:action.payload.data}  
           case GET_CASE_CITY:
            console.log("heyyyy",action.payload);
            
             return {...state,getCitycase:action.payload.data}  
             case GET_CASE_ADJOURNMENT:
              console.log("heyyyy",action.payload);
              
               return {...state,getAdjournmentcase:action.payload.data}   
               case GET_CASE_BILLING:
                console.log("heyyyy",action.payload);
                
                 return {...state,getBillingcase:action.payload.data}  
                 case GET_CASE_FILED:
                  console.log("heyyyy",action.payload);
                  
                   return {...state,getFiledcase:action.payload.data}
                   case GET_CASE_SUB:
                    console.log("heyyyy",action.payload);
                    
                     return {...state,getSubcase:action.payload.data}   
                     case GET_CASE_CLIENT:
                      console.log("heyyyy",action.payload);
                      
                       return {...state,getClientcase:action.payload.data}
                       case GET_COMPANY_CLIENT:
                      console.log("heyyyy",action.payload);
                      
                       return {...state,getCompanyclient:action.payload.data}
                       case GET_STATUS:
                        console.log("heyyyy",action.payload);
                        
                         return {...state,getStatuscase:action.payload.data}
                         case GET_PROJECT_NAME:
                        console.log("heyyyy",action.payload);
                        
                         return {...state,getProjectName:action.payload.data}
      default:
          return state;
  }
}