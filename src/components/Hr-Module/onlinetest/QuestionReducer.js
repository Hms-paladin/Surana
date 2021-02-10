import { GET_QUESTION_CATEGORY, GET_QUESTION_SUBCATEGORY, CLEARSTORE,GET_QUESTION_TYPE, GET_QUESTION_DETAILS,GET_QUESTIONS } from "./Action"

const defaultState = {
    questionCategory: null,
    questionSubCategory: null,
    questionType: null,
    questionDetails:null,
    questions:null
}

export const QuestionReducer = (state=defaultState,action) => {
    switch(action.type){
        case GET_QUESTION_CATEGORY:
            return{...state,questionCategory:action.payload.data}

        case GET_QUESTION_SUBCATEGORY:
            return{...state,questionSubCategory:action.payload}

        case GET_QUESTION_TYPE:
            return{...state,questionType:action.payload.data}

        case GET_QUESTION_DETAILS:
            return{...state,questionDetails:action.payload.data} 

        case GET_QUESTIONS:
             return{...state,questions:action.payload.data} 
             case CLEARSTORE:
                return {...state,data:null}         
        default:
            return state;
    }
}