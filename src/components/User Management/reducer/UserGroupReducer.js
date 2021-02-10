import {GET_USER_GROUP} from "../action/usergroupAction";


const defaultState = {
    userGroup:null
}

export const userGroupReducer = (state=defaultState, action) => {
    switch (action.type) {
        case GET_USER_GROUP:
            let userGroup = [];
            action.payload.length > 0 && action.payload.map((data) => {
                userGroup.push({"name":data.group_name,"id":data.id})
            })

            return{
                ...state,
                userGroup
            }   
        default:
            return state;
    }
}