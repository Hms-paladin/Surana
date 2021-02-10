import { GET_PREVIOUS } from './ProjectAction';

const defaultState = {
    getlinkprevious:null,
};

export const ProjectReducer = (state=defaultState,action) => {
    switch (action.type) {
        case GET_PREVIOUS:
            console.log("dataaaaaaaaaaaaaaa",action.payload);
            
             return {...state,getlinkprevious:action.payload.data} 
                
        default:
            return state;
    }
} 