import {
  GET_PROJECT_TYPE,
  GET_PROJECT_NAME,
  GET_CLIENT,
  GET_HOD,
  GET_BILLING,
  GET_CLIENT_NAME
  
} from './AddProjectAction';
const defaultState = {
  getprojectType: null,
  getprojectName: null,
  getprojectClient:null,
  getprojectHod:null,
  getprojectBilling:null,

};

export const AddProjectReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_PROJECT_TYPE:
      console.log("dataaaaaaaaaaaaaaa", action.payload);

      return { ...state, getprojectType: action.payload.data };
    case GET_PROJECT_NAME:
      console.log("dataaaaaaaaaaaaaaa", action.payload);

      return { ...state, getprojectName: action.payload.data };
    case GET_HOD:
      console.log("dataaaaaaaaaaaaaaa", action.payload);

      return { ...state, getprojectHod: action.payload.data };
    case GET_CLIENT:
      console.log("dataaaaaaaaaaaaaaa", action.payload);

      return { ...state, getprojectClient: action.payload.data };
      case GET_BILLING:
        console.log("dataaaaaaaaaaaaaaa", action.payload);
  
        return { ...state, getprojectBilling: action.payload.data };
        case GET_CLIENT_NAME:
        console.log("dataaaaaaaaaaaaaaa", action.payload);
        return { ...state, getClientName: action.payload.data };

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
