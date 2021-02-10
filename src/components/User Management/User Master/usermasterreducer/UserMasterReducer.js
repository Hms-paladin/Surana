import {GET_USER_MASTER} from "../usermasteraction/UserMasterAction";

const defaultState = {
    usermaster:null
}

export const UserMasterReducer = (state=defaultState, action) => {
    switch (action.type) {
        case GET_USER_MASTER:
            let usermaster = [];
            action.payload && action.payload.length > 0 && action.payload.map((data) => {
                const {user_name,mobileno,email,group_name,active_flag,password} = data;
                usermaster.push({user_name,password,mobileno,email,group_name,active_flag})
            })

            return {...state,usermaster}

        default:
            return state
    }
}