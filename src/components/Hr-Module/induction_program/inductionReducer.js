import { INDUCTION_CHECKLIST } from "./Action"

const defaultState = {
    inductionCheckList:null
}

export default (state=defaultState,action) =>{
   switch(action.type){
       case INDUCTION_CHECKLIST:
           return{...state,inductionCheckList:action.payload.data}
        default:
            return state;
   }
}