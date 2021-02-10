import { GET_APPNO,GET_FOREIGN_APPNO } from './PatentAction';
const defaultState = {
    getapplicationNum:null,
    getforeignappNum:null,
};

export const PatentReducer = (state=defaultState,action) => {
    switch (action.type) {
        case GET_APPNO:
            console.log("dataaaaaaaaaaaaaaa",action.payload);
            
             return {...state,getapplicationNum:action.payload.data} 
             case GET_FOREIGN_APPNO:
                console.log("dataaaaaaaaaaaaaaa",action.payload);
                
                 return {...state,getforeignappNum:action.payload.data} 
        default:
            return state;
    }
} 