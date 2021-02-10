import { MODAl } from "./modalAction";

 const modalDefaultState = {
     add: false,
     edit: false
 };

 export default function(state = modalDefaultState,action){
    switch (action.type) {
        case MODAl:
            return{...state, ...action.payload}
        default:
            return state;
    }
 }