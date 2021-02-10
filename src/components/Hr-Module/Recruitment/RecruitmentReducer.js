import { GET_LICENSES, GET_LANGUAGES, GET_SPECIALIZATION, GET_CERTIFICATION, GET_QUALIFICATION, GET_TEMPLATE_NAME, GET_TEMPLATE_DATA } from "./RecruitmentAction";

const defaultState = {
    licenses:'',
    certification:'',
    languages:'',
    specialization:'',
    qualification:'',
    templatesName:null,
    templateData:null
};

export const RecruitmentReducer = (state=defaultState,action) => {
    switch (action.type) {
        case GET_LICENSES:
            return { ...state, licenses:action.payload.data}
        case GET_CERTIFICATION:
            return { ...state, certification:action.payload.data}
        case GET_LANGUAGES:
            return { ...state, languages:action.payload.data}
        case GET_SPECIALIZATION:
            return { ...state, specialization:action.payload.data}
        case GET_QUALIFICATION:
            return { ...state, qualification:action.payload.data}
        case GET_TEMPLATE_NAME:
            return{...state, templatesName:action.payload} 
        case GET_TEMPLATE_DATA:
            return{...state,templateData:action.payload}          
        default:
            return state;
    }
} 