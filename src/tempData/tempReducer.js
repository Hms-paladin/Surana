import { ADDTM, RESET } from "./tempAction"

const tempData = {}

export default function(state=tempData,action){
    switch (action.type) {
        case ADDTM:
            return{...state,...action.payload}
        case RESET:
            return{tempData}
        default:
            return state
    }
}