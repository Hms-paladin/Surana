import {GET_USER_ACCESS} from "../action/useraccessAction";


export const userAccessReducer = (state={useraccess:null},action)=>{
    console.log(action,"finalresult")
    console.log(state,"finalresult")


        switch (action.type) {
            case GET_USER_ACCESS:
                let useraccess = action.payload
                return {...state,useraccess}
                
            default:
                return state
        }
}