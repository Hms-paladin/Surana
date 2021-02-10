import { GET_STAGES_LIST,GET_SUBSTAGES_LIST,GET_PROJECT_LIST } from './CopyrightAction';
const defaultState = {
    getstages:null,
    getsubstages:null,
    getProject:null
};

export const copyrightReducer = (state=defaultState,action) => {
    switch (action.type) {
        case GET_STAGES_LIST:
            console.log("dataaaaaaaaaaaaaaa",action.payload);
            
             return {...state,getstages:action.payload.data} 
        case GET_SUBSTAGES_LIST:
            console.log("dataaaaaaaaaaaaaaa",action.payload);
                
            return {...state,getsubstages:action.payload.data}
        case GET_PROJECT_LIST:
            console.log("dataaaaaaaaaaaaaaa",action.payload);
                
            return {...state,getProject:action.payload.data} 
        default:
            return state;
    }
} 