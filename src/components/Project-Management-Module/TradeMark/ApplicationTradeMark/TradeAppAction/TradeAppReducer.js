import {
  GET_STATUS,
  GET_ASSOCIATE,
  GET_CLASS,
  GET_OUR_REFERENCE,
  GET_COUNTRY,
  GET_ALLOTMENT,
  GET_STAGES,
  GET_SUB_STAGES,
  GET_USERDATE,
  GET_CLIENT_NAME,
  GET_TYPE_WORK,
  GET_PROJECT_NAME
} from "./TradeAppAction";
const defaultState = {
  getTradestatus: null,
  getTradeassociate: null,
  getTradeclass: null,
  getTradeOurReference: null,
  getTradecountry:null,
  getTradeallotment:null,
  getTradestages:null,
  getTradeSubstages:null,
  getTradeUserdate:null,
  getTradeClientname:null,
  getTypeWork:null
};

export const TradeAPPReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_STATUS:
      console.log("dataaaaaaaaaaaaaaa", action.payload);

      return { ...state, getTradestatus: action.payload.data };
    case GET_ASSOCIATE:
      console.log("dataaaaaaaaaaaaaaa", action.payload);

      return { ...state, getTradeassociate: action.payload.data };
    case GET_CLASS:
      console.log("dataaaaaaaaaaaaaaa", action.payload);

      return { ...state, getTradeclass: action.payload.data };
    case GET_OUR_REFERENCE:
      console.log("dataaaaaaaaaaaaaaa", action.payload);

      return { ...state, getTradeOurReference: action.payload.data };
      case GET_COUNTRY:
        console.log("dataaaaaaaaaaaaaaa", action.payload);
  
        return { ...state, getTradecountry: action.payload.data };
        case GET_ALLOTMENT:
            console.log("dataaaaaaaaaaaaaaa", action.payload);
      
            return { ...state, getTradeallotment: action.payload.data };
            case GET_STAGES:
                console.log("dataaaaaaaaaaaaaaa", action.payload);
          
                return { ...state, getTradestages: action.payload.data };
                case GET_SUB_STAGES:
                    console.log("dataaaaaaaaaaaaaaa", action.payload);
              
                    return { ...state, getTradeSubstages: action.payload.data };
                    case GET_USERDATE:
                      console.log("dataaaaaaaaaaaaaaa", action.payload);
                
                      return { ...state, getTradeUserdate: action.payload.data };
                      case GET_CLIENT_NAME:
                        console.log("dataaaaaaaaaaaaaaa", action.payload);
                  
                        return { ...state, getTradeClientname: action.payload.data };
                        case GET_TYPE_WORK:
                          return { ...state, getTypeWork: action.payload.data }; 
                        case GET_PROJECT_NAME:
                          return {...state,getprojectName: action.payload.data}  
    default:
      return state;
  }
};
